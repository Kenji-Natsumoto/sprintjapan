import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EntryEmailRequest {
  company: string;
  department: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company, department, name, email, phone, message }: EntryEmailRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("Received entry request:", { company, department, name, email, phone, message });

    // Send notification email to company
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: ["kn@sprintjapan.net"],
        subject: `【バイブコーディング・ラボ 第0期】新規エントリー: ${company} ${name}様`,
        html: `
          <h1>バイブコーディング・ラボ 第0期 新規エントリー</h1>
          <p>以下の内容でエントリーがありました。</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">会社名</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">部署・役職</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${department}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">ご担当者名</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">メールアドレス</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">電話番号</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone || "未入力"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">メッセージ</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${message || "未入力"}</td>
            </tr>
          </table>
        `,
      }),
    });

    if (!companyEmailResponse.ok) {
      const errorText = await companyEmailResponse.text();
      console.error("Failed to send company email:", errorText);
      throw new Error(`Failed to send company email: ${errorText}`);
    }

    const companyEmailData = await companyEmailResponse.json();
    console.log("Company notification email sent:", companyEmailData);

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sprint Japan <noreply@sprintjapan.net>",
        to: [email],
        subject: "【バイブコーディング・ラボ 第0期】エントリーを受け付けました",
        html: `
          <h1>${name}様</h1>
          <p>バイブコーディング・ラボ 第0期へのエントリーありがとうございます。</p>
          <p>以下の内容でエントリーを受け付けました。</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>会社名：</strong>${company}</p>
          <p><strong>部署・役職：</strong>${department}</p>
          <p><strong>ご担当者名：</strong>${name}</p>
          <p><strong>メールアドレス：</strong>${email}</p>
          <p><strong>電話番号：</strong>${phone || "未入力"}</p>
          <p><strong>メッセージ：</strong>${message || "未入力"}</p>
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
      const errorText = await userEmailResponse.text();
      console.error("Failed to send user confirmation email:", errorText);
      throw new Error(`Failed to send user confirmation email: ${errorText}`);
    }

    const userEmailData = await userEmailResponse.json();
    console.log("User confirmation email sent:", userEmailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-vibecodinglab-email function:", error);
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
