#!/usr/bin/env bash
# ANC（Agent-Native CRM）の引き継ぎブートストラップ
# ローカルの Mac で実行する。前提: git と gh CLI（gh auth login 済み）
#   bash bootstrap-anc.sh
set -euo pipefail

ORG="sprintjapan-hq"
REPO="anc"
LOCAL="/signity/${ORG}/${REPO}"
SRC_REPO="https://github.com/Kenji-Natsumoto/sprintjapan"
SRC_BRANCH="claude/hubspot-clone-ai-agent-m8t273"

echo "== 1/5 GitHub 認証を確認"
gh auth status

echo "== 2/5 組織リポ ${ORG}/${REPO} を用意"
if gh repo view "${ORG}/${REPO}" >/dev/null 2>&1; then
  echo "既に存在します: ${ORG}/${REPO}"
else
  gh repo create "${ORG}/${REPO}" --private \
    --description "ANC (Agent-Native CRM) - SPRINT Japan micro-business"
fi

echo "== 3/5 ローカル書庫 ${LOCAL} を用意"
mkdir -p "$(dirname "${LOCAL}")"
if [ ! -d "${LOCAL}/.git" ]; then
  git clone "https://github.com/${ORG}/${REPO}.git" "${LOCAL}"
fi
cd "${LOCAL}"

echo "== 4/5 引き継ぎ資料を取り込む"
TMP="$(mktemp -d)"
git clone --quiet --depth 1 -b "${SRC_BRANCH}" "${SRC_REPO}" "${TMP}/src"
mkdir -p docs/plan docs/handoff
cp "${TMP}/src/.lovable/plan/agent-native-crm構想-2026-09-13.md" docs/plan/anc-plan-2026-09-13.md
cp "${TMP}/src/handoff/anc/HANDOFF.md" docs/handoff/HANDOFF.md
cp "${TMP}/src/handoff/anc/FIRST_PROMPT.md" docs/handoff/FIRST_PROMPT.md
rm -rf "${TMP}"

if [ ! -f README.md ]; then
cat > README.md <<'README'
# ANC (Agent-Native CRM)

SPRINT Japan のマイクロビジネスの 1 つ。HubSpot の中核機能でパリティを取り、常駐する AI エージェントが仕事を進める CRM。

- 構想プラン: docs/plan/anc-plan-2026-09-13.md
- 引き継ぎ: docs/handoff/HANDOFF.md
- 新セッションの最初の指示: docs/handoff/FIRST_PROMPT.md
README
fi

echo "== 5/5 コミットしてプッシュ"
git add -A
if git diff --cached --quiet; then
  echo "変更なし"
else
  git commit -m "ANC の構想プランと引き継ぎ資料を追加"
fi
git branch -M main
git push -u origin main

cat <<NEXT

完了。次の一手:
  1. https://claude.ai/code で「新しいセッション」を sprintjapan-hq/anc を起点に開始する
  2. 最初のメッセージに docs/handoff/FIRST_PROMPT.md の内容を貼り付ける
     （または現在のセッションで Claude に「anc で新セッションを起動して」と伝える）
NEXT
