// /profile/kenji_natsumoto の title / description と、SNSカード用のOGP。
// OGP は公開中サイトの旧既定値（会社情報｜プロフィールのカード）をそのまま残すためのもの（main の index.html から転記）。
// 画面（ProfileNatsumoto.tsx）とビルド時の静的HTML（vite-plugins/staticOgPages.ts）の両方がここを読む。

export const PROFILE_PATH = '/profile/kenji_natsumoto';

export const profileMeta = {
  title: '夏本 健司｜スプリントジャパン株式会社 代表取締役',
  description:
    '夏本健司（スプリントジャパン株式会社 代表取締役）。あなたの会社がAIネイティブに変わり、満足するアウトカムを創出するまで並走します。9年の事業開発・組織開発の現場と、自社をAIネイティブに作り替えた実装知で、経営者に伴走します。',
  ogTitle: 'スプリントジャパン【公式】会社情報｜夏本健司プロフィール',
  ogDescription: '事業創造イノベーター / AI ソロプレナー。スプリントジャパン株式会社 代表取締役 「AI-Native COMPANY-Lab」主宰。バイブコーディングの専門家。セミナーやレクチャー、研修など多数登壇。',
  twitterTitle: 'スプリントジャパン【公式】会社情報｜夏本健司プロフィール',
  twitterDescription: '事業創造イノベーター / AI ソロプレナー。スプリントジャパン株式会社 代表取締役 「AI-Native COMPANY-Lab」主宰。バイブコーディングの専門家。セミナーやレクチャー、研修など多数登壇。',
  ogImage: 'https://storage.googleapis.com/gpt-engineer-file-uploads/6xn0d7KKWnhXvalE1cT7DF0SSBI3/social-images/social-1760260885951-スクリーンショット 2025-10-12 17.30.23.png',
};
