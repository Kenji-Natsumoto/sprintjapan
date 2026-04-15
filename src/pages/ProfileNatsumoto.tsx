import { ArrowLeft, ExternalLink, Sparkles, Briefcase, GraduationCap, Rocket, Users, Brain, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import natsumotoPortrait from '@/assets/instructor-natsumoto.png';

const stats = [
  { label: 'AI導入コンサル並行', value: '4社', icon: Briefcase },
  { label: '半年で創ったAIアプリ', value: '35個', icon: Rocket },
  { label: '雇っているAIエージェント', value: '7名', icon: Cpu },
  { label: '使い分けているAI', value: '65+', icon: Brain },
];

const aiClients = [
  { name: '善都（ZENT）', desc: 'AI活用コンサルティング' },
  { name: 'USEN＝ALMEX', desc: 'AI活用コンサルティング' },
  { name: '湯川塾', desc: 'AIセミナー・分科会' },
];

const sprintClients = [
  '本田技研工業（Honda）', '日産自動車', 'アルク', 'ウイングアーク1st', '東急',
];

const vibeBoard = [
  { num: 1, name: 'SOLVISTA', desc: '社会課題解決プラットフォーム' },
  { num: 2, name: 'SMATSTA', desc: '事業創造プラットフォーム' },
  { num: 3, name: 'TRAITH', desc: '企業理念（パーパス）言語化ツール' },
  { num: 4, name: 'Vibe Manager', desc: 'AIネイティブアプリ企画・運営管理ツール' },
  { num: 5, name: 'Vyse', desc: 'AI CEO＋証跡管理プラットフォーム' },
  { num: 6, name: 'FinHabit', desc: '投資家育成・営業支援アプリ' },
  { num: 7, name: 'Lumora', desc: '糖尿病患者向け生活管理ダッシュボード' },
  { num: 8, name: '和菓座', desc: '和菓子教室用レシピ共有アプリ' },
  { num: 9, name: 'W.S. KOKORO', desc: '個人サロン向け予約管理アプリ' },
  { num: 10, name: '未来の扉', desc: '占い系・将来像イメージングアプリ' },
  { num: 11, name: "Vibe O'Clock", desc: 'カスタマイズ世界時計' },
  { num: 12, name: 'VibeCodingX', desc: 'バイブコーディング情報配信' },
  { num: 13, name: '3D TPS Game', desc: '3Dシューティングゲーム' },
  { num: 14, name: 'GrindIRL', desc: 'ゲーム型 習慣化トラッカー' },
  { num: 15, name: 'HabitFlow CEO', desc: '経営者向け習慣トラッカー' },
  { num: 16, name: 'スロゼン Mobile', desc: 'AI搭載パチスロ情報アプリ' },
  { num: 17, name: 'ギャラクシアン', desc: 'アーケードゲーム再現' },
  { num: 18, name: 'インベーダー', desc: 'テーブルゲーム再現' },
  { num: 19, name: 'VibeRush', desc: 'AIアプリの公開プラットフォーム' },
  { num: 20, name: 'NA-NA-SHI', desc: 'スライド編集・配布' },
];

const socials = [
  { platform: 'X', url: 'https://x.com/natsuken1' },
  { platform: 'note', url: 'https://note.com/vibe_coding' },
  { platform: 'Facebook', url: 'https://www.facebook.com/na2ken/' },
  { platform: 'YouTube', url: 'https://www.youtube.com/@THE-AI-COMPANY-STORY' },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@kenjinatsumoto' },
  { platform: 'Instagram', url: 'https://www.instagram.com/kenjinatsumoto/' },
  { platform: 'Medium', url: 'https://medium.com/@kenji_Natsumoto' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kenji-viberush/' },
];

const ProfileNatsumoto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
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
              <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                <img src={natsumotoPortrait} alt="夏本 健司" className="w-full h-full object-cover" />
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
              <p className="text-lg text-foreground/70">
                「AI-Native COMPANY-Lab」主宰
              </p>
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
              <span className="text-primary font-bold text-xl mx-1">7人分</span>の労働成果に相当
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
                「これから成長する企業は、AI-Nativeカンパニーを目指せ」
              </blockquote>
              <p className="text-lg text-foreground/75 leading-relaxed mb-4">
                「効率化」を目的にAIを導入する企業は半年で陳腐化する。必要なのは、パーパスから逆算し、2年後の組織を今設計すること。
              </p>
              <p className="text-lg text-foreground/75 leading-relaxed mb-8">
                AIは業務ツールではなく、<span className="text-primary font-semibold">組織の意思決定構造を再定義する技術</span>である。
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
            東京藝術大学美術学部卒 ―{' '}
            <a href="https://ja.wikipedia.org/wiki/%E5%A4%8F%E6%9C%AC%E5%81%A5%E5%8F%B8" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              Wikipedia <ExternalLink size={12} />
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
            <p className="text-muted-foreground">2025.10〜2026.3 バイブコーディング制作実績（一部）</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vibeBoard.map((app) => (
              <div key={app.num} className="glass-card p-5 hover-lift group cursor-default">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-primary/50 mt-0.5">#{String(app.num).padStart(2, '0')}</span>
                  <div>
                    <p className="font-bold text-sm group-hover:text-primary transition-colors">{app.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{app.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                className="glass-card px-6 py-3 hover-lift inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {s.platform}
                <ExternalLink size={14} className="text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfileNatsumoto;
