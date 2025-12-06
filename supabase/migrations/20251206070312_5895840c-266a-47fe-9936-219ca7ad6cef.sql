-- Create news_articles table for storing news
CREATE TABLE public.news_articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL DEFAULT 'お知らせ',
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news_templates table for storing templates (like テックトレンド速報)
CREATE TABLE public.news_templates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title_template TEXT NOT NULL,
    content_template TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'テックトレンド',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can read published news)
CREATE POLICY "Anyone can read news articles" 
ON public.news_articles 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert news articles" 
ON public.news_articles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update news articles" 
ON public.news_articles 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete news articles" 
ON public.news_articles 
FOR DELETE 
USING (true);

-- Templates policies (admin access via URL)
CREATE POLICY "Anyone can read templates" 
ON public.news_templates 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert templates" 
ON public.news_templates 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update templates" 
ON public.news_templates 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete templates" 
ON public.news_templates 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_templates_updated_at
BEFORE UPDATE ON public.news_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for news_articles
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_articles;