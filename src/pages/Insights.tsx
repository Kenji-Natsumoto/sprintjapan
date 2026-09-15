import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import SjShell from '@/components/SjShell';
import { insightsData, InsightStatus } from '@/data/insightsData';

// インサイト索引（参考: signity.sprintjapan.net/resources）。番号つきの1列カード・右上に状態バッジ・「論文を読む →」。
const DESCRIPTION = 'AIネイティブ経営の理論と実装。論文と設計ガイドを、版と日付つきで公開します。';

const badgeClass = (status: InsightStatus) => {
  if (status === 'v0.1 初稿') return 'bg-primary text-primary-foreground';
  if (status === 'LOCKED') return 'border border-primary/40 text-primary';
  return 'bg-muted text-muted-foreground';
};

const Insights = () => {
  useEffect(() => {
    document.title = 'インサイト | SPRINT Japan';
    const setMeta = (selector: string, attr: string, name: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    setMeta('meta[name="description"]', 'name', 'description', DESCRIPTION);
    setMeta('meta[property="og:title"]', 'property', 'og:title', 'インサイト | SPRINT Japan');
    setMeta('meta[property="og:description"]', 'property', 'og:description', DESCRIPTION);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/insights/`;
  }, []);

  const papers = insightsData.filter((i) => i.category === '論文');
  const guides = insightsData.filter((i) => i.category === '設計ガイド');

  const renderList = (items: typeof insightsData, offset: number) => (
    <div className="space-y-6">
      {items.map((item, n) => (
        <article key={item.id} className="glass-card hover-lift rounded-xl border border-border p-6 md:p-8 relative">
          <span className={`absolute top-5 right-5 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${badgeClass(item.status)}`}>
            {item.status}
          </span>
          <p className="font-mono text-xl font-bold text-primary mb-2">{String(offset + n + 1).padStart(2, '0')}</p>
          <h3 className="text-lg md:text-xl font-bold leading-snug mb-1 pr-24">
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.title}
            </Link>
          </h3>
          <p className="text-sm text-foreground/80 mb-3">{item.subtitle}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link to={item.path} className="inline-flex items-center gap-1 font-semibold text-primary hover:opacity-80">
              <FileText className="w-4 h-4" aria-hidden="true" />
              論文を読む →
            </Link>
            <span className="text-muted-foreground">
              {item.floor} ・ {item.date}（{item.version}）
            </span>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <SjShell>
      <main className="sj-brand">
        <section className="pt-16 pb-10 px-4 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">インサイト</h1>
            <p className="text-xl text-muted-foreground mb-3">{DESCRIPTION}</p>
            <p className="text-sm text-muted-foreground">段階公開中。順次追加・改版します。</p>
          </div>
        </section>

        <section className="pb-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">思想・論文</h2>
            {renderList(papers, 0)}
          </div>
        </section>

        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">設計ガイド</h2>
            {renderList(guides, papers.length)}
          </div>
        </section>
      </main>
    </SjShell>
  );
};

export default Insights;
