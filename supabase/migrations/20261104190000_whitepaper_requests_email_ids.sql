-- 資料申込: Resend の送信IDを記録する列（通知メール・申込者への自動返信）
-- RLS・ポリシーは変えない（service role だけが読み書きする）
ALTER TABLE public.whitepaper_requests
  ADD COLUMN IF NOT EXISTS notify_email_id text,
  ADD COLUMN IF NOT EXISTS reply_email_id text;
