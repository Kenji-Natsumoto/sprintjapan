import { Link } from "react-router-dom";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { newsData, NewsItem } from "@/data/newsData";
import { useNewsArticles, NewsArticle } from "@/hooks/useNewsArticles";

// Combine static newsData with database articles
interface CombinedNews {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  isFromDatabase: boolean;
}

const News = () => {
  const { articles, loading } = useNewsArticles();

  // Convert database articles to the same format as static newsData
  const databaseNews: CombinedNews[] = articles.map((article) => ({
    id: article.id,
    title: article.title,
    date: format(new Date(article.published_at), 'yyyy年MM月dd日'),
    readTime: '3分',
    category: article.category,
    image: article.image_url || '/placeholder.svg',
    excerpt: article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
    isFromDatabase: true,
  }));

  // Convert static newsData to combined format
  const staticNews: CombinedNews[] = newsData.map((news) => ({
    ...news,
    image: news.image,
    isFromDatabase: false,
  }));

  // Combine and sort by date (newest first)
  const allNews = [...databaseNews, ...staticNews].sort((a, b) => {
    const dateA = new Date(a.date.replace(/年|月/g, '-').replace('日', ''));
    const dateB = new Date(b.date.replace(/年|月/g, '-').replace('日', ''));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-[100px] pb-16 px-4 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto max-w-7xl">
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
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">読み込み中...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allNews.map((news) => (
                  <Link 
                    key={`${news.isFromDatabase ? 'db' : 'static'}-${news.id}`} 
                    to={news.isFromDatabase ? `/news/db-${news.id}` : `/news/${news.id}`} 
                    className="group"
                  >
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
