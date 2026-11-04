// 資料（ホワイトペーパー）の申込を受け付ける。
// 1) 入力を確かめる 2) service role でリストに1行足す 3) 合い鍵を作る
// 4) 通知メール（Main Bot の受信箱、写し kn@）と、申込者への自動返信を送る 5) 合い鍵を返す
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const ALLOWED_ORIGINS = [
  "https://sprintjapan.net",
  "https://www.sprintjapan.net",
  "http://localhost:5173",
  "http://localhost:8080",
];

const SITE_ORIGIN = "https://sprintjapan.net";
const THANKS_PATH = "/ai-discovery-community/start/thanks";
const NOTIFY_TO = ["kenjinatsumoto@mail.grokbot.com"];
const NOTIFY_CC = ["kn@sprintjapan.net"];
const FROM = "Sprint Japan <noreply@sprintjapan.net>";
const TOKEN_DAYS = 7;
const TOKEN_MAX_USES = 5;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PAPERS = ["A", "B", "both"] as const;
type Papers = (typeof PAPERS)[number];
const PAPER_LABEL: Record<Papers, string> = { A: "A", B: "B", both: "両方" };
// 通知メール冒頭の機械読み取り用の行（Main Bot が読む）
const PAPER_CODE: Record<Papers, string> = { A: "A", B: "B", both: "A,B" };

// 受付日時を「YYYY-MM-DD HH:mm JST」で返す（日本時間 = UTC+9、夏時間なし）
function formatJst(d: Date): string {
  const j = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${j.getUTCFullYear()}-${p(j.getUTCMonth() + 1)}-${p(j.getUTCDate())} ${p(j.getUTCHours())}:${p(j.getUTCMinutes())} JST`;
}
const PAPER_TITLE: Record<Papers, string> = {
  A: "資料A「複数アプリを企画・管理するための考え方（仮）」",
  B: "資料B「バイブコーディングのマーケティング方法（仮）」",
  both: "資料A・資料Bの両方",
};
const ROLES = ["経営者", "事業責任者", "開発者", "その他"];

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

function htmlEncode(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const isValidEmail = (v: unknown): v is string =>
  typeof v === "string" && v.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const reqString = (v: unknown, max: number): string | null =>
  typeof v === "string" && v.trim().length > 0 && v.trim().length <= max ? v.trim() : null;

// 任意の文字列。空なら null、長すぎたら false（＝不正）
const optString = (v: unknown, max: number): string | null | false => {
  if (v === undefined || v === null || v === "") return null;
  if (typeof v !== "string") return false;
  const t = v.trim();
  if (!t) return null;
  return t.length <= max ? t : false;
};

// utm・CTA ID は半角英数字と - _ . だけ（それ以外は捨てる）
const tag = (v: unknown): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, 100);
  return /^[A-Za-z0-9._-]+$/.test(t) ? t : null;
};

const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// 送れたら Resend の送信ID、失敗なら null を返す
async function sendMail(apiKey: string, payload: Record<string, unknown>): Promise<string | null> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: FROM, ...payload }),
  });
  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    return null;
  }
  const data = await res.json().catch(() => null);
  return typeof data?.id === "string" ? data.id : null;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowed =
    (origin && ALLOWED_ORIGINS.some((a) => origin.startsWith(a))) ||
    (referer && ALLOWED_ORIGINS.some((a) => referer.startsWith(a)));
  if (!allowed) {
    console.warn("Blocked request from unauthorized origin:", { origin, referer });
    return json(403, { error: "Unauthorized" });
  }

  try {
    const body = await req.json();

    // 画面に出さない罠の欄。人は入力しないので、値があれば受け付けたふりをして何もしない
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return json(200, { success: true, token: null });
    }

    const papers = PAPERS.includes(body?.papers) ? (body.papers as Papers) : null;
    const name = reqString(body?.name, 100);
    const email = isValidEmail(body?.email) ? body.email.trim() : null;
    const company = optString(body?.company, 100);
    const role = optString(body?.role, 20);
    const landingPath = optString(body?.landing_path, 300);

    if (!papers) return json(400, { error: "Invalid papers" });
    if (!name) return json(400, { error: "Invalid name" });
    if (!email) return json(400, { error: "Invalid email" });
    if (company === false) return json(400, { error: "Invalid company" });
    if (role === false || (role && !ROLES.includes(role))) return json(400, { error: "Invalid role" });
    if (landingPath === false) return json(400, { error: "Invalid landing path" });
    if (body?.consent !== true) return json(400, { error: "Consent required" });
    const optIn = body?.opt_in === true;

    const utm = {
      utm_source: tag(body?.utm_source),
      utm_medium: tag(body?.utm_medium),
      utm_campaign: tag(body?.utm_campaign),
      utm_content: tag(body?.utm_content),
      utm_term: tag(body?.utm_term),
    };
    const ctaId = utm.utm_content; // CTA ID = utm_content

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error("Supabase env is not configured");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    // 合い鍵: 32バイトの乱数。保存するのはハッシュだけ
    const token = toBase64Url(crypto.getRandomValues(new Uint8Array(32)));
    const tokenHash = await sha256Hex(token);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + TOKEN_DAYS * 24 * 60 * 60 * 1000);

    const db = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
    const { data: inserted, error: insertError } = await db.from("whitepaper_requests").insert({
      name,
      email,
      company,
      role,
      papers,
      opt_in: optIn,
      consented_at: now.toISOString(),
      cta_id: ctaId,
      ...utm,
      landing_path: landingPath,
      access_token: tokenHash,
      token_expires_at: expiresAt.toISOString(),
      token_uses: 0,
      token_max_uses: TOKEN_MAX_USES,
    }).select("id").single();
    if (insertError) {
      console.error("Insert failed:", insertError.message);
      throw new Error("Insert failed");
    }

    const thanksUrl = `${SITE_ORIGIN}${THANKS_PATH}?k=${encodeURIComponent(token)}`;
    const e = (v: string | null | undefined) => (v ? htmlEncode(v) : "（なし）");
    const subjectCta = ctaId ?? "CTAなし";

    // 冒頭の固定4行（この順・この表記を変えない。Main Bot が機械的に読む）
    const headerLines = [
      "申し込み: 1件",
      `資料: ${PAPER_CODE[papers]}`,
      `CTA ID: ${ctaId ?? "なし"}`,
      `受付日時: ${formatJst(now)}`,
    ];
    const plain = (v: string | null | undefined) => (v ? v.replace(/[\r\n]+/g, " ") : "（なし）");
    const notifyText = [
      ...headerLines,
      "",
      `欲しい資料：${PAPER_TITLE[papers]}`,
      `お名前：${plain(name)}`,
      `メールアドレス：${plain(email)}`,
      `会社名：${plain(company)}`,
      `立場：${plain(role)}`,
      `今後のお知らせ：${optIn ? "受け取る" : "受け取らない"}`,
      `同意日時：${now.toISOString()}`,
      `utm_source：${plain(utm.utm_source)}`,
      `utm_medium：${plain(utm.utm_medium)}`,
      `utm_campaign：${plain(utm.utm_campaign)}`,
      `utm_content：${plain(utm.utm_content)}`,
      `utm_term：${plain(utm.utm_term)}`,
      `着地ページ：${plain(landingPath)}`,
    ].join("\n");

    // (a) 通知: Main Bot の受信箱へ1通（写し kn@）。最初の通知には全項目を載せてよい（健司さん決定）
    const notifyEmailId = await sendMail(RESEND_API_KEY, {
      to: NOTIFY_TO,
      cc: NOTIFY_CC,
      subject: `【資料申込】${PAPER_LABEL[papers]}・${subjectCta}`,
      text: notifyText,
      html: `<div>${headerLines.map(htmlEncode).join("<br>\n")}</div>
        <hr />
        <h2>資料の申込が届きました</h2>
        <p><strong>欲しい資料：</strong>${htmlEncode(PAPER_TITLE[papers])}</p>
        <p><strong>お名前：</strong>${e(name)}</p>
        <p><strong>メールアドレス：</strong>${e(email)}</p>
        <p><strong>会社名：</strong>${e(company)}</p>
        <p><strong>立場：</strong>${e(role)}</p>
        <p><strong>今後のお知らせ：</strong>${optIn ? "受け取る" : "受け取らない"}</p>
        <p><strong>同意日時：</strong>${htmlEncode(now.toISOString())}</p>
        <hr />
        <p><strong>CTA ID：</strong>${e(ctaId)}</p>
        <p><strong>utm_source：</strong>${e(utm.utm_source)}</p>
        <p><strong>utm_medium：</strong>${e(utm.utm_medium)}</p>
        <p><strong>utm_campaign：</strong>${e(utm.utm_campaign)}</p>
        <p><strong>utm_content：</strong>${e(utm.utm_content)}</p>
        <p><strong>utm_term：</strong>${e(utm.utm_term)}</p>
        <p><strong>着地ページ：</strong>${e(landingPath)}</p>
      `,
    });

    // (b) 申込者への自動返信（受け取りページへのリンク）
    const replyEmailId = await sendMail(RESEND_API_KEY, {
      to: [email],
      subject: "資料のお申し込みを受け付けました - Sprint Japan",
      html: `
        <p>${htmlEncode(name)}様</p>
        <p>スプリントジャパン株式会社の資料にお申し込みいただき、ありがとうございます。</p>
        <p><strong>お申し込みの資料：</strong>${htmlEncode(PAPER_TITLE[papers])}</p>
        <p>資料は下のページから受け取れます。資料ができあがるまでは「準備中」と表示されます。できあがりましたら、このメールアドレスにお知らせします。</p>
        <p><a href="${thanksUrl}">${thanksUrl}</a></p>
        <p>このリンクは、お申し込みから${TOKEN_DAYS}日間、${TOKEN_MAX_USES}回まで開けます。ほかの方とは共有しないでください。</p>
        <p style="margin-top:30px;">スプリントジャパン株式会社<br>${SITE_ORIGIN}</p>
      `,
    });

    // 送信IDを記録する（失敗しても申込そのものは受け付け済み）
    const { error: updateError } = await db
      .from("whitepaper_requests")
      .update({ notify_email_id: notifyEmailId, reply_email_id: replyEmailId })
      .eq("id", inserted.id);
    if (updateError) console.error("Email id update failed:", updateError.message);

    return json(200, { success: true, token });
  } catch (error) {
    console.error("Error in submit-whitepaper-request:", error);
    return json(500, { error: "Failed to submit" });
  }
};

serve(handler);
