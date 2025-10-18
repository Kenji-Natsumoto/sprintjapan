import { Award, TrendingUp, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import clientLogos from '@/assets/client-logos.png';

const CaseStudies = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Question Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              これまでの優位性は何？
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              会議の知と事業開発の知を"資産化"
            </p>
          </div>

          {/* Main Value Proposition */}
          <div className="glass-card p-12 mb-16 border-l-4 border-primary">
            <p className="text-lg text-foreground/90 leading-relaxed">
              国内60社以上の実装経験を、ProSprint上の共通部品として在庫化。<br />
              各企業での学びを横展開することで、導入スピードと品質を飛躍的に向上させています。
            </p>
          </div>

          {/* Key Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <TrendingUp className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">会議知→MVPの高速化</h3>
              <p className="text-foreground/80 leading-relaxed">
                過去の成功パターンをテンプレート化。似た課題に対しては、90分でMVPを作成できる体制を構築。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 glow-secondary">
                <Award className="text-secondary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">SKU売上の帰属見える化</h3>
              <p className="text-foreground/80 leading-relaxed">
                各機能が事業にどれだけ貢献しているかを定量化。経営判断の精度が劇的に向上します。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <MapPin className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">地方×大企業での迅速導入</h3>
              <p className="text-foreground/80 leading-relaxed">
                中核都市での実績を基に、大企業の地方拠点でも素早く導入。地域特性に合わせたカスタマイズも柔軟に対応。
              </p>
            </div>
          </div>

          {/* Client Logos */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center">導入実績企業</h2>
            <p className="text-center text-muted-foreground mb-12">
              国内60社以上の大手企業・中堅企業での導入実績
            </p>
            
            <div className="glass-card-strong p-12 overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
                <div className="flex animate-scroll-logos">
                  <img 
                    src={clientLogos} 
                    alt="導入実績企業ロゴ" 
                    className="h-auto w-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                  <img 
                    src={clientLogos} 
                    alt="導入実績企業ロゴ" 
                    className="h-auto w-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 ml-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">導入事例の特徴</h2>
            
            <div className="space-y-6">
              <div className="glass-card p-8 hover-scale">
                <h3 className="text-xl font-bold mb-3 text-primary">製造業での活用</h3>
                <p className="text-foreground/80">
                  工場現場の改善提案を、その場でソフトウェア化。試作→検証→本番展開のサイクルを2週間から3日に短縮。
                </p>
              </div>

              <div className="glass-card p-8 hover-scale">
                <h3 className="text-xl font-bold mb-3 text-secondary">B2B SaaSでの展開</h3>
                <p className="text-foreground/80">
                  顧客要望を即座にプロトタイプ化。顧客との共創を加速し、契約更新率が15%向上。
                </p>
              </div>

              <div className="glass-card p-8 hover-scale">
                <h3 className="text-xl font-bold mb-3 text-accent">新規事業での検証</h3>
                <p className="text-foreground/80">
                  アイデア段階から2週間でPoCを完成。市場検証の回数を3倍に増やし、成功確度を大幅に向上。
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">
              具体的な数値や社名は守秘義務により非公開ですが、<br />
              詳細な事例資料は資料請求にてご提供いたします。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudies;
