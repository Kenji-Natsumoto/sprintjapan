import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SjShell from '@/components/SjShell';
import natsumotoPortrait from '@/assets/instructor-natsumoto.png';
import '@/styles/sj-profile.css';

const NOTE_MAGAZINE = 'https://note.com/vibe_coding';

type App = { no: string; cat: string; name: string; desc: string; url: string };

const featuredApps: App[] = [
  { no: '#01', cat: 'Enterprise', name: 'SOLVISTA', desc: '社会課題解決プラットフォーム', url: 'https://solvista-spj.lovable.app/' },
  { no: '#02', cat: 'Enterprise', name: 'SMATSTA', desc: '事業創造プラットフォーム', url: 'https://smatsta.lovable.app/' },
  { no: '#03', cat: 'Enterprise', name: 'TRAITH', desc: '企業理念（パーパス）言語化ツール', url: 'https://purpose-setting-app-4r2c4yfk.devinapps.com/' },
  { no: '#05', cat: 'Enterprise', name: 'Vyse', desc: 'AI CEO＋証跡管理プラットフォーム', url: 'https://vyse-is-the-ai-ceo.replit.app/' },
  { no: '#16', cat: 'Product', name: 'スロゼン Mobile', desc: '次世代パチスロ情報アプリ', url: 'https://zent-mobile.lovable.app/' },
  { no: '#19', cat: 'Platform', name: 'VibeRush', desc: 'AIネイティブアプリの公開プラットフォーム', url: 'https://viberush.io/' },
];

const otherApps: App[] = [
  { no: '#04', cat: 'Enterprise', name: 'Vibe Manager', desc: 'AIネイティブアプリ企画・運営管理ツール', url: 'https://dev-ops-insight.replit.app/' },
  { no: '#06', cat: 'Enterprise', name: 'FinHabit', desc: '投資家育成・営業支援アプリ', url: 'https://fin-habit-learn--kn78.replit.app/' },
  { no: '#07', cat: 'Life/Health', name: 'Lumora', desc: '糖尿病患者向け血糖値管理', url: 'https://glucodash.replit.app/' },
  { no: '#08', cat: 'Life/Health', name: '和菓座', desc: '和菓子教室レシピ共有アプリ', url: 'https://wagaza.replit.app/' },
  { no: '#09', cat: 'Life/Health', name: 'W.S. KOKORO', desc: '個人サロン予約管理アプリ', url: 'https://reserve-flow--kn78.replit.app/' },
  { no: '#10', cat: 'Life/Health', name: '未来の扉', desc: '将来像イメージング（占い風）', url: 'https://future-muse.lovable.app/' },
  { no: '#11', cat: 'Life/Health', name: "Vibe O'Clock", desc: '世界時計比較ツール', url: 'https://vibe-o-clock.manus.space/' },
  { no: '#12', cat: 'Life/Health', name: 'VibeCodingX', desc: 'VibeCoding情報プラットフォーム', url: 'https://vibecodingx.life/' },
  { no: '#13', cat: 'Habit/Game', name: '3D TPS Game', desc: '3Dシューティングゲーム', url: 'https://3d-tps-game-prototype.replit.app/' },
  { no: '#14', cat: 'Habit/Game', name: 'GrindIRL', desc: 'ゲーム型 習慣化トラッカー', url: 'https://grindirl2026.lovable.app/' },
  { no: '#15', cat: 'Habit/Game', name: 'HabitFlow CEO', desc: '経営者向け習慣トラッカー', url: 'https://manus.im/app-preview/GUfPNdDDSQw65KAxZVUSRd?sessionId=2AgWCXJJWXGgiRU1MXUIsU' },
  { no: '#17', cat: 'Habit/Game', name: 'ギャラクシアン', desc: '懐かしのテーブル型ゲーム', url: 'https://galaxy-war--kn78.replit.app/' },
  { no: '#18', cat: 'Habit/Game', name: 'インベーダー', desc: '懐かしのテーブル型ゲーム', url: 'https://retro-invaders.replit.app' },
  { no: '#20', cat: 'Habit/Game', name: 'NA-NA-SHI', desc: 'セミナースライド編集・配布アプリ', url: 'https://slidetexteditor-3fe8g9jw.manus.space/seminar/' },
];

const chronicle = [
  { day: 'Day 0', title: 'はじめに言葉ありき', sum: '「AIが案を出し、人が承認する会社」をつくると決めた。すべては、この宣言から始まりました。' },
  { day: 'Day 1', title: '大地の創造', sum: 'プロンプトより先に、構造をつくる。組織の骨格、情報の流れ、判断基準の器を先に据えました。' },
  { day: 'Day 2', title: '光あれ', sum: '最初のAI CEOを選ぶ。長く連れ添った相手ではなく、この組織の理念に合う者を選びました。' },
  { day: 'Day 3', title: '命を吹き込む', sum: '憲章を与え、経営判断の9割を委ねる。役職という称号ではなく、存在意義のほうを設計しました。' },
  { day: 'Day 4', title: '仲間たちの目覚め', sum: 'AI CEOが、5人の部門長を生んだ。人間が指示した設計より良い構造を、AIが返してきた日です。' },
  { day: 'Day 5', title: '秩序が生まれた', sum: '境界線を引いて、はじめてAIは「誰か」になった。制約こそが自律を生むと分かりました。' },
  { day: 'Day 6', title: '動き出す者たち', sum: '指示を待たずに、それぞれが動き出した。組織が、自分の輪郭の外へ手を伸ばし始めました。' },
];

const career = [
  { time: 'キャリア初期', org: 'テレビ朝日グループ', desc: 'Webディレクターとしてキャリアをスタート' },
  { time: '次のステージ', org: '電通グループ', desc: '企業提案・プレゼンテーション、広告・プロモーション施策・制作の実務' },
  { time: '2002年', org: '独立', desc: 'UXデザイナー、職業訓練校の講師を経験' },
  { time: '2017年〜', org: 'デザインスプリント第一人者', desc: '開発者 Jake Knapp に認められ、日本で広めることに貢献' },
  { time: '2019年', org: 'スプリントジャパン設立', desc: '上場企業12社をはじめ60組織以上で研修およびファシリテーター養成を展開' },
  { time: '2024年〜', org: 'AI専門家として始動', desc: '企業コンサルテーションおよびAI駆動開発の現場指揮を開始' },
  { time: '2025年〜', org: 'バイブコーディング特化', desc: 'バイブコーディングとAIエージェントに専門性を特化' },
  { time: '2026年〜', org: 'AIネイティブカンパニー経営を実践', desc: 'スプリントジャパンをFDE（Forward Deployed Engineering）企業へ転換', now: true },
];

const socials = [
  { name: 'X', url: 'https://x.com/natsuken1' },
  { name: 'note', url: 'https://note.com/vibe_coding' },
  { name: 'Facebook', url: 'https://www.facebook.com/na2ken/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@THE-AI-COMPANY-STORY' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@kenjinatsumoto' },
  { name: 'Instagram', url: 'https://www.instagram.com/kenjinatsumoto/' },
  { name: 'Medium', url: 'https://medium.com/@kenji_Natsumoto' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kenji-viberush/' },
];

const AppCard = ({ app }: { app: App }) => (
  <a className="app" href={app.url} target="_blank" rel="noopener noreferrer">
    <span className="no">{app.no} {app.cat}</span>
    <b>{app.name}</b>
    <span>{app.desc}</span>
  </a>
);

const ProfileNatsumoto = () => {
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = natsumotoPortrait;
    if (img.complete) setImageLoaded(true);
    else img.onload = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    document.title = '夏本 健司｜スプリントジャパン株式会社 代表取締役';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', '夏本健司（スプリントジャパン株式会社 代表取締役）。あなたの会社がAIネイティブに変わり、満足するアウトカムを創出するまで並走します。9年の事業開発・組織開発の現場と、自社をAIネイティブに作り替えた実装知で、経営者に伴走します。');
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <SjShell>
      <div className="sj-prof" id="top">
        {/* S1 hero */}
        <section className="hero">
          <div className="wrap">
            <img
              className="photo"
              src={natsumotoPortrait}
              alt="夏本 健司"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity .3s' }}
              onLoad={() => setImageLoaded(true)}
            />
            <div>
              <Link to="/company" className="back">← 会社情報に戻る</Link>
              <span className="label">事業創造イノベーター / AI ソロプレナー</span>
              <h1>夏本 健司</h1>
              <span className="en">Kenji Natsumoto</span>
              <p className="roles">スプリントジャパン株式会社 代表取締役</p>
              <p className="promise">あなたの会社がAIネイティブに変わり、満足するアウトカムを創出するまで並走します。</p>
            </div>
          </div>
        </section>

        {/* S2 now */}
        <section className="now">
          <div className="wrap">
            <span className="label">What I Do Now</span>
            <ul>
              <li><b>経営者と並走する</b>成果が出るまで離れません。月次で伴走し、判断そのものを一緒に作ります。</li>
              <li><b>自社をAIネイティブに作り替えた</b>語る前に、自分の会社で先にやり、成果を出しました。</li>
              <li><b>その過程を公開している</b>うまくいったことも、つまずいたことも、過程ごと出しています。</li>
            </ul>
          </div>
        </section>

        {/* S3 story */}
        <section className="story">
          <div className="wrap">
            <span className="label">The Trough and What Came After</span>
            <h2>落ちるところまで落ちてから、作り直した。</h2>
            <p>2022年から2024年、コロナの影響とデザイン思考ブームの終焉によって、研修とワークショップの受注はほぼゼロになりました。</p>
            <p>2025年、そこからV字で回復させました。新しい出会いと、お客様からのご紹介によって——過去の栄光にも、過去の資産にも頼らず、新しい商材と、新しい顧客で立て直したアウトカムです。</p>

            <div className="divider" />

            <h3>まず、自分の会社で成果を出した。</h3>
            <p className="lead">AIネイティブに変えること自体は、目的ではありません。私は自分の会社で、先に成果を出しました。</p>
            <ol>
              <li className="key">ゼロから、新しい顧客を創出した</li>
              <li className="key">落ちた売上を、V字で回復させた</li>
              <li className="key">1人で、3社を並行して運営できるようになった</li>
              <li className="key">重要な意思決定を、1日のうちに何度も下せるようになった</li>
              <li className="key">9年分のナレッジを、AIが使える形へ移した</li>
            </ol>

            <div className="mech">
              <p>これを支えているのは、10名のAI人格と、毎日休まず走る無人の仕組みです。会社の意思決定を生成し、人が署名して責任を固定し、実行して観測する——その環を、自分の会社で毎日回しています。</p>
              <Link to="/ai-native-company/">仕組みの論文を読む →</Link>
            </div>
          </div>
        </section>

        {/* S4 services */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="label">What I Can Do</span>
              <h2>できること</h2>
            </div>
            <div className="svc">
              <div>
                <span className="no">01 / Enterprise AI FDE</span>
                <h3>企業のAI実装（FDE）</h3>
                <p>経営と現場のあいだに入り込み、業務にAIエージェントを組み込みます。課題の定義から実装・運用・改善まで並走します。</p>
              </div>
              <div>
                <span className="no">02 / Executive AI Coaching</span>
                <h3>経営者向けAIコーチング</h3>
                <p>経営者本人が「事業を動かすAIチーム」を持てるようになるまで、1対1で伴走します。</p>
              </div>
              <div>
                <span className="no">03 / AI Education</span>
                <h3>AI実践教育・コミュニティ</h3>
                <p>湯川塾分科会をはじめ、経営とAIの実践知を学び合う場を運営しています。</p>
              </div>
            </div>
          </div>
        </section>

        {/* S5 thought */}
        <section className="think">
          <div className="wrap">
            <span className="label">My Thesis</span>
            <blockquote>「成長したい企業は、AIネイティブカンパニーを目指せ」</blockquote>
            <p>「効率化」を目的にAIを導入する企業は半年で陳腐化する。必要なのは、パーパスから逆算し、2年後の組織を今設計すること。</p>
            <p>AIは、業務効率化ツールではなく経営戦略のブレーンに据え、組織構造と業務プロセスを再定義する技術である。</p>
            <p className="links">
              <Link to="/ai-native-company/effectiveness-over-efficiency/">論文: なぜ「AI業務効率化」は失敗するのか →</Link>
            </p>
          </div>
        </section>

        {/* S6 works */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Track Record</span>
              <h2>主な実績 — 2つの時代</h2>
            </div>
            <div className="works">
              <div>
                <h3>DESIGN SPRINT ERA / 2017-2023</h3>
                <ul>
                  <li>本田技研工業（Honda）<span>デザインスプリント</span></li>
                  <li>日産自動車<span>デザインスプリント</span></li>
                  <li>アルク<span>デザインスプリント</span></li>
                  <li>ウイングアーク1st<span>デザインスプリント</span></li>
                  <li>東急<span>デザインスプリント</span></li>
                </ul>
                <p className="more">ほか上場企業12社、60組織以上</p>
              </div>
              <div>
                <h3>AI ERA / 2024-</h3>
                <ul>
                  <li>善都（ZENT）<span>プロジェクト推進パートナー（FDE）</span></li>
                  <li>USEN-ALMEX<span>AI活用コンサルティング</span></li>
                  <li>湯川塾<span>AIセミナー・分科会</span></li>
                </ul>
                <p className="more">このほか、経営者向けAIコーチングで伴走中</p>
              </div>
            </div>
          </div>
        </section>

        {/* S7 chronicle */}
        <section className="chron">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Genesis — AIネイティブカンパニー創世記</span>
              <h2>会社を作り替えた記録</h2>
            </div>
            <p className="lead">自社をAIネイティブに作り替える過程を、最初の日から書き残しています。うまくいったことも、つまずいたことも、決め方の迷いも。全8話・Day 7 で完結します。</p>
            <ol>
              {chronicle.map((c) => (
                <li key={c.day}>
                  <a href={NOTE_MAGAZINE} target="_blank" rel="noopener noreferrer">
                    <time>{c.day}</time>
                    <div>
                      <b>{c.title}</b>
                      <span className="sum">{c.sum}</span>
                    </div>
                    <span className="arrow">note →</span>
                  </a>
                </li>
              ))}
              <li className="pending">
                <div className="row">
                  <time>Day 7</time>
                  <div>
                    <b>最終話</b>
                    <span className="sum">創世記は、この回で完結します。</span>
                  </div>
                  <span className="arrow">近日公開</span>
                </div>
              </li>
            </ol>
            <p className="links" style={{ marginTop: 32 }}>
              <a href={NOTE_MAGAZINE} target="_blank" rel="noopener noreferrer">noteで続きを読む →</a>
            </p>
          </div>
        </section>

        {/* S8 career */}
        <section className="career">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Career</span>
              <h2>経歴</h2>
            </div>
            <ol>
              {career.map((c) => (
                <li key={c.time} className={c.now ? 'now' : undefined}>
                  <time>{c.time}</time>
                  <div>
                    <b>{c.org}</b>
                    <span>{c.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="links" style={{ marginTop: 32 }}>
              <a href="https://ja.wikipedia.org/wiki/%E5%A4%8F%E6%9C%AC%E5%81%A5%E5%8F%B8" target="_blank" rel="noopener noreferrer">Wikipedia ー夏本健司 →</a>
            </p>
          </div>
        </section>

        {/* S9 vibe board */}
        <section className="board">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Vibe Board / 2025.10-</span>
              <h2>作ったもの</h2>
            </div>
            <div className="grid">
              {featuredApps.map((a) => <AppCard key={a.no} app={a} />)}
            </div>
            <details>
              <summary>35アプリすべてを見る ＋</summary>
              <div className="grid">
                {otherApps.map((a) => <AppCard key={a.no} app={a} />)}
              </div>
            </details>
          </div>
        </section>

        {/* S10 sns */}
        <section className="sns">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Publishing</span>
              <h2>発信</h2>
            </div>
            <ul>
              {socials.map((s) => (
                <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
              ))}
            </ul>
          </div>
        </section>

        {/* S11 contact */}
        <section className="contact">
          <div className="wrap">
            <h2>まずは、いまの経営課題を<br />お聞かせください。</h2>
            <p>企業のAI実装（FDE）、経営者向けAIコーチング、AI実践教育に関するご相談を承っています。ご紹介・情報交換からのご連絡も歓迎です。</p>
            <Link to="/contact" className="btn btn-primary">お問い合わせ</Link>
          </div>
        </section>
      </div>
    </SjShell>
  );
};

export default ProfileNatsumoto;
