// 受け取りページの合い鍵を確かめ、使った回数を1つ増やし、
// 申し込んだ資料と限定動画の「数分だけ有効な署名つきURL」を返す。
// ファイルがまだ無いときは url: null（画面は「準備中」）。
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const ALLOWED_ORIGINS = [
  "https://sprintjapan.net",
  "https://www.sprintjapan.net",
  "http://localhost:5173",
  "http://localhost:8080",
];

const BUCKET = "whitepapers";
const SIGNED_URL_SECONDS = 300; // 5分
const FILES = {
  A: "papers/whitepaper-a.pdf",
  B: "papers/whitepaper-b.pdf",
  video: "video/limited.mp4",
} as const;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...corsHeaders },
  });

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowed =
    (origin && ALLOWED_ORIGINS.some((a) => origin.startsWith(a))) ||
    (referer && ALLOWED_ORIGINS.some((a) => referer.startsWith(a)));
  if (!allowed) return json(403, { error: "Unauthorized" });

  try {
    const body = await req.json();
    const token = typeof body?.token === "string" ? body.token.trim() : "";
    // 合い鍵の形（base64url 43文字）でなければ、DBを見ずに断る
    if (!/^[A-Za-z0-9_-]{40,64}$/.test(token)) return json(200, { status: "invalid" });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error("Supabase env is not configured");
    const db = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    const { data, error } = await db.rpc("consume_whitepaper_token", { p_token_hash: await sha256Hex(token) });
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    if (!row || row.res_status !== "ok") return json(200, { status: row?.res_status ?? "invalid" });

    const papers: string = row.res_papers;
    const wanted: ("A" | "B")[] = papers === "both" ? ["A", "B"] : [papers as "A" | "B"];

    const sign = async (path: string): Promise<string | null> => {
      const { data: signed, error: signError } = await db.storage.from(BUCKET).createSignedUrl(path, SIGNED_URL_SECONDS);
      if (signError || !signed?.signedUrl) return null; // ファイルが無い → 準備中
      return signed.signedUrl;
    };

    const files = await Promise.all(wanted.map(async (id) => ({ id, url: await sign(FILES[id]) })));
    const video = await sign(FILES.video);

    return json(200, {
      status: "ok",
      papers,
      cta_id: row.res_cta_id ?? null,
      uses: row.res_uses,
      max_uses: row.res_max_uses,
      files,
      video,
      url_expires_in: SIGNED_URL_SECONDS,
    });
  } catch (error) {
    console.error("Error in get-whitepaper-access:", error);
    return json(500, { error: "Failed" });
  }
};

serve(handler);
