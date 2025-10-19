import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const RFI = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    department: '',
    name: '',
    email: '',
    interests: [] as string[],
    message: '',
  });

  const interestOptions = [
    'SMATSTA',
    'TRAITH',
    'SOLVISTA',
    'その他',
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.company || !formData.department || !formData.name || !formData.email) {
      toast({
        title: "入力エラー",
        description: "必須項目をすべて入力してください。",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "入力エラー",
        description: "有効なメールアドレスを入力してください。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-rfi-email', {
        body: formData,
      });

      if (error) throw error;

      console.log('Email sent successfully:', data);
      
      setIsSubmitted(true);
      toast({
        title: "送信完了",
        description: "資料請求を受け付けました。1営業日以内にご連絡いたします。",
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
        
        <div className="pt-[100px] pb-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="glass-card p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
                <Check className="text-primary" size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-4">資料請求ありがとうございます</h1>
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
      
      <div className="pt-[100px] pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Question Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              資料請求
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">
              SMATSTA、TRAITH、SOLVISTAいずれにご興味がありますか？
            </p>
            <p className="text-foreground/80">
              下記にご記入・送信いただければ、それぞれの機能や事例を紹介した<br />
              詳しい資料をお送り致します。
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
            </div>

            <div>
              <Label className="text-base mb-3 block">
                ご関心のプロダクト
              </Label>
              <div className="space-y-3">
                {interestOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.interests.includes(option)}
                      onCheckedChange={(checked) => 
                        handleInterestChange(option, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={option}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-base">
                ご要望・メッセージ（任意）
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-2 min-h-32"
                placeholder="ご質問やご要望がございましたら、お気軽にご記入ください。"
              />
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                aria-label="資料を請求する"
                disabled={isSubmitting}
              >
                {isSubmitting ? '送信中...' : '資料を請求する'}
              </Button>
            </div>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-8">
            ご入力いただいた情報は、資料送付およびご連絡のみに使用いたします。<br />
            個人情報の取り扱いについては、当社プライバシーポリシーに準じます。
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RFI;
