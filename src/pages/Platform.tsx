import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import heroImage from '@/assets/smatsta-eyecatch.png';
import traithImage from '@/assets/traith-eyecatch.png';
import solvistaImage from '@/assets/solvista-eyecatch.png';

const Platform = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24 relative">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="gradient-text">SMATSTA</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              組織の事業創造AIプラットフォーム
            </p>
            <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
              ６ステップでスジの良いビジネスアイデアへと導きます。
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mb-32 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img 
                src={heroImage} 
                alt="ProSprintダッシュボードの概観" 
                className="relative w-full shadow-2xl border border-border/50"
              />
            </div>
          </div>

          {/* TRAITH Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="gradient-text">TRAITH</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              組織の理念を変革するAIプラットフォーム
            </p>
            <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
              組織の理念をMTPとAIで素早く正しく言語化できます。
            </p>
          </div>

          {/* TRAITH Image */}
          <div className="mb-32 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img 
                src={traithImage} 
                alt="TRAITHプラットフォームの概観" 
                className="relative w-full shadow-2xl border border-border/50"
              />
            </div>
          </div>

          {/* SOLVISTA Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="gradient-text">SOLVISTA</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              社会課題解決AIプラットフォーム
            </p>
            <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
              「社会課題解決」のファーストステップを３つのロジックで具体化できます。
            </p>
          </div>

          {/* SOLVISTA Image */}
          <div className="mb-32 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img 
                src={solvistaImage} 
                alt="SOLVISTAプラットフォームの概観" 
                className="relative w-full shadow-2xl border border-border/50"
              />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Platform;
