// サービス一覧（ナビのドロップダウン・スマホメニュー・/services ページの正本）
export interface ServiceItem {
  id: string;
  navLabel: string; // ナビ用の短い名前
  name: string; // カードの見出し
  navSub?: string; // サブタイトル（ナビの説明行・カードの小見出し。なければ name）
  en: string;
  description: string; // 何をするか（1行）
  to: string;
  linkLabel: string;
  featured?: boolean;
}

export const SERVICES_PATH = '/services';

export const services: ServiceItem[] = [
  {
    id: 'fde',
    navLabel: '企業のAI実装（FDE）',
    name: '企業のAI実装（FDE）',
    navSub: '短期間で成果につなげる伴走支援',
    en: 'Enterprise AI FDE',
    description: '経営と現場のあいだに入り、業務にAIを組み込むところから運用・改善まで、同じチームで伴走します。',
    to: '/#services',
    linkLabel: 'トップページで詳しく見る',
  },
  {
    id: 'coaching',
    navLabel: '経営者向けAIコーチング',
    name: '経営者向けAIコーチング',
    navSub: '適応能力と成長支援',
    en: 'Executive AI Coaching',
    description: '経営者ご本人が、事業を動かすAIチームを持てるよう、1対1で伴走します。',
    to: '/#services',
    linkLabel: 'トップページで詳しく見る',
  },
  {
    id: 'education',
    navLabel: 'AI実践コミュニティ',
    name: 'AI実践コミュニティ',
    navSub: '仲間を作って高め合う場',
    en: 'AI Education & Community',
    description: '経営とAIの実践知を学び合う場を運営しています。学びから実装へつながる入口です。',
    to: '/ai-discovery-community/',
    linkLabel: 'コミュニティを見る',
  },
  {
    id: 'ai-ops',
    navLabel: 'アプリのAI運用保守',
    name: 'アプリのAI運用保守',
    navSub: '効果的な次世代運用保守',
    en: 'AI Ops',
    description: 'AIで作ったアプリを、公開後も安心して使い続けられるよう、AIと人の分担で保守します。当社の累計35個（稼働22・停止13）のアプリもこの形で守っています。',
    to: '/ai-ops',
    linkLabel: '保守の仕組みを見る',
    featured: true,
  },
];

export const servicesMeta = {
  title: 'サービス｜スプリントジャパン株式会社',
  description: 'スプリントジャパンのサービス一覧。企業のAI実装（FDE）、経営者向けAIコーチング、AI実践コミュニティ、アプリのAI運用保守を提供しています。',
};
