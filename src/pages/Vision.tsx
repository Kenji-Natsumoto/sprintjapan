import { Network, Repeat, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Vision = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Question Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              なぜプラットフォームなのか？
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              "作って終わらせない"土台が成長を生む
            </p>
          </div>

          {/* Main Vision Statement */}
          <div className="glass-card p-12 mb-20 border-l-4 border-primary">
            <p className="text-lg text-foreground/90 leading-relaxed">
              運用・収益まで見据えた設計が、近い将来の伸びを担保。<br />
              作るほど速く・安く・賢くなる「再利用のループ」を実現し、<br />
              会議の知を即ソフトへ翻訳する文化を組織に定着させます。
            </p>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 hover-scale text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 glow-primary">
                <Repeat className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">再利用性</h3>
              <p className="text-foreground/80">
                一度作った部品は、<br />
                全プロジェクトで活用可能
              </p>
            </div>

            <div className="glass-card p-8 hover-scale text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6 glow-secondary">
                <Network className="text-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">ネットワーク効果</h3>
              <p className="text-foreground/80">
                利用者が増えるほど、<br />
                知の資産が増幅
              </p>
            </div>

            <div className="glass-card p-8 hover-scale text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">継続的進化</h3>
              <p className="text-foreground/80">
                AIと人の協働で、<br />
                常に最適な解を更新
              </p>
            </div>
          </div>

          {/* Future Vision */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12">近未来の成長シナリオ</h2>

            <div className="glass-card p-8 hover-scale">
              <h3 className="text-xl font-bold mb-4 text-primary">フェーズ1：土台の確立（2025年）</h3>
              <p className="text-foreground/80 mb-4">
                国内大企業を中心に、ProSprintの基盤を固めます。地方中核都市での実績を積み重ね、プラットフォームとしての信頼性を確保。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• β版リリースと初期顧客の獲得</li>
                <li>• 共通部品ライブラリの整備</li>
                <li>• AI機能の継続的改善</li>
              </ul>
            </div>

            <div className="glass-card p-8 hover-scale">
              <h3 className="text-xl font-bold mb-4 text-secondary">フェーズ2：加速的拡大（2026-2027年）</h3>
              <p className="text-foreground/80 mb-4">
                蓄積された知見を活かし、導入スピードを飛躍的に向上。新規顧客は過去の成功パターンを即座に利用可能に。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 業界別テンプレートの拡充</li>
                <li>• エコシステムパートナーの拡大</li>
                <li>• グローバル展開の準備</li>
              </ul>
            </div>

            <div className="glass-card p-8 hover-scale">
              <h3 className="text-xl font-bold mb-4 text-accent">フェーズ3：プラットフォーム企業へ（2028年以降）</h3>
              <p className="text-foreground/80 mb-4">
                「会議の知を即ソフトへ」が業界標準に。ProSprintは事業開発のOSとして、あらゆる企業の成長基盤となります。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• API/SDK公開による外部連携</li>
                <li>• マーケットプレイスの開設</li>
                <li>• AI機能の完全自律化</li>
              </ul>
            </div>
          </div>

          {/* Closing Message */}
          <div className="mt-20 text-center glass-card p-12">
            <h3 className="text-2xl font-bold mb-6">私たちが目指す世界</h3>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              すべての企業が、アイデアを即座に形にできる世界。<br />
              会議で生まれた「知」が、その日のうちに動くソフトウェアになる。<br />
              そんな未来を、ProSprintは実現します。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vision;
