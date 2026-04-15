import { ArrowLeft, ExternalLink, Sparkles, Briefcase, GraduationCap, Rocket, Users, Brain, Cpu, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import natsumotoPortrait from '@/assets/instructor-natsumoto.png';
import { SiX, SiFacebook, SiYoutube, SiTiktok, SiInstagram, SiMedium } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 17.25a5.25 5.25 0 110-10.5 5.25 5.25 0 010 10.5z"/>
  </svg>
);

const stats = [
  { label: 'AI導入コンサル並行', value: '4社', icon: Briefcase },
  { label: '半年で創ったAIアプリ', value: '35個', icon: Rocket },
  { label: '雇っているAIエージェント', value: '7名', icon: Cpu },
  { label: '使い分けているAI', value: '65+', icon: Brain },
];

const aiClients = [
  { name: '善都（ZENT）', desc: 'AI活用コンサルティング' },
  { name: 'USEN-ALMEX', desc: 'AI活用コンサルティング' },
  { name: '湯川塾', desc: 'AIセミナー・分科会' },
];

const sprintClients = [
  '本田技研工業（Honda）', '日産自動車', 'アルク', 'ウイングアーク1st', '東急',
];

type Category = 'Enterprise' | 'Life/Health' | 'Habit/Game';

const categoryConfig: Record<Category, { label: string; color: string; bg: string; border: string }> = {
  'Enterprise': { label: 'Enterprise', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  'Life/Health': { label: 'Life / Health', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'Habit/Game': { label: 'Habit / Game', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
};

const vibeBoard: { num: number; name: string; desc: string; url: string; category: Category }[] = [
  // Enterprise
  { num: 1, name: 'SOLVISTA', desc: '社会課題解決プラットフォーム', url: 'https://solvista-spj.lovable.app/', category: 'Enterprise' },
  { num: 2, name: 'SMATSTA', desc: '事業創造プラットフォーム', url: 'https://smatsta.lovable.app/', category: 'Enterprise' },
  { num: 3, name: 'TRAITH', desc: '企業理念（パーパス）言語化ツール', url: 'https://purpose-setting-app-4r2c4yfk.devinapps.com/', category: 'Enterprise' },
  { num: 4, name: 'Vibe Manager', desc: 'AIネイティブアプリ企画・運営管理ツール', url: 'https://dev-ops-insight.replit.app/', category: 'Enterprise' },
  { num: 5, name: 'Vyse', desc: 'AI CEO＋証跡管理プラットフォーム', url: 'https://vyse-is-the-ai-ceo.replit.app/', category: 'Enterprise' },
  { num: 6, name: 'FinHabit', desc: '投資家育成・営業支援アプリ', url: 'https://fin-habit-learn--kn78.replit.app/', category: 'Enterprise' },
  // Life/Health
  { num: 7, name: 'Lumora', desc: '糖尿病患者向け血糖値管理', url: 'https://glucodash.replit.app/', category: 'Life/Health' },
  { num: 8, name: '和菓座', desc: '和菓子教室レシピ共有アプリ', url: 'https://wagaza.replit.app/', category: 'Life/Health' },
  { num: 9, name: 'W.S. KOKORO', desc: '個人サロン予約管理アプリ', url: 'https://reserve-flow--kn78.replit.app/', category: 'Life/Health' },
  { num: 10, name: '未来の扉', desc: '将来像イメージング（占い風）', url: 'https://future-muse.lovable.app/', category: 'Life/Health' },
  { num: 11, name: "Vibe O'Clock", desc: '世界時計比較ツール', url: 'https://vibe-o-clock.manus.space/', category: 'Life/Health' },
  { num: 12, name: 'VibeCodingX', desc: 'VibeCoding情報プラットフォーム', url: 'https://vibecodingx.life/', category: 'Life/Health' },
  // Habit/Game
  { num: 13, name: '3D TPS Game', desc: '3Dシューティングゲーム', url: 'https://3d-tps-game-prototype.replit.app/', category: 'Habit/Game' },
  { num: 14, name: 'GrindIRL', desc: 'ゲーム型 習慣化トラッカー', url: 'https://grindirl2026.lovable.app/', category: 'Habit/Game' },
  { num: 15, name: 'HabitFlow CEO', desc: '経営者向け習慣トラッカー', url: 'https://manus.im/app-preview/GUfPNdDDSQw65KAxZVUSRd?sessionId=2AgWCXJJWXGgiRU1MXUIsU', category: 'Habit/Game' },
  { num: 16, name: 'スロゼン Mobile', desc: '次世代パチスロ情報アプリ', url: 'https://zent-mobile.lovable.app/', category: 'Habit/Game' },
  { num: 17, name: 'ギャラクシアン', desc: '懐かしのテーブル型ゲーム', url: 'https://galaxy-war--kn78.replit.app/', category: 'Habit/Game' },
  { num: 18, name: 'インベーダー', desc: '懐かしのテーブル型ゲーム', url: 'https://retro-invaders.replit.app', category: 'Habit/Game' },
  { num: 19, name: 'VibeRush', desc: 'AIネイティブアプリの公開プラットフォーム', url: 'https://viberush.io/', category: 'Habit/Game' },
  { num: 20, name: 'NA-NA-SHI', desc: 'セミナースライド編集・配布アプリ', url: 'https://slidetexteditor-3fe8g9jw.manus.space/seminar/', category: 'Habit/Game' },
];

const socials = [
  { platform: 'X', url: 'https://x.com/natsuken1', icon: SiX },
  { platform: 'note', url: 'https://note.com/vibe_coding', icon: NoteIcon },
  { platform: 'Facebook', url: 'https://www.facebook.com/na2ken/', icon: SiFacebook },
  { platform: 'YouTube', url: 'https://www.youtube.com/@THE-AI-COMPANY-STORY', icon: SiYoutube },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@kenjinatsumoto', icon: SiTiktok },
  { platform: 'Instagram', url: 'https://www.instagram.com/kenjinatsumoto/', icon: SiInstagram },
  { platform: 'Medium', url: 'https://medium.com/@kenji_Natsumoto', icon: SiMedium },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kenji-viberush/', icon: FaLinkedinIn },
];

const ProfileNatsumoto = () => {
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Eagerly preload the portrait image
    const img = new Image();
    img.src = natsumotoPortrait;
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
    }
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-24 overflow-hidden scroll-mt-0">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Link to="/company" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">会社情報に戻る</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Portrait */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-xl opacity-40 animate-pulse" />
              <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl bg-muted">
                <img
                  src={natsumotoPortrait}
                  alt="夏本 健司"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary tracking-wider">事業創造イノベーター / AI ソロプレナー</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-3">
                夏本 <span className="gradient-text">健司</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-2">Kenji Natsumoto</p>
              <p className="text-lg text-foreground/70">
                スプリントジャパン株式会社 代表取締役
              </p>
              <p className="text-lg text-foreground/70 mb-4">
                「AI-Native COMPANY-Lab」主宰
              </p>
              <a
                href="https://github.com/Kenji-Natsumoto/AI-Company/blob/main/README.ja.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                AIが意思決定に「署名する」組織モデルの理論的考察 <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-6 text-center hover-lift group">
                <s.icon className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" size={28} />
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 glass-card p-5 text-center border-l-4 border-accent">
            <p className="text-foreground/80">
              毎月<span className="text-accent font-bold text-xl mx-1">30万円</span>がAIに溶けている →
              <span className="text-primary font-bold text-xl mx-1">人間7人分</span>の労働成果
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-15" />
            <div className="relative glass-card-strong p-12 md:p-16">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-primary" size={24} />
                <h2 className="text-3xl md:text-4xl font-bold">AIに対する<span className="gradient-text">考え方</span></h2>
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold text-primary mb-8 pl-6 border-l-4 border-primary">
                「成長したい企業は、AI-Nativeカンパニーを目指せ」
              </blockquote>
              <p className="text-lg text-foreground/75 leading-relaxed mb-4">
                「効率化」を目的にAIを導入する企業は半年で陳腐化する。必要なのは、パーパスから逆算し、2年後の組織を今設計すること。
              </p>
              <p className="text-lg text-foreground/75 leading-relaxed mb-8">
                AIは、業務効率化ツールではなく<span className="text-primary font-semibold">経営戦略のブレーンに据え、組織構造と業務プロセスを再定義する技術</span>である。
              </p>
              <a
                href="https://github.com/Kenji-Natsumoto/AI-Company/blob/main/docs/ja/effectiveness-over-efficiency-v0.1.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                論文: なぜ「AI業務効率化」は失敗するのか <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="text-primary" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold">経歴</h2>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 border-l-2 border-primary/30 space-y-8 mb-12">
            {[
              { period: 'キャリア初期', org: 'テレビ朝日グループ', desc: 'Webディレクターとしてキャリアをスタート' },
              { period: '次のステージ', org: '電通グループ', desc: '企業提案・プレゼンテーション、広告・プロモーション施策・制作の実務' },
              { period: '2002年', org: '独立', desc: 'UXデザイナー、職業訓練校の講師を経験' },
              { period: '2017年〜', org: 'デザインスプリント第一人者', desc: '開発者 Jake Knapp に認められ、日本で広めることに貢献' },
              { period: '2019年', org: 'スプリントジャパン設立', desc: '上場企業12社をはじめ60組織以上で研修およびファシリテーター養成を展開' },
              { period: '2024年〜', org: 'AI専門家として始動', desc: '企業コンサルテーションおよびAI駆動開発の現場指揮を開始' },
              { period: '2025年〜', org: 'バイブコーディング特化', desc: 'バイブコーディングとAIエージェントに専門性を特化' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="glass-card p-6 hover-lift">
                  <span className="text-xs font-bold text-primary tracking-wider">{item.period}</span>
                  <h4 className="text-lg font-bold mt-1 mb-1">{item.org}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            <a href="https://ja.wikipedia.org/wiki/%E5%A4%8F%E6%9C%AC%E5%81%A5%E5%8F%B8" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              Wikipedia ー夏本健司 <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <Users className="text-primary" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold">主な<span className="gradient-text">実績</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* AI Era */}
            <div className="glass-card-strong p-8 border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-6 text-primary">AI時代（2024〜）</h3>
              <div className="space-y-4">
                {aiClients.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sprint Era */}
            <div className="glass-card-strong p-8 border-l-4 border-secondary">
              <h3 className="text-xl font-bold mb-6 text-secondary">デザインスプリント時代（2017〜2023）</h3>
              <div className="space-y-3">
                {sprintClients.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 border border-secondary/10">
                    <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                    <p className="font-semibold text-sm">{c}</p>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground pt-2">ほか上場企業12社、60組織以上</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vibe Board */}
      <section className="py-20 relative">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-medium text-accent tracking-wider">Vibe Board 1</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              半年で<span className="gradient-text">35アプリ</span>を制作
            </h2>
            <p className="text-muted-foreground">2025.10〜2026.3 バイブコーディング制作実績</p>
          </div>

          {(Object.keys(categoryConfig) as Category[]).map((cat) => {
            const cfg = categoryConfig[cat];
            const apps = vibeBoard.filter((a) => a.category === cat);
            return (
              <div key={cat} className="mb-10 last:mb-0">
                <div className={`inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full ${cfg.bg} border ${cfg.border}`}>
                  <div className={`w-2 h-2 rounded-full ${cfg.color.replace('text-', 'bg-')}`} />
                  <span className={`text-xs font-bold tracking-wider ${cfg.color}`}>{cfg.label}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {apps.map((app) => (
                    <a
                      key={app.num}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-5 hover-lift group cursor-pointer block"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-xs font-bold mt-0.5 ${cfg.color} opacity-60`}>#{String(app.num).padStart(2, '0')}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm group-hover:text-primary transition-colors">{app.name}</p>
                            <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{app.desc}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SNS */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">SNS</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-6 py-3 hover-lift inline-flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <s.icon className="w-5 h-5" />
                {s.platform}
                <ExternalLink size={14} className="text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-10" />
            <div className="relative glass-card-strong p-12 md:p-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Mail className="text-primary" size={28} />
                <h2 className="text-3xl md:text-4xl font-bold">お問い合わせ</h2>
              </div>
              <p className="text-lg text-foreground/75 leading-relaxed max-w-3xl mx-auto mb-8">
                AI導入コンサルティング、AI駆動アプリ開発、役員向けAIトレーニング、社員向けAI社内研修、新規事業創出プログラムのインストールなど、AI活用に関するご相談は、お問い合わせフォームよりご連絡ください。
              </p>
              <Link
                to="/contact#top"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-lg"
              >
                お問い合わせフォームへ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfileNatsumoto;
