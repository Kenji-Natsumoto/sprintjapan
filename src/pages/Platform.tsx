import { Brain, Code, BarChart3, FileCheck, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import dashboardImage from '@/assets/prosprint-dashboard.png';

const Platform = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24 relative">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Question Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">Platform Overview</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              「ProSprint」とは？
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              企業のイノベーションを加速させるAIツール。
            </p>
            <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
              事業開発の4つのステージを高速に正しく実行できるAI搭載プラットフォームです。
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mb-32 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img 
                src={dashboardImage} 
                alt="ProSprintダッシュボードの概観" 
                className="relative w-full rounded-2xl shadow-2xl border border-border/50"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {[
              {
                icon: Brain,
                title: "A. AI仕様生成",
                description: "会議の知を構造化。曖昧な要件を明確な仕様書へ自動変換し、チーム全体で共有できる形に整理します。",
                color: "primary",
                delay: "0s"
              },
              {
                icon: Code,
                title: "B. AI実装補助",
                description: "VIBEコーディングで試作～実装。AIがコードを生成し、開発者は本質的な部分に集中できます。",
                color: "secondary",
                delay: "0.1s"
              },
              {
                icon: BarChart3,
                title: "C. SKUトラッキング",
                description: "成果物と売上を紐付け。各機能・プロダクトの事業貢献度を定量的に測定し、意思決定を支援します。",
                color: "accent",
                delay: "0.2s"
              },
              {
                icon: FileCheck,
                title: "D. 監査レポート",
                description: "Cap/Floor・監査ログで法務/経営に耐える。コンプライアンスとガバナンスを担保する完全なトレーサビリティ。",
                color: "primary",
                delay: "0.3s"
              }
            ].map((feature) => {
              const Icon = feature.icon;
              const glowClass = `glow-${feature.color}`;
              
              return (
                <div 
                  key={feature.title}
                  className="glass-card-strong p-10 hover-lift group animate-fade-in-up"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-8 ${glowClass} group-hover:scale-110 transition-all duration-300`}>
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

          {/* Progress Note */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20" />
            <div className="relative glass-card-strong p-10 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 glow-primary">
                  <Zap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">開発状況</h3>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    現在開発進捗50%。自社VIBE内製により、β版準備中です。<br />
                    2025年内のフル稼働を目指し、順次機能を追加しています。
                  </p>
                  <div className="mt-6 flex gap-3">
                    <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm">
                      <span className="text-primary font-semibold">β版準備中</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/20 text-sm">
                      <span className="text-secondary font-semibold">2025年フル稼働予定</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Platform;
