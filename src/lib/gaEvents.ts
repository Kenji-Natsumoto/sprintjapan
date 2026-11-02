/**
 * GA4 のイベント名と placement（置き場所）の一覧（唯一の正本）。
 * 名前を変えるときはこのファイルだけを直す。
 *
 * - /contact へのクリック  → contact_click
 * - /ai-ops へのクリック   → aiops_link_click
 */
export const GA_EVENTS = {
  contactClick: 'contact_click',
  aiOpsClick: 'aiops_link_click',
  // 任意の補助計測（必須ではない）
  aiOpsNewsClick: 'ai_ops_news_click',
  aiOpsFaqOpen: 'ai_ops_faq_open',
} as const;

export const GA_PLACEMENTS = {
  // contact_click 用
  aiOpsHero: 'ai_ops_hero',
  aiOpsFaq: 'ai_ops_faq',
  aiOpsFooter: 'ai_ops_footer',
  newsAiOps: 'news_ai_ops',
  // aiops_link_click 用
  homeAiOpsBand: 'home_aiops_band',
  newsAiOpsBody: 'news_ai_ops_body',
  // ai_ops_news_click 用
  aiOpsService: 'ai_ops_service',
} as const;

export type GaEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];
export type GaPlacement = (typeof GA_PLACEMENTS)[keyof typeof GA_PLACEMENTS];

export const isGaEventName = (v: string | null | undefined): v is GaEventName =>
  !!v && (Object.values(GA_EVENTS) as string[]).includes(v);
