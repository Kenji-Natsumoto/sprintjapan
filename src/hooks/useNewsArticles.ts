import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NewsTemplate {
  id: string;
  name: string;
  title_template: string;
  content_template: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export const useNewsArticles = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('news_articles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news_articles'
        },
        () => {
          fetchArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { articles, loading, error, refetch: fetchArticles };
};

export const useNewsTemplates = () => {
  const [templates, setTemplates] = useState<NewsTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return { templates, loading, error, refetch: fetchTemplates };
};

export const createNewsArticle = async (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('news_articles')
    .insert([article])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateNewsArticle = async (id: string, article: Partial<NewsArticle>) => {
  const { data, error } = await supabase
    .from('news_articles')
    .update(article)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteNewsArticle = async (id: string) => {
  const { error } = await supabase
    .from('news_articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const createNewsTemplate = async (template: Omit<NewsTemplate, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('news_templates')
    .insert([template])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateNewsTemplate = async (id: string, template: Partial<NewsTemplate>) => {
  const { data, error } = await supabase
    .from('news_templates')
    .update(template)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteNewsTemplate = async (id: string) => {
  const { error } = await supabase
    .from('news_templates')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const uploadNewsImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('news-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('news-images')
    .getPublicUrl(filePath);

  return publicUrl;
};
