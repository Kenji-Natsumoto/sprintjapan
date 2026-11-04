// 資料申込の送信と、受け取りページの合い鍵の確認。
// 本番ビルドでは Supabase のエッジ関数（submit-whitepaper-request / get-whitepaper-access）を呼ぶ。
// 手元の確認用に、開発サーバー（import.meta.env.DEV）か VITE_WP_MOCK=1 でビルドしたときだけ、
// ブラウザの localStorage を使う見本の動きに切り替える（本番ドメインでは見本は動かない）。
import { supabase } from '@/integrations/supabase/client';
import type { PaperChoice, PaperId } from '@/data/whitepaperData';
import { WP_TOKEN_DAYS, WP_TOKEN_MAX_USES } from '@/data/whitepaperData';

export interface WpSubmitInput {
  papers: PaperChoice;
  name: string;
  email: string;
  company: string;
  role: string;
  consent: boolean;
  opt_in: boolean;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_path: string;
  website: string; // 罠の欄（人は空のまま）
}

export type WpAccessStatus = 'ok' | 'invalid' | 'expired' | 'limit' | 'error';

export interface WpAccess {
  status: WpAccessStatus;
  papers?: PaperChoice;
  cta_id?: string | null;
  uses?: number;
  max_uses?: number;
  files?: { id: PaperId; url: string | null }[];
  video?: string | null;
}

const MOCK_ENABLED =
  (import.meta.env.DEV || import.meta.env.VITE_WP_MOCK === '1') &&
  typeof window !== 'undefined' &&
  !/(^|\.)sprintjapan\.net$/.test(window.location.hostname);

export const isWpMock = MOCK_ENABLED;

// ---- 見本（手元だけ） ----
const MOCK_KEY = 'sj-wp-mock-requests';
const MOCK_FILES_KEY = 'sj-wp-mock-files'; // '1' ならファイルがある想定で表示する

interface MockRow {
  papers: PaperChoice;
  cta_id: string | null;
  expires: number;
  uses: number;
  max: number;
}

const mockLoad = (): Record<string, MockRow> => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_KEY) || '{}');
  } catch {
    return {};
  }
};

const randomToken = () => {
  const b = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const mockSubmit = async (input: WpSubmitInput): Promise<string> => {
  await new Promise((r) => setTimeout(r, 300));
  const rows = mockLoad();
  const token = randomToken();
  rows[token] = {
    papers: input.papers,
    cta_id: input.utm_content || null,
    expires: Date.now() + WP_TOKEN_DAYS * 86400000,
    uses: 0,
    max: WP_TOKEN_MAX_USES,
  };
  localStorage.setItem(MOCK_KEY, JSON.stringify(rows));
  console.info('[wp-mock] 申込を手元に保存しました（メールは送っていません）');
  return token;
};

const mockAccess = async (token: string): Promise<WpAccess> => {
  await new Promise((r) => setTimeout(r, 200));
  const rows = mockLoad();
  const row = rows[token];
  if (!row) return { status: 'invalid' };
  if (row.expires <= Date.now()) return { status: 'expired' };
  if (row.uses >= row.max) return { status: 'limit' };
  row.uses += 1;
  localStorage.setItem(MOCK_KEY, JSON.stringify(rows));
  const hasFiles = localStorage.getItem(MOCK_FILES_KEY) === '1';
  const ids: PaperId[] = row.papers === 'both' ? ['A', 'B'] : [row.papers];
  return {
    status: 'ok',
    papers: row.papers,
    cta_id: row.cta_id,
    uses: row.uses,
    max_uses: row.max,
    files: ids.map((id) => ({ id, url: hasFiles ? `#mock-whitepaper-${id.toLowerCase()}` : null })),
    video: null,
  };
};

// ---- 本番 ----
export const submitWhitepaperRequest = async (input: WpSubmitInput): Promise<string | null> => {
  if (MOCK_ENABLED) return mockSubmit(input);
  const { data, error } = await supabase.functions.invoke('submit-whitepaper-request', { body: input });
  if (error) throw error;
  return (data?.token as string | null) ?? null;
};

export const getWhitepaperAccess = async (token: string): Promise<WpAccess> => {
  if (MOCK_ENABLED) return mockAccess(token);
  const { data, error } = await supabase.functions.invoke('get-whitepaper-access', { body: { token } });
  if (error) return { status: 'error' };
  return data as WpAccess;
};
