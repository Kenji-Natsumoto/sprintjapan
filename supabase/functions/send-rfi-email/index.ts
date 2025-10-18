import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RFIEmailRequest {
  company: string;
  department: string;
  name: string;
  email: string;
  interests: string[];
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company, department, name, email, interests, message }: RFIEmailRequest = await req.json();

    console.log("Sending RFI email to:", email);

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Sprint Japan <noreply@sprintjapan.net>",
      to: [email],
      subject: "資料請求を受け付けました - Sprint Japan",
      html: `
        <h2>${name}様</h2>
        <p>この度は、スプリントジャパン株式会社にお問い合わせいただき、誠にありがとうございます。</p>
        <p>以下の内容で資料請求を受け付けました。</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        
        <p><strong>ご登録内容</strong></p>
        <p><strong>会社名：</strong>${company}</p>
        <p><strong>部署・役職：</strong>${department}</p>
        <p><strong>お名前：</strong>${name}</p>
        <p><strong>メールアドレス：</strong>${email}</p>
        ${interests.length > 0 ? `<p><strong>ご関心の内容：</strong>${interests.join(", ")}</p>` : ''}
        ${message ? `<p><strong>メッセージ：</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        
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

    // Send notification email to the company
    const adminEmailResponse = await resend.emails.send({
      from: "Sprint Japan <noreply@sprintjapan.net>",
      to: ["kn@sprintjapan.net"],
      subject: `【資料請求】${company} - ${name}様`,
      html: `
        <h2>新しい資料請求が届きました</h2>
        <p><strong>会社名：</strong>${company}</p>
        <p><strong>部署・役職：</strong>${department}</p>
        <p><strong>お名前：</strong>${name}</p>
        <p><strong>メールアドレス：</strong>${email}</p>
        ${interests.length > 0 ? `<p><strong>ご関心の内容：</strong>${interests.join(", ")}</p>` : ''}
        ${message ? `<p><strong>メッセージ：</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
      `,
    });

    console.log("Admin notification email sent successfully:", adminEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Emails sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-rfi-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
