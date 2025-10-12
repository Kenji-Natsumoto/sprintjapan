import { Brain, Code, BarChart3, FileCheck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import dashboardImage from '@/assets/prosprint-dashboard.png';

const Platform = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Question Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ProSprintとは何？
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              要件から本番までをAIで一気通貫
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mb-24 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <img 
              src={dashboardImage} 
              alt="ProSprintダッシュボードの概観" 
              className="w-full rounded-2xl shadow-2xl border border-border"
            />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <Brain className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">A. AI仕様生成</h3>
              <p className="text-foreground/80 leading-relaxed">
                会議の知を構造化。曖昧な要件を明確な仕様書へ自動変換し、チーム全体で共有できる形に整理します。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 glow-secondary">
                <Code className="text-secondary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">B. AI実装補助</h3>
              <p className="text-foreground/80 leading-relaxed">
                VIBEコーディングで試作～実装。AIがコードを生成し、開発者は本質的な部分に集中できます。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <BarChart3 className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">C. SKUトラッキング</h3>
              <p className="text-foreground/80 leading-relaxed">
                成果物と売上を紐付け。各機能・プロダクトの事業貢献度を定量的に測定し、意思決定を支援します。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <FileCheck className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">D. 監査レポート</h3>
              <p className="text-foreground/80 leading-relaxed">
                Cap/Floor・監査ログで法務/経営に耐える。コンプライアンスとガバナンスを担保する完全なトレーサビリティ。
              </p>
            </div>
          </div>

          {/* Progress Note */}
          <div className="glass-card p-8 border-l-4 border-primary">
            <h3 className="text-xl font-bold mb-3">開発状況</h3>
            <p className="text-foreground/80">
              現在開発進捗50%。自社VIBE内製により、β版準備中です。<br />
              2025年内のフル稼働を目指し、順次機能を追加しています。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Platform;
