import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

  try {
    const { company, department, name, email, phone, message }: ContactEmailRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("Sending contact email for:", { company, name, email });

    // Send email to company (test mode: sends to verified email)
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <onboarding@resend.dev>",
        to: ["kn@sprintjapan.com"], // Resend test mode: must use verified email
        subject: `【お問い合わせ】${company} ${name}様より`,
        html: `
          <h2>新しいお問い合わせが届きました</h2>
          <p><strong>会社名：</strong>${company}</p>
          <p><strong>部署・役職：</strong>${department}</p>
          <p><strong>お名前：</strong>${name}</p>
          <p><strong>メールアドレス：</strong>${email}</p>
          ${phone ? `<p><strong>電話番号：</strong>${phone}</p>` : ''}
          <p><strong>お問い合わせ内容：</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr style="margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            ※テストモード：本番環境では info@sprintjapan.jp に送信されます。<br>
            本番環境で使用するには、Resendでドメイン認証が必要です。
          </p>
        `,
      }),
    });

    if (!companyEmailResponse.ok) {
      const errorText = await companyEmailResponse.text();
      console.error("Failed to send company email:", errorText);
      throw new Error(`Failed to send company email: ${errorText}`);
    }

    const companyEmailData = await companyEmailResponse.json();
    console.log("Company email sent successfully:", companyEmailData);

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <onboarding@resend.dev>",
        to: [email],
        subject: "お問い合わせを受け付けました - Sprint Japan",
        html: `
          <h2>${name}様</h2>
          <p>この度は、スプリントジャパン株式会社にお問い合わせいただき、誠にありがとうございます。</p>
          <p>以下の内容でお問い合わせを受け付けました。</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          
          <p><strong>会社名：</strong>${company}</p>
          <p><strong>部署・役職：</strong>${department}</p>
          <p><strong>お名前：</strong>${name}</p>
          <p><strong>メールアドレス：</strong>${email}</p>
          ${phone ? `<p><strong>電話番号：</strong>${phone}</p>` : ''}
          <p><strong>お問い合わせ内容：</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          
          <p>担当者より1営業日以内にご連絡させていただきます。</p>
          <p>今しばらくお待ちくださいますようお願い申し上げます。</p>
          
          <p style="margin-top: 30px;">
            スプリントジャパン株式会社<br>
            https://sprintjapan.jp
          </p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error("Failed to send user confirmation email:", errorText);
      throw new Error(`Failed to send user confirmation email: ${errorText}`);
    }

    const userEmailData = await userEmailResponse.json();
    console.log("User confirmation email sent successfully:", userEmailData);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
