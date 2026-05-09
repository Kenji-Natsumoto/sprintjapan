import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const content = `# AI-Nativeスタートアップ ツール連携設計ガイド
## ― 1-3人チームのための実装アーキテクチャ ―

Version 0.1

Date: 2026-04-11

Author: AI-COMPANY-Lab

---

## 要旨

本ドキュメントは、AI-Nativeスタートアップを実際に運用するための具体的なツール連携設計を提供する。Claude Code、Slack、GitHub、n8n等のツールを統合し、1-3人のチームがAIエージェント群と協働するための実装ガイドである。

---

## 1. システムアーキテクチャ全体図

\`\`\`
┌─────────────────────────────────────────────────────────────────────────┐
│                         Human Interface Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Slack     │  │  Terminal   │  │   Web UI    │  │   Mobile    │    │
│  │  (Primary)  │  │(Claude Code)│  │  (Dashboard)│  │   (Alerts)  │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼───────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Orchestration Layer (Claude)                        │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    Claude Opus / Sonnet                          │    │
│  │              (メインオーケストレーター + MCP Client)              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│          │              │              │              │                  │
│          ▼              ▼              ▼              ▼                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐            │
│  │  AI-CFO   │  │  AI-CMO   │  │  AI-CTO   │  │  AI-COO   │            │
│  │ (Finance) │  │(Marketing)│  │  (Tech)   │  │   (Ops)   │            │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         MCP Server Layer                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │  Slack   │ │  GitHub  │ │  Notion  │ │ Supabase │ │ Calendar │     │
│  │   MCP    │ │   MCP    │ │   MCP    │ │   MCP    │ │   MCP    │     │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘     │
└───────┼────────────┼────────────┼────────────┼────────────┼────────────┘
        │            │            │            │            │
        ▼            ▼            ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         External Services                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │  Slack   │ │  GitHub  │ │  Notion  │ │ Supabase │ │  Google  │     │
│  │Workspace │ │   Repos  │ │   Wiki   │ │    DB    │ │ Calendar │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Automation Layer (n8n)                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │   Scheduled Jobs / Event Triggers / Webhook Handlers             │    │
│  │   - Daily Summary Generation                                     │    │
│  │   - Alert Monitoring                                             │    │
│  │   - Data Sync                                                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      World Model Layer                                   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │
│  │Company Context│  │ Operational   │  │   Customer    │               │
│  │   (Notion)    │  │State (Supabase│  │ Intelligence  │               │
│  │               │  │   + GitHub)   │  │  (Analytics)  │               │
│  └───────────────┘  └───────────────┘  └───────────────┘               │
└─────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## 2. コアツールスタック

### 2.1 必須ツール（Tier 1）

| ツール | 役割 | 月額コスト目安 |
|--------|------|---------------|
| **Claude Max** | オーケストレーター + 全AIエージェント | $100 |
| **Slack Pro** | コミュニケーションハブ | $8.75/人 |
| **GitHub Pro** | コード管理 + AI署名ログ | $4/人 |
| **Notion** | ワールドモデル（知識ベース） | $10/人 |

**1人チームの月額**: 約 $125

### 2.2 推奨ツール（Tier 2）

| ツール | 役割 | 月額コスト目安 |
|--------|------|---------------|
| **n8n Cloud** | 自動化ワークフロー | $20〜 |
| **Supabase** | データベース + Auth | $25〜 |
| **Linear** | タスク管理 | $8/人 |
| **Vercel** | デプロイ | $20〜 |

### 2.3 オプションツール（Tier 3）

| ツール | 役割 | 用途 |
|--------|------|------|
| **Composio** | MCP統合管理 | 複数MCPの一元管理 |
| **LangGraph** | 複雑なエージェントロジック | 高度な推論ワークフロー |
| **Posthog** | プロダクト分析 | 顧客行動理解 |

---

## 3. MCP（Model Context Protocol）統合

### 3.1 MCP概要

MCPは、Claude等のAIモデルが外部ツールに安全にアクセスするためのプロトコル。これにより、Claudeが直接Slack、GitHub、Notion等を操作できる。

### 3.2 MCP設定ファイル

\`~/.claude/settings.json\` に以下を設定：

\`\`\`json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "\${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "\${SLACK_TEAM_ID}"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "\${GITHUB_TOKEN}"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-notion"],
      "env": {
        "NOTION_TOKEN": "\${NOTION_TOKEN}"
      }
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "\${SUPABASE_URL}",
        "SUPABASE_ANON_KEY": "\${SUPABASE_ANON_KEY}"
      }
    }
  }
}
\`\`\`

### 3.3 各MCPの機能

| MCP | 主要機能 |
|-----|---------|
| **Slack MCP** | メッセージ送受信、チャンネル管理、スレッド操作 |
| **GitHub MCP** | Issue/PR作成・管理、コードプッシュ、Actions実行 |
| **Notion MCP** | ページ作成・編集、データベース操作、検索 |
| **Supabase MCP** | CRUD操作、リアルタイム購読、認証管理 |

---

## 4. Slack統合設計

### 4.1 チャンネル設計

\`\`\`
#general           - 人間同士のコミュニケーション
#ai-ops            - AIエージェントからの通知・レポート
#ai-decisions      - 意思決定ログ（AI署名付き）
#ai-alerts         - 緊急アラート（要人間対応）
#dev-feed          - GitHub連携（PR, Issue通知）
#daily-standup     - 毎日の自動サマリー
\`\`\`

### 4.2 Slack → Claude Code 連携

Slackでメンションされたタスクを、Claude Codeが自動的に処理する。

**ワークフロー例**:

\`\`\`
[Slack: #dev-feed]
@claude このバグを修正して: ログイン画面で500エラー

    ↓ Claude Code起動

[Claude Code]
1. リポジトリをクローン
2. エラーログを分析
3. 修正コードを生成
4. PRを作成

    ↓ 完了通知

[Slack: #dev-feed]
PR #123 を作成しました: https://github.com/...
修正内容: 認証トークンのnullチェックを追加
\`\`\`

### 4.3 Slack Bot設定

\`\`\`yaml
# slack-bot-config.yaml
app_name: "AI-Company-Bot"
scopes:
  - channels:history
  - channels:read
  - chat:write
  - files:read
  - reactions:read
  - reactions:write
  - users:read

event_subscriptions:
  - message.channels
  - app_mention
  - reaction_added

slash_commands:
  - /ai-status     # システム状態確認
  - /ai-decide     # 意思決定記録
  - /ai-report     # レポート生成
\`\`\`

---

## 5. GitHub統合設計

### 5.1 リポジトリ構成

\`\`\`
org/
├── product/              # メインプロダクト
│   ├── CLAUDE.md         # AIコンテキスト
│   ├── .github/
│   │   └── workflows/    # CI/CD
│   └── src/
│
├── world-model/          # ワールドモデル（ドキュメント）
│   ├── company-context/
│   ├── decisions/        # AI署名付き意思決定ログ
│   └── playbooks/        # 運用手順書
│
└── automation/           # n8nワークフロー定義
    └── workflows/
\`\`\`

### 5.2 CLAUDE.md テンプレート

\`\`\`markdown
# CLAUDE.md

## Project Context
- **Name**: [プロジェクト名]
- **Purpose**: [目的]
- **Tech Stack**: [技術スタック]
- **Current Phase**: [MVP / Beta / Production]

## Team Structure
- **Human Operators**: [名前、役割]
- **AI Agents**:
  - Orchestrator: Claude Opus
  - AI-CTO: Technical decisions
  - AI-CFO: Budget monitoring

## Decision Authority Matrix

| Decision Type | Authority Level | Approval Required |
|--------------|-----------------|-------------------|
| Code formatting | L1 (Auto) | No |
| Bug fixes | L2 (Notify) | No |
| New features | L3 (Approve) | Yes |
| Architecture changes | L4 (Human) | Always |

## Current Priorities (Updated: YYYY-MM-DD)
1. [最優先タスク]
2. [次の優先タスク]
3. [バックログ]

## Constraints
- **Budget**: [月額上限]
- **Timeline**: [デッドライン]
- **Technical**: [技術的制約]

## Communication Preferences
- **Urgent**: Slack #ai-alerts
- **Daily Updates**: Slack #daily-standup
- **Decisions**: GitHub decisions/ + Slack #ai-decisions
\`\`\`

### 5.3 AI署名ログ形式

\`decisions/2026/04/DEC-2026-0411-001.md\`:

\`\`\`markdown
# Decision: DEC-2026-0411-001

## Metadata
- **Timestamp**: 2026-04-11T14:30:00Z
- **Authority Level**: L3 (Approved)
- **Status**: Confirmed

## Decision
新規プライシングモデル（フリーミアム + Pro $29/月）を導入する

## Context
### Problem Statement
現在の一律課金モデルでは、小規模ユーザーの獲得が困難

### Alternatives Considered
1. **フリーミアム + Pro $29**: 採用
2. **フリーミアム + Pro $19**: 収益性懸念
3. **従量課金**: 実装複雑性

### Risk Assessment
- **Risk Level**: Medium
- **Mitigation**: 3ヶ月後に価格見直し判定

## AI Analysis
{
  "agent": "AI-CFO",
  "confidence": 0.85,
  "projected_impact": {
    "user_growth": "+40%",
    "mrr_change": "+25%",
    "churn_risk": "low"
  }
}

## Approval
- **Approved By**: @founder
- **Approval Time**: 2026-04-11T15:00:00Z

## AI Signature
-----BEGIN AI SIGNATURE-----
Agent: AI-CFO v2.1
Model: claude-opus-4-6
Context Hash: sha256:7d8f3a2b...
Decision Hash: sha256:9e1c4d5f...
Timestamp: 2026-04-11T14:30:00Z
-----END AI SIGNATURE-----
\`\`\`

---

## 6. n8n自動化ワークフロー

### 6.1 デイリーサマリー生成

\`\`\`json
{
  "name": "Daily AI Summary",
  "trigger": {
    "type": "cron",
    "schedule": "0 9 * * 1-5"
  },
  "nodes": [
    {
      "name": "Fetch GitHub Activity",
      "type": "github",
      "action": "get_commits_and_prs",
      "params": {
        "since": "{{ $today.minus(1, 'day') }}"
      }
    },
    {
      "name": "Fetch Slack Messages",
      "type": "slack",
      "action": "get_channel_history",
      "params": {
        "channel": "#ai-ops",
        "since": "{{ $today.minus(1, 'day') }}"
      }
    },
    {
      "name": "Generate Summary",
      "type": "anthropic",
      "action": "chat",
      "params": {
        "model": "claude-sonnet-4-6",
        "prompt": "以下の活動を要約し、今日の優先事項を提案してください"
      }
    },
    {
      "name": "Post to Slack",
      "type": "slack",
      "action": "post_message",
      "params": {
        "channel": "#daily-standup",
        "text": "{{ $node['Generate Summary'].json.content }}"
      }
    }
  ]
}
\`\`\`

### 6.2 アラートモニタリング

\`\`\`json
{
  "name": "Critical Alert Monitor",
  "trigger": {
    "type": "webhook",
    "path": "/alerts"
  },
  "nodes": [
    {
      "name": "Classify Alert",
      "type": "anthropic",
      "action": "chat",
      "params": {
        "model": "claude-haiku-4-5",
        "prompt": "このアラートの重要度を判定: critical / warning / info"
      }
    },
    {
      "name": "Route Alert",
      "type": "switch",
      "conditions": [
        {
          "value": "critical",
          "output": "Urgent Notification"
        },
        {
          "value": "warning",
          "output": "Standard Notification"
        }
      ]
    },
    {
      "name": "Urgent Notification",
      "type": "slack",
      "action": "post_message",
      "params": {
        "channel": "#ai-alerts",
        "text": "<!channel> CRITICAL: {{ $trigger.body.message }}"
      }
    }
  ]
}
\`\`\`

### 6.3 週次レポート生成

\`\`\`json
{
  "name": "Weekly AI Report",
  "trigger": {
    "type": "cron",
    "schedule": "0 18 * * 5"
  },
  "nodes": [
    {
      "name": "Aggregate Week Data",
      "type": "supabase",
      "action": "query",
      "params": {
        "query": "SELECT * FROM metrics WHERE created_at > now() - interval '7 days'"
      }
    },
    {
      "name": "Fetch Decisions",
      "type": "github",
      "action": "get_files",
      "params": {
        "path": "decisions/2026/04/",
        "filter": "*.md"
      }
    },
    {
      "name": "Generate Report",
      "type": "anthropic",
      "action": "chat",
      "params": {
        "model": "claude-opus-4-6",
        "prompt": "週次レポートを生成"
      }
    },
    {
      "name": "Save to Notion",
      "type": "notion",
      "action": "create_page",
      "params": {
        "database_id": "weekly-reports-db",
        "content": "{{ $node['Generate Report'].json.content }}"
      }
    }
  ]
}
\`\`\`

---

## 7. データフロー設計

### 7.1 情報の流れ

\`\`\`
[外部イベント]
     │
     ▼
┌─────────────────┐
│   Event Source  │  Slack message / GitHub event / Webhook / Cron
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   n8n Trigger   │  イベントをキャッチ
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Context Fetch  │  関連データを収集（Notion, Supabase, GitHub）
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Claude Analysis │  状況分析 + 推奨アクション生成
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Authority Check │  権限レベル判定（L1-L4）
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
[L1-L2]    [L3-L4]
 自動実行    人間承認要求
    │         │
    ▼         ▼
┌─────────────────┐
│  Action Execute │  Slack投稿 / GitHub PR / Notion更新
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Log & Notify   │  AI署名 + 通知
└─────────────────┘
\`\`\`

### 7.2 ワールドモデル同期

\`\`\`
[Notion: Company Context]
         │
         │ 変更検知（Webhook）
         ▼
[n8n: Sync Workflow]
         │
         │ 差分抽出
         ▼
[Supabase: context_snapshots]
         │
         │ 最新コンテキスト取得
         ▼
[Claude: System Prompt更新]
\`\`\`

---

## 8. セキュリティ設計

### 8.1 認証・認可

| サービス | 認証方式 | トークン管理 |
|----------|---------|-------------|
| Slack | OAuth 2.0 | 環境変数 |
| GitHub | Personal Access Token | GitHub Secrets |
| Notion | Integration Token | 環境変数 |
| Supabase | Service Role Key | 環境変数 |

### 8.2 権限の最小化

\`\`\`yaml
# 各サービスの推奨権限設定

slack:
  scopes:
    - channels:read      # 読み取りのみ
    - chat:write         # 指定チャンネルのみ
  restrictions:
    - public_channels_only: true
    - allowed_channels: ["ai-ops", "ai-decisions", "ai-alerts"]

github:
  permissions:
    - contents: write    # コード変更
    - pull_requests: write
    - issues: write
  restrictions:
    - allowed_repos: ["product", "world-model"]
    - protected_branches: ["main"]  # 直接プッシュ禁止

notion:
  capabilities:
    - read_content
    - insert_content
    - update_content
  restrictions:
    - allowed_databases: ["decisions", "weekly-reports"]
\`\`\`

### 8.3 監査ログ

すべてのAIアクションをログに記録：

\`\`\`sql
-- Supabase: ai_audit_logs テーブル
CREATE TABLE ai_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ DEFAULT now(),
  agent VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_service VARCHAR(50) NOT NULL,
  target_resource TEXT,
  authority_level VARCHAR(10),
  approved_by VARCHAR(100),
  request_payload JSONB,
  response_summary TEXT,
  success BOOLEAN,
  error_message TEXT
);

-- インデックス
CREATE INDEX idx_audit_timestamp ON ai_audit_logs(timestamp DESC);
CREATE INDEX idx_audit_agent ON ai_audit_logs(agent);
CREATE INDEX idx_audit_action ON ai_audit_logs(action);
\`\`\`

---

## 9. 実装ステップ

### Phase 1: 基盤構築（Week 1-2）

- [ ] Slack Workspace設定 + チャンネル作成
- [ ] GitHub Organization + リポジトリ構成
- [ ] Notion Workspace + データベース作成
- [ ] Claude Max契約 + MCP設定
- [ ] 各サービスのAPI Token取得

### Phase 2: MCP統合（Week 3-4）

- [ ] Slack MCP設定・テスト
- [ ] GitHub MCP設定・テスト
- [ ] Notion MCP設定・テスト
- [ ] CLAUDE.md作成・配置
- [ ] 基本的なコマンド動作確認

### Phase 3: 自動化構築（Week 5-6）

- [ ] n8n Cloud設定
- [ ] デイリーサマリーワークフロー構築
- [ ] アラートモニタリング構築
- [ ] Webhook連携テスト

### Phase 4: 運用開始（Week 7-8）

- [ ] AI署名フォーマット確定
- [ ] 意思決定ログ運用開始
- [ ] 週次レポート自動生成開始
- [ ] 監査ログ確認・調整

### Phase 5: 最適化（継続）

- [ ] エスカレーション閾値の調整
- [ ] 自動化範囲の拡大
- [ ] パフォーマンス監視・改善

---

## 10. トラブルシューティング

### 10.1 よくある問題

| 問題 | 原因 | 解決策 |
|------|------|--------|
| MCPがタイムアウト | トークン期限切れ | トークン再発行 |
| Slack投稿失敗 | チャンネル権限不足 | Bot再招待 |
| GitHub PRエラー | ブランチ保護 | 保護ルール確認 |
| n8nワークフロー停止 | クレジット不足 | プラン確認 |

### 10.2 デバッグコマンド

\`\`\`bash
# MCP接続テスト
claude mcp test slack
claude mcp test github
claude mcp test notion

# ログ確認
claude logs --tail 100

# 設定確認
claude config show
\`\`\`

---

## 11. コスト最適化

### 11.1 月額コスト試算（1人チーム）

| サービス | プラン | 月額 |
|----------|--------|------|
| Claude Max | - | $100 |
| Slack Pro | 1人 | $9 |
| GitHub Pro | 1人 | $4 |
| Notion Plus | 1人 | $10 |
| n8n Starter | - | $20 |
| Supabase Pro | - | $25 |
| **合計** | - | **$168** |

### 11.2 コスト削減のヒント

1. **Claude使用量の最適化**: Haiku（安価）とOpus（高性能）の使い分け
2. **n8n Self-host**: 技術力があればセルフホストで無料
3. **Supabase Free Tier**: 初期はFree Tierで十分
4. **年間契約**: 多くのサービスで20%程度の割引

---

## 12. 次のステップ

本ガイドに基づいて実装を進めた後、以下を検討：

1. **カスタムエージェント開発**: LangGraphによる高度な推論ロジック
2. **マルチモーダル対応**: 画像・音声入力の統合
3. **外部API連携拡大**: 会計ソフト、CRM等との統合
4. **チーム拡大対応**: 2-3人体制への移行プロトコル

---

## 参考リンク

- Claude Code MCP Documentation: https://code.claude.com/docs/en/mcp
- Slack MCP Server: https://github.com/slackapi/slack-mcp-plugin
- n8n AI Agent Integrations: https://n8n.io/integrations/agent/
- Composio MCP Management: https://composio.dev/

---

報告書終了
`;

const ToolIntegrationGuide = () => {
  useEffect(() => {
    document.title = 'AI-Nativeスタートアップ ツール連携設計ガイド ― 1-3人チームのための実装アーキテクチャ';

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta(
      'meta[name="description"]',
      'name',
      'description',
      'Claude Code・Slack・GitHub・n8n等を統合し、1-3人のチームがAIエージェント群と協働するための実装アーキテクチャ。MCP統合・自動化ワークフロー・セキュリティ設計を網羅。'
    );
    setMeta(
      'meta[property="og:title"]',
      'property',
      'og:title',
      'AI-Nativeスタートアップ ツール連携設計ガイド ― 1-3人チームのための実装アーキテクチャ'
    );
    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      'Claude Code・Slack・GitHub・n8n等を統合し、1-3人のチームがAIエージェント群と協働するための実装アーキテクチャ。MCP統合・自動化ワークフロー・セキュリティ設計を網羅。'
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/ai-native-company/tool-integration-guide/`;
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
              a: ({ node, href, ...props }) => {
                const isInternal = href?.startsWith('/');
                return (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                    {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    {...props}
                  />
                );
              },
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              em: ({ node, ...props }) => <em className="italic" {...props} />,
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
          <div className="mt-12 pt-6 border-t border-border">
            <a
              href="/ai-native-company/"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              ← 前のページに戻る
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ToolIntegrationGuide;
