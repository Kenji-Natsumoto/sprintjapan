import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Rocket, Sparkles, Target, Users, Zap, Code, DollarSign, Eye, Lightbulb, HelpCircle, User } from 'lucide-react';
import instructorImage from '@/assets/instructor-natsumoto.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const curriculum = [
  {
    session: 1,
    title: '自分の立ち位置と素質を知る',
    description: '自己分析を通じて、あなたの強みと可能性を発見します',
    icon: Target,
  },
  {
    session: 2,
    title: '「未来の記憶」をイメージする',
    description: '実現したい未来を具体的にビジュアライズします',
    icon: Eye,
  },
  {
    session: 3,
    title: 'アプリを設計する',
    description: 'アイデアを形にするための設計手法を学びます',
    icon: Lightbulb,
  },
  {
    session: 4,
    title: 'アプリを創る（前編）',
    description: 'バイブコーディングで実際にアプリ開発を始めます',
    icon: Code,
  },
  {
    session: 5,
    title: 'アプリを創る（後編）',
    description: 'アプリを完成させ、動くプロダクトに仕上げます',
    icon: Rocket,
  },
  {
    session: 6,
    title: 'ビルディング・イン・パブリックに挑戦する',
    description: '開発過程を公開し、コミュニティと繋がります',
    icon: Users,
  },
  {
    session: 7,
    title: '最初の顧客を見つける',
    description: 'プロダクトを必要とする人を見つけ、届けます',
    icon: Sparkles,
  },
  {
    session: 8,
    title: '課金システムを創る（前編）',
    description: 'マネタイズの仕組みを設計します',
    icon: DollarSign,
  },
  {
    session: 9,
    title: '課金システムを創る（後編）',
    description: '決済機能を実装し、ビジネスを完成させます',
    icon: DollarSign,
  },
  {
    session: 10,
    title: '未来を創る',
    description: '継続的な成長と次のステップへ',
    icon: Zap,
  },
];

const SuperVibeCoding = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-supervibecoding-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '送信に失敗しました');
      }

      setIsSubmitted(true);
      toast({
        title: "仮登録完了",
        description: "開講のお知らせをお送りします。",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">全10回の実践講座</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              未来を創る！
              <br />
              <span className="gradient-text">超バイブコーディング講座</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
              アイデアを形に。プロダクトを収益に。
              <br />
              <span className="text-primary font-semibold">あなたの未来を、自分の手で創り出す。</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="glass-card px-6 py-3">
                <span className="text-2xl font-bold text-primary">10</span>
                <span className="text-foreground/70 ml-2">セッション</span>
              </div>
              <div className="glass-card px-6 py-3">
                <span className="text-2xl font-bold text-primary">実践</span>
                <span className="text-foreground/70 ml-2">重視</span>
              </div>
              <div className="glass-card px-6 py-3">
                <span className="text-2xl font-bold text-primary">収益化</span>
                <span className="text-foreground/70 ml-2">まで</span>
              </div>
            </div>
            
            <Button variant="hero" size="lg" asChild>
              <a href="#entry">今すぐエントリーする</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Vibe Coding */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              バイブコーディングとは？
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              AIと対話しながら、プログラミングの専門知識がなくても
              <br />
              アプリやWebサービスを創り出せる新しい開発手法です。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">コード不要</h3>
              <p className="text-foreground/70">
                プログラミング経験ゼロでもOK。AIがあなたのアイデアをコードに変換します。
              </p>
            </div>
            
            <div className="glass-card p-8 text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">超高速開発</h3>
              <p className="text-foreground/70">
                従来の開発の10倍以上のスピード。アイデアを即座にプロトタイプに。
              </p>
            </div>
            
            <div className="glass-card p-8 text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">創造性を解放</h3>
              <p className="text-foreground/70">
                技術的な制約から解放され、純粋にアイデアと価値創造に集中できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              カリキュラム
            </h2>
            <p className="text-lg text-foreground/70">
              10回のセッションで、アイデアから収益化まで
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4">
              {curriculum.map((item, index) => (
                <div 
                  key={item.session}
                  className="glass-card p-6 flex items-start gap-4 hover-lift transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-primary">
                        Session {item.session}
                      </span>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              こんな方におすすめ
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'アイデアはあるけど、形にできていない方',
              '何か新しいことを始めたい方',
              '新規事業やスタートアップに興味がある方',
              '自分のプロダクトで収益を得たい方',
              'AIを使った開発に興味がある方',
              '「作る側」になりたいと思っている方',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 glass-card p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">講師紹介</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Instructor
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={instructorImage} 
                  alt="夏本 健司" 
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">夏本 健司</h3>
                <p className="text-primary font-semibold text-lg mb-4">Vibe Code Fixer</p>
                <p className="text-foreground/80 leading-relaxed">
                  複数企業の事業創造コンサルタントであり、自身でバイブコーディング／AI駆動開発によるプロダクト開発・運用・リーダーをしています。
                  <br />
                  また、子供向けバイブコーディング ワークショップや地域活性化・社会課題解決のためのバイブコーディングチーム創りを支援しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">よくある質問</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FAQ
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="glass-card px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  プログラミング経験がなくても参加できますか？
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  はい、プログラミング経験は一切不要です。バイブコーディングはAIと対話しながら開発を行う新しい手法なので、
                  技術的な知識よりも「何を作りたいか」というアイデアと情熱が重要です。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="glass-card px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  講座の形式はオンラインですか？
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  はい、全セッションオンラインで実施予定です。リアルタイムでの参加が難しい場合も、
                  録画を後から視聴いただけるよう検討しています。詳細は開講時にご案内します。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="glass-card px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  どのようなアプリが作れるようになりますか？
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  Webアプリケーションを中心に、SaaSサービス、業務効率化ツール、コミュニティプラットフォームなど、
                  様々なタイプのアプリケーションを作成できるようになります。講座では実際に課金システムまで実装し、
                  収益化できるプロダクトを完成させることを目指します。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="glass-card px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  受講に必要なものは何ですか？
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  インターネットに接続できるパソコン（Windows/Mac）があれば参加可能です。
                  特別なソフトウェアのインストールは不要で、ブラウザ上で開発を行います。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="glass-card px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  講座の料金はいくらですか？
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  料金は現在調整中です。開講お知らせにご登録いただいた方には、
                  正式な料金と早期申込特典を優先的にご案内いたします。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="glass-card px-6 border-none">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  サポート体制はありますか？
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 leading-relaxed">
                  講座期間中は専用のコミュニティで質問や相談が可能です。
                  また、進捗に応じた個別フィードバックも予定しています。
                  仲間と一緒に学びながら、確実にプロダクトを完成させられる環境を整えています。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Entry Form */}
      <section id="entry" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                開講お知らせ登録
              </h2>
              <p className="text-foreground/70">
                開講日程が決まり次第、優先的にお知らせします
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="glass-card p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
                  <Check className="text-primary" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">登録ありがとうございます！</h3>
                <p className="text-foreground/80">
                  開講のお知らせをお送りします。<br />
                  楽しみにお待ちください。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">
                    お名前 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                    placeholder="山田 太郎"
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-base">
                    興味のあるテーマ・質問など（任意）
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 min-h-32"
                    placeholder="作ってみたいアプリや、気になることがあればお聞かせください"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    開講お知らせを受け取る
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuperVibeCoding;
