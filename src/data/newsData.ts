import transformxImage from "@/assets/news-traith-app.png";
import websiteImage from "@/assets/news-website.jpg";
import businessPlanImage from "@/assets/news-business-plan.jpg";
import techTrendsImage from "@/assets/news-tech-trends.png";
import techTrendsNovImage from "@/assets/news-tech-trends-nov.png";
import techTrendsNov15Image from "@/assets/news-tech-trends-nov-15.jpg";
import techTrendsNov25Image from "@/assets/news-tech-trends-nov-25.jpg";
import techTrendsDec05Image from "@/assets/news-tech-trends-dec-05.jpg";
import soulSeasonsImage from "@/assets/news-2026-soul-seasons.png";
import aiDiscoveryImage from "@/assets/news-2026-ai-discovery-community.png";
import traithPImage from "@/assets/news-2026-traith-p.png";
import mtpMoonshotImage from "@/assets/news-2026-mtp-moonshot.png";
import hidoriImage from "@/assets/news-2026-hidori.png";
import siteRenewalImage from "@/assets/news-2026-site-renewal.png";
import vibeRushImage from "@/assets/news-2026-viberush-japan.jpeg.asset.json";

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export const newsData: NewsItem[] = [
  {
    id: "viberush-japan-release",
    title: "AIアプリのPRプラットフォーム「VibeRush Japan」を公開しました。",
    date: "2026年09月13日",
    readTime: "2分",
    category: "プロダクト",
    image: vibeRushImage.url,
    excerpt: "日本の作者が作ったAIアプリやAIスキルを、名前と短い説明だけで公開できる無料のPRプラットフォーム「VibeRush Japan」を公開しました。",
    content: `
      <p>AIアプリのPRプラットフォーム「<a href="https://jp.viberush.io/" target="_blank" rel="noopener noreferrer">VibeRush Japan</a>」を公開しました。<b>日本の作者が作ったAIアプリやAIスキルを、気軽に公開・PRできる</b>プラットフォームです。</p>
      <br />
      <p>公開に必要なのは、<b>プロダクト名・短い説明・作者名</b>だけです。現在はアカウント登録も不要で、30秒ほどで掲載できます。詳しい情報やリンクは、あとから追加できます。</p>
      <br />
      <p>AIを使ってアプリやスキルを作れる人が増える一方で、完成したものを知ってもらう場所はまだ十分ではありません。<b>個人や非エンジニアの作品も、日本のメーカーの並びで見つけてもらえる場所</b>を目指しています。</p>
      <br />
      <p><b>掲載も利用も無料です。</b>プロダクトの権利は、すべて作者本人に残ります。</p>
      <br />
      <p>AIアプリやAIスキルを作った方は、ぜひ公開してみてください。<a href="https://jp.viberush.io/" target="_blank" rel="noopener noreferrer">https://jp.viberush.io/</a></p>
    `,
  },
  {
    id: "site-renewal-2026",
    title: "コーポレートサイトを刷新し、ニュースを常設しました。",
    date: "2026年09月06日",
    readTime: "2分",
    category: "企業情報",
    image: siteRenewalImage,
    excerpt: "サイト全体のデザインを統一し、ニュースをグローバルメニューに常設しました。カテゴリで記事を絞り込めるようにしています。",
    content: `
      <p>コーポレートサイトの刷新を行いました。</p>
      <br />
      <p><b>ニュースをグローバルメニューに常設</b>し、ニュース一覧と記事ページのデザインをサイト全体と統一しました。あわせて、記事を<b>カテゴリ</b>（テクノロジー／プロダクト／企業情報 ほか）で絞り込めるようにしています。</p>
      <br />
      <p>これまで当社の取り組みは、その都度お伝えするに留まっていました。<b>やったことが積み上がって見える場所</b>を、サイトの中に置きます。</p>
      <br />
      <p>今後、プロダクトの公開や勉強会の開催などを、こちらでお知らせしていきます。</p>
    `,
  },
  {
    id: "hidori-release",
    title: "無料の日程調整アプリ「HI-DO-RI」を公開しました。",
    date: "2026年09月03日",
    readTime: "2分",
    category: "プロダクト",
    image: hidoriImage,
    excerpt: "集まる日を「なるはや」で決めたい——そのための日程調整アプリ「HI-DO-RI」を公開しました。候補日を出して、URLを配って、○△×で集めるだけです。",
    content: `
      <p>無料の日程調整アプリ「<a href="https://hi-do-ri.replit.app/" target="_blank" rel="noopener noreferrer">HI-DO-RI</a>」を公開しました。<b>集まる日を「なるはや」で決めたい</b>——そのためのアプリです。</p>
      <br />
      <p>使い方は3つだけです。<b>候補日を並べて出欠表をつくる。出てきたURLを参加者に配る。○△×が集まったら、主催者が1日を決める。</b></p>
      <br />
      <p><b>回答する側にログインは要りません。</b>主催者から届いたURLを開けば、その場で○△×を入力できます（出欠表をつくる側は、主催者アカウントでのログインが必要です）。</p>
      <br />
      <p>もともとは自社の勉強会の日程を決めるために作ったものです。実際に使ってみて、他の方にも役立ちそうだったので公開しました。</p>
      <br />
      <p>絶賛フィードバックをお待ちしています。<a href="https://hi-do-ri.replit.app/" target="_blank" rel="noopener noreferrer">https://hi-do-ri.replit.app/</a></p>
    `,
  },
  {
    id: "mtp-moonshot-2026",
    title: "MTP（変革目的）とムーンショットを制定しました。",
    date: "2026年08月09日",
    readTime: "3分",
    category: "企業情報",
    image: mtpMoonshotImage,
    excerpt: "「日本国内でAIネイティブカンパニーを当たり前にする」というMTPと、2027年8月10日を期限とするムーンショットを制定しました。",
    content: `
      <p>2026年8月9日、当社はMTP（Massive Transformative Purpose＝野心的な変革目的）とムーンショットを制定しました。</p>
      <br />
      <h2>▼ MTP</h2>
      <p><b>日本国内でAIネイティブカンパニーを当たり前にして、日本の経済界・産業界を世界レベルへと押し上げる。</b></p>
      <br />
      <h2>▼ ムーンショット</h2>
      <p><b>2027年8月10日までに、スモールビジネス・スタートアップ経営者100人以上がAIネイティブカンパニーの仕組みを運用し、「思い描いた未来が実現できている」と宣言できている。</b></p>
      <br />
      <p>2025年に「AIドリブン企業へのビジネスモデル転換」を宣言してから、次に決めるべきは<b>どこへ向かうか</b>でした。それがこの2つです。あわせて、対象を<b>日本市場に絞る</b>ことも決めています。「日本を元気にするための会社」であるという線を、はっきりさせるためです。</p>
      <br />
      <p>私たちはまず、自分たちがその最初の実例になります。</p>
    `,
  },
  {
    id: "traith-p-release",
    title: "個人のMTPと目標を30〜40分で言語化するアプリ「TRAITH-P」を公開しました。",
    date: "2026年06月05日",
    readTime: "3分",
    category: "プロダクト",
    image: traithPImage,
    excerpt: "2025年10月に公開した組織向けの「TRAITH」に続き、その個人版となる「TRAITH-P」を公開しました。",
    content: `
      <p>個人のMTP（Massive Transformative Purpose＝野心的な変革目的）と目標を、30〜40分かけて言語化するアプリ「<a href="https://traith-p.lovable.app/" target="_blank" rel="noopener noreferrer">TRAITH-P</a>」を公開しました。</p>
      <br />
      <p>2025年10月に公開した「TRAITH」は<b>組織の理念</b>を言語化するものでした。TRAITH-P はその<b>個人版</b>です。</p>
      <br />
      <p>ステップに沿って進めるだけで言葉になります。途中の候補出しをAIが担うので、<b>白紙の前で止まりません。</b>「Soul Seasons Guide」で整えた現在地（AS-IS）を引き継いで始めることも、まっさらから始めることもできます。</p>
      <br />
      <p><b>現在地と目的地を、別々の道具で、続けて言葉にする。</b>2本のアプリはそのように繋がっています。</p>
      <br />
      <p>登録もログインも不要です。<a href="https://traith-p.lovable.app/" target="_blank" rel="noopener noreferrer">https://traith-p.lovable.app/</a></p>
    `,
  },
  {
    id: "ai-discovery-community-first",
    title: "「AI実践教育・コミュニティ」の１形態として「湯川塾分科会：AIでやりたいこと発見コミュニティ」をオープンしました。",
    date: "2026年05月04日",
    readTime: "4分",
    category: "イベント",
    image: aiDiscoveryImage,
    excerpt: "2026年5月4日、東京・阿佐ヶ谷にて第1回を開催しました。AIの操作を覚える会ではなく、「AIで何をやりたいのか」を自分の言葉にする会です。",
    content: `
      <p>2026年5月4日、東京・阿佐ヶ谷にて「<b>AIでやりたいこと発見コミュニティ</b>」の第1回を開催しました。7名の方にご参加いただきました。共催は湯川鶴章氏です。</p>
      <br />
      <p>当社のサービス「AI実践教育＆コミュニティ」の1つの形態にあたります。<b>AIの操作を覚える会ではありません。「AIで何をやりたいのか」を、自分の言葉にする会です。</b></p>
      <br />
      <p>第1回では3つをお話ししました。<b>効率性より効果性が先である</b>こと（「どうやるか」より「何をやるか」）。<b>AIには4つの型がある</b>こと（生成AI・CLI・バイブコーディング・AIエージェント）。そして<b>「本当にやりたいこと」は、いまの延長線上にはない</b>こと。</p>
      <br />
      <p>後半は、前日に公開したアプリで参加者それぞれの現在地を可視化し、2人1組で30分の相互コーチングを行いました。聞き手のルールは2つだけです。<b>解決策を出さない。ジャッジしない。</b></p>
      <br />
      <p>月に1回・全6回。以後は新宿・渋谷でも開催しています。詳細は <a href="/ai-discovery-community">こちら</a>。</p>
    `,
  },
  {
    id: "soul-seasons-guide-release",
    title: "生年月日から「いまの自分」がわかる無料アプリ「Soul Seasons Guide」を公開しました。",
    date: "2026年05月03日",
    readTime: "3分",
    category: "プロダクト",
    image: soulSeasonsImage,
    excerpt: "生年月日を入れるだけで、いまの自分の運気とライフステージがわかる無料アプリを公開しました。AIに相談する前に、自分の現在地を言葉にするための道具です。",
    content: `
      <p>生年月日を入れるだけで、いまの自分の運気とライフステージがわかる無料アプリ「<a href="https://soulseasonsguide.lovable.app/" target="_blank" rel="noopener noreferrer">Soul Seasons Guide</a>」を公開しました。</p>
      <br />
      <p>狙いは、占うことそのものではありません。<b>AIに相談するとき、多くの方が「いまの自分」をうまく言葉にできない</b>——そこを埋めるための道具です。</p>
      <br />
      <p>素質論・西洋占星術・四柱推命の3つから多面的に読み取り、結果を「AS-IS（現在地）」の文章にまとめます。その文章をコピー1回で ChatGPT / Claude / Gemini に貼れば、そのまま相談を続けられます。</p>
      <br />
      <p><b>自分の現在地を言葉にしてから相談すると、AIの返答は一般論から具体へ変わります。</b></p>
      <br />
      <p>登録もログインも不要です。<a href="https://soulseasonsguide.lovable.app/" target="_blank" rel="noopener noreferrer">https://soulseasonsguide.lovable.app/</a></p>
    `,
  },
  {
    id: "tech-trends-dec-05-2025",
    title: "テックトレンド速報 #5 12月05日号を公開しました。",
    date: "2025年12月05日",
    readTime: "5分",
    category: "テクノロジー",
    image: techTrendsDec05Image,
    excerpt: "バイブコーディングとAI駆動開発の最新動向を速読できるレポート「テックトレンド速報 #5 12月05日号」を公開致しました。",
    content: `
      <p>本日、バイブコーディングとAI駆動開発の最新動向を速読できるレポート「<a href="https://sprintjapan.com/tt2025/TT5.pdf" target="_blank" rel="noopener noreferrer">テックトレンド速報 #5 12月05日号</a>」を公開致しました。</p>
      
      <br />
      
      <p>このレポートは、主にこのような方々向けに編集しています。</p>
      <ul>
        <li>・"バイブコーディング"、"AI駆動開発"に関心のある方</li>
        <li>・新規事業立ち上げの関係者</li>
        <li>・オープンイノベーションに従事されている方</li>
        <li>・スモールビジネスの経営者</li>
        <li>・スタートアップのCEO</li>
        <li>・副業・起業を考えている方</li>
      </ul>
      
      <br />
      
      <h2>▼「テックトレンド速報 #5 12月05日号」はこちら</h2>
      
      <p><a href="https://sprintjapan.com/tt2025/TT5.pdf" target="_blank" rel="noopener noreferrer">https://sprintjapan.com/tt2025/TT5.pdf</a></p>
      
      <br />
      
      <p>もしご興味がおありでしたら、ぜひご高覧ください。</p>
    `,
  },
  {
    id: "tech-trends-nov-25-2025",
    title: "テックトレンド速報 #4 11月25日号を公開しました。",
    date: "2025年11月25日",
    readTime: "5分",
    category: "テクノロジー",
    image: techTrendsNov25Image,
    excerpt: "バイブコーディングとAI駆動開発の最新動向を速読できるレポート「テックトレンド速報11月25日号」を公開致しました。",
    content: `
      <p>本日、バイブコーディングとAI駆動開発の最新動向を速読できるレポート「<a href="https://sprintjapan.com/tt2025/TT4.pdf" target="_blank" rel="noopener noreferrer">テックトレンド速報 #4  11月25日号</a>」を公開致しました。</p>
      
      <br />
      
      <p>このレポートは、主にこのような方々向けに編集しています。</p>
      <ul>
        <li>・"バイブコーディング"、"AI駆動開発"に関心のある方</li>
        <li>・新規事業立ち上げの関係者</li>
        <li>・オープンイノベーションに従事されている方</li>
        <li>・スモールビジネスの経営者</li>
        <li>・スタートアップのCEO</li>
        <li>・副業・起業を考えている方</li>
      </ul>
      
      <br />
      
      <p>今回の主なトピックは次の通りです。</p>
      
      <br />
      
      <h2>▼最新8バイブコーディングプラットフォームにてベンチマークを行いました。</h2>
      
      <ul>
        <li>・Google Antigravity</li>
        <li>・ParaFlow</li>
        <li>・Lovable</li>
        <li>・bolt.new</li>
        <li>・v0</li>
        <li>・Gemini 3.0</li>
        <li>・ChatGPT 5.1</li>
        <li>・Claude Sonnet4.5</li>
      </ul>
      
      <br />
      
      <p>また、「作ってみよう！本格的バイブコーディング」や「企業導入ガイド」などの記事も掲載しています。</p>
      
      <br />
      
      <h2>▼「テックトレンド速報 #4  11月25日号」はこちら</h2>
      
      <p><a href="https://sprintjapan.com/tt2025/TT4.pdf" target="_blank" rel="noopener noreferrer">https://sprintjapan.com/tt2025/TT4.pdf</a></p>
      
      <br />
      
      <p>もしご興味がおありでしたら、ぜひご高覧ください。</p>
    `,
  },
  {
    id: "tech-trends-nov-15-2025",
    title: "テックトレンド速報11月15日号を公開しました。",
    date: "2025年11月15日",
    readTime: "5分",
    category: "テクノロジー",
    image: techTrendsNov15Image,
    excerpt: "バイブコーディングとAI駆動開発の最新動向を速読できるレポート「テックトレンド速報11月15日号」を公開致します。",
    content: `
      <p>バイブコーディングとAI駆動開発の最新動向を速読できるレポート「<a href="https://sprintjapan.com/rep/fin_spj_TechTrends_BreakingNews251115.pdf" target="_blank" rel="noopener noreferrer">テックトレンド速報11月15日号</a>」を公開致します。</p>
      
      <p>主なトピックは次の通りです。</p>
      
      <h2>2025年11月15日時点の動向：</h2>
      <ul>
        <li>・全14個の「AI開発プラットフォーム」最新情報を掲載</li>
        <li>・Product Hunt AI製品比率</li>
        <li>・Y Combinator Winter 2026バッチ</li>
        <li>・トレンドカテゴリが示す2025年の開発者ニーズ</li>
        <li>・Jordan Fisher氏の発言、全36ページ</li>
      </ul>
      
      <br />
      <br />
      
      <p>ここ10日間の興味深い出来事としては、「Vibe Coding」が 英語辞典の「2025年の言葉」に選定されたことです。また、AIは国家規模のインフラとなり、いよいよロボットが家庭に入り始めたことです。</p>
      
      <p><a href="https://sprintjapan.com/rep/fin_spj_TechTrends_BreakingNews251115.pdf" target="_blank" rel="noopener noreferrer">https://sprintjapan.com/rep/fin_spj_TechTrends_BreakingNews251115.pdf</a></p>
    `,
  },
  {
    id: "tech-trends-nov-2025",
    title: "テックトレンド速報11月5日号を公開しました。",
    date: "2025年11月5日",
    readTime: "4分",
    category: "テクノロジー",
    image: techTrendsNovImage,
    excerpt: "バイブコーディングとAI駆動開発の最新動向を速読できるレポート「テックトレンド速報11月5日号」を公開致します。",
    content: `
      <p>バイブコーディングとAI駆動開発の最新動向を速読できるレポート「<a href="https://sprintjapan.com/rep/fin_spj_TechTrends_BreakingNews251105.pdf" target="_blank" rel="noopener noreferrer">テックトレンド速報11月5日号</a>」を公開致します。</p>
      
      <p>主なトピックは次の通りです。</p>
      
      <h2>2025年11月5日時点の動向：</h2>
      <ul>
        <li>・バイブコーディング検索数が3ヶ月で6,700%増加</li>
        <li>・「ハネムーン期間は終わった」バイブコーディング6ヶ月後の現実と成熟化</li>
        <li>・Product Hunt トップ7のうち 6製品が収益化フェーズへ</li>
        <li>・トレンドカテゴリが示す2025年の開発者ニーズ</li>
        <li>・バイブコーディングは「成長」から「成熟」へ 他、全16ページ</li>
      </ul>
      
      <br />
      <br />
      
      <p>興味深いことは、米国では「AI実験の時代」を終え、「AI実用化と収益化の時代」へと移行していることです。バイブコーディングはその象徴であり、今後の成熟化が鍵となります。</p>
    `,
  },
  {
    id: "tech-trends-report",
    title: "バイブコーディング・AI駆動開発の最新動向をレポートにしました。",
    date: "2025年10月16日",
    readTime: "3分",
    category: "テクノロジー",
    image: techTrendsImage,
    excerpt: "当社で標榜している「バイブコーディング」と「AI駆動開発」及びスタートアップ界隈の最新動向を集めたレポートを作成しました。",
    content: `
      <p>当社で標榜している「バイブコーディング」と「AI駆動開発」及びスタートアップ界隈の最新動向を集めたレポートを「<a href="https://bit.ly/47EIJ7d" target="_blank" rel="noopener noreferrer">テックトレンド速報10月16日号</a>」として作成しました。</p>
      
      <p>ご興味のある方はぜひご一読ください。</p>
      
      <p>下記は、その主なトピックです。</p>
      
      <h2>2025年10月16日時点での情報：</h2>
      <ul>
        <li>・バイブコーディングツールのトップ6が開発現場を席巻</li>
        <li>・CLI型AIコーディングエージェントが2025年のヒット商品に</li>
        <li>・バイブコーディングは減速傾向も、実用化は着実に進行</li>
        <li>・買収経験者が集結：YCの次世代支援体制が強化される</li>
        <li>・AI開発ツールは「実験」から「標準」へ</li>
      </ul>
      
      <br />
      <br />
      
      <p>興味深いことは、米国ではバイブコーディングは実用フェーズへ移行し、AIエージェント向けインフラが急速に整備されていることです。CLI型AIコーディングエージェントが2025年のヒット商品となり、開発者の働き方が根本から変わりつつあるようです。</p>
    `,
  },
  {
    id: "transformx-release",
    title: "組織の理念をMTPとAIで素早く正しく言語化できる無料アプリ「TRAITH」をリリースしました。",
    date: "2025年10月17日",
    readTime: "5分",
    category: "プロダクト",
    image: transformxImage,
    excerpt: "組織の理念やMTP（Massive Transformative Purpose）を、AIの力を活用して効率的に言語化するアプリケーション「TRAITH」をリリースしました。",
    content: `
      <p>スプリントジャパン株式会社は、2025年10月17日、組織の理念を「MTP」とAIを使って素早く正しく言語化する全く新しい業務アプリ「TRAITH（トライス）」をリリースしました。</p>
      
      <p>「MTP」とは Massive Transformative Purpose の略で、「野心的な変革目的」と訳されます。成長前のGoogleやMeta、Uber、Airbnbなどの新興企業が「世界に途方もない変化をもたらすゴール」として定めた組織の理念を言語化したもので、別の言い方をすると、これらの会社がのちに成長する指針になった「旗印」です。</p>
      
      <p>「TRAITH」は、このメソッドやナレッジをベースに組織の「パーパス」を素早く正しく言語化することができます。専用に学習させたAIのアドバイスを利用することで、組織の目指す方向性を、ズレなくブレなく、ステークホルダー全員が理解しやすい言葉で言語化できます。</p>
      
      <p>これにより、組織の一体感を高め、イノベーションを加速させます。</p>
      
      <h2>主な機能</h2>
      <ul>
        <li>✓ 日本語・英語の両言語対応</li>
        <li>✓ MTP定義のステップバイステップガイド</li>
        <li>✓ 基盤作りの4つのステップ記入・チェック機能</li>
        <li>✓ 複数の候補作成・編集・バージョン管理機能</li>
        <li>✓ MTPを学習したAIによる適切な評価と改善アドバイス</li>
        <li>✓ MTPチェック機能</li>
        <li>✓ MTPのダウンロード機能</li>
      </ul>
      
      <h2>期待効果</h2>
      <p>「TRAITH」を利用することで、会社だけでなく、プロジェクト、部門、研究チームなど組織全般の理念、考え方、方針、コンセプトを明確に言語化したい時に威力を発揮します。短時間で的確な文章が作成でき、これにかかるコストを大幅に短縮できます。</p>
      
      <p>またMTPを学んだ専門のコンサルタントのようなAIの適切なアドバイスを得ることで、短時間でブラッシュアップをすることができます。</p>
      
      <p>AIの客観的視点が加わることで、組織の本質的な意味や今まで気が付かなかった価値感などを見出すことができ、効果的な表現へと昇華させることができます。</p>
      
      <h2>ご体験ください</h2>
      <p>今なら無料・登録なしでお使いいただけますので、ご興味のある方は下のリンクから「TRAITH（トライス）」をご体験ください。同じブラウザをお使いであれば、日を置いて何度も書き換えることができます。ただしブラウザやデバイスを変えるとゼロからやり直しになりますので、ご注意ください。</p>
      
      <p>今後はユーザーフィードバックを基にユーザーインターフェースの改善・機能追加を行い、組織の理念草案から決定、浸透実践までをサポートする包括的なプラットフォームへとバージョンアップさせていく計画です。</p>
    `,
  },
  {
    id: "website-launch",
    title: "コーポレートサイトのテスト運用を開始しました。",
    date: "2025年10月3日",
    readTime: "3分",
    category: "企業情報",
    image: websiteImage,
    excerpt: "スプリントジャパン株式会社のコーポレートサイトを独立したドメイン（https://ssprintjapan.net/）で新たに立ち上げました。",
    content: `
      <p>当社のコーポレートサイトを、独立したドメイン（https://sprintjapan.net/）で新たに立ち上げました。今後は、こちらで会社の方針やニュース、製品情報をより速く・分かりやすくお伝えしていきます。</p>
      
      <h2>リニューアルのポイント</h2>
      <p>新しいウェブサイトでは、お客さまや一般訪問者が当社の方向性や製品をより直感的にご理解いただけるよう、以下の点を重視して設計しています。</p>
      
      <ul>
        <li><strong>明確な言葉：</strong>私たちの考えや方針を誰もが理解し易い言葉で表現していること</li>
        <li><strong>モダンなデザイン：</strong>最新のWebデザイントレンドを取り入れた視覚的に観やすいUIであること</li>
        <li><strong>レスポンシブ対応：</strong>スマートフォンやタブレットなど、あらゆるデバイスで快適に閲覧できること</li>
        <li><strong>高速表示：</strong>最新技術を活用し可能な限り高速なページ読み込みを実現すること</li>
      </ul>
      
      <h2>新しいコンテンツ</h2>
      <p>今回のリニューアルに伴い、以下の新しいコンテンツを追加しました。</p>
      <ul>
        <li>私たちの今後を解説した「会社概要」内の「近未来の成長シナリオ」</li>
        <li>導入実績をご紹介する「導入実績」ページ</li>
        <li>プラットフォーム製品群をご紹介する「プラットフォーム」ページ</li>
        <li>お問い合わせと資料請求がしやすくなった専用フォーム</li>
      </ul>
      
      <h2>今後の予定</h2>
      <p>今後も継続的にコンテンツを充実させ、お客さまや一般訪問者にとって価値ある情報を提供していきます。ご意見・ご要望がございましたら、問い合わせフォームからお気軽にお問い合わせください。</p>
      
      <p>なお、これまでのサイト（https://sprintjapan.com/）は、今後オウンドメディアとして独立して機能させていく方針です。</p>
    `,
  },
];
