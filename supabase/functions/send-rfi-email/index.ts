import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

function isValidInterests(interests: unknown): interests is string[] {
  const allowedInterests = [
    "プロダクト開発",
    "AIチャットボット開発",
    "業務フロー改善",
    "IT技術顧問",
    "その他",
  ];
  return Array.isArray(interests) && interests.every(i => allowedInterests.includes(i));
}

interface RFIEmailRequest {
  company: string;
  department: string;
  name: string;
  email: string;
  interests: string[];
  message: string;
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
    const { company, department, name, email, interests, message } = body as RFIEmailRequest;

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
    if (!isValidInterests(interests)) {
      return new Response(JSON.stringify({ error: "Invalid interests" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (message && typeof message === "string" && message.length > 2000) {
      return new Response(JSON.stringify({ error: "Message too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // HTML encode all user input
    const safeCompany = htmlEncode(company.trim());
    const safeDepartment = htmlEncode(department.trim());
    const safeName = htmlEncode(name.trim());
    const safeEmail = htmlEncode(email.trim());
    const safeInterests = interests.map(i => htmlEncode(i));
    const safeMessage = message ? htmlEncode(message.trim()).replace(/\n/g, '<br>') : '';

    console.log("Sending RFI email to:", email);

    const userEmailResponse = await resend.emails.send({
      from: "Sprint Japan <noreply@sprintjapan.net>",
      to: [email.trim()],
      subject: "資料請求を受け付けました - Sprint Japan",
      html: `
        <h2>${safeName}様</h2>
        <p>この度は、スプリントジャパン株式会社にお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容で資料請求を受け付けました。</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        
        <p><strong>ご登録内容</strong></p>
        <p><strong>会社名：</strong>${safeCompany}</p>
        <p><strong>部署・役職：</strong>${safeDepartment}</p>
        <p><strong>お名前：</strong>${safeName}</p>
        <p><strong>メールアドレス：</strong>${safeEmail}</p>
        ${safeInterests.length > 0 ? `<p><strong>ご関心の内容：</strong>${safeInterests.join(", ")}</p>` : ''}
        ${safeMessage ? `<p><strong>メッセージ：</strong></p><p>${safeMessage}</p>` : ''}
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        
        <p>担当者より1営業日以内にご連絡させていただきます。</p>
        <p>今しばらくお待ちくださいますようお願い申し上げます。</p>
        
        <p style="margin-top: 30px;">
          スプリントジャパン株式会社<br>
          https://sprintjapan.net
        </p>
      `,
    });

    console.log("User email sent successfully:", userEmailResponse);

    const adminEmailResponse = await resend.emails.send({
      from: "Sprint Japan <noreply@sprintjapan.net>",
      to: ["kn@sprintjapan.net"],
      subject: `【資料請求】${safeCompany} - ${safeName}様`,
      html: `
        <h2>新しい資料請求が届きました</h2>
        <p><strong>会社名：</strong>${safeCompany}</p>
        <p><strong>部署・役職：</strong>${safeDepartment}</p>
        <p><strong>お名前：</strong>${safeName}</p>
        <p><strong>メールアドレス：</strong>${safeEmail}</p>
        ${safeInterests.length > 0 ? `<p><strong>ご関心の内容：</strong>${safeInterests.join(", ")}</p>` : ''}
        ${safeMessage ? `<p><strong>メッセージ：</strong></p><p>${safeMessage}</p>` : ''}
      `,
    });

    console.log("Admin notification email sent successfully:", adminEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Emails sent successfully" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-rfi-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
