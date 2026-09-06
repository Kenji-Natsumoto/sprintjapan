/**
 * ニュースのカテゴリ定義（唯一の正本）。
 *
 * この配列は 2026-09-06 以前、NewsAdmin.tsx の中にだけ存在していた。
 * 一覧側（News.tsx）が同じ定義を知らなかったため、読者はカテゴリで
 * 記事を絞り込めなかった。値そのものは1文字も変更していない。
 *
 * 並び順はそのまま表示順に使う。
 */
export const NEWS_CATEGORIES = [
  'テクノロジー',
  'プロダクト',
  '企業情報',
  'イベント',
  'お知らせ',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

/** 記事が1本も無いカテゴリは一覧に出さないため、実データ側から並びを作る。 */
export const orderCategories = (found: Iterable<string>): string[] => {
  const present = new Set(found);
  const known = NEWS_CATEGORIES.filter((c) => present.has(c));
  // 定義に無いカテゴリ（DB から入った値）も落とさず末尾に並べる
  const unknown = [...present].filter((c) => !NEWS_CATEGORIES.includes(c as NewsCategory)).sort();
  return [...known, ...unknown];
};

/** URL の ?category= に入れる値。日本語をそのまま使い、読める URL にする。 */
export const CATEGORY_PARAM = 'category';
