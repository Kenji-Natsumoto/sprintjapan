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

interface ContactEmailRequest {
  company: string;
  department: string;
  name: string;
  email: string;
  phone?: string;
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
    const { company, department, name, email, phone, message } = body as ContactEmailRequest;

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
    if (!isValidString(message, 2000)) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
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
    const safePhone = phone ? htmlEncode(phone.trim()) : '';
    const safeMessage = htmlEncode(message.trim()).replace(/\n/g, '<br>');

    console.log("Sending contact email for:", { company: safeCompany, name: safeName });

    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: ["kn@sprintjapan.net"],
        subject: `【お問い合わせ】${safeCompany} ${safeName}様より`,
        html: `
          <h2>新しいお問い合わせが届きました</h2>
          <p><strong>会社名：</strong>${safeCompany}</p>
          <p><strong>部署・役職：</strong>${safeDepartment}</p>
          <p><strong>お名前：</strong>${safeName}</p>
          <p><strong>メールアドレス：</strong>${safeEmail}</p>
          ${safePhone ? `<p><strong>電話番号：</strong>${safePhone}</p>` : ''}
          <p><strong>お問い合わせ内容：</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!companyEmailResponse.ok) {
      const errorText = await companyEmailResponse.text();
      console.error("Failed to send company email:", errorText);
      throw new Error("Failed to send email");
    }

    console.log("Company email sent successfully");

    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: [email.trim()],
        subject: "お問い合わせを受け付けました - Sprint Japan",
        html: `
          <h2>${safeName}様</h2>
          <p>この度は、スプリントジャパン株式会社にお問い合わせいただき、誠にありがとうございます。</p>
          <p>以下の内容でお問い合わせを受け付けました。</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          
          <p><strong>会社名：</strong>${safeCompany}</p>
          <p><strong>部署・役職：</strong>${safeDepartment}</p>
          <p><strong>お名前：</strong>${safeName}</p>
          <p><strong>メールアドレス：</strong>${safeEmail}</p>
          ${safePhone ? `<p><strong>電話番号：</strong>${safePhone}</p>` : ''}
          <p><strong>お問い合わせ内容：</strong></p>
          <p>${safeMessage}</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          
          <p>担当者より1営業日以内にご連絡させていただきます。</p>
          <p>今しばらくお待ちくださいますようお願い申し上げます。</p>
          
          <p style="margin-top: 30px;">
            スプリントジャパン株式会社<br>
            https://sprintjapan.net
          </p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      console.error("Failed to send user confirmation email");
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
