import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import transformxImage from "@/assets/news-transformx.jpg";
import websiteImage from "@/assets/news-website.jpg";
import businessPlanImage from "@/assets/news-business-plan.jpg";

const newsData = [
  {
    id: "transformx-release",
    title: "組織の理念をMTPとAIで素早く正しく言語化するアプリ「TransformX」をリリース",
    date: "2025年1月15日",
    readTime: "5分",
    category: "プロダクト",
    image: transformxImage,
    excerpt: "組織の理念やMTP（Massive Transformative Purpose）を、AIの力を活用して効率的に言語化するアプリケーション「TransformX」をリリースしました。",
  },
  {
    id: "website-launch",
    title: "新ウェブサイトを公開・運用開始",
    date: "2024年12月22日",
    readTime: "3分",
    category: "企業情報",
    image: websiteImage,
    excerpt: "スプリントジャパン株式会社の新しいウェブサイトを公開しました。より分かりやすく、私たちのビジョンとサービスをお伝えします。",
  },
  {
    id: "business-plan-2025",
    title: "2025年事業計画のお知らせ",
    date: "2024年12月1日",
    readTime: "7分",
    category: "企業情報",
    image: businessPlanImage,
    excerpt: "2025年の事業計画を発表しました。AIとイノベーションを軸に、企業の成長を加速させる新しいサービスを展開します。",
  },
];

const News = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-4">
              <span className="text-sm font-medium text-primary">News</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
              ニュース
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
              スプリントジャパンの最新情報をお届けします
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map((news) => (
                <Link key={news.id} to={`/news/${news.id}`} className="group">
                  <Card className="h-full hover-lift overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                          {news.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{news.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{news.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {news.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {news.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
