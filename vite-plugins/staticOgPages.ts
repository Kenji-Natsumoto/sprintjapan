/**
 * X などのSNSのリンクカード用に、指定したページ（/ai-ops・記事・プロフィール）だけ「head を書き換えた静的HTML」をビルド時に作る。
 *
 * SNSのカード取得はJavaScriptを実行しないため、画面側（React）で入れた title / OGP は読まれない。
 * そこで dist/index.html を写し、<!-- seo:start --> 〜 <!-- seo:end --> の範囲をページ専用のタグに差し替えて
 *   dist/<path>/index.html と dist/<path>.html
 * の2つに書き出す（ホスティングによって /<path> に対して読むファイルが違うため両方置く）。
 * 中身は index.html と同じ SPA なので、ブラウザでは通常どおり React が起動してルーティングする。
 * 文言は src/data/aiOpsData.ts が正本。
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  AI_OPS_CANONICAL,
  AI_OPS_PATH,
  aiOpsMeta,
  aiOpsNewsArticle,
  buildAiOpsFaqJsonLd,
  buildAiOpsPageJsonLd,
} from '../src/data/aiOpsData';
import { SITE_DEFAULT_DESCRIPTION, SITE_DEFAULT_TITLE } from '../src/data/siteMeta';
import { PROFILE_PATH, profileMeta } from '../src/data/profileMeta';
import { SERVICES_PATH, servicesMeta } from '../src/data/servicesData';

const SITE_ORIGIN = 'https://sprintjapan.net';
const SITE_NAME = 'スプリントジャパン株式会社';
const START = '<!-- seo:start -->';
const END = '<!-- seo:end -->';

// 専用OGP画像の予定パス。public/ にファイルがあるときだけ使い、無ければ index.html 既定の画像を使う。
const PLANNED_OG_IMAGE = '/og/ai-ops.png';

interface OgPage {
  route: string; // 先頭スラッシュあり・末尾スラッシュなし
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  ogType: 'website' | 'article' | 'profile';
  // ページ固有の画像（無ければ共通の image を使う）
  image?: string;
  // true なら index.html 既定のカード画像を使う（/ai-ops 用の画像にしない）
  siteDefaultImage?: boolean;
  jsonLd?: { id: string; data: unknown }[];
}

const pages = (): OgPage[] => [
  {
    route: SERVICES_PATH,
    title: servicesMeta.title,
    description: servicesMeta.description,
    ogTitle: servicesMeta.title,
    ogDescription: servicesMeta.description,
    twitterTitle: servicesMeta.title,
    twitterDescription: servicesMeta.description,
    ogType: 'website',
    siteDefaultImage: true,
  },
  {
    route: AI_OPS_PATH,
    title: aiOpsMeta.title,
    description: aiOpsMeta.description,
    ogTitle: aiOpsMeta.ogTitle,
    ogDescription: aiOpsMeta.ogDescription,
    twitterTitle: aiOpsMeta.twitterTitle,
    twitterDescription: aiOpsMeta.twitterDescription,
    ogType: 'article',
    // React 側（AiOps.tsx）は同じ id の要素を差し替えるので二重にならない
    jsonLd: [
      { id: 'ai-ops-faq-jsonld', data: buildAiOpsFaqJsonLd() },
      { id: 'ai-ops-page-jsonld', data: buildAiOpsPageJsonLd() },
    ],
  },
  {
    route: `/news/${aiOpsNewsArticle.id}`,
    // NewsDetail.tsx の document.title と同じ形
    title: `${aiOpsNewsArticle.title}｜${SITE_NAME}`,
    description: aiOpsNewsArticle.excerpt,
    ogTitle: `${aiOpsNewsArticle.title}｜${SITE_NAME}`,
    ogDescription: aiOpsNewsArticle.excerpt,
    twitterTitle: aiOpsNewsArticle.title,
    twitterDescription: aiOpsNewsArticle.excerpt,
    ogType: 'article',
  },
  {
    // 公開中のプロフィールのカードを維持（og:type は旧既定と同じ website）
    route: PROFILE_PATH,
    title: profileMeta.title,
    description: profileMeta.description,
    ogTitle: profileMeta.ogTitle,
    ogDescription: profileMeta.ogDescription,
    twitterTitle: profileMeta.twitterTitle,
    twitterDescription: profileMeta.twitterDescription,
    ogType: 'website',
    image: profileMeta.ogImage,
  },
];

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// JSON を <script> に埋めるときに </script> で閉じられないようにする
const jsonForScript = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

const readDefaultImage = (html: string) =>
  html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? '';

const renderHead = (page: OgPage, image: string) => {
  const url = `${SITE_ORIGIN}${page.route}`;
  const lines = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="${page.ogType}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="ja_JP" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(page.ogTitle)}">`,
    `<meta property="og:description" content="${esc(page.ogDescription)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.twitterTitle)}">`,
    `<meta name="twitter:description" content="${esc(page.twitterDescription)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
    ...(page.jsonLd ?? []).map(
      (j) => `<script type="application/ld+json" id="${j.id}">${jsonForScript(j.data)}</script>`,
    ),
  ];
  return lines.map((l) => `    ${l}`).join('\n');
};

const replaceSeoBlock = (html: string, head: string | null) => {
  const s = html.indexOf(START);
  const e = html.indexOf(END);
  if (s < 0 || e < 0 || e < s) {
    throw new Error('[static-og-pages] index.html に seo:start / seo:end の印が見つかりません');
  }
  const inner = head ?? html.slice(s + START.length, e).replace(/^\n/, '').replace(/\s+$/, '');
  return `${html.slice(0, s)}${inner.trimStart()}${html.slice(e + END.length)}`;
};

export const staticOgPages = (): Plugin => {
  let config: ResolvedConfig;
  return {
    name: 'static-og-pages',
    apply: 'build',
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const html = fs.readFileSync(indexPath, 'utf8');

      // 画面側が戻し先に使うサイト既定値（src/data/siteMeta.ts）と index.html の文言がずれていたら止める
      for (const v of [SITE_DEFAULT_TITLE, SITE_DEFAULT_DESCRIPTION]) {
        if (!html.includes(esc(v)) && !html.includes(v)) {
          throw new Error(`[static-og-pages] index.html の既定文言が src/data/siteMeta.ts と一致しません: ${v}`);
        }
      }

      const plannedFile = path.join(config.publicDir, PLANNED_OG_IMAGE);
      const image =
        aiOpsMeta.ogImage ||
        (fs.existsSync(plannedFile) ? `${SITE_ORIGIN}${PLANNED_OG_IMAGE}` : readDefaultImage(html));

      for (const page of pages()) {
        const out = replaceSeoBlock(html, renderHead(page, page.image ?? (page.siteDefaultImage ? readDefaultImage(html) : image)));
        const rel = page.route.replace(/^\//, '');
        const dirFile = path.join(outDir, rel, 'index.html');
        fs.mkdirSync(path.dirname(dirFile), { recursive: true });
        fs.writeFileSync(dirFile, out);
        fs.writeFileSync(path.join(outDir, `${rel}.html`), out);
      }

      // 通常の index.html からは印だけ外す（中身は既定のまま）
      fs.writeFileSync(indexPath, replaceSeoBlock(html, null));
      config.logger.info(`[static-og-pages] ${pages().map((p) => p.route).join(', ')} の静的HTMLを書き出しました`);
    },
  };
};
