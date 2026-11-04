-- 資料（ホワイトペーパー）申込のリストと、申込者だけが使える受け取り用の合い鍵。
-- サイト（anon / authenticated）からは読み書きできない。読み書きはエッジ関数（service role）だけ。
-- ※ このファイルはまだ本番に適用しない（健司さんのOK後に適用する）。

create table if not exists public.whitepaper_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 255),
  company text check (company is null or char_length(company) <= 100),
  role text check (role is null or role in ('経営者', '事業責任者', '開発者', 'その他')),
  papers text not null check (papers in ('A', 'B', 'both')),
  opt_in boolean not null default false,
  consented_at timestamptz not null,
  cta_id text check (cta_id is null or char_length(cta_id) <= 100),
  utm_source text check (utm_source is null or char_length(utm_source) <= 100),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 100),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 100),
  utm_content text check (utm_content is null or char_length(utm_content) <= 100),
  utm_term text check (utm_term is null or char_length(utm_term) <= 100),
  landing_path text check (landing_path is null or char_length(landing_path) <= 300),
  -- 合い鍵そのものは保存しない。SHA-256（16進）だけを持つ。
  access_token text not null unique,
  token_expires_at timestamptz not null default (now() + interval '7 days'),
  token_uses integer not null default 0,
  token_max_uses integer not null default 5
);

create index if not exists whitepaper_requests_created_at_idx on public.whitepaper_requests (created_at desc);
create index if not exists whitepaper_requests_cta_id_idx on public.whitepaper_requests (cta_id);

-- RLS を有効にし、anon / authenticated 向けのポリシーは作らない（= 読めない・書けない）。
alter table public.whitepaper_requests enable row level security;
revoke all on public.whitepaper_requests from anon, authenticated;

-- 合い鍵の確認と回数の加算を1回の操作で行う（同時に開かれても上限を超えない）。
create or replace function public.consume_whitepaper_token(p_token_hash text)
returns table (res_status text, res_papers text, res_cta_id text, res_uses integer, res_max_uses integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.whitepaper_requests%rowtype;
begin
  select * into r from public.whitepaper_requests where access_token = p_token_hash for update;
  if not found then
    return query select 'invalid'::text, null::text, null::text, 0, 0;
    return;
  end if;
  if r.token_expires_at <= now() then
    return query select 'expired'::text, null::text, null::text, r.token_uses, r.token_max_uses;
    return;
  end if;
  if r.token_uses >= r.token_max_uses then
    return query select 'limit'::text, null::text, null::text, r.token_uses, r.token_max_uses;
    return;
  end if;
  update public.whitepaper_requests set token_uses = token_uses + 1 where id = r.id;
  return query select 'ok'::text, r.papers, r.cta_id, r.token_uses + 1, r.token_max_uses;
end;
$$;

revoke all on function public.consume_whitepaper_token(text) from public, anon, authenticated;
grant execute on function public.consume_whitepaper_token(text) to service_role;

-- 資料（PDF）と限定動画の置き場。非公開。ポリシーを作らないので、署名つきURL（service role が発行）でしか読めない。
-- 置くファイル名: papers/whitepaper-a.pdf, papers/whitepaper-b.pdf, video/limited.mp4
insert into storage.buckets (id, name, public)
values ('whitepapers', 'whitepapers', false)
on conflict (id) do update set public = false;
