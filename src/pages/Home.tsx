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
        {/* Background with mesh gradient */}
        <div className="absolute inset-0 mesh-gradient" />
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10, 11, 14, 0.85), rgba(10, 11, 14, 0.95)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 z-10 max-w-7xl">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
              <span className="text-sm font-medium text-primary">AI DRIVEN COMPANY</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up leading-tight" style={{ animationDelay: '0.1s' }}>
              会議の知を<br />
              <span className="gradient-text">プラットフォーム化。</span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-6 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="gradient-text">「ProSprint」でイノベーションを加速せよ。</span>
            </p>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-14 max-w-3xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
              2025年、スプリントジャパンは研修会社から「プラットフォームを創造・運営する会社」へ変わります。<br />
              VIBEコーディング（AI起動開発）で、事業開発のプロセスをSaaS化。<br />
              まずは首都圏大企業と地方中堅企業から実装を加速。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button variant="hero" size="lg" asChild className="group">
                <Link to="/rfi">
                  ミニMVP（90分）を予約
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </Button>
              <Button variant="outline-glow" size="lg" asChild>
                <Link to="/rfi">無料サインアップ</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/platform">デモを見る</Link>
              </Button>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-muted-foreground mb-6">国内60社以上の導入実績</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['製造業', 'IT・通信', 'レジャー', 'B2B SaaS', '新規事業'].map((industry, i) => (
                  <span 
                    key={industry}
                    className="glass-card px-5 py-2 text-sm font-medium hover-lift cursor-default"
                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-elevated" />
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              なぜProSprintなのか？
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              開発スピード、可視性、拡張性を同時に実現
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "すぐ動く",
                description: "要件→MVP→本番を最短で。会議の知をAIが即座にソフトウェアへ翻訳します。",
                color: "primary",
                delay: "0s"
              },
              {
                icon: Eye,
                title: "見える",
                description: "SKU単位で成果・売上帰属を可視化。事業の成果を明確に追跡できます。",
                color: "secondary",
                delay: "0.1s"
              },
              {
                icon: Network,
                title: "広がる",
                description: "共通部品を在庫化し横展開。一度作った資産が組織全体で再利用できます。",
                color: "accent",
                delay: "0.2s"
              }
            ].map((feature) => {
              const Icon = feature.icon;
              const glowClass = `glow-${feature.color}`;
              
              return (
                <div 
                  key={feature.title}
                  className="glass-card-strong p-10 hover-lift group"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-8 ${glowClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-${feature.color}`} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-5">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
