import { useEffect } from 'react';
import SjShell from '@/components/SjShell';
import { PRIVACY_IS_DRAFT, privacyPolicy } from '@/data/privacyPolicy';
import { SITE_DEFAULT_DESCRIPTION, SITE_DEFAULT_TITLE } from '@/data/siteMeta';
import '@/styles/sj-whitepaper.css';

// 本文中の URL だけをリンクにする
const linkify = (text: string) =>
  text.split(/(https:\/\/[^\s）)]+)/g).map((part, i) =>
    /^https:\/\//.test(part) ? (
      <a key={i} href={part} target={part.startsWith('https://sprintjapan.net') ? undefined : '_blank'} rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );

const Privacy = () => {
  useEffect(() => {
    document.title = 'プライバシーポリシー｜スプリントジャパン株式会社';
    const desc = document.querySelector('meta[name="description"]');
    desc?.setAttribute('content', 'スプリントジャパン株式会社のプライバシーポリシーです。集める情報、使う目的、アクセス解析、保管する期間、開示などのご請求について説明します。');
    return () => {
      document.title = SITE_DEFAULT_TITLE;
      desc?.setAttribute('content', SITE_DEFAULT_DESCRIPTION);
    };
  }, []);

  return (
    <SjShell>
      <div className="sj-native sj-wp sj-privacy">
        <div className="phero">
          <div className="wrap">
            <span className="label">Privacy Policy</span>
            <h1>{privacyPolicy.title}</h1>
            {PRIVACY_IS_DRAFT && <p className="wp-draft">案（確認前の下書きです。まだ確定していません）</p>}
          </div>
        </div>
        <section className="pp-body">
          <div className="wrap">
            {privacyPolicy.intro.map((t) => (
              <p key={t}>{linkify(t)}</p>
            ))}
            {privacyPolicy.sections.map((s) => (
              <section key={s.h} className="pp-sec">
                <h2>{s.h}</h2>
                {s.blocks.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i}>
                      {b.map((li) => (
                        <li key={li}>{linkify(li)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className={b.startsWith('【要確認】') ? 'pp-todo' : undefined}>{linkify(b)}</p>
                  ),
                )}
              </section>
            ))}
            <p className="pp-footer">{privacyPolicy.footer}</p>
          </div>
        </section>
      </div>
    </SjShell>
  );
};

export default Privacy;
