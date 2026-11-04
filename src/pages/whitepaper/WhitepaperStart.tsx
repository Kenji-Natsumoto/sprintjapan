import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SjShell from '@/components/SjShell';
import {
  PRIVACY_PATH,
  ROLE_OPTIONS,
  WP_THANKS_PATH,
  papers,
  paperChoiceLabel,
  wpFaqs,
  wpMeta,
  type PaperChoice,
} from '@/data/whitepaperData';
import { SITE_DEFAULT_DESCRIPTION, SITE_DEFAULT_TITLE } from '@/data/siteMeta';
import { PROFILE_PATH } from '@/data/profileMeta';
import { isWpMock, submitWhitepaperRequest } from '@/lib/whitepaperApi';
import { trackWpLead } from '@/hooks/useAnalytics';
import '@/styles/sj-whitepaper.css';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UtmKey = (typeof UTM_KEYS)[number];
const UTM_STORE = 'sj-wp-utm';

// utm は半角英数字と - _ . だけ受け取る（ほかは捨てる）
const cleanTag = (v: string | null) => (v && /^[A-Za-z0-9._-]{1,100}$/.test(v) ? v : '');

interface FormState {
  papers: PaperChoice | '';
  name: string;
  email: string;
  company: string;
  role: string;
  consent: boolean;
  opt_in: boolean;
  website: string;
}

type Errors = Partial<Record<'papers' | 'name' | 'email' | 'consent' | 'submit', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WhitepaperStart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = wpMeta.title;
    const desc = document.querySelector('meta[name="description"]');
    desc?.setAttribute('content', wpMeta.description);
    return () => {
      document.title = SITE_DEFAULT_TITLE;
      desc?.setAttribute('content', SITE_DEFAULT_DESCRIPTION);
    };
  }, []);

  // URLの utm を拾う。いったんこのページ内で遷移しても残るよう sessionStorage にも置く
  const utm = useMemo(() => {
    const q = new URLSearchParams(location.search);
    const fromUrl = Object.fromEntries(UTM_KEYS.map((k) => [k, cleanTag(q.get(k))])) as Record<UtmKey, string>;
    if (UTM_KEYS.some((k) => fromUrl[k])) {
      try { sessionStorage.setItem(UTM_STORE, JSON.stringify(fromUrl)); } catch { /* 保存できなくても続ける */ }
      return fromUrl;
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem(UTM_STORE) || 'null');
      if (saved) return saved as Record<UtmKey, string>;
    } catch { /* 無視 */ }
    return fromUrl;
  }, [location.search]);

  const [form, setForm] = useState<FormState>({
    papers: '',
    name: '',
    email: '',
    company: '',
    role: '',
    consent: false,
    opt_in: false,
    website: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined, submit: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.papers) e.papers = '欲しい資料を選んでください。';
    if (!form.name.trim()) e.name = 'お名前を入力してください。';
    else if (form.name.trim().length > 100) e.name = 'お名前は100文字以内で入力してください。';
    if (!form.email.trim()) e.email = 'メールアドレスを入力してください。';
    else if (!EMAIL_RE.test(form.email.trim()) || form.email.length > 255) e.email = 'メールアドレスの形を確かめてください。';
    if (!form.consent) e.consent = 'プライバシーポリシーへの同意が必要です。';
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const token = await submitWhitepaperRequest({
        papers: form.papers as PaperChoice,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        role: form.role,
        consent: form.consent,
        opt_in: form.opt_in,
        ...utm,
        landing_path: location.pathname,
        website: form.website,
      });
      trackWpLead(form.papers, utm.utm_content || null);
      navigate(`${WP_THANKS_PATH}${token ? `?k=${encodeURIComponent(token)}` : ''}`);
    } catch (err) {
      console.error('whitepaper submit failed', err);
      setErrors({ submit: '送信できませんでした。時間をおいて、もう一度お試しください。' });
    } finally {
      setSubmitting(false);
    }
  };

  const errCount = Object.values(errors).filter(Boolean).length;

  return (
    <SjShell>
      <div className="sj-native sj-wp">
        <div className="phero">
          <div className="wrap">
            <span className="label">Free Materials</span>
            <h1>
              <span className="nb">AIで事業を動かす現場から、</span>
              <span className="nb">2つの資料をお届けします</span>
            </h1>
            <p className="wp-lead">
              <span className="nb">35個のアプリを動かしてきた中で</span>
              <span className="nb">分かったことを、</span>
              <span className="nb">無料の資料にまとめました</span>
            </p>
            <p className="wp-chip">累計35個（稼働22・停止13）</p>
            <p className="wp-status" role="status">
              <b>準備中</b>
              <span>資料はいま作っています。お申し込みいただいた方には、できたらメールでお知らせします。</span>
            </p>
            <a href="#wp-form" className="btn btn-primary wp-hero-btn">資料を申し込む（無料）</a>
          </div>
        </div>

        <section className="wp-papers">
          <div className="wrap">
            <div className="wp-cards">
              {papers.map((p) => (
                <article key={p.id} className="wp-card">
                  <span className="wp-card-no">{p.label}</span>
                  <p className="wp-aud">{p.audience}</p>
                  <h2>{p.titleParts.map((t) => <span key={t} className="nb">{t}</span>)}</h2>
                  <p className="wp-body">{p.body}</p>
                  <dl className="wp-spec">
                    <div><dt>目次</dt><dd>準備中</dd></div>
                    <div><dt>ページ数</dt><dd>準備中</dd></div>
                    <div><dt>読む時間</dt><dd>準備中</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wp-author">
          <div className="wrap">
            <span className="label">Author</span>
            <div className="wp-author-box">
              <p className="wp-author-name">
                <span className="nb">スプリントジャパン株式会社</span> <span className="nb">代表取締役 夏本 健司</span>
              </p>
              <p>資料は、代表の夏本が自社でAIと一緒に事業を動かしてきた経験をもとにまとめています。</p>
              <Link to={PROFILE_PATH} className="wp-link">プロフィールを見る <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="wp-form-sec" id="wp-form">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Request</span>
              <h2>資料のお申し込み</h2>
              <p className="wp-note">
                資料は準備中です。いまお申し込みいただくと、できたらメールでお知らせします。
              </p>
            </div>

            {isWpMock && (
              <p className="wp-mock-note">手元確認用の見本モードです（送信してもメールは届かず、どこにも保存されません）。</p>
            )}

            <form ref={formRef} className="wp-form" onSubmit={onSubmit} noValidate>
              {errCount > 0 && !errors.submit && (
                <p className="wp-err-summary" role="alert">入力が足りないところが{errCount}つあります。赤い欄を確かめてください。</p>
              )}

              <fieldset className={`wp-field${errors.papers ? ' has-err' : ''}`}>
                <legend>欲しい資料 <em>必須</em></legend>
                <div className="wp-choices" role="radiogroup" aria-invalid={!!errors.papers} tabIndex={-1}>
                  {(['A', 'B', 'both'] as PaperChoice[]).map((c) => (
                    <label key={c} className={`wp-choice${form.papers === c ? ' is-on' : ''}`}>
                      <input
                        type="radio"
                        name="papers"
                        value={c}
                        checked={form.papers === c}
                        onChange={() => set('papers', c)}
                      />
                      <span>{paperChoiceLabel[c]}</span>
                    </label>
                  ))}
                </div>
                {errors.papers && <p className="wp-err">{errors.papers}</p>}
              </fieldset>

              <div className={`wp-field${errors.name ? ' has-err' : ''}`}>
                <label htmlFor="wp-name">お名前 <em>必須</em></label>
                <input
                  id="wp-name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  aria-invalid={!!errors.name}
                  onChange={(e) => set('name', e.target.value)}
                />
                {errors.name && <p className="wp-err">{errors.name}</p>}
              </div>

              <div className={`wp-field${errors.email ? ' has-err' : ''}`}>
                <label htmlFor="wp-email">メールアドレス <em>必須</em></label>
                <input
                  id="wp-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={255}
                  value={form.email}
                  aria-invalid={!!errors.email}
                  onChange={(e) => set('email', e.target.value)}
                />
                {errors.email && <p className="wp-err">{errors.email}</p>}
              </div>

              <div className="wp-field">
                <label htmlFor="wp-company">会社名 <i>任意</i></label>
                <input
                  id="wp-company"
                  type="text"
                  autoComplete="organization"
                  maxLength={100}
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                />
              </div>

              <div className="wp-field">
                <label htmlFor="wp-role">立場 <i>任意</i></label>
                <select id="wp-role" value={form.role} onChange={(e) => set('role', e.target.value)}>
                  <option value="">選んでください</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* 罠の欄：画面には出さない（自動送信の対策） */}
              <div className="wp-hp" aria-hidden="true">
                <label htmlFor="wp-website">Website</label>
                <input id="wp-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
              </div>

              <div className={`wp-field wp-check${errors.consent ? ' has-err' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    aria-invalid={!!errors.consent}
                    onChange={(e) => set('consent', e.target.checked)}
                  />
                  <span>
                    <Link to={PRIVACY_PATH} target="_blank" rel="noopener">プライバシーポリシー</Link>に同意します <em>必須</em>
                  </span>
                </label>
                {errors.consent && <p className="wp-err">{errors.consent}</p>}
              </div>

              <div className="wp-field wp-check">
                <label>
                  <input type="checkbox" checked={form.opt_in} onChange={(e) => set('opt_in', e.target.checked)} />
                  <span>今後のお知らせを受け取る <i>任意</i></span>
                </label>
              </div>

              {errors.submit && <p className="wp-err-summary" role="alert">{errors.submit}</p>}

              <button type="submit" className="btn btn-primary wp-submit" disabled={submitting}>
                {submitting ? '送信しています…' : '資料を申し込む（無料）'}
              </button>
            </form>
          </div>
        </section>

        <section className="wp-faq">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">FAQ</span>
              <h2>よくある質問</h2>
            </div>
            <div className="wp-faq-list">
              {wpFaqs.map((f) => (
                <details key={f.q}>
                  <summary><h3>{f.q}</h3></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SjShell>
  );
};

export default WhitepaperStart;
