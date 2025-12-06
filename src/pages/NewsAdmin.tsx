import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus, FileText, Image, Calendar, Tag, Newspaper, Copy } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  useNewsArticles,
  useNewsTemplates,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  createNewsTemplate,
  updateNewsTemplate,
  deleteNewsTemplate,
  uploadNewsImage,
  NewsArticle,
  NewsTemplate
} from '@/hooks/useNewsArticles';

const articleSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  content: z.string().min(1, '本文は必須です'),
  excerpt: z.string().optional(),
  category: z.string().min(1, 'カテゴリは必須です'),
  published_at: z.string().min(1, '公開日は必須です'),
});

const templateSchema = z.object({
  name: z.string().min(1, 'テンプレート名は必須です'),
  title_template: z.string().min(1, 'タイトルテンプレートは必須です'),
  content_template: z.string().min(1, '本文テンプレートは必須です'),
  category: z.string().min(1, 'カテゴリは必須です'),
});

type ArticleFormData = z.infer<typeof articleSchema>;
type TemplateFormData = z.infer<typeof templateSchema>;

const categories = ['テクノロジー', 'プロダクト', '企業情報', 'イベント', 'お知らせ'];

const NewsAdmin = () => {
  const { toast } = useToast();
  const { articles, loading: articlesLoading, refetch: refetchArticles } = useNewsArticles();
  const { templates, loading: templatesLoading, refetch: refetchTemplates } = useNewsTemplates();
  
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<NewsTemplate | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const articleForm = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category: 'テクノロジー',
      published_at: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const templateForm = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: '',
      title_template: '',
      content_template: '',
      category: 'テクノロジー',
    },
  });

  useEffect(() => {
    if (editingArticle) {
      articleForm.reset({
        title: editingArticle.title,
        content: editingArticle.content,
        excerpt: editingArticle.excerpt || '',
        category: editingArticle.category,
        published_at: format(new Date(editingArticle.published_at), 'yyyy-MM-dd'),
      });
      if (editingArticle.image_url) {
        setImagePreview(editingArticle.image_url);
      }
    } else {
      articleForm.reset({
        title: '',
        content: '',
        excerpt: '',
        category: 'テクノロジー',
        published_at: format(new Date(), 'yyyy-MM-dd'),
      });
      setImagePreview(null);
    }
    setSelectedImage(null);
  }, [editingArticle, articleForm]);

  useEffect(() => {
    if (editingTemplate) {
      templateForm.reset({
        name: editingTemplate.name,
        title_template: editingTemplate.title_template,
        content_template: editingTemplate.content_template,
        category: editingTemplate.category,
      });
    } else {
      templateForm.reset({
        name: '',
        title_template: '',
        content_template: '',
        category: 'テクノロジー',
      });
    }
  }, [editingTemplate, templateForm]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitArticle = async (data: ArticleFormData) => {
    try {
      setIsSubmitting(true);
      let imageUrl = editingArticle?.image_url || null;

      if (selectedImage) {
        imageUrl = await uploadNewsImage(selectedImage);
      }

      const articleData = {
        title: data.title,
        content: data.content,
        category: data.category,
        image_url: imageUrl,
        published_at: new Date(data.published_at).toISOString(),
        excerpt: data.excerpt || null,
      };

      if (editingArticle) {
        await updateNewsArticle(editingArticle.id, articleData);
        toast({ title: '記事を更新しました' });
      } else {
        await createNewsArticle(articleData);
        toast({ title: '記事を公開しました' });
      }

      setIsArticleDialogOpen(false);
      setEditingArticle(null);
      refetchArticles();
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: error instanceof Error ? error.message : '記事の保存に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitTemplate = async (data: TemplateFormData) => {
    try {
      setIsSubmitting(true);

      const templateData = {
        name: data.name,
        title_template: data.title_template,
        content_template: data.content_template,
        category: data.category,
      };

      if (editingTemplate) {
        await updateNewsTemplate(editingTemplate.id, templateData);
        toast({ title: 'テンプレートを更新しました' });
      } else {
        await createNewsTemplate(templateData);
        toast({ title: 'テンプレートを作成しました' });
      }

      setIsTemplateDialogOpen(false);
      setEditingTemplate(null);
      refetchTemplates();
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: error instanceof Error ? error.message : 'テンプレートの保存に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteNewsArticle(id);
      toast({ title: '記事を削除しました' });
      refetchArticles();
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: error instanceof Error ? error.message : '記事の削除に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await deleteNewsTemplate(id);
      toast({ title: 'テンプレートを削除しました' });
      refetchTemplates();
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: error instanceof Error ? error.message : 'テンプレートの削除に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const applyTemplate = (template: NewsTemplate) => {
    articleForm.setValue('title', template.title_template);
    articleForm.setValue('content', template.content_template);
    articleForm.setValue('category', template.category);
    setIsArticleDialogOpen(true);
    toast({ title: 'テンプレートを適用しました', description: 'タイトルと本文を編集してください' });
  };

  const openNewArticleDialog = () => {
    setEditingArticle(null);
    setImagePreview(null);
    setSelectedImage(null);
    setIsArticleDialogOpen(true);
  };

  const openEditArticleDialog = (article: NewsArticle) => {
    setEditingArticle(article);
    setIsArticleDialogOpen(true);
  };

  const openNewTemplateDialog = () => {
    setEditingTemplate(null);
    setIsTemplateDialogOpen(true);
  };

  const openEditTemplateDialog = (template: NewsTemplate) => {
    setEditingTemplate(template);
    setIsTemplateDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[100px] pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">ニュース管理</h1>
            <p className="text-muted-foreground">記事の作成・編集とテンプレートの管理</p>
          </div>

          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                記事一覧
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                テンプレート
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">公開済み記事</h2>
                <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewArticleDialog}>
                      <Plus className="h-4 w-4 mr-2" />
                      新規記事作成
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingArticle ? '記事を編集' : '新規記事作成'}</DialogTitle>
                      <DialogDescription>
                        記事の内容を入力してください。本文はHTMLマークダウンで記述できます。
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...articleForm}>
                      <form onSubmit={articleForm.handleSubmit(onSubmitArticle)} className="space-y-6">
                        <FormField
                          control={articleForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>タイトル</FormLabel>
                              <FormControl>
                                <Input placeholder="記事のタイトル" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={articleForm.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>カテゴリ</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="カテゴリを選択" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {categories.map((cat) => (
                                      <SelectItem key={cat} value={cat}>
                                        {cat}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={articleForm.control}
                            name="published_at"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>公開日</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={articleForm.control}
                          name="excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>抜粋（オプション）</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="記事の概要を入力..."
                                  className="min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>一覧ページに表示される概要文</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={articleForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>本文（HTML）</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="<p>記事の本文をHTMLで記述...</p>"
                                  className="min-h-[300px] font-mono text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                HTMLタグを使用できます。例: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a href=&quot;...&quot;&gt;
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-2">
                          <FormLabel>アイキャッチ画像</FormLabel>
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="max-w-xs"
                            />
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-20 w-32 object-cover rounded-md"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsArticleDialogOpen(false)}
                          >
                            キャンセル
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? '保存中...' : editingArticle ? '更新する' : '公開する'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {articlesLoading ? (
                <div className="text-center py-12 text-muted-foreground">読み込み中...</div>
              ) : articles.length === 0 ? (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground">
                    <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>まだ記事がありません</p>
                    <p className="text-sm">「新規記事作成」から最初の記事を作成しましょう</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="flex">
                        {article.image_url && (
                          <div className="w-48 h-32 flex-shrink-0">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">{article.category}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(article.published_at), 'yyyy年MM月dd日')}
                                </span>
                              </div>
                              <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                              {article.excerpt && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {article.excerpt}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditArticleDialog(article)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>記事を削除しますか？</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      この操作は取り消せません。記事「{article.title}」を完全に削除します。
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteArticle(article.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      削除する
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">テンプレート</h2>
                  <p className="text-muted-foreground text-sm">
                    繰り返し使用する記事のテンプレートを管理できます
                  </p>
                </div>
                <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewTemplateDialog}>
                      <Plus className="h-4 w-4 mr-2" />
                      新規テンプレート
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingTemplate ? 'テンプレートを編集' : '新規テンプレート作成'}
                      </DialogTitle>
                      <DialogDescription>
                        テンプレートを作成すると、ワンクリックで記事フォームに適用できます。
                        {"{{date}}"}, {"{{link}}"}, {"{{topics}}"} などのプレースホルダーを使用できます。
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...templateForm}>
                      <form onSubmit={templateForm.handleSubmit(onSubmitTemplate)} className="space-y-6">
                        <FormField
                          control={templateForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>テンプレート名</FormLabel>
                              <FormControl>
                                <Input placeholder="例: テックトレンド速報" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={templateForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>カテゴリ</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="カテゴリを選択" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                      {cat}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={templateForm.control}
                          name="title_template"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>タイトルテンプレート</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="例: テックトレンド速報 #{{number}} {{date}}号を公開しました。"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                {"{{date}}"}, {"{{number}}"} などを使用可能
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={templateForm.control}
                          name="content_template"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>本文テンプレート（HTML）</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="テンプレートの本文をHTMLで記述..."
                                  className="min-h-[300px] font-mono text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                プレースホルダー: {"{{link}}"}, {"{{date}}"}, {"{{topics}}"}, {"{{number}}"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsTemplateDialogOpen(false)}
                          >
                            キャンセル
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? '保存中...' : editingTemplate ? '更新する' : '作成する'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {templatesLoading ? (
                <div className="text-center py-12 text-muted-foreground">読み込み中...</div>
              ) : templates.length === 0 ? (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>まだテンプレートがありません</p>
                    <p className="text-sm">「新規テンプレート」から最初のテンプレートを作成しましょう</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {templates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription className="mt-1">
                              <Badge variant="outline">{template.category}</Badge>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => applyTemplate(template)}
                              title="テンプレートを使用"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditTemplateDialog(template)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>テンプレートを削除しますか？</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    この操作は取り消せません。テンプレート「{template.name}」を完全に削除します。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteTemplate(template.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    削除する
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium mb-1">タイトル:</p>
                          <p className="mb-3 bg-muted/50 p-2 rounded text-xs font-mono">
                            {template.title_template}
                          </p>
                          <p className="font-medium mb-1">本文（プレビュー）:</p>
                          <p className="line-clamp-3 bg-muted/50 p-2 rounded text-xs font-mono">
                            {template.content_template.replace(/<[^>]*>/g, '').substring(0, 150)}...
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsAdmin;
