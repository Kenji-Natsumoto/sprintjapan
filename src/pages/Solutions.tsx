import { Layers, Code, Users, ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { newsData } from '@/data/newsData';
import { trackDownload } from '@/hooks/useAnalytics';

// テックトレンド速報のPDFリンクマッピング
const techTrendsPdfLinks: Record<string, string> = {
  'tech-trends-dec-05-2025': 'https://sprintjapan.com/tt2025/TT5.pdf',
  'tech-trends-nov-25-2025': 'https://sprintjapan.com/tt2025/TT4.pdf',
  'tech-trends-nov-15-2025': 'https://sprintjapan.com/rep/fin_spj_TechTrends_BreakingNews251115.pdf',
  'tech-trends-nov-2025': 'https://sprintjapan.com/rep/fin_spj_TechTrends_BreakingNews251105.pdf',
  'tech-trends-report': 'https://bit.ly/47EIJ7d',
};

const Solutions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ソリューション
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto">
              9年間の事業開発支援のナレッジと最先端AI技術を組み合わせ、お客様のビジネス成長を加速させます。
            </p>
          </div>

          {/* Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Platform Business */}
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <Layers className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">プラットフォーム運営事業</h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                最新のAI技術を活用し、ユーザー体験を革新するアプリケーションを自社開発しています。３つのプラットフォームに分けて事業開発のすべての分野をカバーしています。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• SMATSTA（スマトスタ）</li>
                <li>• SOLVISTA（ソルヴィスタ）</li>
                <li>• TRAITH（トライス）</li>
              </ul>
            </div>

            {/* Enterprise App Development */}
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 glow-secondary">
                <Code className="text-secondary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">エンタープライズ系カスタマイズアプリ開発事業</h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                お客様のビジネス要件に完全にマッチしたカスタムアプリケーションをAI駆動開発によってフルスタック開発し、短納期かつ低予算で実装。スケーラブルかつセキュリティも担保しつつ、保守性の高いシステムをお届けします。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 要件定義</li>
                <li>• 設計</li>
                <li>• フルスタック開発</li>
                <li>• クラウドインフラ保守</li>
                <li>• 運用サポート</li>
              </ul>
            </div>

            {/* Business Development Mentoring */}
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Users className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">事業開発メンタリング</h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                テック企業としての豊富な経験を活かし、事業戦略からプロダクト開発まで包括的なメンタリングサービスを提供します。
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 事業戦略策定</li>
                <li>• プロダクト設計・開発</li>
                <li>• プロジェクトリーダーシップ</li>
                <li>• 技術選定支援</li>
                <li>• チーム組成支援</li>
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

          {/* Tech Trends Express Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="text-primary" size={32} />
                <h2 className="text-3xl font-bold">テックトレンド速報</h2>
              </div>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                バイブコーディングとAI駆動開発の最新動向を速読できるレポートを定期的に発行しています。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsData
                .filter(item => item.id.startsWith('tech-trends'))
                .sort((a, b) => new Date(b.date.replace(/年|月/g, '-').replace('日', '')).getTime() - new Date(a.date.replace(/年|月/g, '-').replace('日', '')).getTime())
                .map((article) => (
                  <a
                    key={article.id}
                    href={techTrendsPdfLinks[article.id] || `/news/${article.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDownload(article.title)}
                    className="group glass-card overflow-hidden hover-scale"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full p-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">{article.date}</p>
                      <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default Solutions;
