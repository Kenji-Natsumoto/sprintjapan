import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { z } from 'zod';

const contactSchema = z.object({
  company: z.string().trim().min(1, { message: "会社名を入力してください" }).max(100, { message: "会社名は100文字以内で入力してください" }),
  department: z.string().trim().min(1, { message: "部署・役職を入力してください" }).max(100, { message: "部署・役職は100文字以内で入力してください" }),
  name: z.string().trim().min(1, { message: "お名前を入力してください" }).max(100, { message: "お名前は100文字以内で入力してください" }),
  email: z.string().trim().email({ message: "有効なメールアドレスを入力してください" }).max(255, { message: "メールアドレスは255文字以内で入力してください" }),
  phone: z.string().trim().max(20, { message: "電話番号は20文字以内で入力してください" }).optional(),
  message: z.string().trim().min(1, { message: "お問い合わせ内容を入力してください" }).max(2000, { message: "お問い合わせ内容は2000文字以内で入力してください" }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    department: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      contactSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "入力エラー",
          description: "入力内容を確認してください。",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "送信完了",
        description: "お問い合わせを受け付けました。1営業日以内にご連絡いたします。",
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "送信エラー",
        description: "送信中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="glass-card p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
                <Check className="text-primary" size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-4">お問い合わせありがとうございます</h1>
              <p className="text-foreground/80 mb-8">
                ご登録いただいたメールアドレスに自動返信メールをお送りしました。<br />
                担当者より1営業日以内にご連絡させていただきます。
              </p>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  お急ぎの場合は、以下のお問い合わせ先までご連絡ください。
                </p>
                <Button variant="hero" onClick={() => setIsSubmitted(false)}>
                  フォームに戻る
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">
              お気軽にお問い合わせください
            </p>
            <p className="text-foreground/80">
              ProSprintに関するご質問やご相談など、<br />
              お気軽にお問い合わせください。担当者より1営業日以内にご連絡いたします。
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <Label htmlFor="company" className="text-base">
                会社名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                type="text"
                required
                aria-required="true"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="mt-2"
                placeholder="例：株式会社〇〇"
              />
              {errors.company && (
                <p className="text-sm text-destructive mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <Label htmlFor="department" className="text-base">
                部署・役職 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="department"
                type="text"
                required
                aria-required="true"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-2"
                placeholder="例：事業開発部 部長"
              />
              {errors.department && (
                <p className="text-sm text-destructive mt-1">{errors.department}</p>
              )}
            </div>

            <div>
              <Label htmlFor="name" className="text-base">
                ご担当者名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                aria-required="true"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
                placeholder="例：山田 太郎"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-base">
                メールアドレス <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                aria-required="true"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
                placeholder="example@company.co.jp"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-base">
                電話番号（任意）
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-2"
                placeholder="例：03-1234-5678"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message" className="text-base">
                お問い合わせ内容 <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                required
                aria-required="true"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-2 min-h-40"
                placeholder="お問い合わせ内容をご記入ください。"
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">{errors.message}</p>
              )}
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                aria-label="お問い合わせを送信する"
                disabled={isSubmitting}
              >
                {isSubmitting ? '送信中...' : 'お問い合わせを送信する'}
              </Button>
            </div>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-8">
            ご入力いただいた情報は、お問い合わせへの回答およびご連絡のみに使用いたします。<br />
            個人情報の取り扱いについては、当社プライバシーポリシーに準じます。
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
