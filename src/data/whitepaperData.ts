// 資料（ホワイトペーパー）申込ページの文言の正本。
// 所属（第5のサービスか、AI実践コミュニティの中か）は未定。文言はどちらにも寄せない。
// アプリ数の内訳を書くときは必ず「35個（稼働22・停止13）」。

export const WP_START_PATH = '/ai-discovery-community/start';
export const WP_THANKS_PATH = '/ai-discovery-community/start/thanks';
export const PRIVACY_PATH = '/privacy';

export const WP_TOKEN_DAYS = 7;
export const WP_TOKEN_MAX_USES = 5;

export type PaperId = 'A' | 'B';
export type PaperChoice = PaperId | 'both';

export const wpMeta = {
  title: '無料資料のお申し込み｜スプリントジャパン株式会社',
  description:
    'AIで事業を動かす現場から、2つの資料をお届けします。35個のアプリを動かしてきた中で分かったことを、無料の資料にまとめました（準備中・できたらお知らせ）。',
};

export const wpThanksMeta = {
  title: 'お申し込みありがとうございます｜スプリントジャパン株式会社',
};

export interface Paper {
  id: PaperId;
  label: string;
  title: string;
  // 狭い画面で句の途中で折れないよう、見出しを句ごとに分けたもの
  titleParts: string[];
  audience: string;
  body: string;
}

export const papers: Paper[] = [
  {
    id: 'A',
    label: '資料A',
    title: '複数アプリを企画管理する仕組み（仮）',
    titleParts: ['複数アプリを', '企画管理する仕組み（仮）'],
    audience: '経営者・事業オーナーの方へ',
    body: 'どのアプリを続け、どれを止めるか。いくつものアプリを、どう見守るか。経営の目線で判断するための考え方をまとめます。',
  },
  {
    id: 'B',
    label: '資料B',
    title: 'バイブコーディングのマーケティング方法（仮）',
    titleParts: ['バイブコーディングの', 'マーケティング方法（仮）'],
    audience: '個人開発者・新規事業担当の方へ',
    body: 'AIで作ったアプリを、作りながらどう知ってもらい、どう届けるか。発信と届け方の考え方をまとめます。',
  },
];

export const paperChoiceLabel: Record<PaperChoice, string> = {
  A: '資料A',
  B: '資料B',
  both: '両方',
};

export const ROLE_OPTIONS = ['経営者', '事業責任者', '開発者', 'その他'] as const;

export const wpFaqs = [
  {
    q: '無料ですか？',
    a: 'はい、無料です。お名前とメールアドレスをご登録いただくと受け取れます。',
  },
  {
    q: '営業の連絡が来ますか？',
    a: '資料のお届けとお申し込みの確認のほかに、こちらから営業のご連絡はしません。今後のお知らせは、「受け取る」を選んだ方にだけお送りします。',
  },
  {
    q: '資料はいつまで読めますか？',
    a: `受け取りページは、お申し込みから${WP_TOKEN_DAYS}日間、${WP_TOKEN_MAX_USES}回まで開けます。ダウンロードした資料は、その後もお手元でお読みいただけます。期限が過ぎたときは、もう一度お申し込みください。`,
  },
];
