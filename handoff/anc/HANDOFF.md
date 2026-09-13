# ANC (Agent-Native CRM) ハンドオフ

作成日: 2026-09-13 / 作成セッション: kenji-natsumoto/sprintjapan（ブランチ `claude/hubspot-clone-ai-agent-m8t273`）

## 1. プロダクトの位置づけ
- 仮称: **ANC（Agent-Native CRM）**
- 位置づけ: SPRINT Japan のマイクロビジネスの 1 つ。`sprintjapan-hq` 組織配下で開発する（既存の `zent`、`HI-DO-RI` と同列）
- リポジトリ: `https://github.com/sprintjapan-hq/anc`（private）
- ローカル書庫: `/signity/sprintjapan-hq/anc`
- 一言で: HubSpot の中核（Smart CRM / Sales / Marketing 自動化）でパリティを取り、常駐する AI エージェントが仕事を進める CRM で本家を超える

## 2. 参照資料
- 構想プラン（HTML）: https://claude.ai/code/artifact/fd43d8e6-2135-4d79-8234-1a136c018fe2
- 構想プラン（Markdown）: 新リポでは `docs/plan/anc-plan-2026-09-13.md`（元: sprintjapan リポ `.lovable/plan/agent-native-crm構想-2026-09-13.md`）
- 本ハンドオフ: 新リポでは `docs/handoff/HANDOFF.md`
- 新セッション用の最初の指示: `docs/handoff/FIRST_PROMPT.md`

## 3. 決定事項（プランより）
| 項目 | 決定 |
|---|---|
| 目標 | 「HubSpot と全く同じ」ではなく「乗り換えられる中核 + エージェント」。3 ヶ月で自社 MVP、9〜12 ヶ月で中小企業が乗り換えられる水準 |
| 優先度 | P1: Smart CRM, Sales Hub / P2: Marketing, Service, Operations / P3: Commerce / やらない: CMS / Marketplace は MCP で代替 |
| リポ構成 | monorepo（pnpm + Turborepo）。`apps/web`（Next.js App Router）, `packages/db`（Drizzle + Supabase migrations）, `packages/domain`（ドメイン API = エージェントのツール）, `packages/agents`（Claude API）, `apps/mcp`（MCP サーバー）, `apps/jobs`（Inngest） |
| フロント | Next.js + TypeScript + shadcn/ui + Tailwind（コーポレートサイトと同じ UI キット） |
| DB | Supabase Postgres 東京（ap-northeast-1）+ RLS + pgvector + Realtime。Drizzle ORM |
| 認証 | Supabase Auth（Google / Microsoft / メール）+ 組織・ロール |
| ジョブ | Inngest（Trigger.dev も可）。Edge Functions は短時間処理のみ |
| メール | 送信 Resend または SES。受信 Gmail API / Microsoft Graph |
| AI | Claude API TypeScript SDK。エージェント `claude-opus-5`、大量処理 `claude-sonnet-5`、分類 `claude-haiku-4-5`、夜間は Batch API。Tool Use + プロンプトキャッシュ |
| ホスティング | Vercel + Supabase + Inngest Cloud |
| 設計原則 | 画面から行える操作はすべて同じドメイン API 経由でエージェントも行える。全エージェントに承認ゲート・監査ログ・評価セット・コスト上限 |
| 開発方式 | Claude Code で実装、Lovable は画面試作のみ |

## 4. 未決事項
- 正式なプロダクト名（ANC は仮称）
- Supabase 新規プロジェクトの作成（ユーザーのアカウントで作成し、project ref を新セッションに渡す）
- 送信ドメイン（例: `mail.<product>.jp`）
- 料金プランと外部提供の時期（Phase 5 で判断）

## 5. Phase 0（第 1〜2 週）のタスク
- [ ] monorepo 骨組み（pnpm, Turborepo, TypeScript, ESLint, Prettier, CI）
- [ ] `CLAUDE.md`（開発規約、コマンド、命名規則、コミット規約）
- [ ] Supabase 東京プロジェクト作成（ユーザー作業）→ `supabase/` 初期化、ローカル開発の `supabase start`
- [ ] 組織・メンバー・ロールと RLS の最小スキーマ。2 テナント分離テストを CI に置く
- [ ] オブジェクトモデル設計書（contacts / companies / deals / tickets + カスタムオブジェクト、プロパティ定義、関連付け、パイプライン、タイムライン）の DDL
- [ ] Google Cloud で OAuth アプリ作成、Gmail / Calendar 制限付きスコープ審査を申請（ユーザー作業）
- [ ] 送信ドメイン取得と SPF/DKIM/DMARC 設定、ウォームアップ開始（ユーザー作業）
- [ ] データ品質エージェントのツール定義と評価セット（自社データ 100 件）
- [ ] Lovable で 3 画面試作（一覧、詳細 + タイムライン、パイプライン）

完了条件: 2 テナントでデータが混ざらないことをテストで証明できている

## 6. 制約（新セッションでも守ること）
- 法務: 機能の模倣は可、HubSpot の UI・文言・コードの模倣は不可。名称は比較以外で使わない
- 特定電子メール法: オプトイン・配信停止・送信者表示を製品側で強制。エージェントの外部送信は承認必須から始める
- 個人情報保護法: 利用目的の明示、越境移転の説明、データは東京リージョン
- Claude Fable 5.1 を使う場合は 30 日データ保持が前提。ゼロ保持が必要な顧客は Opus 5 系で構成
- スコープは Hub 単位で閉じる。完了条件未達で次の Hub を開けない

## 7. セッション運用で分かったこと
- Claude Code リモートセッションは起点リポのオーナーに紐づく。`kenji-natsumoto` 起点のセッションからは `sprintjapan-hq` のリポを追加できない（cross-tier 不可）
- セッションの GitHub App からは組織リポの作成ができない（403）。リポ作成はユーザーが `gh repo create` か Web で行う
- リモートセッションはユーザーのローカルディスク（`/signity/...`）に触れない。クローンはローカルで行う

## 8. 作業規約
- 出力は日本語、思考は英語。PENTA（5 ブレイン対話）形式で提案を行い、末尾は質問か次の一手で締める
- コミットは日本語の要約 + 本文。モデル名をコミットや PR に書かない
- ブランチは `claude/<topic>-<id>` 形式で作業し、main への直接プッシュはしない
