import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const content = `# AI-Native Companyのためのハーネス・インフラ設計

## ― 人間の物理的制約から解放された組織OSの構築原理 ―

Version 0.1

Date: 2026-04-26

Author: Kenji Natsumoto(AI-COMPANY-Lab)

---

## 要旨（Abstract）

本稿は、AI-Native Company（AIが90%以上のビジネス活動を担う組織形態）を物理的・技術的に成立させるための基礎インフラストラクチャ設計を論じる。

従来の企業モデルでは、業務時間は人間の活動時間と一致し、人間が物理的に作業できない時間帯（移動中、就寝中等）には組織活動が停止していた。AI-Native Companyにおいては、この前提が逆転する。AIエージェントは24時間365日稼働し続け、人間は「承認ボタン担当者」として最終判断のみを担う。

この組織モデルを成立させるためには、以下の3つを満たすインフラが必要である。

1. **常時稼働性** — 人間がデバイスを閉じてもAIが停止しない物理基盤

2. **遠隔監督性** — 人間がどこにいてもAIの進捗・成果を確認できる経路

3. **データ統合性** — 複数のAIエージェントが共通の文脈を参照できるデータ層

本稿では、これらを満たす4層モデル（コード／ハーネス／メモリ／セッション）を提示し、5つのデータシステム（Notion／Obsidian Vault／Git／Supabase／Sheets）の役割分担を定義する。さらに、既存運用を破壊しない段階的移行戦略を示す。

本設計は、単なる作業環境の最適化ではなく、来るべき未来に必ず訪れる「AI-Native Company」という組織モデル構築・運用に向けて、今の段階から実装を行うための指針・導入ガイドラインとして機能させたい。

---

## 1. はじめに（Introduction）

### 1.1 本稿の位置づけ

本稿は AI-Native Company 理論モデルを、実装可能な物理基盤として具体化するものである。

組織最適化の論文が組織構造を、ツール連携設計ガイドがツール連携を扱うのに対し、本稿は**「AIを物理的に動かし続けるための土台」**を扱う。

### 1.2 動機となった問い

本設計の出発点は、ある日の素朴な問いであった。

> 「移動中、MacBook Airをカバンに収めたままでも、別マシンのAIに自分の代わりに仕事をさせ、その進捗をスマホから確認することはできるか」

この問いは、表面的には「便利な作業環境」を求めているように見える。しかし本質は、AI-Native Companyの定義そのものに直結している。

「人間がデバイスを開いていない時間にもAIが稼働している」状態は、AI比率90%という定量的目標を達成するための必要条件である。そして「出先からスマホで進捗を確認できる」状態は、人間が承認ボタン担当者として機能するための必要条件である。

すなわち、これらが満たされていない環境はAI-Native Companyではない。

---

## 2. 問題設定（Problem Statement）

### 2.1 解決すべき課題

AI-Native Companyを物理的に成立させる上で、以下の課題が存在する。

| 課題 | 内容 | AI-Native的影響 |
|------|------|----------------|
| **C1. 物理基盤の人間依存** | 人間のデバイスが閉じるとAIも停止する | AI比率90%が達成できない |
| **C2. 遠隔監督経路の欠如** | 出先からAIの状況を確認できない | 承認ボタン機能が果たせない |
| **C3. データの分散** | 複数マシン・複数ツールでデータがバラバラ | AIが横断判断できない |
| **C4. エージェント連携設計の不在** | 複数AIが協調する基盤がない | チームとして機能しない |
| **C5. ナレッジ消失リスク** | 個人知識のバックアップが未整備 | 組織記憶が脆弱 |

### 2.2 研究課題

本稿は以下の研究課題（RQ）に答えることを目的とする。

- **RQ1**: AIが人間の物理的制約を超えて稼働するための物理層はどう設計すべきか

- **RQ2**: 複数のAIエージェント・ツール・データソースを矛盾なく統合するハーネス層はどう設計すべきか

- **RQ3**: 既存業務を破壊せずに移行するための戦略は何か

---

## 3. 理論的背景（Theoretical Background）

### 3.1 AI-Native Companyの定義との接続

AI-Native Company（AIカンパニー）は次のように定義された。

> AIエージェント集合体が、意思決定の生成・評価・固定・学習を担い、

> 人間は法的責任と最終拒否権のみを保持する組織形態

この定義から、物理基盤に対する要請が導かれる。

| AIカンパニーの特性 | 物理基盤への要請 |
|------------------|----------------|
| AIが意思決定を生成 | AIの稼働環境が常時利用可能 |
| AIが評価を担う | AIが必要なデータに常時アクセス可能 |
| AIが固定（記録）を担う | データの永続化と共有が保証される |
| AIが学習する | 過去のコンテキストが保持される |
| 人間が拒否権を保持 | 人間が承認可否を判断できる経路 |

### 3.2 「効果性 > 効率性」原則の適用

「効果性優先」原則は、本設計にも適用される。

ツールやインフラ自体への過剰投資は、AIの進化速度を考えると6ヶ月で陳腐化する。したがって本設計は、**「何を実現すべきか」を先に固定**し、それを実現する具体ツールは差し替え可能とする。

具体的には、本稿は「常時稼働性・遠隔監督性・データ統合性」という効果を定義し、それを実現するための現時点でのツール選定（Claude Code, OpenClaw等）は附属物として扱う。

### 3.3 Human-in-the-Loopの逆転

従来の組織では、AIは人間の業務を補助する位置にあった。AI-Native Companyではこれが逆転する。

\`\`\`
[従来型]                          [AI-Native型]

人間 → 判断 → AIに依頼            AI → 判断 → 人間に承認依頼

人間 → 実行 → AIが補助            AI → 実行 → 人間が拒否権行使可

人間が常時起動                    AIが常時起動

AIは人間が起こす                  人間はAIが必要時に呼ぶ
\`\`\`

本設計は、右側の構図を物理的に成立させるためのものである。

---

## 4. 設計原則（Design Principles）

本設計を貫く7つの原則を以下に提示する。

### 原則1. AIが主役、人間は承認者

物理基盤も、人間ではなくAIを中心に設計する。常時稼働マシンをハブとし、人間のデバイスは「監督端末」として位置づける。

### 原則2. 真実の源（Source of Truth）は1つ

同じ情報を複数のシステムに持たない。各情報につき、書き込み可能な唯一の場所を定める。

### 原則3. 役割で分離する

各システム（Notion／Git／Supabase等）に得意分野を担当させ、機能の重複を避ける。

### 原則4. 全部を共有しようとしない

全データを全マシンで同期するのではなく、共有すべきもの・しないものを分ける。

### 原則5. 動いているものを壊さない

既存運用を尊重し、段階的に新設計へ移行する。一括置き換えは禁忌とする。

### 原則6. 最終形を意識し、捨てるコードを書かない

暫定的な手段（例: Windows）も、最終形（オールMac）への移行コストを最小化するように設計する。

### 原則7. 効果性を効率性より優先する

何を実現すべきかを先に固定し、ツール選定は変更可能な実装として扱う。

---

## 5. アーキテクチャ：4層モデル（Four-Layer Model）

### 5.1 概念図

情報を性質に応じて4つの層に分離する。

\`\`\`
┌─────────────────────────────────────────────────────┐
│ Layer 4: セッション（会話履歴）                        │
│   性質: マシン固有・短期                               │
│   方針: 共有しない（マシン別に独立）                    │
├─────────────────────────────────────────────────────┤
│ Layer 3: メモリ・コンテキスト                          │
│   性質: 中長期・テキスト中心                            │
│   方針: Git同期 + Notion（人間UI）+ Supabase（動的）  │
├─────────────────────────────────────────────────────┤
│ Layer 2: ハーネス（settings/agents/skills/commands）   │
│   性質: AI人格・スキル定義                              │
│   方針: Git同期(dotfiles方式)                          │
├─────────────────────────────────────────────────────┤
│ Layer 1: プロジェクトコード・データ                     │
│   性質: 実行素材                                       │
│   方針: Git（既存運用）+ Supabase                      │
└─────────────────────────────────────────────────────┘
\`\`\`

### 5.2 各層の役割

#### Layer 1：プロジェクトコード・データ

AIが実行する素材。GitHubで既に管理されている。VibeRushの場合、Lovableが第一の編集者として既に稼働している。

#### Layer 2：ハーネス

AIエージェントの人格・スキル・指示を定義する層。これを共有することで、Mac/Windows/将来のMacが**同じ春本（AI-CEO）**を呼び出せる。

#### Layer 3：メモリ・コンテキスト

過去の意思決定、運用ルール、背景情報。AI-Native Companyにおける「組織記憶」。

#### Layer 4：セッション

会話履歴。これは敢えて共有しない。マシン別に役割を分けることで、**Mac＝開発セッション／据置機＝運用セッション**として論理的に分離する。

---

## 6. 物理層アーキテクチャ（Physical Architecture）

### 6.1 暫定形（2026年4月時点）

\`\`\`
[MacBook Air（持ち歩き）]    [Windows PC（自宅常時稼働）]
   ↓ 開発・編集                    ↑ 運用・実行
   └─ git push / pull ─→ GitHub ─→ git pull
                                        ↓
                                  Claude Code (WSL2)
                                  + OpenClaw MCP Server
                                        ↑
                              スマホ ← Remote Control
\`\`\`

### 6.2 最終形（オールMac）

\`\`\`
[MacBook Air]            [Mac mini/Studio（自宅常時稼働）]
   ↓                          ↑
   └─ GitHub ────────────────┘
                              ↓
                        全AIエージェント稼働
                              ↑
                        スマホ Remote Control
\`\`\`

### 6.3 設計判断

| 判断 | 理由 |
|------|------|
| Macをハブにしない | 持ち歩く＝閉じる→AIが止まる |
| Windows暫定はWSL2で運用 | 将来Mac移行時の捨てコード回避 |
| Windowsネイティブ対応は作らない | 投資が無駄になる |
| スマホはRemote Controlで接続 | 同一アカウントで継続性確保 |

---

## 7. データ層の役割分担（Data Layer Separation）

### 7.1 5システムマトリクス

| システム | 役割 | 編集主体 | AI-Native的役割 |
|---------|------|---------|----------------|
| **Notion** | 運用UI・ダッシュボード | 人間（メイン）+ AI（書込） | 承認ボタン担当者の窓口 |
| **Obsidian Vault** | 思考・知識・コンテキスト | 人間+AI（橋渡し） | AIに渡す上位文脈 |
| **Git/.ai/** | プロジェクト内AI指示・メモリ | AI | AI実行のベース |
| **Supabase** | 本番データ・実行ログ | 機械 | AIの作業履歴 |
| **Sheets** | 原稿・統計集計 | 人間+機械 | 人間との協業の場 |

### 7.2 棲み分けルール

| 情報の種類 | 置く場所 | 理由 |
|-----------|---------|------|
| 投稿スケジュール | Notion | 人間が編集・確認しやすい |
| 投稿原稿 | Sheets→Notion移行候補 | 現状維持、将来統合 |
| AIへの指示・プロンプト | Git/.ai/ | バージョン管理が必要 |
| AIのメモリ | Git/.ai/memory/ | テキストでGit管理に向く |
| 個人の思考・知識 | Obsidian Vault | 人間が書きたい時に書く |
| 実行ログ・統計 | Supabase | 機械が大量に書き込む |
| 経営判断・週次MTG・進捗 | Notion | 承認ボタン担当者の窓口 |
| AIの実行結果サマリー | Notion | モバイルから確認可能 |

### 7.3 Notionの位置づけ

AI-Native Companyにおいて、Notionは**「人間が承認するための統合ダッシュボード」**として機能する。

人間は承認ボタンを押す役である以上、AIの作業状況を「見るための場所」が不可欠である。Notionはモバイル対応が強く、出先からの監督に最適である。

#### Notionの3つの役割

1. **ManagementOS（経営OS）**

   Mission → Action → Want_to → Do の4階層で、AI-CEO春本が立案 → 人間が承認 → AIが実行 → Notionで進捗可視化、というサイクルを回す。

2. **SNS投稿パイプラインの企画・管理**

   投稿カレンダー、コンテンツ企画DB、実績ダッシュボード。

3. **AIの実行結果レポート**

   AIが処理結果を書き込み、人間はNotionを見るだけで状況把握できる。

---

## 8. ハーネス層の統合（Harness Layer Integration）

### 8.1 クロスツール対応

複数のAI開発ツール（Claude Code、Codex CLI等）に同一の人格・スキル・指示を配布する仕組みを設計する。

| 項目 | Claude Code | Codex CLI |
|------|------------|-----------|
| 設定ディレクトリ | \`~/.claude/\` | \`~/.codex/\` |
| 設定形式 | JSON | TOML |
| グローバル指示 | \`CLAUDE.md\` | \`AGENTS.md\` |
| サブエージェント | \`agents/*.md\` | （概念なし）|
| プロンプト | \`commands/*.md\` | \`prompts/*.md\` |

### 8.2 dotfilesリポジトリ構成

\`\`\`
ai-harness/
├─ shared/          # 両ツール共通（指示・プロンプト・MCP定義）
├─ claude/          # Claude Code固有
├─ codex/           # Codex固有
└─ scripts/install.sh
\`\`\`

### 8.3 プロジェクト統合

各プロジェクト直下に \`.ai/\` ディレクトリを設置する。

\`\`\`
project/
├─ CLAUDE.md
├─ AGENTS.md → CLAUDE.md      # シンボリックリンク
├─ .ai/
│  ├─ memory/                  # AIのメモリ
│  ├─ prompts/                 # プロンプト
│  ├─ context/                 # 背景情報
│  └─ integrations/            # Notion接続情報・スキーマ定義
├─ .claude/
├─ .codex/
└─ src/, scripts/, ...
\`\`\`

\`AGENTS.md → CLAUDE.md\` のシンボリックリンクにより、Claude/Codexの両方が同一の指示を参照する。

---

## 9. 段階的移行戦略（Phased Migration Strategy）

### 9.1 Notion統合の段階

\`\`\`
【Phase 1：今すぐ】関与させない（既存運用維持）
  ├─ SNSパイプライン: Sheets+Git+Supabaseで動いてるまま
  └─ Notion: ManagementOSとして独立稼働
  接点: なし
       ↓（数ヶ月後）
【Phase 2：中期】薄く接続
  ├─ AIがNotionに「実行結果」だけ書き込む
  ├─ 例: 週次のSNS実績サマリー
  └─ 出先スマホでNotionを見れば状況分かる
  接点: 一方向（Git → Notion）
       ↓（さらに後）
【Phase 3：最終】Notion主導に統合
  ├─ Notion = 企画・管理の真実の源（SoT）
  ├─ Git = 実行エンジン
  ├─ AIがNotion DBを読んで自動実行
  └─ 人間はNotionで承認ボタンを押すだけ
  接点: 双方向
\`\`\`

### 9.2 全体の実装ステップ

1. **Step 1**: ハーネスのGit化（\`ai-harness\` リポジトリ作成）

2. **Step 2**: 既存プロジェクトに \`.ai/\` 構造導入

3. **Step 3**: 常時稼働マシン環境構築（WSL2 + Claude Code + OpenClaw）

4. **Step 4**: Supabase状態テーブル設計（任意）

5. **Step 5**: Notion段階統合（Phase 1 → 2 → 3）

---

## 10. 制約と注意点（Constraints & Cautions）

### 10.1 技術的禁忌

| 禁忌 | 理由 |
|------|------|
| \`.obsidian/workspace.json\` をGit管理 | デバイス固有で常時競合 |
| Vault・Notionに認証情報をベタ書き | 漏洩リスク |
| 巨大バイナリのGit add | リポジトリ肥大化、LFS必須 |
| Mac/Windows同時にObsidian起動 | コンフリクト発生 |
| 同じ情報を3箇所以上に持つ | 必ず古い情報が残る |
| 動いているNotionワークフローの一括移行 | 業務停止リスク |

### 10.2 必須事項

| 必須事項 | 目的 |
|---------|------|
| Context VaultはPrivate Repository | 個人情報保護 |
| \`AGENTS.md → CLAUDE.md\` リンク | Claude/Codex両対応 |
| CODEOWNERSによる境界明示 | Lovableとの共存 |
| 機密情報の \`.gitignore\` 除外 | 漏洩防止 |
| Notion APIキーの \`.env\` 管理 | 認証情報保護 |
| 各情報のSoTを1箇所に決定 | 一貫性確保 |
| モバイルからの確認経路 | AI-Native必須要件 |

### 10.3 AI-Native Company的注意点

| 注意点 | 対策 |
|------|------|
| 人間が判断に介入しすぎる | 「承認ボタンのみ」原則の徹底 |
| AIが止まると業務が止まる | 常時稼働マシン+冗長化 |
| AI同士の連携が機能しない | MCP・共通データレイヤーで疎結合に |
| 進捗が見えなくなる | Notionダッシュボードで可視化必須 |
| 「効率化ツール」と誤解する | 組織モデル実証であり、便利グッズではないと認識 |

---

## 11. 考察（Discussion）

### 11.1 本設計が示すもの

本設計は、単なる作業環境の改善ではない。「AIが主役、人間は承認者」という組織モデルを物理的に成立させる土台である。

「Macをカバンに入れたままAIが仕事をしてくれる」という体験は、便利機能ではなく、**人間とAIの関係を逆転させた組織モデルが現実に動いている瞬間**である。

そして、その瞬間を**スマホで確認できる**ことは、人間が「承認ボタン担当者」として機能する条件であり、AI-Native Companyの定義そのものである。

### 11.2 Building in Publicとの関連

本設計の構築過程は、AI-Native Companyの実証プロセスそのものであり、「公開トラック」の対象となる。

すなわち、ハーネス・インフラの構築過程をYouTube等で公開することは、AI-Native Companyという組織モデルの**実演**となる。

### 11.3 エグジット戦略との接続

本設計の成功は、2028年4月のエグジット（資産価値1,500億円以上）の根拠資料となる。

「AI-Native Companyが机上の空論ではなく、毎日の業務として動いている」ことの証明は、買収候補先（OpenAI / xAI / Meta）に対する最強のセールス・ピッチである。

---

## 12. 結論と今後の課題（Conclusion & Future Work）

### 12.1 結論

本稿は、AI-Native Companyを物理的に成立させるためのハーネス・インフラ設計を提示した。

中核的な貢献は以下である。

1. **4層モデルの提示** — コード／ハーネス／メモリ／セッションの階層分離

2. **5システムマトリクスの定義** — Notion／Vault／Git／Supabase／Sheetsの役割分担

3. **段階的移行戦略の確立** — 既存運用を破壊しない移行プロセス

4. **AI-Native Company定義との接続** — 物理層が組織モデルそのものであることの論証

### 12.2 今後の課題

| 課題 | 内容 |
|------|------|
| 常時稼働マシンの最終選定 | Mac mini/Studio導入時期の判断 |
| OpenClawのmacOS対応評価 | 暫定→最終形への移行可否 |
| Supabase migrations化 | Lovable運用との両立方法 |
| Notion as SoT への昇格時期 | パイプライン主導権の移譲タイミング |
| 自動バックアップの整備 | 日次スナップショット運用 |

### 12.3 結語

AI-Native Companyは、単に「AIをたくさん使う組織」ではない。**人間とAIの関係を構造的に逆転させた、新しい組織形態**である。

この逆転を物理的に成立させるのがハーネス・インフラであり、本設計はその第一歩である。2028年4月の目標達成に向けて、本設計を実装し、Building in Publicで実証することが次の段階となる。

---

## 付録A：用語集（社会人一年生向け）

| 用語 | 説明 |
|------|------|
| **AI-Native Company** | AIが90%以上、人間が10%以下の割合でビジネス活動を行う組織 |
| **Human-in-the-Loopの逆転** | AIが主、人間が例外として介入する設計 |
| **承認ボタン担当者** | AI-Native Companyにおける人間の主要役割 |
| **ハーネス** | AIエージェントの人格・スキル・指示を定義する設定群 |
| **真実の源（Source of Truth, SoT）** | 同じ情報について書き換え可能な唯一の場所 |
| **Git** | コードや文書のバージョン管理システム |
| **GitHub** | Gitリポジトリのクラウドホスティング |
| **MCP（Model Context Protocol）** | AIと外部ツールをつなぐ共通規格 |
| **WSL2** | Windows上でLinuxを動かす仕組み |
| **シンボリックリンク** | ファイルへのショートカットの強力版 |
| **dotfiles** | 設定ファイル群を共有するためのリポジトリ慣習 |
| **Remote Control（Claude Code）** | スマホやブラウザから自分PCのClaude Codeセッションを操作する公式機能 |

---

**本稿は AI-Native Company の実装パッケージの一部として、Building in Public（公開）と仮特許出願（保護）の対象となる。**

ライセンス: 本稿の引用は出典明記の上、自由に行ってよい。商用利用については AI-COMPANY-Lab に問い合わせること。
`;

const HarnessInfrastructure = () => {
  useEffect(() => {
    document.title = 'AI-Native Companyのためのハーネス・インフラ設計';

    const setMeta = (selector: string, attr: string, name: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta(
      'meta[name="description"]',
      'name',
      'description',
      'AI-Native Company（AIが90%以上のビジネス活動を担う組織形態）を物理的・技術的に成立させる基礎インフラ設計。4層モデル + 5システムマトリクス。'
    );
    setMeta(
      'meta[property="og:title"]',
      'property',
      'og:title',
      'AI-Native Companyのためのハーネス・インフラ設計 ― 人間の物理的制約から解放された組織OSの構築原理'
    );
    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      'AI-Native Company（AIが90%以上のビジネス活動を担う組織形態）を物理的・技術的に成立させる基礎インフラ設計。4層モデル + 5システムマトリクス。'
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/ai-native-company/harness-infrastructure/`;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 leading-tight" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 leading-tight" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
              h4: ({ node, ...props }) => <h4 className="text-lg md:text-xl font-semibold mt-6 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-border pl-4 my-4 italic text-muted-foreground" {...props} />
              ),
              hr: () => <hr className="my-8 border-border" />,
              a: ({ node, ...props }) => (
                <a
                  className="text-primary underline underline-offset-2 hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              table: ({ node, ...props }) => (
                <div className="my-6 overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
              th: ({ node, ...props }) => <th className="border border-border px-3 py-2 text-left font-semibold" {...props} />,
              td: ({ node, ...props }) => <td className="border border-border px-3 py-2 align-top" {...props} />,
              code: ({ node, className, children, ...props }: any) => {
                const isBlock = className?.includes('language-') || (typeof children === 'string' && children.includes('\n'));
                if (isBlock) {
                  return (
                    <code className="block font-mono text-sm whitespace-pre" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <pre className="my-6 p-4 bg-muted rounded-md overflow-x-auto text-sm leading-relaxed" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default HarnessInfrastructure;
