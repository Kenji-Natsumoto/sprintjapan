import { Building, Target, History } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Company = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Question Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              スプリントジャパンは何者？
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              プラットフォームを運営する会社へ
            </p>
          </div>

          {/* Mission Statement */}
          <div className="glass-card p-12 mb-16 border-l-4 border-primary text-center">
            <h2 className="text-3xl font-bold mb-6">ミッション</h2>
            <p className="text-2xl text-foreground/90">
              会議の知を、即ソフトへ。
            </p>
          </div>

          {/* Company Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 hover-scale text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 glow-primary">
                <Target className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">ピボット宣言（2025）</h3>
              <p className="text-foreground/80">
                コンサルティング型から<br />
                プラットフォーム型へ転換
              </p>
            </div>

            <div className="glass-card p-8 hover-scale text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 glow-secondary">
                <Building className="text-secondary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">AI×VIBEコーディング</h3>
              <p className="text-foreground/80">
                独自技術で<br />
                実装スピードを飛躍的に向上
              </p>
            </div>

            <div className="glass-card p-8 hover-scale text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <History className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">60社以上の導入知見</h3>
              <p className="text-foreground/80">
                実践で培った<br />
                ノウハウを資産化
              </p>
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">会社概要</h3>
              <div className="space-y-4 text-sm">
                <div className="flex border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">会社名</span>
                  <span className="text-foreground/90">株式会社スプリントジャパン</span>
                </div>
                <div className="flex border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">設立</span>
                  <span className="text-foreground/90">2020年</span>
                </div>
                <div className="flex border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">事業内容</span>
                  <span className="text-foreground/90">AI搭載事業開発プラットフォームの運営</span>
                </div>
                <div className="flex border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">主要顧客</span>
                  <span className="text-foreground/90">国内大企業・地方中核企業</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">沿革</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2020</span>
                  <p className="text-sm text-foreground/80">
                    事業開発コンサルティング会社として創業
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2022</span>
                  <p className="text-sm text-foreground/80">
                    国内30社への導入実績を達成
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2024</span>
                  <p className="text-sm text-foreground/80">
                    ProSprint開発開始、VIBE技術の内製化に着手
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2025</span>
                  <p className="text-sm text-foreground/80">
                    プラットフォーム企業へのピボットを宣言<br />
                    国内60社以上の導入実績
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="mt-16 glass-card p-12 text-center">
            <h3 className="text-2xl font-bold mb-6">私たちの想い</h3>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              日本の企業には、会議で語られる豊富な知見があります。<br />
              しかし、その多くは議事録に埋もれ、活用されないまま失われていきます。<br /><br />
              私たちは、その「会議の知」を即座にソフトウェアへ変換し、<br />
              企業の成長を加速させる未来を創ります。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Company;
