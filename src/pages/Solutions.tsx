import { Waves, Building2, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Solutions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Question Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              どこで効く？
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              現場と経営を、同じ土台で前へ
            </p>
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <Waves className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">レジャー</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                現場オペの即時反映と短期MVP。季節変動や顧客ニーズに素早く対応し、サービス品質を維持しながら新機能を追加。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 予約システムの迅速な改善</li>
                <li>• 現場フィードバックの即時反映</li>
                <li>• シーズン対応の短期開発</li>
              </ul>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 glow-secondary">
                <Building2 className="text-secondary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">B2B IT</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                複雑要件の分解とSKU別収益管理。エンタープライズ向けの高度な要求を整理し、各機能の事業貢献を可視化。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 大規模システムの段階的開発</li>
                <li>• 機能ごとの収益性分析</li>
                <li>• 顧客要望の優先順位付け</li>
              </ul>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Lightbulb className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">企画/新規事業</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                会議の知→プロト→本番の定着。アイデアを素早く形にし、市場検証を繰り返しながら事業化を加速。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• アイデアの迅速なプロトタイピング</li>
                <li>• 仮説検証サイクルの高速化</li>
                <li>• 本番環境への円滑な移行</li>
              </ul>
            </div>
          </div>

          {/* Implementation Flow */}
          <div className="glass-card p-12">
            <h2 className="text-3xl font-bold mb-12 text-center">導入フロー</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-primary">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-bold mb-2">90分ミニMVP</h4>
                <p className="text-sm text-muted-foreground">
                  即座に価値を体験
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="text-primary" size={24} />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 glow-secondary">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h4 className="font-bold mb-2">2週間PoC</h4>
                <p className="text-sm text-muted-foreground">
                  本格検証を開始
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="text-primary" size={24} />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <h4 className="font-bold mb-2">席課金導入</h4>
                <p className="text-sm text-muted-foreground">
                  10席から本格運用
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="text-primary" size={24} />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-primary">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h4 className="font-bold mb-2">売上連動</h4>
                <p className="text-sm text-muted-foreground">
                  翌年以降、成果報酬へ
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/rfi">
                  まずは90分ミニMVPから始める
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Solutions;
