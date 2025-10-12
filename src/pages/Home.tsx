import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Eye, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/prosprint-lp.png';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10, 11, 14, 0.7), rgba(10, 11, 14, 0.9)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container mx-auto px-4 z-10 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              事業開発を、もっと"動くソフト"にできる？
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-4 font-semibold animate-fade-in" style={{ animationDelay: '0.1s' }}>
              会議の知を即ソフトへ。AI搭載「ProSprint」
            </p>
            <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
              2025年、スプリントジャパンは「プラットフォームを運営する会社」へ。<br />
              VIBEコーディング×AIで、要件→MVP→本番を一気通貫。<br />
              まずは国内大企業を中心に、地方中核都市から実装を加速。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/rfi">
                  ミニMVP（90分）を予約
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline-glow" size="lg" asChild>
                <Link to="/rfi">2週間PoCを相談</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/platform">デモを見る</Link>
              </Button>
            </div>
            
            <div className="mt-16 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="mb-2">国内60社以上の導入実績</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <span className="glass-card px-4 py-2">製造業</span>
                <span className="glass-card px-4 py-2">IT・通信</span>
                <span className="glass-card px-4 py-2">レジャー</span>
                <span className="glass-card px-4 py-2">B2B SaaS</span>
                <span className="glass-card px-4 py-2">新規事業</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-elevated">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover-scale">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">すぐ動く</h3>
              <p className="text-muted-foreground">
                要件→MVP→本番を最短で。会議の知をAIが即座にソフトウェアへ翻訳します。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 glow-secondary">
                <Eye className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">見える</h3>
              <p className="text-muted-foreground">
                SKU単位で成果・売上帰属を可視化。事業の成果を明確に追跡できます。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Network className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">広がる</h3>
              <p className="text-muted-foreground">
                共通部品を在庫化し横展開。一度作った資産が組織全体で再利用できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
