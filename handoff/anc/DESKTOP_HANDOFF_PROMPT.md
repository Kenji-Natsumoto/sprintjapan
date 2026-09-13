# ANC（Agent-Native CRM）引き継ぎ: 環境構築から Phase 0 着手まで

あなたは SPRINT Japan のマイクロビジネス「ANC（Agent-Native CRM、仮称）」の開発を引き継ぎます。前のリモートセッションで構想プランと引き継ぎ資料を作成済みです。このセッションは私の Mac 上で動いています。私はターミナルを使わないので、必要なコマンドはすべてあなたが実行してください。

## 固定値
- GitHub 組織: sprintjapan-hq / リポ名: anc（private）
- ローカル書庫: /signity/sprintjapan-hq/anc
- 引き継ぎ資料の取得元: https://github.com/Kenji-Natsumoto/sprintjapan のブランチ claude/hubspot-clone-ai-agent-m8t273
  - .lovable/plan/agent-native-crm構想-2026-09-13.md → docs/plan/anc-plan-2026-09-13.md
  - handoff/anc/HANDOFF.md → docs/handoff/HANDOFF.md
  - handoff/anc/FIRST_PROMPT.md → docs/handoff/FIRST_PROMPT.md
- 構想プラン（HTML）: https://claude.ai/code/artifact/fd43d8e6-2135-4d79-8234-1a136c018fe2

## 手順
1. 前提確認: git の有無、GitHub への認証（git の credential helper または gh）が通るかを確認して報告する。
2. ローカル書庫の場所を確定: /signity が存在しない、または作成できない場合（macOS はルート直下に作れない）は、実際のパス（例: ~/signity/sprintjapan-hq/anc、/Volumes/signity/...）を私に確認してから進める。
3. リポ作成: gh が使えれば `gh repo create sprintjapan-hq/anc --private` を実行。使えなければ、私にブラウザで作成してもらう（https://github.com/organizations/sprintjapan-hq/repositories/new で名前 anc、Private、README なし）。作成完了の返事を待ってから次へ進む。
4. クローン: 確定したローカル書庫のパスに sprintjapan-hq/anc をクローンする（空リポの警告は無視）。既にディレクトリがあれば再利用する。
5. 資料取り込み: 取得元ブランチを一時ディレクトリに浅くクローンし、上記 3 ファイルをコピーする。README.md を作成し、main にコミットしてプッシュする。
6. 読む: docs/handoff/HANDOFF.md と docs/plan/anc-plan-2026-09-13.md を読み、決定事項・制約・Phase 0 タスクを把握して要点を報告する。
7. Phase 0 着手: ブランチ claude/phase0-bootstrap を切り、docs/handoff/FIRST_PROMPT.md に書かれた最初の 3 タスク（monorepo 骨組み、CLAUDE.md、組織・ロール・RLS 最小スキーマと 2 テナント分離テスト）を実行する。区切りごとにコミットしてプッシュする。
8. 最後に、私の作業が必要なもの（Supabase 東京プロジェクト作成、Gmail / Calendar の OAuth 審査申請、送信ドメイン取得と SPF/DKIM/DMARC）を箇条書きで示す。

## ルール
- 出力は日本語、思考は英語。提案するときは PENTA（5 ブレイン対話）形式で、末尾は質問か次の一手で締める。
- HubSpot の UI・文言・コードは模倣しない。
- main へ直接プッシュするのは手順 5 の初期コミットだけ。以降は作業ブランチで行う。
- 手順 2 と 3 のように私の判断や操作が必要な箇所では、止まって確認してから進める。
