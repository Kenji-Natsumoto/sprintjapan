import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SjShell from '@/components/SjShell';
import { WP_START_PATH, WP_TOKEN_DAYS, papers as paperList, wpThanksMeta } from '@/data/whitepaperData';
import { SITE_DEFAULT_TITLE } from '@/data/siteMeta';
import { getWhitepaperAccess, type WpAccess } from '@/lib/whitepaperApi';
import { trackWpFileDownload, trackWpVideoStart } from '@/hooks/useAnalytics';
import '@/styles/sj-whitepaper.css';

const DENIED_TEXT: Record<string, string> = {
  invalid: 'このリンクは使えません。お手数ですが、申し込みページからもう一度お申し込みください。',
  expired: 'このリンクの期限が過ぎました。お手数ですが、申し込みページからもう一度お申し込みください。',
  limit: 'このリンクを開ける回数を超えました。お手数ですが、申し込みページからもう一度お申し込みください。',
  error: 'いまページを開けませんでした。時間をおいて、メールのリンクからもう一度開いてください。',
};

const WhitepaperThanks = () => {
  const [params] = useSearchParams();
  const token = params.get('k') || '';
  const [access, setAccess] = useState<WpAccess | null>(null);
  const asked = useRef<string | null>(null);
  const videoStarted = useRef(false);

  // 検索結果に出さない
  useEffect(() => {
    document.title = wpThanksMeta.title;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.title = SITE_DEFAULT_TITLE;
      robots.remove();
    };
  }, []);

  // 合い鍵の確認は1回だけ（開くたびに回数が1つ増える）
  useEffect(() => {
    if (!token) {
      setAccess({ status: 'invalid' });
      return;
    }
    if (asked.current === token) return;
    asked.current = token;
    getWhitepaperAccess(token)
      .then(setAccess)
      .catch(() => setAccess({ status: 'error' }));
  }, [token]);

  const ctaId = access?.cta_id ?? null;

  return (
    <SjShell>
      <div className="sj-native sj-wp">
        {!access && (
          <div className="phero">
            <div className="wrap">
              <p className="wp-loading" role="status">確認しています…</p>
            </div>
          </div>
        )}

        {access && access.status !== 'ok' && (
          <div className="phero wp-denied">
            <div className="wrap">
              <span className="label">Materials</span>
              <h1><span className="nb">このページは</span><span className="nb">開けません</span></h1>
              <p className="wp-lead">{DENIED_TEXT[access.status] ?? DENIED_TEXT.invalid}</p>
              <Link to={WP_START_PATH} className="btn btn-primary">申し込みページへ</Link>
            </div>
          </div>
        )}

        {access?.status === 'ok' && (
          <>
            <div className="phero">
              <div className="wrap">
                <span className="label">Thank you</span>
                <h1><span className="nb">お申し込み</span><span className="nb">ありがとうございます</span></h1>
                <p className="wp-lead">
                  <span className="nb">ご登録のメールアドレスにも、</span>
                  <span className="nb">このページへのリンクをお送りしました。</span>
                </p>
              </div>
            </div>

            <section className="wp-papers">
              <div className="wrap">
                <div className="sec-head">
                  <span className="label">Download</span>
                  <h2>資料</h2>
                </div>
                <div className="wp-cards">
                  {(access.files ?? []).map((f) => {
                    const p = paperList.find((x) => x.id === f.id);
                    if (!p) return null;
                    return (
                      <article key={f.id} className="wp-card">
                        <span className="wp-card-no">{p.label}</span>
                        <h2>{p.titleParts.map((t) => <span key={t} className="nb">{t}</span>)}</h2>
                        {f.url ? (
                          <a
                            href={f.url}
                            className="btn btn-primary wp-dl"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWpFileDownload(`whitepaper-${f.id.toLowerCase()}`, ctaId)}
                          >
                            PDFをダウンロード
                          </a>
                        ) : (
                          <p className="wp-status">
                            <b>準備中</b>
                            <span>できたらメールでお知らせします。</span>
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>
                {(access.files ?? []).some((f) => f.url) && (
                <p className="wp-note wp-dl-note">ダウンロードのボタンは、ページを開いてから5分ほど使えます。使えないときは、ページを開き直してください。</p>
                )}
              </div>
            </section>

            <section className="wp-video">
              <div className="wrap">
                <div className="sec-head">
                  <span className="label">Video</span>
                  <h2>お申し込みの方だけの動画</h2>
                </div>
                {access.video ? (
                  <video
                    className="wp-video-player"
                    src={access.video}
                    controls
                    preload="metadata"
                    controlsList="nodownload"
                    onPlay={() => {
                      if (videoStarted.current) return;
                      videoStarted.current = true;
                      trackWpVideoStart(ctaId);
                    }}
                  />
                ) : (
                  <div className="wp-video-empty">
                    <p className="wp-status">
                      <b>準備中</b>
                      <span>できたらメールでお知らせします。</span>
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="wp-next">
              <div className="wrap">
                <p>
                  <Link to="/ai-ops" className="wp-link">35個のアプリをAIと人で保守する方法を読む <span aria-hidden="true">→</span></Link>
                </p>
                {typeof access.uses === 'number' && typeof access.max_uses === 'number' && (
                  <p className="wp-note">
                    このページは、お申し込みから{WP_TOKEN_DAYS}日間、{access.max_uses}回まで開けます（今回{access.uses}回目）。ほかの方とは共有しないでください。
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </SjShell>
  );
};

export default WhitepaperThanks;
