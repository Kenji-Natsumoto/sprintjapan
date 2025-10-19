import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Eye, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/prosprint-lp.png';
import prosprintDashboard from '@/assets/prosprint-dashboard.png';
import smatstaImage from '@/assets/smatsta-eyecatch.png';
import transformxScreenshot from '@/assets/news-traith-app.png';
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
              9年の事業開発の叡智を<br />
              <span className="gradient-text">AIプラットフォーム化。</span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-6 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="gradient-text">3つのAIプラットフォームで市場を再定義します。</span>
            </p>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-14 max-w-3xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
              2025年、スプリントジャパンは研修会社から「事業創造のプラットフォーム企画・運営会社」へ変わります。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button variant="hero" size="lg" asChild className="group">
                <Link to="/company#why-change-model">
                  なぜ今ビジネスモデルを変えるのか？
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </Button>
              <Button variant="accent-solid" size="lg" asChild className="group">
                <Link to="/solutions">
                  勝算はあるか？
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Platforms Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text">
              すべての叡智を3つのモデルに集約
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px] auto-rows-[280px]">
            {/* Smatsta - Large Card */}
            <div 
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden animate-fade-in hover-lift"
              style={{ animationDelay: '0s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-teal-500/30 to-cyan-500/30" />
              <img 
                src={smatstaImage} 
                alt="Smatsta Platform" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="relative h-full flex flex-col justify-end p-10">
                <h3 className="text-5xl md:text-6xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                  SMATSTA<span className="text-2xl md:text-3xl ml-2">（スマトスタ）</span>
                </h3>
                <p className="text-xl md:text-2xl text-foreground/70 mt-4">
                  事業創造AIプラットフォーム
                </p>
              </div>
            </div>

            {/* Traith - Medium Card */}
            <div 
              className="md:row-span-1 group relative overflow-hidden animate-fade-in hover-lift"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-violet-500/30 to-fuchsia-500/30" />
              <img 
                src={transformxScreenshot} 
                alt="Traith Platform" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="relative h-full flex flex-col justify-end p-8">
                <h3 className="text-4xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                  TRAITH<span className="text-xl md:text-2xl ml-2">（トライス）</span>
                </h3>
                <p className="text-lg md:text-xl text-foreground/70 mt-2">
                  組織の理念を変革するAIプラットフォーム
                </p>
              </div>
            </div>

            {/* Solvista - Medium Card */}
            <div 
              className="md:row-span-1 group relative overflow-hidden animate-fade-in hover-lift"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/30 to-purple-500/30" />
              <img 
                src={prosprintDashboard} 
                alt="Solvista Platform" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              <div className="relative h-full flex flex-col justify-end p-8">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                  SOLVISTA<span className="text-xl md:text-2xl ml-2">（ソルヴィスタ）</span>
                </h3>
                <p className="text-lg md:text-xl text-foreground/70 mt-2">
                  社会課題解決AIプラットフォーム
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
