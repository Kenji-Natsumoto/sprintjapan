import { Award, TrendingUp, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import clientLogos from '@/assets/client-logos.jpg';

const CaseStudies = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Title Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              導入実績
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              国内60社以上の大手企業・中堅企業、5つ以上の有名大学など多数
            </p>
            
            {/* Client Logos */}
            <div className="flex justify-center">
              <img 
                src={clientLogos} 
                alt="導入実績企業ロゴ" 
                className="max-w-4xl w-full h-auto"
              />
            </div>
          </div>

          {/* Main Value Proposition */}
          <div className="glass-card p-12 mb-16 border-l-4 border-primary">
            <p className="text-lg text-foreground/90 leading-relaxed">
              9年間、国内60社以上の実装経験を事業開発AIプラットフォーム「ProSprint」でナレッジ化しています。
            </p>
          </div>

          {/* Key Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 glow-primary">
                <TrendingUp className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">会議知→MVPの高速化</h3>
              <p className="text-foreground/80 leading-relaxed">
                過去の成功パターンをテンプレート化。似た課題に対しては、3時間でMVPを作成できる体制を構築。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 glow-secondary">
                <Award className="text-secondary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">新規事業での検証</h3>
              <p className="text-foreground/80 leading-relaxed">
                アイデア段階から2週間でPoCを完成。仮説検証の回数を3倍に増やし、成功確度を大幅に向上。
              </p>
            </div>

            <div className="glass-card p-8 hover-scale">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <MapPin className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">地方×大企業での迅速導入</h3>
              <p className="text-foreground/80 leading-relaxed">
                中核都市での実績を基に、大企業の地方拠点でも素早くプロトタイプを導入。地域特性に合わせたカスタマイズも柔軟に対応。
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">
              事例の具体例や数値は守秘義務により非公開ですが、許可が得られている案件に関しては、資料請求にてご提供しております。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudies;
