# Lumora v2 改修ブリーフ（MVP 1 日目）

> 対象リポジトリ: `sprintjapan-hq/lumora-v2`（Replit: `@Kenji-Natsumoto/lumora-v2`）
> このブリーフは単体で読めるように書いてある。lumora-v2 のセッションにそのまま貼って着手できる。
> 設計資産（システムプロンプト、判断規則、状態スキーマ、採点セット）は `kenji-natsumoto/sprintjapan` の `bot/` にある。
> 着手時に `bot/prompts/` と `bot/schema/` を lumora-v2 の `bot/` へコピーする。

---

## ゴール（1 日目の終わりに動いていること）

1. 「話す」を開くと、BOT が先に話す。初回は合成音声である旨を一度だけ言い、続けて最初の問い（困っている人の顔）を投げる。
2. クライアントが音声で答えると、BOT が応答 JSON を返し、`speak` が夏本本人の複製音声で読み上げられ、`text` と `diagram` が画面に出る。
3. 10 ターン前後でサービスアイデアシートの 5 項目が埋まり、関門（プロブレムインタビュー 3 名）に到達する。
4. 応答 JSON が壊れない（構造化出力で保証）。
5. 全ターンが状態として保存され、3 日目の採点に使える。

## 前提

- 環境変数: `ANTHROPIC_API_KEY`、`ELEVENLABS_API_KEY`、`ELEVENLABS_VOICE_ID`（夏本本人の複製音声の ID）。Replit の Secrets に置く。
- 利用者は夏本本人のみ。ログインは作らない。`client_id` は固定値 `natsumoto`。
- 保存先は Lumora の既存の端末内保存のまま。Supabase への移行は 4 日目以降。

## 現状の Lumora（把握している範囲）

6 タブ: 話す、今日、手で書く、経過、渡し紙、設定。音声入力あり。端末内保存。ログインなし。
このブリーフで触るのは「話す」「経過」「渡し紙」の 3 タブと、サーバー側の LLM 呼び出しと音声合成の 2 経路。

## 作業 1: サーバー経路 `/api/bot/turn`

入力: `{ state: SessionState, utterance: string | null }`。`utterance` が `null` ならセッション開始（BOT 先攻）。
出力: `{ reply: BotReply, state: SessionState }`。

処理:

1. `bot/prompts/system-prompt.md` を読み、`{{ }}` を埋める。
   - `{{client_name}}`、`{{client_context}}`: 1 日目は固定文字列でよい。
   - `{{sheet_state}}`: `state.sheet` を短い箇条書きにしたもの。
   - `{{last_question}}`、`{{last_action_result}}`: 前回セッションから。無ければ「なし」。
   - `{{knowledge_context}}`: 1 日目は空でよい。論文の検索は 2 日目以降。
2. Claude API を **Anthropic の公式 SDK で直接**呼ぶ（Lovable ゲートウェイ等の互換層は使わない）。
   - モデル: `claude-opus-5`。
   - システムプロンプトは配列にし、`{{ }}` を埋める前の安定部分に `cache_control: { type: "ephemeral", ttl: "1h" }` を付ける。差し込み部分は別ブロックにして後ろに置く。
   - 応答は構造化出力で受ける。`client.messages.parse()` と `zodOutputFormat(BotReplySchema)` を使う。
   - `thinking` は指定しない（Opus 5 は既定で適応的に思考する）。`output_config.effort` は `"medium"` から始め、遅ければ `"low"`。
   - `max_tokens` は 2048。応答は短い JSON なので十分。
3. `parsed_output` が `null` なら一度だけ再試行し、それでも駄目なら `speak` に「もう一度お願いします」を入れて返す。
4. `reply.sheet_update` が `null` でなければ `state.sheet[field]` を `confirmed` で更新する。`stage` を `reply.stage` に更新。
5. `state.turns` に client と bot のターンを追記して返す。

BotReply の型（`bot/prompts/system-prompt.md` 第 2 節と同じ）:

```ts
import { z } from "zod";

export const BotReplySchema = z.object({
  speak: z.string(),                      // 60 字以内、問いは一つ、記号なし
  text: z.string(),                       // Markdown。不要なら ""
  diagram: z.string().nullable(),         // Mermaid。不要なら null
  sheet_update: z.object({
    field: z.enum(["customer", "problem", "current", "concept", "name"]).nullable(),
    value: z.string().nullable(),
  }),
  stage: z.enum(["customer", "problem", "current", "concept", "name", "gate", "done", "answer"]),
  next_action: z.string().nullable(),
});
```

呼び出しの骨格:

```ts
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const client = new Anthropic();

const response = await client.messages.parse({
  model: "claude-opus-5",
  max_tokens: 2048,
  output_config: { effort: "medium", format: zodOutputFormat(BotReplySchema) },
  system: [
    { type: "text", text: STABLE_PROMPT, cache_control: { type: "ephemeral", ttl: "1h" } },
    { type: "text", text: RUNTIME_CONTEXT },
  ],
  messages: history, // Anthropic.MessageParam[]。client は user、bot は assistant（speak と text を結合した文字列）
});
const reply = response.parsed_output; // null なら再試行
```

セッション開始（`utterance` が `null`）のときは、`messages` の最初の user メッセージに「セッションを開始してください」と入れる。システムプロンプト第 1 節と第 12 節に従って BOT が先に問う。

## 作業 2: サーバー経路 `/api/bot/speak`

入力: `{ text: string }`。出力: 音声ストリーム。

- ElevenLabs の音声合成ストリーミング API を、複製音声 `ELEVENLABS_VOICE_ID` と多言語モデルで呼ぶ。SDK の関数名は ElevenLabs の公式ドキュメントで確認して使う（推測で書かない）。
- クライアント側は `speak` を「。」で分割し、一文目を先に送って再生を始め、残りを続けて送る。最初の音声まで 2 秒以内を目標にする。
- Lumora に既にあるモバイル向け音声アンロック処理があれば流用する（iOS Safari で自動再生が止まる対策）。

## 作業 3: 音声入力

- 既存の音声入力をそのまま使う。ブラウザの Web Speech API なら `lang = "ja-JP"` を確認する。
- 押して話す方式。自動の発話区切りや割り込みは 1 日目では作らない。
- 認識結果は確定前に画面に出し、送信ボタンで `/api/bot/turn` へ送る。

## 作業 4: 画面

- **話す**: BOT の `speak` を吹き出しで表示し、同時に音声再生。`text` は Markdown で描画。`diagram` があれば Mermaid で描画する。
  - Mermaid は描画前に構文検査し、失敗したら描画せず、次のターンで「図を描き直してください」を system 側の文脈として渡す（1 日目は単に描画しないだけでもよい）。
- **経過**: セッション一覧。各セッションの日時、`stage`、`todays_question`、`next_action`。
- **渡し紙**: 現在のセッションの `sheet` をシステムプロンプト第 6 節の書式で一枚に描画。コピー用のボタンを一つ。
- **採点（最小）**: 話すタブの各 BOT 吹き出しに、点数 1〜5 と「夏本ならこう言う」の入力欄。保存先は `turns[].override`。3 日目に使う。

## 作業 5: 状態

- `bot/schema/idea-sheet.schema.json` の `SessionState` を端末内保存に保存する。キーは `session_id`。
- セッション開始時、前回セッションの `todays_question` と `next_action` を読み、`{{last_question}}` と `{{last_action_result}}` に渡す。`next_action_result` は、BOT が冒頭で聞いた答えを client の最初のターンとして保存する。

## 受け入れ条件（1 日目）

| 条件 | 確認方法 |
|---|---|
| BOT が先に話す | 話すタブを開いて 2 秒以内に音声が始まる |
| 合成音声の開示が初回のみ | 2 回目のセッションでは言わない |
| 応答 JSON が壊れない | 20 ターン連続で `parsed_output` が `null` にならない |
| シートが埋まる | 採点セットの問 1 から始めて 10 ターン前後で `stage` が `gate` になる |
| 禁止事項が効く | 採点セットの問 6（キャンバスを描いて）で断る |
| ターンが保存される | 経過タブに全ターンと採点欄が出る |

## 1 日目にやらないこと

論文の検索（2 日目）、Supabase（4 日目以降）、ログイン、クライアント別ワークスペース、雑談モード、自動の発話区切り、高精度の音声複製、LINE 通知。

## 参照

- システムプロンプト: `bot/prompts/system-prompt.md`（sprintjapan リポジトリ）
- 判断規則: `bot/prompts/judgment-rules.md`
- 状態スキーマ: `bot/schema/idea-sheet.schema.json`
- 3 日目の採点セット: `bot/eval/day3-test-set.md`
