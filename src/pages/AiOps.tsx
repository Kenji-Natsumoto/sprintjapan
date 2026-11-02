import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SjShell from '@/components/SjShell';
import '@/styles/sj-ai-ops.css';
import {
  AI_OPS_CANONICAL,
  aiOpsBreadcrumb,
  aiOpsClosing,
  aiOpsFaq,
  aiOpsForClients,
  aiOpsHero,
  aiOpsMeta,
  aiOpsNumbers,
  aiOpsPillars,
  aiOpsRoles,
  aiOpsStats,
  aiOpsWhy,
  buildAiOpsFaqJsonLd,
  buildAiOpsPageJsonLd,
} from '@/data/aiOpsData';
import { trackAiOpsFaqOpen, trackAiOpsNewsClick, trackContactClick } from '@/hooks/useAnalytics';
import { GA_PLACEMENTS } from '@/lib/gaEvents';

const JSON_LD = [
  { id: 'ai-ops-faq-jsonld', build: buildAiOpsFaqJsonLd },
  { id: 'ai-ops-page-jsonld', build: buildAiOpsPageJsonLd },
];

// head タグを設定し、ページを離れるときに元の値へ戻す（他ページへ値が残らないように）
const useAiOpsHead = () => {
  useEffect(() => {
    const restores: Array<() => void> = [];

    const prevTitle = document.title;
    document.title = aiOpsMeta.title;
    restores.push(() => {
      document.title = prevTitle;
    });

    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      if (!value) return;
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (el) {
        const prev = el.getAttribute('content');
        const target = el;
        restores.push(() => {
          if (prev === null) target.removeAttribute('content');
          else target.setAttribute('content', prev);
        });
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        const created = el;
        restores.push(() => created.remove());
      }
      el.setAttribute('content', value);
    };

    setMeta('name', 'description', aiOpsMeta.description);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:title', aiOpsMeta.ogTitle);
    setMeta('property', 'og:description', aiOpsMeta.ogDescription);
    setMeta('property', 'og:url', AI_OPS_CANONICAL);
    setMeta('property', 'og:site_name', aiOpsMeta.siteName);
    setMeta('property', 'og:locale', aiOpsMeta.locale);
    setMeta('property', 'og:image', aiOpsMeta.ogImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', aiOpsMeta.twitterTitle);
    setMeta('name', 'twitter:description', aiOpsMeta.twitterDescription);
    setMeta('name', 'twitter:image', aiOpsMeta.ogImage);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      const prevHref = canonical.getAttribute('href');
      const target = canonical;
      restores.push(() => {
        if (prevHref === null) target.removeAttribute('href');
        else target.setAttribute('href', prevHref);
      });
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
      const created = canonical;
      restores.push(() => created.remove());
    }
    canonical.setAttribute('href', AI_OPS_CANONICAL);

    JSON_LD.forEach(({ id, build }) => {
      document.getElementById(id)?.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(build());
      document.head.appendChild(script);
      restores.push(() => script.remove());
    });

    return () => {
      restores.reverse().forEach((fn) => fn());
    };
  }, []);
};

const scrollToPillars = () => {
  // URLにハッシュを付けない（余計な page_view を出さず、utm 付きURLをそのまま保つ）
  document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const AiOps = () => {
  useAiOpsHead();

  return (
    <SjShell>
      <main className="sj-native sj-aiops">
        <div className="phero">
          <div className="wrap">
            <nav className="crumbs" aria-label="パンくずリスト">
              <Link to="/">{aiOpsBreadcrumb.home}</Link>
              <span aria-hidden="true"> ＞ </span>
              <span aria-current="page">{aiOpsBreadcrumb.current}</span>
            </nav>
            <span className="label">{aiOpsHero.label}</span>
            <h1>{aiOpsHero.h1}</h1>
            <p className="lead"><b>{aiOpsHero.lead}</b></p>
            <p className="lead">{aiOpsHero.body}</p>
            <div className="btns">
              <Link to="/contact" className="btn btn-primary" onClick={() => trackContactClick(GA_PLACEMENTS.aiOpsHero)}>
                {aiOpsHero.primaryCta}
              </Link>
              <button type="button" className="btn btn-ghost" onClick={scrollToPillars}>
                {aiOpsHero.secondaryCta}
              </button>
            </div>
          </div>
        </div>

        <div className="aiops-stats" aria-label="アプリ数">
          <div className="wrap">
            {aiOpsStats.map((s) => (
              <div className="stat" key={s.label}>
                <b>
                  {s.value}
                  <small>{s.unit}</small>
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="why">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">{aiOpsWhy.label}</span>
              <h2>{aiOpsWhy.h2}</h2>
            </div>
            {aiOpsWhy.paragraphs.map((p) => (
              <p key={p} className="body">{p}</p>
            ))}
          </div>
        </section>

        <section id="pillars" className="pillars">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">{aiOpsPillars.label}</span>
              <h2>{aiOpsPillars.h2}</h2>
            </div>
            <div className="pillar-grid">
              {aiOpsPillars.items.map((p) => (
                <article className="pillar" key={p.no}>
                  <span className="no">{p.no}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="roles">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">{aiOpsRoles.label}</span>
              <h2>{aiOpsRoles.h2}</h2>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">{aiOpsRoles.aiHeader}</th>
                    <th scope="col">{aiOpsRoles.humanHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {aiOpsRoles.rows.map((r) => (
                    <tr key={r.ai}>
                      <td>{r.ai}</td>
                      <td>{r.human}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="body">
              {aiOpsRoles.notePrefix}
              <b>{aiOpsRoles.noteStrong}</b>
              {aiOpsRoles.noteSuffix}
            </p>
          </div>
        </section>

        <section className="numbers">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">{aiOpsNumbers.label}</span>
              <h2>{aiOpsNumbers.h2}</h2>
            </div>
            <div className="table-scroll">
              <table className="num-table">
                <thead>
                  <tr>
                    <th scope="col">{aiOpsNumbers.numberHeader}</th>
                    <th scope="col">{aiOpsNumbers.countedHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {aiOpsStats.map((s) => (
                    <tr key={s.label}>
                      <td className="num-cell">
                        <b>
                          {s.value}
                          <small>{s.unit}</small>
                        </b>
                      </td>
                      <td>{s.counted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="body summary">{aiOpsNumbers.summary}</p>
            <p className="note">{aiOpsNumbers.asOf}</p>
          </div>
        </section>

        <section className="clients">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">{aiOpsForClients.label}</span>
              <h2>{aiOpsForClients.h2}</h2>
            </div>
            <p className="body">{aiOpsForClients.lead}</p>
            <p className="body news-link">
              {aiOpsForClients.newsPrefix}
              <Link
                to={aiOpsForClients.newsPath}
                onClick={() => trackAiOpsNewsClick(GA_PLACEMENTS.aiOpsService, aiOpsForClients.newsPath)}
              >
                {aiOpsForClients.newsLinkText}
              </Link>
              {aiOpsForClients.newsSuffix}
            </p>
            <div className="svc-grid">
              {aiOpsForClients.services.map((s) => (
                <div className="svc" key={s.name}>
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faq">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">{aiOpsFaq.label}</span>
              <h2>{aiOpsFaq.h2}</h2>
            </div>
            <div className="faq-list">
              {aiOpsFaq.items.map((f, i) => (
                <details
                  key={f.q}
                  onToggle={(e) => {
                    if ((e.currentTarget as HTMLDetailsElement).open) trackAiOpsFaqOpen(i + 1);
                  }}
                >
                  <summary>
                    <h3>Q. {f.q}</h3>
                  </summary>
                  <p>A. {f.a}</p>
                </details>
              ))}
            </div>
            <div className="faq-cta">
              <Link to="/contact" className="btn btn-primary" onClick={() => trackContactClick(GA_PLACEMENTS.aiOpsFaq)}>
                {aiOpsFaq.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="sj-contact">
          <div className="wrap">
            <h2>{aiOpsClosing.h2}</h2>
            <p>{aiOpsClosing.body}</p>
            <Link to="/contact" className="btn btn-primary" onClick={() => trackContactClick(GA_PLACEMENTS.aiOpsFooter)}>
              {aiOpsClosing.cta}
            </Link>
          </div>
        </section>
      </main>
    </SjShell>
  );
};

export default AiOps;
