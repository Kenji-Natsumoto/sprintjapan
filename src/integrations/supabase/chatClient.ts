// チャット（右下ポップアップと /chat）専用の接続。
// ブラウザごとの会話番号を毎回 x-chat-session ヘッダーで送り、
// データベース側の規則で「その番号の会話だけ」読み書きできるようにする。
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const SESSION_KEY = 'chat_session_id';

export const getChatSessionId = (): string => {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

// 毎回のリクエストで最新の番号を付ける（localStorage が消えても食い違わない）
const chatFetch = (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
  const headers = new Headers(init.headers);
  headers.set('x-chat-session', getChatSessionId());
  return fetch(input, { ...init, headers });
};

export const chatSupabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'sb-chat-anon',
  },
  global: { fetch: chatFetch },
});
