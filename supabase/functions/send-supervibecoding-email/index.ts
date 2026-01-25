import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = [
  "https://sprintjapan.lovable.app",
  "https://preview--sprintjapan.lovable.app",
  "https://sprintjapan.net",
  "https://www.sprintjapan.net",
  "http://localhost:5173",
  "http://localhost:8080",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML encode to prevent injection
function htmlEncode(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email) && email.length <= 255;
}

function isValidString(str: unknown, maxLength: number): boolean {
  return typeof str === "string" && str.trim().length > 0 && str.length <= maxLength;
}

interface SuperVibeCodingEmailRequest {
  name: string;
  email: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate origin
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const isValidOrigin = origin
    ? ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))
    : referer
    ? ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed))
    : false;

  if (!isValidOrigin) {
    console.error("Invalid origin:", origin, "referer:", referer);
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body: SuperVibeCodingEmailRequest = await req.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!isValidString(name, 100)) {
      return new Response(JSON.stringify({ error: "お名前を入力してください" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "有効なメールアドレスを入力してください" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate optional fields
    if (message && typeof message === "string" && message.length > 2000) {
      return new Response(JSON.stringify({ error: "メッセージは2000文字以内で入力してください" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("メール送信の設定が正しくありません");
    }

    // HTML encode all user input
    const safeName = htmlEncode(name.trim());
    const safeEmail = htmlEncode(email.trim());
    const safeMessage = message ? htmlEncode(message.trim()) : "なし";

    console.log("Received super vibe coding registration:", { name: safeName, email: safeEmail });

    // Send notification email to company
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "超バイブコーディング講座 <noreply@sprintjapan.net>",
        to: ["kn@sprintjapan.net"],
        subject: `【超バイブコーディング講座】開講お知らせ登録: ${safeName}様`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
              超バイブコーディング講座 開講お知らせ登録
            </h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">登録者情報</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 120px;">お名前</td>
                  <td style="padding: 8px 0; color: #111827;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">メールアドレス</td>
                  <td style="padding: 8px 0; color: #111827;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">興味・質問</td>
                  <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${safeMessage}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #6b7280; font-size: 12px;">
              このメールは超バイブコーディング講座の開講お知らせ登録フォームから自動送信されました。
            </p>
          </div>
        `,
      }),
    });

    if (!companyEmailResponse.ok) {
      const errorData = await companyEmailResponse.text();
      console.error("Failed to send company email:", errorData);
      throw new Error("メール送信に失敗しました");
    }

    console.log("Company notification email sent successfully");

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: [email.trim()],
        subject: "【超バイブコーディング講座】開講お知らせ登録を受け付けました",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
              開講お知らせ登録ありがとうございます
            </h2>
            
            <p style="color: #374151; line-height: 1.8;">
              ${safeName} 様<br><br>
              「未来を創る！超バイブコーディング講座」への開講お知らせ登録をいただき、誠にありがとうございます。
            </p>
            
            <p style="color: #374151; line-height: 1.8;">
              開講日程が決まり次第、優先的にご案内をお送りいたします。<br>
              今しばらくお待ちください。
            </p>
            
            <div style="background: #f0f0ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #4f46e5; margin-top: 0;">ご登録内容</h3>
              <p style="color: #374151; margin: 0;">
                <strong>お名前：</strong>${safeName}<br>
                <strong>メールアドレス：</strong>${safeEmail}
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; line-height: 1.6;">
              スプリントジャパン株式会社<br>
              〒151-0053 東京都渋谷区代々木1丁目36番6号 代々木駅前ビル929<br>
              <a href="https://sprintjapan.net" style="color: #6366f1;">https://sprintjapan.net</a>
            </p>
            
            <p style="color: #9ca3af; font-size: 11px;">
              ※このメールは自動送信されています。<br>
              ※心当たりのない場合は、お手数ですがこのメールを破棄してください。
            </p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorData = await userEmailResponse.text();
      console.error("Failed to send user email:", errorData);
      // Continue even if user email fails - company has the info
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "登録が完了しました" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "不明なエラーが発生しました";
    console.error("Error in send-supervibecoding-email function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
