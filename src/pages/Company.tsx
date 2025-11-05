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
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">Innovation First</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              イノベーションを<span className="gradient-text">カンタン</span>にして、
              <br />
              社会をより良くする
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
              当社の全ての業務は、この目的のために存在しています。
            </p>
          </div>
        </div>
      </section>
      
      <div className="pb-24">
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
                    <span className="gradient-text">AIプラットフォーム</span>にナレッジの全てを注ぎ込む
                  </h2>
                  <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
                    事業開発ノウハウとフレームワークをどこよりも精度高くAI化
                  </p>
                </div>

                {/* Why Change Business Model Section */}
                <div id="why-change-model" className="mb-32 scroll-mt-32">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-20" />
                    
                    <div className="relative glass-card-strong p-12 md:p-16 border-l-4 border-primary">
                      <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-5xl font-bold mb-8">
                          なぜ今<span className="gradient-text">ビジネスモデル</span>を変えるのか？
                        </h3>
                      </div>
                      
                      <div className="prose prose-lg max-w-4xl mx-auto">
                        <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                          青臭い話かもしれませんが、生成AIや関連技術の急激な発展により、すべての業界、すべての業種において変革が余儀なくされようとしています。これまでデザインスプリント・顧客開発モデルをベースに研修・コンサルティングしてきた当社にとってもこれは例外ではありません。
                        </p>
                        
                        <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                          そこでコンサルティングするだけでなく、自ら変わることでこの大きな波に乗り方を示そうと考え、実行に移しました。
                        </p>
                        
                        <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                          実は、今年前半から着々と準備を進めていました。正直、まだ準備は完全ではありませんが、"最初は恥ずかしいようなレベルでもローンチして改善しながら質を上げていく"というリーンスタートアップの理念に従い、今、まさにトライ＆エラーを繰り返しながら実践しています。
                        </p>
                        
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-primary/20 mb-10">
                          <p className="text-xl text-foreground/90 leading-relaxed text-center font-medium">
                            この新しいコーポレートサイトをご覧いただくことで、"変わるべきは、今"を感じていただき、後に続く方や企業さまが１つでも増えることを切に願っています。
                          </p>
                        </div>
                        
                        <div className="text-right mt-12">
                          <p className="text-2xl font-bold gradient-text inline-block border-b-2 border-primary pb-2">
                            夏本 健司
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">会社名</span>
                  <span className="text-foreground/90">スプリントジャパン株式会社</span>
                </div>
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">設立</span>
                  <span className="text-foreground/90">2019年9月15日</span>
                </div>
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">代表者</span>
                  <span className="text-foreground/90">夏本 健司</span>
                </div>
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">資本金</span>
                  <span className="text-foreground/90">10,000,000円</span>
                </div>
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">所在地</span>
                  <span className="text-foreground/90">東京都渋谷区代々木1-36-6 929</span>
                </div>
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">事業内容</span>
                  <span className="text-foreground/90">AIプラットフォームの創造と運営</span>
                </div>
                <div className="flex items-start border-b border-border pb-3">
                  <span className="text-muted-foreground w-32">主要顧客</span>
                  <span className="text-foreground/90">大企業・中堅企業60社、大手大学6校</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">沿革</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2017</span>
                  <p className="text-sm text-foreground/80">
                    デザインスプリントのワークショップを開始
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2019</span>
                  <p className="text-sm text-foreground/80">
                    デザインスプリントの研修会社として法人設立
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2020</span>
                  <p className="text-sm text-foreground/80">
                    オンラインプログラムの提供開始
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2022</span>
                  <p className="text-sm text-foreground/80">
                    国内30社への導入実績を達成
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2023</span>
                  <p className="text-sm text-foreground/80">
                    顧客開発モデルをベースにコンサルティング事業を開始
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2024</span>
                  <p className="text-sm text-foreground/80">
                    国内60社への導入実績を達成
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-sm">2025</span>
                  <p className="text-sm text-foreground/80">
                    AIドリブン企業へビジネスモデル転換を宣言
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
