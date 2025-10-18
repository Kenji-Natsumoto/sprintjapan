import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import transformxImage from "@/assets/news-transformx.jpg";
import websiteImage from "@/assets/news-website.jpg";
import businessPlanImage from "@/assets/news-business-plan.jpg";

const newsContent = {
  "transformx-release": {
    title: "組織の理念をMTPとAIで素早く正しく言語化するアプリ「TransformX」をリリース",
    date: "2025年1月15日",
    readTime: "5分",
    category: "プロダクト",
    image: transformxImage,
    content: `
      <p>スプリントジャパン株式会社は、組織の理念やMTP（Massive Transformative Purpose）を、AIの力を活用して効率的に言語化するアプリケーション「TransformX」をリリースしました。</p>
      
      <h2>TransformXとは</h2>
      <p>TransformXは、企業や組織が持つビジョンや理念を、AIを活用して明確かつ魅力的な言葉で表現するためのツールです。組織の目指す方向性を、ステークホルダー全員が理解しやすい形で言語化することで、組織の一体感を高め、イノベーションを加速させます。</p>
      
      <h2>主な機能</h2>
      <ul>
        <li><strong>AIによる対話型言語化：</strong>組織の特性や目標をヒアリングし、最適な表現を提案</li>
        <li><strong>MTPテンプレート：</strong>成功事例を基にしたテンプレートで効率的に作成</li>
        <li><strong>多言語対応：</strong>グローバル展開を見据えた多言語での言語化をサポート</li>
        <li><strong>協調編集機能：</strong>チームメンバーで協力しながら理念を磨き上げる</li>
      </ul>
      
      <h2>期待される効果</h2>
      <p>TransformXを活用することで、組織の理念策定にかかる時間を大幅に短縮し、より明確で共感を呼ぶメッセージを作成できます。また、AIによる客観的な視点が加わることで、組織の本質的な価値を見出し、効果的に表現することが可能になります。</p>
      
      <h2>今後の展開</h2>
      <p>今後は、ユーザーフィードバックを基に機能を拡充し、組織の理念浸透から実践までをサポートする包括的なプラットフォームへと進化させていく予定です。</p>
    `,
  },
  "website-launch": {
    title: "新ウェブサイトを公開・運用開始",
    date: "2024年12月22日",
    readTime: "3分",
    category: "企業情報",
    image: websiteImage,
    content: `
      <p>スプリントジャパン株式会社の新しいウェブサイトを公開しました。より分かりやすく、私たちのビジョンとサービスをお伝えします。</p>
      
      <h2>リニューアルのポイント</h2>
      <p>新しいウェブサイトは、訪問者がスプリントジャパンのビジョンやサービスをより直感的に理解できるよう、以下の点を重視して設計されています。</p>
      
      <ul>
        <li><strong>明確なメッセージ：</strong>私たちのミッションとビジョンを分かりやすく表現</li>
        <li><strong>モダンなデザイン：</strong>最新のWebデザイントレンドを取り入れた視覚的に魅力的なUI</li>
        <li><strong>レスポンシブ対応：</strong>スマートフォンやタブレットなど、あらゆるデバイスで快適に閲覧可能</li>
        <li><strong>高速表示：</strong>最新技術を活用した高速なページ読み込み</li>
      </ul>
      
      <h2>新しいコンテンツ</h2>
      <p>リニューアルに伴い、以下の新しいコンテンツを追加しました：</p>
      <ul>
        <li>私たちのビジョンを詳しく紹介する「Vision」ページ</li>
        <li>実績を紹介する「Case Studies」ページ</li>
        <li>プラットフォームの詳細を説明する「Platform」ページ</li>
        <li>お問い合わせがしやすくなった「RFI」ページ</li>
      </ul>
      
      <h2>今後の予定</h2>
      <p>今後も継続的にコンテンツを充実させ、皆様にとって価値ある情報を提供していきます。ご意見・ご要望がございましたら、お気軽にお問い合わせください。</p>
    `,
  },
  "business-plan-2025": {
    title: "2025年事業計画のお知らせ",
    date: "2024年12月1日",
    readTime: "7分",
    category: "企業情報",
    image: businessPlanImage,
    content: `
      <p>スプリントジャパン株式会社は、2025年の事業計画を発表しました。AIとイノベーションを軸に、企業の成長を加速させる新しいサービスを展開します。</p>
      
      <h2>2025年の重点戦略</h2>
      
      <h3>1. AIプラットフォームの拡充</h3>
      <p>ProSprintプラットフォームをさらに進化させ、事業開発の全プロセスをサポートする包括的なソリューションを提供します。AIによる要件定義から実装支援まで、一気通貫したサービスを実現します。</p>
      
      <h3>2. パートナーシップの強化</h3>
      <p>国内外の優れた企業やテクノロジーパートナーとの連携を強化し、より広範囲なサービス提供を目指します。特に、AI技術とドメイン知識を組み合わせた高度なソリューション開発に注力します。</p>
      
      <h3>3. 人材育成と組織強化</h3>
      <p>AIとイノベーションの専門家チームをさらに拡充し、お客様により高い価値を提供できる体制を構築します。社内教育プログラムの充実により、全社員のスキルアップを図ります。</p>
      
      <h2>新規サービスの展開</h2>
      
      <h3>TransformXシリーズの拡大</h3>
      <p>組織の理念言語化ツール「TransformX」に続き、事業戦略策定支援、マーケティング戦略立案支援など、TransformXシリーズとして複数のAIツールをリリース予定です。</p>
      
      <h3>AIコンサルティングサービス</h3>
      <p>お客様の事業課題に対し、AIを活用した解決策を提案・実装するコンサルティングサービスを本格展開します。PoC（概念実証）から本番導入までをトータルサポートします。</p>
      
      <h2>数値目標</h2>
      <ul>
        <li>売上高：前年比150%成長</li>
        <li>顧客数：50社以上の新規獲得</li>
        <li>プロダクトローンチ：年間3つの新サービスリリース</li>
        <li>社員数：20名体制への拡大</li>
      </ul>
      
      <h2>最後に</h2>
      <p>2025年は、スプリントジャパンにとって飛躍の年となります。お客様、パートナー企業の皆様と共に、イノベーションを推進し、より良い未来を創造していくことを目指します。引き続きのご支援をよろしくお願いいたします。</p>
    `,
  },
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = id ? newsContent[id as keyof typeof newsContent] : null;

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">記事が見つかりません</h1>
            <Link to="/news">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ニュース一覧に戻る
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Back Button */}
        <section className="pt-32 pb-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/news">
              <Button variant="ghost" className="mb-8 hover:bg-accent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ニュース一覧に戻る
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="pb-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <Badge variant="secondary" className="mb-4">
              {news.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {news.title}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{news.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-xl aspect-video">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <article 
              className="prose prose-lg prose-invert max-w-none
                prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                prose-h2:text-3xl prose-h3:text-2xl
                prose-p:mb-6 prose-p:leading-relaxed
                prose-ul:my-6 prose-li:my-2
                prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </section>

        {/* Back to List Button */}
        <section className="pb-16 px-4 border-t">
          <div className="container mx-auto max-w-4xl pt-12">
            <Link to="/news">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ニュース一覧に戻る
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
