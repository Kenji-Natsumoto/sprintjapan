import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import logo from '@/assets/spj-logo.png';
import './home.css';

const THEME_KEY = 'sj-theme';

const Home = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <div className="sj-home">
      <header>
        <div className="wrap nav">
          <Link to="/">
            <img src={logo} alt="スプリントジャパン株式会社" />
          </Link>
          <ul>
            <li>
              <button className="theme-btn" onClick={toggleTheme} aria-label="テーマ切替">
                {theme === 'dark' ? '○ ライト' : '○ ダーク'}
              </button>
            </li>
            <li><Link to="/company">会社情報</Link></li>
            <li><Link to="/contact" className="cta">お問い合わせ</Link></li>
          </ul>
        </div>
      </header>

      <div className="hero">
        <div className="wrap">
          <span className="label">AI-Native Company / Forward Deployed Engineering</span>
          <h1>企業に、考えるAIを。<br />現場に、動くAIを。</h1>
          <p>
            SPRINT Japanは、AIの「導入」で終わらせず、経営の判断と現場の業務にAIを実装する会社です。経営者への1対1伴走から、現場に入り込むFDE（Forward Deployed Engineering）まで——動く仕組みになるまで並走します。
          </p>
          <div className="btns">
            <a href="#services" className="btn btn-primary">サービスを見る</a>
            <Link to="/contact" className="btn btn-ghost">お問い合わせ</Link>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="wrap">
          <div className="stat">
            <b>9<small>年</small></b>
            <span>事業開発・組織開発の現場実績</span>
          </div>
          <div className="stat">
            <b>60<small>社以上</small></b>
            <span>国内企業への実装支援</span>
          </div>
          <div className="stat">
            <b>5<small>大学以上</small></b>
            <span>教育・研究機関での実績</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="label">How We Work</span>
            <h2>AIを「導入」ではなく、「実装」する。</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="no">01 / UNDERSTAND</span>
              <h3>現在地を解像する</h3>
              <p>業務の要件だけでなく、判断の傾向や組織の暗黙知までを構造化し、AIが働くための土台をつくります。</p>
            </div>
            <div className="step">
              <span className="no">02 / ALIGN</span>
              <h3>目的と意思決定をつなぐ</h3>
              <p>会社の目的から目標・判断・責任までを一本の線でつなぎ、AIが出す案に人が責任を持てる形に整えます。</p>
            </div>
            <div className="step">
              <span className="no">03 / OPERATE</span>
              <h3>現場で動くまで実装する</h3>
              <p>資料で終わらせず、業務フロー・AIエージェント・データをつないで現場で動く仕組みにし、改善まで伴走します。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="wrap">
          <div className="sec-head">
            <span className="label">Services</span>
            <h2>いま提供している、3つのこと。</h2>
          </div>
          <div className="cards">
            <div className="card">
              <span className="no">01 / Enterprise AI FDE</span>
              <h3>企業のAI実装（FDE）</h3>
              <p>経営と現場のあいだに入り込み、業務にAIエージェントを組み込む伴走型エンジニアリング。課題の定義から実装・運用・改善まで、同じチームが並走します。</p>
              <dl>
                <div><dt>対象</dt><dd>企業（チームでAIを使いたい会社）</dd></div>
                <div><dt>形</dt><dd>現場伴走・月額</dd></div>
              </dl>
            </div>
            <div className="card">
              <span className="no">02 / Executive AI Coaching</span>
              <h3>経営者向けAIコーチング</h3>
              <p>経営者本人が「事業を動かすAIチーム」を持てるようになる、1対1の伴走。会社全体へ広げる前の、最初の一歩をここから始めます。</p>
              <dl>
                <div><dt>対象</dt><dd>経営者個人</dd></div>
                <div><dt>形</dt><dd>1対1・月次伴走</dd></div>
              </dl>
            </div>
            <div className="card">
              <span className="no">03 / AI Education &amp; Community</span>
              <h3>AI実践教育・コミュニティ</h3>
              <p>湯川塾分科会をはじめ、経営とAIの実践知を学び合う場を運営しています。学びから実装へつながる入口です。</p>
              <dl>
                <div><dt>対象</dt><dd>経営とAIを学びたい方</dd></div>
                <div><dt>形</dt><dd>分科会・コミュニティ</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="signity">
        <div className="wrap">
          <span className="label">Powered by Signity</span>
          <h2>自分たちが、最初のユーザーケース。</h2>
          <p>私たちは、AI経営戦略OS「Signity」のユーザーケース#1です。自社の経営そのものをAIネイティブに運営し、その毎日の実運用から得た実装知を、お客様の現場へ届けています。</p>
          <div className="links">
            <a href="https://signityos.io/ja" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              Signity を見る <ExternalLink size={16} aria-hidden="true" />
            </a>
            <Link to="/ai-native-company">AIネイティブ経営の実践 →</Link>
          </div>
        </div>
      </section>

      <section className="company">
        <div className="wrap">
          <div className="sec-head">
            <span className="label">Company</span>
            <h2>会社情報</h2>
          </div>
          <table>
            <tbody>
              <tr><th>社名</th><td>スプリントジャパン株式会社</td></tr>
              <tr><th>代表</th><td>夏本 健司</td></tr>
              <tr><th>事業内容</th><td>企業向けAI実装（FDE）／経営者向けAIコーチング／AI実践教育</td></tr>
            </tbody>
          </table>
          <div className="links">
            <Link to="/company">会社概要・代表プロフィール →</Link>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="wrap">
          <h2>まずは、いまの経営課題を<br />お聞かせください。</h2>
          <p>ご紹介・情報交換からのご連絡も歓迎です。</p>
          <Link to="/contact" className="btn btn-primary">お問い合わせ</Link>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <ul>
            <li><Link to="/company">会社情報</Link></li>
            <li><Link to="/contact">お問い合わせ</Link></li>
          </ul>
          <small>© 2026 Sprint Japan. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
