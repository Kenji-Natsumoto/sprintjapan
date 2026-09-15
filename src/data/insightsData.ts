// インサイト（論文・設計ガイド）の索引データ。表示順＝この配列順。
// 本文は各ページ（src/pages/insights/*, src/pages/*.tsx）の content 定数が正本の写し。

export type InsightFloor = '1F' | '2F' | 'ACE';
export type InsightCategory = '論文' | '設計ガイド';
export type InsightStatus = 'v0.1 初稿' | 'LOCKED' | '公開中';

export interface InsightItem {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  version: string;
  status: InsightStatus;
  floor: InsightFloor;
  category: InsightCategory;
  excerpt: string;
  featured?: boolean;
}

export const FLOOR_LABEL: Record<InsightFloor, string> = {
  ACE: 'ACE（全体）',
  '1F': '1F Lights Out Factory',
  '2F': '2F Lights On Bridge',
};

export const insightsData: InsightItem[] = [
  {
    id: 'ace-two-story',
    path: '/insights/ace-two-story/',
    title: 'AI Centered Enterprise（ACE）',
    subtitle: '― 二階建て工場：意思決定と実行を、一つの構造へ ―',
    author: '夏本健司',
    date: '2026-09-15',
    version: 'v0.1',
    status: 'v0.1 初稿',
    floor: 'ACE',
    category: '論文',
    excerpt:
      'AI-Native Company の到達形を ACE と呼び、1F Lights Out Factory（実行）と 2F Lights On Bridge（決定）が一つの環で閉じる企業として定義する。',
    featured: true,
  },
  {
    id: 'closed-loop',
    path: '/insights/closed-loop/',
    title: 'Closed Loop と「学習するAI組織」',
    subtitle: '― AI人格は分けろ、プロセスは分けるな ―',
    author: '夏本健司',
    date: '2026-05-30',
    version: 'v0.1',
    status: 'LOCKED',
    floor: '1F',
    category: '論文',
    excerpt:
      '実装層を AI人格／実行主体／Closed Loop の三層に分離し、ワークフローと Closed Loop が別概念であることを示す。',
  },
  {
    id: 'decision-generating-company',
    path: '/insights/closed-loop/#papers',
    title: 'AIエージェント集合体による「意思決定生成企業」の提案',
    subtitle: '― AIが意思決定に「署名する」組織モデルの理論的考察 ―',
    author: '夏本健司',
    date: '2026-03',
    version: 'v0.1',
    status: '公開中',
    floor: '2F',
    category: '論文',
    excerpt: 'CEO機能を分解し、意思決定の生成・評価・固定をAIに委譲する企業モデルを提案する。',
  },
  {
    id: 'harness-infrastructure',
    path: '/insights/harness-infrastructure/',
    title: 'AI-Native Companyのためのハーネス・インフラ設計',
    subtitle: '― 人間の物理的制約から解放された組織OSの構築原理 ―',
    author: '夏本健司',
    date: '2026-04-26',
    version: 'v0.1',
    status: '公開中',
    floor: '1F',
    category: '設計ガイド',
    excerpt: '常時稼働性・遠隔監督性・データ統合性を満たす4層モデルと段階的移行戦略。',
  },
  {
    id: 'effectiveness-over-efficiency',
    path: '/insights/effectiveness-over-efficiency/',
    title: 'なぜ「AI業務効率化」は失敗するのか',
    subtitle: '― 効率性ではなく効果性を。2年後の組織を今設計する ―',
    author: '夏本健司',
    date: '2026-04-15',
    version: 'v0.1',
    status: '公開中',
    floor: '2F',
    category: '論文',
    excerpt: '効率性ではなく効果性を軸にした、AI時代の組織設計と経営者が答えるべき3つの問い。',
  },
  {
    id: 'organization-optimization',
    path: '/insights/organization-optimization/',
    title: 'AIカンパニー組織の最適化',
    subtitle: '― 階層からインテリジェンスへ：ドーシー・モデルとの統合 ―',
    author: '夏本健司',
    date: '2026-04-11',
    version: 'v0.1',
    status: '公開中',
    floor: '2F',
    category: '論文',
    excerpt: 'Block社の組織変革モデルを分析し、1-3人で動く逆ドーシー・モデルを提示する。',
  },
  {
    id: 'tool-integration-guide',
    path: '/insights/tool-integration-guide/',
    title: 'AI-Nativeスタートアップ ツール連携設計ガイド',
    subtitle: '― 1-3人チームのための実装アーキテクチャ ―',
    author: '夏本健司',
    date: '2026-04-11',
    version: 'v0.1',
    status: '公開中',
    floor: '1F',
    category: '設計ガイド',
    excerpt: 'Claude Code・GitHub 等を統合し、小さなチームがAIエージェント群と協働するための実装ガイド。',
  },
];

// ホーム末尾に載せる新論文のアジェンダ（本文の章立てと同じ順）
export const ACE_AGENDA: string[] = [
  '結論',
  'なぜ今か——比率から構造へ',
  '二階建ての定義——1F 実行・2F 決定・階段',
  '1F Lights Out Factory——常設2レーン（Closed Loop／Gated Loop）',
  '2F Lights On Bridge——人と AI 人格の議論・署名',
  '階段——一つの閉じた環',
  '地下——記録と記憶',
  '効果',
  'ACE は何でないか',
  '今後',
];
