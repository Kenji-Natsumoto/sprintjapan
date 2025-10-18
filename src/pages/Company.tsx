import { Building, Target, History, Network, Repeat, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Company = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Vision Section */}
          <section id="vision" className="mb-32 scroll-mt-32">
            <div className="relative">
              <div className="absolute inset-0 mesh-gradient opacity-30 rounded-3xl" />
              
              <div className="relative z-10">
                {/* Vision Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                  <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">Vision & Strategy</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    なぜ<span className="gradient-text">プラットフォーム</span>なのか？
                  </h2>
                  <p className="text-2xl md:text-3xl font-semibold mb-4">
                    <span className="text-primary">"作って終わらせない"</span>
                    <span className="text-foreground/90">土台が成長を生む</span>
                  </p>
                  <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
                    運用・収益まで見据えた設計が、近い将来の伸びを担保
                  </p>
                </div>

                {/* Main Vision Statement */}
                <div className="relative mb-24 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-20" />
                  <div className="relative glass-card-strong p-12 border-l-4 border-primary">
                    <p className="text-xl text-foreground/80 leading-relaxed">
                      運用・収益まで見据えた設計が、近い将来の伸びを担保。<br />
                      作るほど速く・安く・賢くなる「再利用のループ」を実現し、<br />
                      会議の知を即ソフトへ翻訳する文化を組織に定着させます。
                    </p>
                  </div>
                </div>

                {/* Core Principles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
                  {[
                    {
                      icon: Repeat,
                      title: "再利用性",
                      description: "一度作った部品は、全プロジェクトで活用可能",
                      color: "primary",
                      delay: "0s"
                    },
                    {
                      icon: Network,
                      title: "ネットワーク効果",
                      description: "利用者が増えるほど、知の資産が増幅",
                      color: "secondary",
                      delay: "0.1s"
                    },
                    {
                      icon: Sparkles,
                      title: "継続的進化",
                      description: "AIと人の協働で、常に最適な解を更新",
                      color: "accent",
                      delay: "0.2s"
                    }
                  ].map((principle) => {
                    const Icon = principle.icon;
                    const glowClass = `glow-${principle.color}`;
                    
                    return (
                      <div 
                        key={principle.title}
                        className="glass-card-strong p-10 hover-lift group text-center animate-fade-in-up"
                        style={{ animationDelay: principle.delay }}
                      >
                        <div className={`w-20 h-20 rounded-full bg-${principle.color}/10 flex items-center justify-center mx-auto mb-8 ${glowClass} group-hover:scale-110 transition-all duration-300`}>
                          <Icon className={`text-${principle.color}`} size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-5">{principle.title}</h3>
                        <p className="text-foreground/70 leading-relaxed text-lg">
                          {principle.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Future Vision */}
                <div className="space-y-10 mb-32">
                  <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">
                      近未来の<span className="gradient-text">成長シナリオ</span>
                    </h3>
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                      3つのフェーズで実現するプラットフォーム企業への道
                    </p>
                  </div>

                  <div className="glass-card-strong p-10 hover-lift border-l-4 border-primary animate-slide-in-right" style={{ animationDelay: '0s' }}>
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary glow-primary">
                        01
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-4 text-primary">フェーズ1：土台の確立（2025年）</h4>
                        <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
                          国内大企業を中心に、ProSprintの基盤を固めます。地方中核都市での実績を積み重ね、プラットフォームとしての信頼性を確保。
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-sm text-foreground/80">β版リリースと初期顧客の獲得</p>
                          </div>
                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-sm text-foreground/80">共通部品ライブラリの整備</p>
                          </div>
                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-sm text-foreground/80">AI機能の継続的改善</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card-strong p-10 hover-lift border-l-4 border-secondary animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-secondary glow-secondary">
                        02
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-4 text-secondary">フェーズ2：加速的拡大（2026-2027年）</h4>
                        <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
                          蓄積された知見を活かし、導入スピードを飛躍的に向上。新規顧客は過去の成功パターンを即座に利用可能に。
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                            <p className="text-sm text-foreground/80">業界別テンプレートの拡充</p>
                          </div>
                          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                            <p className="text-sm text-foreground/80">エコシステムパートナーの拡大</p>
                          </div>
                          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                            <p className="text-sm text-foreground/80">グローバル展開の準備</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card-strong p-10 hover-lift border-l-4 border-accent animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-accent glow-accent">
                        03
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-4 text-accent">フェーズ3：プラットフォーム企業へ（2028年以降）</h4>
                        <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
                          「会議の知を即ソフトへ」が業界標準に。ProSprintは事業開発のOSとして、あらゆる企業の成長基盤となります。
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                            <p className="text-sm text-foreground/80">API/SDK公開による外部連携</p>
                          </div>
                          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                            <p className="text-sm text-foreground/80">マーケットプレイスの開設</p>
                          </div>
                          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                            <p className="text-sm text-foreground/80">AI機能の完全自律化</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Closing Message */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-20" />
                  <div className="relative text-center glass-card-strong p-16">
                    <div className="inline-block mb-8 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-sm font-medium text-primary">Our Mission</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-8">
                      私たちが目指す<span className="gradient-text">世界</span>
                    </h3>
                    <p className="text-xl text-foreground/70 leading-relaxed max-w-4xl mx-auto">
                      すべての企業が、アイデアを即座に形にできる世界<br />
                      会議で生まれた「知」が、その日のうちに動くソフトウェアになる<br />
                      <span className="text-primary font-semibold">そんな未来を、ProSprintは実現します</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
