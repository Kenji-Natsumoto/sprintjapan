import { Link } from 'react-router-dom';
import { HubShell, HubHeader, HubFooter, StatusChip, usePageMeta } from './shared';

const SLIDE_S1 = 'https://docs.google.com/presentation/d/144nki5XFti3qBUjxyW3MgIKfqWgwCCtq/edit?usp=sharing&ouid=114095741537537337376&rtpof=true&sd=true';
const SLIDE_S2 = 'https://docs.google.com/presentation/d/1PLRXl-DmiaHedDhGf8cNs8f9fngV6PiP/edit?usp=sharing&ouid=114095741537537337376&rtpof=true&sd=true';

const sessions = [
  {
    number: '02',
    phase: 'To-Be',
    title: 'To-Be策定（北極星：MTPと目標）',
    body: 'その場で：①フォルダ構成を決める ②自分専用のAI人格を作る ③TRAITH-Pで北極星（MTPと目標）を言語化。デスクトップアプリ（Codex / Claude Code）の基本操作を手で覚えながら、成果を traith.md に保存。最後にロードマップ／マイルストーンを軽く出力して締めます。',
    link: 'https://traith-p.lovable.app',
    list: ['持ち帰り: persona.md（AI人格）', '持ち帰り: traith.md（北極星＋見通し）'],
  },
  {
    number: '03',
    phase: 'GAP / Plan',
    title: 'GAP（AIマップ）→ Plan',
    body: 'AIマップでギャップを「緊急度×重要度＋AIでどう解決するか」に整理し、最初の一歩を1つ選択。選んだ一歩を「動く計画（最小ワークフロー）」へ設計します。',
    list: ['持ち帰り: AIマップ', '持ち帰り: 最初の一歩／最小ワークフロー'],
  },
  {
    number: '04',
    phase: 'Do',
    title: 'Do（習慣ワークフローを回す）',
    body: '設計したワークフローを実際に回し、観察サイクルを始める。',
    list: ['成果物: 日次または週次ワークフロー、実行ログ'],
  },
  {
    number: '05',
    phase: 'Check',
    title: 'Check（検証と自動化候補の特定）',
    body: '回した結果を検証し、AIに任せられる自動化候補を洗い出す。',
    list: ['成果物: 検証レポート、自動化候補'],
  },
  {
    number: '06',
    phase: 'Act',
    title: 'Act（定着と90日運用計画）',
    body: '運用標準を確定。90日で“続く仕組み”に着地させ、クロージング。',
    list: ['成果物: 運用標準、90日運用計画'],
  },
];

const tools = [
  {
    name: 'Soul Seasons Guide',
    role: 'As-Is（現在地）を可視化',
    output: '現在地の言語化（統合プロンプト）',
    link: 'https://soulseasonsguide.lovable.app',
  },
  {
    name: 'TRAITH-P',
    role: '北極星（MTPと目標）を言語化',
    output: 'To-Be／MTP／SMART目標 →『traith.md』へ',
    link: 'https://traith-p.lovable.app',
  },
  {
    name: 'AIマップ（第3回〜）',
    role: 'ギャップを「緊急度×重要度＋AIでどう解決するか」で整理',
    output: '最初の一歩／90日計画の起点',
    link: '',
  },
];

const eventInfo = [
  { k: '料金', v: '3,000円/回（税込・当日現金）' },
  { k: '定員', v: '6名限定' },
  { k: '頻度', v: '月次開催（全6回・3ヶ月で完結／第一期）' },
  { k: '対象', v: '非エンジニア・AI初心者〜中級者' },
  { k: '共催', v: '夏本健司 × 湯川鶴章' },
];

const indexCards: { status: '公開中' | '準備中'; title: string; body: string; href: string }[] = [
  { status: '公開中', title: 'カリキュラム概要', body: 'このページです。第2回から第6回までの全体像を確認できます。', href: '/ai-discovery-community' },
  { status: '準備中', title: '第1回ワークシート', body: 'Soul Seasons Guide で As-Is（現在地）を可視化する詳細ページ。', href: '/ai-discovery-community/worksheets/session-1' },
  { status: '準備中', title: '第2回ワークシート', body: 'AI人格づくりと北極星（MTPと目標）の言語化の詳細ページ。', href: '/ai-discovery-community/worksheets/session-2' },
  { status: '準備中', title: '第3回ワークシート', body: 'AIマップでギャップを整理し、最初の一歩を選ぶ詳細ページ。', href: '/ai-discovery-community/worksheets/session-3' },
  { status: '準備中', title: '第4回ワークシート', body: '習慣ワークフロー実行と観察の詳細ページ。', href: '/ai-discovery-community/worksheets/session-4' },
  { status: '準備中', title: '第5回ワークシート', body: '検証と自動化候補の整理ページ。', href: '/ai-discovery-community/worksheets/session-5' },
  { status: '準備中', title: '第6回ワークシート', body: '定着と90日運用計画の詳細ページ。', href: '/ai-discovery-community/worksheets/session-6' },
];

const faqs = [
  { q: 'エンジニアでなくても大丈夫？', a: 'はい。「AIに何を任せるか」を学ぶ会です。操作は日本語で頼めばOK。' },
  { q: 'Codex と Claude Code、どちらでも参加できる？', a: 'どちらでも同じように進められます。デスクトップアプリとしてお使いください。' },
  { q: 'パソコンがなくても参加できる？', a: '思考パート（As-Is／北極星の言語化）はスマホでも可能です。ファイルとして固定する部分だけ、ペアでの代行や後日対応で補えます。' },
  { q: '準備は？', a: '第1回の As-Is（Soul Seasons Guide の結果）をお持ちください。' },
];

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#ea580c] mb-3">{children}</div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-sm bg-white/70 border border-white/80 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}>
    {children}
  </div>
);

const SlideLink = ({ href, label, sub }: { href: string; label: string; sub: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-4 p-4 rounded-2xl bg-white/70 border border-[#e8dfc9] hover:bg-white hover:border-[#ea580c]/40 hover:-translate-y-0.5 transition-all w-full"
  >
    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#fef3df] to-[#fde4cf] border border-[#e8dfc9] grid place-items-center text-2xl">
      📊
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[11px] tracking-[0.15em] uppercase text-[#ea580c] font-semibold">Google Slides ↗</div>
      <div className="serif-jp text-[15px] font-semibold text-[#1a1409] mt-0.5">{label}</div>
      <div className="text-[12.5px] text-[#6b5d44] mt-0.5 truncate">{sub}</div>
    </div>
    <span className="text-[#ea580c] text-xl group-hover:translate-x-1 transition-transform">→</span>
  </a>
);

const AIDiscoveryHome = () => {
  usePageMeta(
    'AIでやりたいこと発見コミュニティ | Sprint Japan',
    'AIに、自分の北極星を語らせる。第1回で可視化したAs-Isを土台に、北極星（MTPと目標）を言語化し、デスクトップアプリ（Codex / Claude Code）で自分のパソコンにファイルとして残すコミュニティ。'
  );

  return (
    <HubShell>
      <HubHeader />

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-5 pt-14 md:pt-20 pb-16">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-stretch">
          <div>
            <SectionEyebrow>AIでやりたいこと発見コミュニティ</SectionEyebrow>
            <h1 className="serif-jp text-4xl md:text-5xl lg:text-6xl leading-[1.25] font-semibold text-[#1a1409]">
              AIに、毎日を回す<br />“ループ”を設計させる。
            </h1>
            <p className="mt-4 text-[15px] text-[#6b5d44]">第2回以降の進め方を、この1ページで。</p>
            <p className="mt-6 text-[17px] leading-[1.9] text-[#3a3225] max-w-2xl">
              第1回で可視化した「現在地（As-Is）」を土台に、自分だけの
              <strong className="text-[#c2410c] font-semibold">北極星（＝MTPと目標）を言語化</strong>
              し、それを<strong className="text-[#c2410c] font-semibold">デスクトップアプリ（Codex / Claude Code）</strong>
              で自分のパソコンに“ファイルとして”残します。AIを「借りた頭」で終わらせず、自分の隣に置く秘書・相棒にしていくコミュニティです。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#sessions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-medium shadow-lg shadow-[#ea580c]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                カリキュラムを見る →
              </a>
            </div>
          </div>

          {/* Dark right panel */}
          <aside className="rounded-3xl bg-gradient-to-br from-[#1c1610] to-[#2d2418] text-[#f5ecd8] p-7 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#ea580c]/20 blur-3xl" />
            <div className="relative">
              <div className="text-[11px] tracking-wider uppercase text-[#d4a84c]">最終更新</div>
              <div className="text-lg font-medium mt-1">2026年6月3日</div>
              <div className="my-6 h-px bg-white/10" />
              <ul className="space-y-3.5 text-[14px]">
                {[
                  '第1回は終了済み',
                  '第2回で AI人格 と 北極星 を言語化',
                  '第3回以降は GAP→PDCA で改善',
                  '全6回・3ヶ月で完結',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#d4a84c] mt-0.5">◆</span>
                    <span className="text-[#ece3cd]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Overview</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-4 text-[#1a1409]">
          効率化の先へ。「何をやるか（北極星）」を先に決める。
        </h2>
        <p className="text-[15px] leading-[1.9] text-[#3a3225] mb-10 max-w-3xl">
          速く走るより、正しい方向に走る。AIで“やりたいこと”を見つけ、形にするために2つのレイヤーで進めます。
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="serif-jp text-xl font-semibold mb-3 text-[#c2410c]">戦略レイヤー（生き方・方向性）</h3>
            <ul className="mt-2 space-y-2.5 text-[14px] text-[#4a3f2a]">
              {[
                'As-Is（現在地）を可視化する … Soul Seasons Guide',
                '北極星（MTPと目標）を言語化する … TRAITH-P',
                'ギャップ（=次の一歩）を選び、90日運用へ落とす … AIマップ（第3回〜）',
              ].map((i) => (
                <li key={i} className="flex gap-2.5"><span className="text-[#ea580c]">•</span>{i}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="serif-jp text-xl font-semibold mb-3 text-[#c2410c]">機能レイヤー（手元に残る成果物）</h3>
            <ul className="mt-2 space-y-2.5 text-[14px] text-[#4a3f2a]">
              {[
                '自分専用の AI人格（persona.md）＝あなたの秘書・相棒の設定書',
                'traith.md（As-Is ＋ To-Be/MTP・目標 ＋ ロードマップ/マイルストーンの総称＝traith）',
                '日々の運用ワークフロー／自動化候補／90日運用計画',
              ].map((i) => (
                <li key={i} className="flex gap-2.5"><span className="text-[#ea580c]">•</span>{i}</li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mt-6 text-[14px] leading-[1.85] text-[#6b5d44] max-w-3xl">
          すべて自分のパソコンに <code className="text-[#c2410c]">.md</code> ファイルとして残る＝今日で終わらない・明日も使える。
        </p>
      </section>

      {/* Tools */}
      <section className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Tools</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">使う道具（3つのアプリ）</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((t) => (
            <Card key={t.name}>
              <h3 className="serif-jp text-lg font-semibold mb-3 text-[#c2410c]">{t.name}</h3>
              <p className="text-[14px] leading-[1.85] text-[#3a3225]">
                <span className="text-[#1a1409] font-semibold">役割：</span>{t.role}
              </p>
              <p className="mt-2 text-[14px] leading-[1.85] text-[#3a3225]">
                <span className="text-[#1a1409] font-semibold">出力：</span>{t.output}
              </p>
              {t.link && (
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-[#ea580c] hover:underline break-all"
                >
                  {t.link.replace(/^https?:\/\//, '')} ↗
                </a>
              )}
            </Card>
          ))}
        </div>
        <p className="mt-6 text-[13px] leading-[1.85] text-[#6b5d44] max-w-4xl">
          注記：traith とは「AIと人の対話による変革の道」。TRAITH-Pで作る成果（As-Is＋To-Be＋ロードマップ）の総称です。／各アプリは情報をブラウザに保存します。PCとスマホで保存先は別になる点にご注意ください。
        </p>
      </section>

      {/* Slides */}
      <section className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Slides</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-4 text-[#1a1409]">当日のスライド</h2>
        <p className="text-[15px] leading-[1.9] text-[#3a3225] mb-8 max-w-3xl">
          当日の流れ（第2回＝AI人格づくり × 北極星の言語化）をスライドで確認できます。
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <SlideLink href={SLIDE_S1} label="第1回のスライドを見る" sub="As-Is（現在地）の可視化" />
          <SlideLink href={SLIDE_S2} label="第2回のスライドを見る" sub="AI人格づくり × 北極星の言語化" />
        </div>
      </section>

      {/* Starting Point */}
      <section className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Starting Point</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">第1回で終わっていること</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="serif-jp text-lg font-semibold mb-3 text-[#c2410c]">As-Is 判定</h3>
            <p className="text-[14px] leading-[1.85] text-[#3a3225]">
              第1回では Soul Seasons Guide を使って、現在地の可視化を行っています。
            </p>
            <a
              href="https://soulseasonsguide.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-[#ea580c] hover:underline break-all"
            >
              soulseasonsguide.lovable.app ↗
            </a>
          </Card>
          <Card>
            <h3 className="serif-jp text-lg font-semibold mb-3 text-[#c2410c]">持参推奨</h3>
            <p className="text-[14px] leading-[1.85] text-[#3a3225]">
              As-Is のメモ、スクリーンショット、統合プロンプトのいずれかを持ってきてください。
            </p>
          </Card>
          <Card>
            <h3 className="serif-jp text-lg font-semibold mb-3 text-[#c2410c]">第2回の主題</h3>
            <p className="text-[14px] leading-[1.85] text-[#3a3225]">
              AI人格づくりと、北極星（MTPと目標）の言語化に進みます。
            </p>
          </Card>
        </div>
      </section>

      {/* Curriculum */}
      <section id="sessions" className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Curriculum</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">各回の流れ（第2回〜第6回｜PDCAで90日着地）</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((s) => (
            <Card key={s.number} className="flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="serif-jp text-4xl font-semibold text-[#ea580c] leading-none">{s.number}</div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#0a8a7a] px-2.5 py-1 rounded-full bg-[#0a8a7a]/10 border border-[#0a8a7a]/20">
                    {s.phase}
                  </div>
                </div>
              </div>
              <h3 className="serif-jp text-xl font-semibold mb-3 text-[#1a1409]">{s.title}</h3>
              <p className="text-[14px] leading-[1.85] text-[#3a3225] mb-4">{s.body}</p>
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#ea580c] hover:underline mb-4 break-all"
                >
                  {s.link} ↗
                </a>
              )}
              <ul className="mt-auto space-y-2 text-[13px] text-[#4a3f2a] pt-4 border-t border-[#e8dfc9]">
                {s.list.map((i) => (
                  <li key={i} className="flex gap-2.5"><span className="text-[#d4a84c]">◆</span>{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Event Info */}
      <section className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Event</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">開催情報</h2>
        <Card>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {eventInfo.map((e) => (
              <div key={e.k} className="flex gap-3 text-[14.5px] leading-[1.85]">
                <dt className="text-[#c2410c] font-semibold shrink-0 w-16">{e.k}</dt>
                <dd className="text-[#3a3225]">{e.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 text-[12.5px] text-[#6b5d44]">※次回の参加募集はMessengerグループ内で行います。</p>
        </Card>
      </section>

      {/* Index */}
      <section id="index" className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Index</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">参加者向けインデックス</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {indexCards.map((c) => (
            <Link
              key={c.href + c.title}
              to={c.href}
              className="group rounded-3xl p-6 bg-white/70 border border-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <StatusChip status={c.status} />
                <span className="text-[#ea580c] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <h3 className="serif-jp text-lg font-semibold mb-2 text-[#1a1409]">{c.title}</h3>
              <p className="text-[13.5px] leading-[1.8] text-[#3a3225]">{c.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto max-w-3xl px-5 py-16">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">よくある質問</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-white/70 border border-white/80 backdrop-blur-sm p-6 open:bg-white transition-colors"
            >
              <summary className="cursor-pointer list-none flex justify-between items-start gap-4">
                <span className="serif-jp text-[16px] font-semibold text-[#1a1409]">{f.q}</span>
                <span className="text-[#ea580c] text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-[14.5px] leading-[1.9] text-[#3a3225]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <HubFooter />
    </HubShell>
  );
};

export default AIDiscoveryHome;
