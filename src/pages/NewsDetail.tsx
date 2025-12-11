import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ExternalLink, Share2 } from "lucide-react";
import { newsData } from "@/data/newsData";
import { supabase } from "@/integrations/supabase/client";
import { NewsArticle } from "@/hooks/useNewsArticles";
import { trackExternalLink, trackDownload } from "@/hooks/useAnalytics";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [dbArticle, setDbArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Check if this is a database article (prefixed with "db-")
  const isDbArticle = id?.startsWith('db-');
  const dbId = isDbArticle ? id?.replace('db-', '') : null;
  
  // Find static news article
  const staticNews = !isDbArticle ? newsData.find((item) => item.id === id) : null;

  useEffect(() => {
    const fetchDbArticle = async () => {
      if (!dbId) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', dbId)
        .maybeSingle();
      
      if (!error && data) {
        setDbArticle(data);
      }
      setLoading(false);
    };

    if (isDbArticle) {
      fetchDbArticle();
    }
  }, [dbId, isDbArticle]);

  // Prepare news data for display
  const news = staticNews ? {
    title: staticNews.title,
    date: staticNews.date,
    readTime: staticNews.readTime,
    category: staticNews.category,
    image: staticNews.image,
    content: staticNews.content,
  } : dbArticle ? {
    title: dbArticle.title,
    date: format(new Date(dbArticle.published_at), 'yyyy年MM月dd日'),
    readTime: '3分',
    category: dbArticle.category,
    image: dbArticle.image_url || '/placeholder.svg',
    content: dbArticle.content,
  } : null;

  // Track PDF downloads and external links in article content
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      if (href.endsWith('.pdf')) {
        trackDownload(href.split('/').pop() || 'unknown.pdf');
      } else if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        trackExternalLink(href);
      }
    };

    const articleElement = document.querySelector('article');
    if (articleElement) {
      articleElement.addEventListener('click', handleLinkClick);
      return () => articleElement.removeEventListener('click', handleLinkClick);
    }
  }, [news]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">読み込み中...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
                prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-10
                prose-h3:text-2xl
                prose-p:mb-7 prose-p:leading-[1.8]
                prose-ul:my-6 prose-li:my-2
                [&>ul+h2]:mt-12
                prose-strong:text-primary
                [&>p]:mb-7
                [&_h2]:!text-[32px] [&_h2]:!font-bold
                [&_a]:text-primary [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4
                [&_a]:hover:text-primary/80 [&_a]:transition-colors
                [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1
                [&_a[target='_blank']]:after:content-[''] 
                [&_a[target='_blank']]:after:inline-block
                [&_a[target='_blank']]:after:w-4 [&_a[target='_blank']]:after:h-4
                [&_a[target='_blank']]:after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOCAxM3Y2YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yVjhhMiAyIDAgMCAxIDItMmg2Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTUgMyAyMSAzIDIxIDkiLz48bGluZSB4MT0iMTAiIHgyPSIyMSIgeTE9IjE0IiB5Mj0iMyIvPjwvc3ZnPg==')]
                [&_a[target='_blank']]:after:bg-contain [&_a[target='_blank']]:after:bg-no-repeat"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
            
            {/* TRAITH Link Button */}
            {id === "transformx-release" && (
              <div className="mt-12 pt-8 border-t">
                <a 
                  href="https://purpose-setting-app-4r2c4yfk.devinapps.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('TRAITH App')}
                >
                  <Button variant="outline" size="lg" className="w-full md:w-auto">
                    「TRAITH」はこちら
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Share Section */}
        <section className="pb-12 px-4 border-t">
          <div className="container mx-auto max-w-4xl pt-12">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Share2 className="w-5 h-5" />
                <span>この記事をシェア</span>
              </div>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  onClick={() => trackExternalLink('Twitter Share')}
                >
                  <Button variant="outline" size="lg" className="gap-2 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                  </Button>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  onClick={() => trackExternalLink('Facebook Share')}
                >
                  <Button variant="outline" size="lg" className="gap-2 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  onClick={() => trackExternalLink('LinkedIn Share')}
                >
                  <Button variant="outline" size="lg" className="gap-2 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
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
