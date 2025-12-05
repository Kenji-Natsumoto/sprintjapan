import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = [
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
  return emailRegex.test(email) && email.length <= 255;
}

function isValidString(str: unknown, maxLength: number): boolean {
  return typeof str === "string" && str.trim().length > 0 && str.length <= maxLength;
}

interface EntryEmailRequest {
  company: string;
  department: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Origin validation
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
  const isAllowedReferer = referer && ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed));
  
  if (!isAllowedOrigin && !isAllowedReferer) {
    console.warn("Blocked request from unauthorized origin:", { origin, referer });
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    const { company, department, name, email, phone, message } = body as EntryEmailRequest;

    // Input validation
    if (!isValidString(company, 100)) {
      return new Response(JSON.stringify({ error: "Invalid company name" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!isValidString(department, 100)) {
      return new Response(JSON.stringify({ error: "Invalid department" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!isValidString(name, 100)) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (phone && (typeof phone !== "string" || phone.length > 20)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (message && (typeof message !== "string" || message.length > 2000)) {
      return new Response(JSON.stringify({ error: "Message too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("RESEND_API_KEY is not configured");
    }

    // HTML encode all user input
    const safeCompany = htmlEncode(company.trim());
    const safeDepartment = htmlEncode(department.trim());
    const safeName = htmlEncode(name.trim());
    const safeEmail = htmlEncode(email.trim());
    const safePhone = phone ? htmlEncode(phone.trim()) : "未入力";
    const safeMessage = message ? htmlEncode(message.trim()) : "未入力";

    console.log("Received entry request:", { company: safeCompany, name: safeName });

    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: ["kn@sprintjapan.net"],
        subject: `【バイブコーディング・ラボ 第0期】新規エントリー: ${safeCompany} ${safeName}様`,
        html: `
          <h1>バイブコーディング・ラボ 第0期 新規エントリー</h1>
          <p>以下の内容でエントリーがありました。</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">会社名</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">部署・役職</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeDepartment}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">ご担当者名</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">メールアドレス</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">電話番号</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">メッセージ</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeMessage}</td>
            </tr>
          </table>
        `,
      }),
    });

    if (!companyEmailResponse.ok) {
      const errorText = await companyEmailResponse.text();
      console.error("Failed to send company email:", errorText);
      throw new Error("Failed to send email");
    }

    console.log("Company notification email sent");

    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: [email.trim()],
        subject: "【バイブコーディング・ラボ 第0期】エントリーを受け付けました",
        html: `
          <h1>${safeName}様</h1>
          <p>バイブコーディング・ラボ 第0期へのエントリーありがとうございます。</p>
          <p>以下の内容でエントリーを受け付けました。</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>会社名：</strong>${safeCompany}</p>
          <p><strong>部署・役職：</strong>${safeDepartment}</p>
          <p><strong>ご担当者名：</strong>${safeName}</p>
          <p><strong>メールアドレス：</strong>${safeEmail}</p>
          <p><strong>電話番号：</strong>${safePhone}</p>
          <p><strong>メッセージ：</strong>${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p>担当者より、今後の詳細についてご連絡させていただきます。</p>
          <p>しばらくお待ちくださいませ。</p>
          <br>
          <p>━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
          <p>Sprint Japan株式会社</p>
          <p>https://sprintjapan.net</p>
          <p>━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      console.error("Failed to send user confirmation email");
    } else {
      console.log("User confirmation email sent");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-vibecodinglab-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
