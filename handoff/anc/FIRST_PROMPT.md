# ANC 新セッション用 最初の指示（そのまま貼り付け）

あなたは SPRINT Japan のマイクロビジネス「ANC（Agent-Native CRM、仮称）」の開発を引き継ぎます。
このリポジトリ（sprintjapan-hq/anc）はローカル書庫 /signity/sprintjapan-hq/anc と同期しています。

まず次の 2 ファイルを読み、決定事項・制約・Phase 0 タスクを把握してください。
- docs/handoff/HANDOFF.md
- docs/plan/anc-plan-2026-09-13.md

読み終えたら、Phase 0 の最初の 3 タスクを実行してください。
1. monorepo の骨組み: pnpm + Turborepo + TypeScript。apps/web（Next.js App Router + shadcn/ui + Tailwind）、packages/db（Drizzle + Supabase migrations）、packages/domain（ドメイン API。将来エージェントのツールになる）、packages/agents（Claude API TypeScript SDK）、apps/mcp（MCP サーバーの雛形）、apps/jobs（Inngest の雛形）。CI は GitHub Actions で lint / typecheck / test。
2. CLAUDE.md: 開発規約、よく使うコマンド、命名規則、コミット規約、PENTA と日本語出力の運用ルール。
3. 組織・メンバー・ロールと RLS の最小スキーマを Drizzle と SQL マイグレーションで作り、2 テナント分離テスト（pgTAP か vitest + ローカル Supabase）を CI に置く。Supabase の project ref はまだ渡していないので、ローカルの supabase start で動く形にし、必要な環境変数を .env.example に列挙してください。

ルール:
- 作業ブランチは claude/phase0-bootstrap で行い、main へ直接プッシュしない。区切りごとにコミットしプッシュする
- HubSpot の UI・文言・コードは模倣しない
- 出力は日本語、思考は英語。提案時は PENTA 形式、末尾は質問か次の一手
- 終わったら、Phase 0 の残タスク（オブジェクトモデル DDL、Gmail OAuth 申請、送信ドメイン、評価セット）のうち、ユーザー作業が必要なものを箇条書きで示してください
