// /ai-ops（AIと人のハイブリッド保守）解説ページの文言データ。
// 文言の差し替えはこのファイルだけで完結させる（ページ側に文言を書かない）。
// 出典：SPJ編集の確定原稿（2026-11-02）。構成はSPJ企画の情報設計どおり。
// 守ること：アプリ数は「35個（稼働22・停止13）」のみ。実測で確認できない数字は載せない。

export const AI_OPS_PATH = '/ai-ops';
export const AI_OPS_CANONICAL = 'https://sprintjapan.net/ai-ops';
const SITE_URL = 'https://sprintjapan.net/';
const SITE_NAME = 'スプリントジャパン株式会社';

// 公開日（JSON-LD の datePublished / dateModified と「○年○月時点」に使う）
export const AI_OPS_PUBLISHED = '2026-11-03';
export const AI_OPS_AS_OF = '2026年11月時点';

export const aiOpsMeta = {
  title: '35個のアプリをAIと人で保守する方法｜スプリントジャパン',
  description:
    'スプリントジャパンは、累計35個（稼働22・停止13）のアプリを、AIによる毎日の点検と人による最終判断の分担で保守しています。保守の3つの柱、AIと人の役割分担、よくある質問を紹介します。',
  ogTitle: '35個のアプリを、AIと人のハイブリッドで保守しています。｜スプリントジャパン',
  ogDescription:
    '毎日の点検と最初の対応はAI、判断と本番への反映は人。累計35個（稼働22・停止13）のアプリを支える保守の仕組みを公開しています。',
  twitterTitle: '35個のアプリを、AIと人のハイブリッドで保守しています。',
  twitterDescription: '点検と最初の対応はAI、判断と本番への反映は人。稼働22・停止13の内訳と、保守の3つの柱を紹介します。',
  siteName: SITE_NAME,
  locale: 'ja_JP',
  // 【仮】OGP専用画像は未制作（予定：https://sprintjapan.net/og/ai-ops.png）。
  // 空のあいだは index.html 既定の og:image / twitter:image をそのまま使う。
  ogImage: '',
};

export const aiOpsBreadcrumb = { home: 'トップ', current: 'AIと人のハイブリッド保守' };

export const aiOpsHero = {
  label: 'AI × Human Hybrid Operations',
  h1: '35個のアプリを、AIと人のハイブリッドで保守しています。',
  lead: '毎日の点検と最初の対応はAIが、判断と本番への反映は人が担います。',
  body: 'スプリントジャパンがこれまでに作ったアプリは累計35個。いま動いているのは22個で、残りの13個は役目を終えたものとして止めています。人の役割は、AIへの指示・確認・最終判断に絞っています。',
  primaryCta: 'AIアプリの保守について相談する',
  secondaryCta: '保守の仕組みを見る',
};

export interface AiOpsStat {
  value: string;
  unit: string;
  label: string;
  counted: string;
}

// 確定値のみ（35・22・13）。追加の実測値は出典・計測期間・数え方が揃ってから足す。
export const aiOpsStats: AiOpsStat[] = [
  { value: '35', unit: '個', label: 'これまでに作ったアプリ（累計）', counted: 'これまでに当社が作り、保守の対象にしてきたアプリの累計' },
  { value: '22', unit: '個', label: 'いま稼働中', counted: 'そのうち、いま稼働しているアプリ' },
  { value: '13', unit: '個', label: '止めたもの（役目を終えたアプリ）', counted: '棚卸しの結果、止めると判断したアプリ' },
];

export const aiOpsWhy = {
  label: 'Why',
  h2: '作るより、守るほうが難しくなった',
  paragraphs: [
    'AIの力で、アプリは以前よりずっと速く作れるようになりました。一方で、数が増えるほど、毎日の点検、不具合への対応、更新の確認に人の時間が消えていきます。',
    '全部を人が見ようとすると、手が回らなくなります。かといって全部をAIに任せると、品質や責任の所在があいまいになります。',
    'そこで私たちは、最初に「AIがやること」と「人が決めること」の線を引きました。繰り返しの点検と最初の対応はAIに任せ、人は指示・確認・最終判断に集中する。この分担が、少人数で35個のアプリを見続けられている理由です。',
  ],
};

export interface AiOpsPillar {
  no: string;
  title: string;
  body: string;
}

export const aiOpsPillars = {
  label: 'Three Pillars',
  h2: '保守を支える3つの柱',
  items: [
    {
      no: '1',
      title: '毎日の自動点検と、異常の知らせ',
      body: 'AIが毎日アプリの状態を確かめ、止まっている、反応がない、エラーが増えた、といった変化を見つけると、担当者のチャット通知に知らせます。',
    },
    {
      no: '2',
      title: '直し方の案はAIが作り、人が確かめてから本番へ',
      body: '不具合の報告や利用者からの要望が届くと、AIが原因の見立てと直し方の案をまとめ、確認用の画面で実際の動きを試します。本番に出すかどうかは、人がその画面を見て決めます。AIが本番を勝手に変えることはありません。',
    },
    {
      no: '3',
      title: '棚卸しで「止める」を決めるのも保守のうち',
      body: '定期的にすべてのアプリを見直し、使われなくなったもの、役目を終えたものは止めます。35個のうち13個を止めているのは、失敗の数ではありません。手を広げすぎず、稼働中の22個に力を集めるための判断です。止める判断も、保守の大事な仕事だと考えています。',
    },
  ] as AiOpsPillar[],
};

export const aiOpsRoles = {
  label: 'AI / Human',
  h2: 'AIがやること、人が決めること',
  aiHeader: 'AIがやること',
  humanHeader: '人が決めること',
  rows: [
    { ai: '毎日の状態チェックと異常の知らせ', human: '何を「異常」とみなすかの基準' },
    { ai: '不具合の原因の見立て、直し方の案づくり', human: 'その直し方で本番に出すかどうか' },
    { ai: '確認用の画面での動作確認、変更内容の記録', human: '公開してよいかの最終判断' },
    { ai: '利用者の声の整理、改善案の提示', human: 'どの改善を先にやるか、どのアプリを止めるか' },
  ],
  notePrefix: '人の役割は、',
  noteStrong: '指示・確認・最終判断',
  noteSuffix: 'の3つです。',
};

export const aiOpsNumbers = {
  label: 'Numbers',
  h2: '数字で見る保守の実際',
  numberHeader: '数字',
  countedHeader: '何を数えたか',
  summary:
    '稼働中の22個に保守の手間を集中させ、役目を終えたものは早めに止める。この「増やす」と「畳む」の両方を続けることで、数が増えても保守が回る状態を保っています。',
  asOf: `※ 数字は${AI_OPS_AS_OF}。`,
};

export const aiOpsForClients = {
  label: 'For Clients',
  h2: '同じ考え方を、お客様の現場にも',
  lead: 'この保守の考え方は、社内だけのものではありません。AIで作ったアプリを公開後も安定して動かすためのサービスとして、お客様にも提供しています。',
  newsPrefix: '詳しくはニュース「',
  newsLinkText: 'AI アプリのAI / 人間ハイブリッド運用保守サービスを開始しました。',
  newsSuffix: '」をご覧ください。',
  newsPath: '/news/ai-human-hybrid-ops-service',
  services: [
    { name: '企業のAI実装（FDE）', body: '社内で作ったAIアプリや業務ツールを、点検と分担の考え方で守れるよう、現場に合わせて一緒に作ります。' },
    { name: '経営者向けAIコーチング', body: '「どこまでAIに任せ、どこを人が決めるか」の線引きを、経営者と一緒に決めます。' },
    { name: 'AI実践コミュニティ', body: '作った人が自分で保守まで回せるよう、点検と判断の考え方をお伝えします。' },
  ],
};

export interface AiOpsFaq {
  q: string;
  a: string;
}

export const aiOpsFaq = {
  label: 'FAQ',
  h2: 'よくある質問',
  items: [
    {
      q: 'AIに任せて、勝手に本番が変わることはありませんか？',
      a: 'ありません。AIが作るのは直し方の案と、確認用の画面までです。本番に出すかどうかは、必ず人が確かめて決めます。',
    },
    {
      q: '停止中の13個は、失敗したアプリですか？',
      a: 'いいえ。役目を終えた、または使われなくなったため、棚卸しで止めると判断したアプリです。止める判断も保守の一部と考えており、そのぶん稼働中の22個に力を集めています。',
    },
    {
      q: '少人数でも、本当に回るのですか？',
      a: '毎日の点検と最初の対応をAIが受け持ち、人は基準づくりと最終判断に集中しています。この分担によって、少人数でも35個のアプリを見続けられています。',
    },
    {
      q: '自社で作ったAIアプリやツールにも、同じ仕組みを入れられますか？',
      a: 'はい。アプリの数や使っている環境に合わせて、点検する内容と人が確認するポイントを一緒に設計します。まずはお問い合わせからご相談ください。',
    },
    {
      q: '利用者から見て、何が変わりますか？',
      a: '不具合に早く気づけるので、アプリが止まっている時間を短くできます。万一のときは、利用者向けの案内メッセージをすぐに表示できるようにしています。',
    },
  ] as AiOpsFaq[],
  cta: '自社のAIアプリについて相談する',
};

export const aiOpsClosing = {
  h2: '作ったAIを、止めずに育てる体制づくりを一緒に。',
  body: 'AIで作ったアプリや業務ツールを、公開した後も安心して使い続けるために。点検の仕組みづくりから、AIと人の分担の決め方、社内で回せるようになるまでの教育まで、ご相談をお受けしています。',
  cta: 'AIアプリ・業務ツールの保守を相談する',
};

// /ai-ops 新設を伝えるニュース記事のうち、OGP（静的HTML）でも使う項目。本文は newsData.ts。
// 画像の import を含まないので、ビルド時のプラグイン（vite-plugins/staticOgPages.ts）からも読める。
export const aiOpsNewsArticle = {
  id: 'ai-ops-page-launch',
  title: '35個のアプリをAIと人でどう保守しているか、その仕組みを解説するページを公開しました。',
  // 代替案B: '作ったAIアプリを止めずに守るには。35個（稼働22・停止13）を保守する当社の方法を公開しました。'
  // 代替案C: '毎日の点検はAI、本番への判断は人。35個のアプリを支えるハイブリッド保守の解説ページを公開しました。'
  // 公開日は /ai-ops と同日
  date: '2026年11月03日',
  excerpt:
    '当社がこれまでに作った累計35個（稼働22・停止13）のアプリを、AIと人の分担でどう保守しているかをまとめた解説ページ「AIと人のハイブリッド保守」を公開しました。',
};

// トップページの帯（入口）。SPJ企画の推奨案A。スマホではサブ文を省略する。
export const aiOpsHomeBanner = {
  label: 'AI Ops',
  main: '35個のアプリを、AIと人のハイブリッドで保守しています。',
  sub: '毎日の点検はAI、本番への判断は人。その分担を公開しました。',
  cta: '保守の仕組みを見る →',
};

// 構造化データ（JSON-LD）：FAQPage（FAQ文言から自動生成）
export const buildAiOpsFaqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: aiOpsFaq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

// 構造化データ（JSON-LD）：WebPage ＋ Article ＋ BreadcrumbList
export const buildAiOpsPageJsonLd = () => {
  const org = { '@type': 'Organization', name: SITE_NAME, url: SITE_URL };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${AI_OPS_CANONICAL}#webpage`,
        url: AI_OPS_CANONICAL,
        name: aiOpsMeta.title,
        description:
          'スプリントジャパンは、累計35個（稼働22・停止13）のアプリを、AIによる毎日の点検と人による最終判断の分担で保守しています。',
        inLanguage: 'ja',
        isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
        breadcrumb: { '@id': `${AI_OPS_CANONICAL}#breadcrumb` },
      },
      {
        '@type': 'Article',
        '@id': `${AI_OPS_CANONICAL}#article`,
        headline: aiOpsHero.h1,
        mainEntityOfPage: { '@id': `${AI_OPS_CANONICAL}#webpage` },
        datePublished: AI_OPS_PUBLISHED,
        dateModified: AI_OPS_PUBLISHED,
        inLanguage: 'ja',
        ...(aiOpsMeta.ogImage ? { image: aiOpsMeta.ogImage } : {}),
        author: org,
        publisher: org,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${AI_OPS_CANONICAL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: aiOpsBreadcrumb.home, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: aiOpsBreadcrumb.current, item: AI_OPS_CANONICAL },
        ],
      },
    ],
  };
};
