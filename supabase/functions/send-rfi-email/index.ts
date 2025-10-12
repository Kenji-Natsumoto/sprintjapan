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
      from: "ProSprint <onboarding@resend.dev>",
      to: [email],
      subject: "【ProSprint】資料請求ありがとうございます",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            資料請求ありがとうございます
          </h1>
          
          <p>
            ${name} 様
          </p>
          
          <p>
            この度はProSprintにご関心をお持ちいただき、誠にありがとうございます。<br>
            資料請求を受け付けました。
          </p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">ご登録内容</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;">会社名：</td>
                <td style="padding: 8px 0;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">部署・役職：</td>
                <td style="padding: 8px 0;">${department}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">ご担当者名：</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              ${interests.length > 0 ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">ご関心の内容：</td>
                <td style="padding: 8px 0;">${interests.join(", ")}</td>
              </tr>
              ` : ''}
              ${message ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">メッセージ：</td>
                <td style="padding: 8px 0;">${message}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p>
            担当者より1営業日以内にご連絡させていただきます。<br>
            今しばらくお待ちください。
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
              ProSprint - 事業開発AIプラットフォーム<br>
              お問い合わせ：info@prosprint.example
            </p>
          </div>
        </div>
      `,
    });

    console.log("User email sent successfully:", userEmailResponse);

    // Send notification email to the company
    const adminEmailResponse = await resend.emails.send({
      from: "ProSprint RFI <onboarding@resend.dev>",
      to: ["admin@prosprint.example"], // Replace with your company email
      subject: `【新規RFI】${company} - ${name}様`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9;">新規資料請求</h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">お客様情報</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;">会社名：</td>
                <td style="padding: 8px 0; font-weight: bold;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">部署・役職：</td>
                <td style="padding: 8px 0;">${department}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">ご担当者名：</td>
                <td style="padding: 8px 0; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">メールアドレス：</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${interests.length > 0 ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">ご関心の内容：</td>
                <td style="padding: 8px 0;"><strong>${interests.join(", ")}</strong></td>
              </tr>
              ` : ''}
              ${message ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">メッセージ：</td>
                <td style="padding: 8px 0;">${message}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p style="color: #dc2626; font-weight: bold;">
            1営業日以内にお客様へご連絡をお願いいたします。
          </p>
        </div>
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
