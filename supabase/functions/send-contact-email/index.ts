import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    console.log("Sending contact email for:", { company, name, email });

    // Send email to company
    const { data: companyEmailData, error: companyEmailError } = await resend.emails.send({
      from: "Sprint Japan <onboarding@resend.dev>",
      to: ["info@sprintjapan.jp"],
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
      `,
    });

    if (companyEmailError) {
      console.error("Failed to send company email:", companyEmailError);
      throw companyEmailError;
    }

    console.log("Company email sent successfully:", companyEmailData);

    // Send confirmation email to user
    const { data: userEmailData, error: userEmailError } = await resend.emails.send({
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
    });

    if (userEmailError) {
      console.error("Failed to send user confirmation email:", userEmailError);
      throw userEmailError;
    }

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
