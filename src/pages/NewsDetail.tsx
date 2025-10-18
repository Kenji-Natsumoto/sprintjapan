import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { newsData } from "@/data/newsData";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((item) => item.id === id);

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
            
            {/* TransformX Link Button */}
            {id === "transformx-release" && (
              <div className="mt-12 pt-8 border-t">
                <a 
                  href="https://purpose-setting-app-4r2c4yfk.devinapps.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full md:w-auto">
                    「TransformX」はこちら
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            )}
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
