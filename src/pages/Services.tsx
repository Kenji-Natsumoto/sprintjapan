import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SjShell from '@/components/SjShell';
import { services, servicesMeta } from '@/data/servicesData';
import { SITE_DEFAULT_DESCRIPTION, SITE_DEFAULT_TITLE } from '@/data/siteMeta';
import '@/styles/sj-services.css';

const Services = () => {
  useEffect(() => {
    document.title = servicesMeta.title;
    const desc = document.querySelector('meta[name="description"]');
    desc?.setAttribute('content', servicesMeta.description);
    return () => {
      document.title = SITE_DEFAULT_TITLE;
      desc?.setAttribute('content', SITE_DEFAULT_DESCRIPTION);
    };
  }, []);

  return (
    <SjShell>
      <div className="sj-native">
        <div className="phero">
          <div className="wrap">
            <span className="label">Services</span>
            <h1>サービス</h1>
            <p className="svc-lead">経営の判断と現場の業務にAIを実装するために、いま4つのことを提供しています。</p>
          </div>
        </div>

        <section className="svc-list">
          <div className="wrap">
            <div className="svc-cards">
              {services.map((s, i) => (
                <article key={s.id} id={s.id} className={`svc-card${s.featured ? ' is-featured' : ''}`}>
                  <span className="svc-no">
                    {String(i + 1).padStart(2, '0')} / {s.en}
                  </span>
                  <h2>{s.name}</h2>
                  <p>{s.description}</p>
                  <Link to={s.to} className="svc-link">
                    {s.linkLabel} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sj-contact">
          <div className="wrap">
            <h2>どれが合うか分からなくても、<br />まずはご相談ください。</h2>
            <p>いまの課題をお聞きして、合う形をご提案します。</p>
            <Link to="/contact" className="btn btn-primary">お問い合わせ</Link>
          </div>
        </section>
      </div>
    </SjShell>
  );
};

export default Services;
