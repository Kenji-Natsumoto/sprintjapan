# Agent-Native CRM 構想（HubSpot と同じ土俵に立ち、AIエージェントで抜く）

## 結論
できる。ただし「HubSpot と全く同じ」を目標にすると負ける。目標は「HubSpot から乗り換えられる中核（Smart CRM・Sales・Marketing 自動化）でパリティを取り、エージェントが仕事をする CRM で超える」こと。
- 3ヶ月: 自社で使える MVP（CRM コア + 最初のエージェント）
- 9〜12ヶ月: 中小企業が HubSpot から乗り換えられる水準
- コーポレートサイトとは別の新規リポジトリで構築する

## HubSpot の分解と優先度
| Hub | 優先度 | 方針 |
|---|---|---|
| Smart CRM（オブジェクト・プロパティ・関連付け・パイプライン・タイムライン・リスト・インポート・検索） | P1 | 完全パリティ。HubSpot API 互換のオブジェクトモデルで移行を容易に |
| Sales Hub（メール連携・シーケンス・予約・通話・タスク・見積・予測） | P1 | パリティ + SDR エージェント |
| Marketing Hub（フォーム・LP・メール配信・ワークフロー） | P2 | 中核はパリティ。SNS/広告/SEO は連携で代替 |
| Service Hub（共有受信トレイ・チケット・KB・チャット） | P2 | サポートエージェントが一次回答 |
| Operations Hub（データ品質・同期） | P2 | データ品質はエージェントの得意領域 |
| Commerce Hub | P3 | Stripe + 適格請求書で最小実装 |
| Content Hub（CMS） | やらない | LP とフォームまで |
| App Marketplace | 別の形で | MCP サーバーを公開し、エージェント経由で連携の長い尾を吸収 |

## どこで作るか
- A. sprintjapan リポに同居: 不採用（Supabase 共用で RLS 設計が破綻、リリースが絡む）
- B. Lovable で新規: 画面試作のみ（ワークフロー・マルチテナント・MCP・長時間ジョブは守備範囲外）
- C. 新規リポ（monorepo）+ Claude Code + Supabase: 推奨

### 推奨スタック
- フロント: Next.js（App Router）+ TypeScript + shadcn/ui + Tailwind
- DB: Supabase Postgres（東京）+ RLS + pgvector + Realtime、Drizzle ORM
- 認証: Supabase Auth（Google / Microsoft / メール）+ 組織・ロール
- ワークフロー/ジョブ: Inngest（または Trigger.dev）
- メール: 送信 Resend / SES、受信 Gmail API / Microsoft Graph 同期
- AI: Claude API（TypeScript SDK）。エージェント Opus 5、大量処理 Sonnet 5、分類 Haiku 4.5、夜間は Batch API
- ホスティング: Vercel + Supabase + Inngest Cloud
- 開発: GitHub monorepo（pnpm + Turborepo）、Claude Code で実装、Lovable は画面試作

## アーキテクチャ原則
人が画面から行える操作は、すべて同じツール関数経由でエージェントも行える（画面と AI が同じドメイン API を叩く）。
- 操作面: Web アプリ / 公開フォーム・LP・予約 / Slack・LINE / MCP サーバー
- エージェント: SDR、受信トレイ、データ品質、ワークフロー生成、商談分析・予測、会議秘書。共通に承認ゲート・監査ログ・評価セット・コスト上限
- ドメイン API: objects / associations / pipelines / timeline / sequences / workflows / inbox / search.semantic
- 実行基盤: Next.js Route Handlers、Inngest、Claude API（Tool Use + Prompt Cache）、Resend/SES、Gmail/Graph 同期
- データ: Postgres + RLS、pgvector、Realtime、Storage、append-only 監査テーブル

### データモデルの核
- オブジェクト: contacts / companies / deals / tickets + カスタムオブジェクト。object_type + JSONB プロパティ + 型付きプロパティ定義
- 関連付け: ラベル付き多対多
- パイプライン: ステージ・確度・自動化フック
- タイムライン: メール・通話・会議・ノート・エージェント行動を同一イベント列で保持
- 埋め込み: ノート・メール・企業情報を pgvector 化

## AIエージェント層（差別化）
共通の約束: (1) 外部送信は承認必須から開始 (2) 全ツール呼び出しを監査ログに残し取消可能 (3) 各エージェントに実データ由来の評価セット (4) テナント・エージェント単位の月次トークン予算
- SDR: 調査→補完→日本語ビジネス文法のシーケンス起案→返信解釈→次の一手
- 受信トレイ: トリアージ、担当割当、感情判定、根拠付き返信案、SLA 警告
- データ品質: 重複統合、表記ゆれ正規化（㈱/全角半角）、法人番号 API・郵便番号補完、名刺 OCR
- ワークフロー生成: 自然言語→検証済みワークフロー定義
- 商談分析/予測: 失注リスク指摘、週次予測レポートを Slack へ、テナントスキーマへの SQL
- 会議秘書: Calendar + 文字起こし→議事録・ToDo・ステージ更新案
- MCP サーバー公開で Claude Code / Claude.ai / Cowork から CRM を直接操作可能にする

## 制約
- 法務: 機能の模倣は合法、表現（UI・文言・コード）の模倣は不可。HubSpot 名称は比較以外で使わない。公式 API での移行ツールは可
- 日本の法規: 特定電子メール法（オプトイン・配信停止・送信者表示を製品で強制）、個人情報保護法（利用目的、越境移転、東京リージョン）、インボイス制度
- 技術: メール到達率（ウォームアップ、SPF/DKIM/DMARC）、Gmail API の OAuth 審査に数週間、Edge Functions は短時間向けなのでジョブ基盤必須、RLS は最初から、LLM は分単位で動く前提の UI、Fable 5.1 は 30 日保持が前提
- 体制: Hub 単位でスコープを閉じる。自社が最初の顧客となり評価セットを作る

## フェーズ計画（完了条件付き）
- Phase 0（第1〜2週）土台: リポ、monorepo、Supabase 東京、認証・組織・RLS、CI、Gmail OAuth 申請 → 2 テナント分離をテストで証明
- Phase 1（第3〜12週）Smart CRM コア + データ品質エージェント + MCP → 自社営業を 2 週間この CRM だけで回せる
- Phase 2（第13〜20週）Sales Hub + SDR + 会議秘書 → エージェント起案シーケンスの返信率が人手と同等以上
- Phase 3（第21〜28週）Marketing Hub + ワークフロー生成 → 特定電子メール法要件を製品側で強制
- Phase 4（第29〜36週）Service Hub + 受信トレイエージェント → 一次回答の 50% 以上がエージェント案の軽微修正で送れる
- Phase 5（第37〜48週）分析・予測、Commerce、パブリック API、外部提供 → 社外 3 社が移行して 1 ヶ月継続

## コスト概算（月額、開発期）
Supabase $25〜100 / Vercel $20 席 / Inngest $0〜50 / Resend・SES $0〜20 / Claude API $100〜500 / その他 $20〜50。最大の変動費は Claude API。テナント別トークン予算を Phase 1 から入れる。

## リスクと対策
- HIGH スコープ膨張 → Hub 単位の完了条件
- HIGH エージェントの誤送信・誤更新 → 承認必須、監査ログ、取消、評価セット
- MED メール到達率 → Phase 0 からウォームアップ、顧客ドメイン設定ガイド
- MED Gmail 審査遅延 → Phase 0 で申請、IMAP/転送で代替
- MED LLM コスト → モデル使い分け、キャッシュ、バッチ、テナント予算
- LOW 知財衝突 → UI・文言・コードは独自、比較は事実のみ

## 最初の 2 週間
1. プロダクト名・リポ名を決め、新規リポと monorepo の骨組みを作る
2. Supabase 東京プロジェクト新設、組織・ロール・RLS 最小スキーマ、2 テナント分離テストを CI へ
3. オブジェクトモデル設計書（DDL まで）
4. Google Cloud OAuth アプリ作成、Gmail / Calendar 制限付きスコープ審査申請
5. 送信ドメイン取得、SPF/DKIM/DMARC 設定、ウォームアップ開始
6. データ品質エージェントのツール定義と評価セット（自社データ 100 件）
7. Lovable で 3 画面（一覧、詳細 + タイムライン、パイプライン）を試作
