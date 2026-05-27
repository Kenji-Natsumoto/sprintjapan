import { Link } from 'react-router-dom';
import { HubShell, HubHeader, HubFooter, StatusChip, usePageMeta } from './shared';

const sessions = [
  {
    number: '02',
    phase: 'To-Be / GAP',
    title: 'To-Be策定とGAP算定',
    body: '前半で MTP を理解し、TRAITH を使って To-Be を言語化。後半で As-Is と並べて GAP を算定します。',
    link: 'https://purpose-setting-app-4r2c4yfk.devinapps.com/',
    list: ['成果物: To-Be 文、MTP 仮説、GAP マップ', '機能実装: AIプロフィール'],
  },
  {
    number: '03',
    phase: 'Plan',
    title: '最優先GAPの設計と基礎ハーネス',
    body: '一番大きい GAP を 1 つ選び、その GAP を埋める最小ワークフローを設計します。',
    list: ['成果物: Workflow Spec、AI Working Spec', '機能実装: フォルダ構造、テンプレート、運用ルール'],
  },
  {
    number: '04',
    phase: 'Do',
    title: '習慣ワークフローを回す',
    body: '朝のブリーフ、会議前準備、夜の振り返りなどを題材に、実際に回して観察します。',
    list: ['成果物: 日次または週次ワークフロー、実行ログ', '機能実装: 習慣の半自動化'],
  },
  {
    number: '05',
    phase: 'Check',
    title: '検証と定期見回りの設計',
    body: '効果検証を行い、定期見回りや自動化に向く部分と、人が持つべき部分を見分けます。',
    list: ['成果物: 検証レポート、自動化候補', '機能実装: 定期見回り仕様、接続方針'],
  },
  {
    number: '06',
    phase: 'Act',
    title: '定着と90日運用計画',
    body: '仕事ワークフローを 1 本完成させ、部分自動化の仕様と 90 日運用計画を決めます。',
    list: ['成果物: 完成ワークフロー、90日運用計画', '機能実装: 運用標準、部分自動化'],
  },
];

const pdca = [
  { label: 'Plan', body: '最優先GAPを埋める設計をする' },
  { label: 'Do', body: '日常や仕事で実際に回す' },
  { label: 'Check', body: 'To-Be に効いているかを点検する' },
  { label: 'Act', body: '次の運用に耐える形へ直す' },
];

const indexCards: { status: '公開中' | '準備中'; title: string; body: string; href: string }[] = [
  { status: '公開中', title: 'カリキュラム概要', body: 'このページです。第2回から第6回までの全体像を確認できます。', href: '/ai-discovery-community' },
  { status: '準備中', title: '第2回ワークシート', body: 'To-Be、MTP、GAP 算定の詳細ページ。', href: '/ai-discovery-community/worksheets/session-2' },
  { status: '準備中', title: '第3回ワークシート', body: '最優先 GAP と基礎ハーネスの設計ページ。', href: '/ai-discovery-community/worksheets/session-3' },
  { status: '準備中', title: '第4回ワークシート', body: '習慣ワークフロー実行と観察の詳細ページ。', href: '/ai-discovery-community/worksheets/session-4' },
  { status: '準備中', title: '第5回ワークシート', body: '検証、定期見回り、自動化候補の整理ページ。', href: '/ai-discovery-community/worksheets/session-5' },
  { status: '準備中', title: '第6回ワークシート', body: '定着、仕事ワークフロー、90日運用の詳細ページ。', href: '/ai-discovery-community/worksheets/session-6' },
];

const faqs = [
  { q: 'エンジニアでなくても参加できますか？', a: 'はい。v4.0 は非エンジニア向けに設計されています。コードを書くことよりも、 AI に何を任せるか、どう生活や仕事に組み込むかを重視します。' },
  { q: 'Codex と Claude Code のどちらを使っても大丈夫ですか？', a: 'はい。A/B とも内容は同じで、Codex と Claude Code のどちらでも進められるように設計しています。' },
  { q: '第2回までに準備しておくものは何ですか？', a: '第1回の As-Is メモ、または Soul Seasons Guide の結果、そして Codex か Claude Code を使える環境があるとスムーズです。' },
];

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#ea580c] mb-3">{children}</div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-sm bg-white/70 border border-white/80 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}>
    {children}
  </div>
);

const AIDiscoveryHome = () => {
  usePageMeta(
    'AIでやりたいこと発見コミュニティ v4.0 | Sprint Japan',
    'AIでやりたいこと発見コミュニティ A/B の第2回以降を案内する参加者向けページ。To-Be、GAP、ワークフロー設計、習慣化、自動化、90日運用までの全体像を紹介します。'
  );

  return (
    <HubShell>
      <HubHeader />

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-5 pt-14 md:pt-20 pb-16">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-stretch">
          <div>
            <SectionEyebrow>AIでやりたいこと発見コミュニティ A/B</SectionEyebrow>
            <h1 className="serif-jp text-4xl md:text-5xl lg:text-6xl leading-[1.25] font-semibold text-[#1a1409]">
              第2回以降の進め方を、<br />この1ページで。
            </h1>
            <p className="mt-6 text-[17px] leading-[1.9] text-[#3a3225] max-w-2xl">
              第1回で可視化した As-Is を起点に、
              <strong className="text-[#c2410c] font-semibold">To-Be を言語化し、GAP を設計し、Codex や Claude Code で日常に落とし込む</strong>
              ための参加者向けガイドです。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#sessions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-medium shadow-lg shadow-[#ea580c]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                カリキュラムを見る →
              </a>
              <a
                href="#index"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-[#e8dfc9] text-[#3a3225] font-medium hover:bg-white transition-all"
              >
                ワークシート一覧へ
              </a>
            </div>

            {/* Session 1 slides link */}
            <a
              href="https://docs.google.com/presentation/d/144nki5XFti3qBUjxyW3MgIKfqWgwCCtq/edit?usp=sharing&ouid=114095741537537337376&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 group inline-flex items-center gap-4 p-4 rounded-2xl bg-white/70 border border-[#e8dfc9] hover:bg-white hover:border-[#ea580c]/40 hover:-translate-y-0.5 transition-all max-w-xl"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#fef3df] to-[#fde4cf] border border-[#e8dfc9] grid place-items-center text-2xl">
                📊
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] tracking-[0.15em] uppercase text-[#ea580c] font-semibold">Google Slides ↗</div>
                <div className="serif-jp text-[15px] font-semibold text-[#1a1409] mt-0.5">第1回スライド資料を見る</div>
                <div className="text-[12.5px] text-[#6b5d44] mt-0.5 truncate">As-Is 可視化セッションの当日資料</div>
              </div>
              <span className="text-[#ea580c] text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Dark right panel */}
          <aside className="rounded-3xl bg-gradient-to-br from-[#1c1610] to-[#2d2418] text-[#f5ecd8] p-7 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#ea580c]/20 blur-3xl" />
            <div className="relative">
              <div className="text-[11px] tracking-wider uppercase text-[#d4a84c]">最終更新</div>
              <div className="text-lg font-medium mt-1">2026年5月27日</div>
              <div className="my-6 h-px bg-white/10" />
              <ul className="space-y-3.5 text-[14px]">
                {[
                  '第1回は終了済み',
                  'A/B は同一カリキュラム',
                  '第2回で To-Be と GAP まで進行',
                  '第3回以降は PDCA で改善',
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
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">このプログラムでやること</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="serif-jp text-xl font-semibold mb-3 text-[#c2410c]">戦略レイヤー</h3>
            <p className="text-[15px] leading-[1.85] text-[#3a3225]">
              まずは「何を効率化するか」ではなく、
              <strong className="text-[#1a1409] font-semibold">As-Is と To-Be の差分をどう埋めるか</strong>
              を見ます。
            </p>
            <ul className="mt-5 space-y-2.5 text-[14px] text-[#4a3f2a]">
              {[
                '第1回で可視化した As-Is を持ち寄る',
                '第2回で To-Be と MTP を言語化する',
                'As-Is と To-Be の GAP を AI に構造化させる',
                'GAP を埋めるワークフローを PDCA で磨く',
              ].map((i) => (
                <li key={i} className="flex gap-2.5"><span className="text-[#ea580c]">•</span>{i}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="serif-jp text-xl font-semibold mb-3 text-[#c2410c]">機能レイヤー</h3>
            <p className="text-[15px] leading-[1.85] text-[#3a3225]">
              考え方だけで終わらせず、毎回
              <strong className="text-[#1a1409] font-semibold">持ち帰って使える形</strong>
              まで作ります。
            </p>
            <ul className="mt-5 space-y-2.5 text-[14px] text-[#4a3f2a]">
              {[
                'AIプロフィール',
                '基礎ハーネス',
                '日次・週次の習慣ワークフロー',
                '定期見回りと自動化候補',
                '仕事ワークフローと90日運用計画',
              ].map((i) => (
                <li key={i} className="flex gap-2.5"><span className="text-[#ea580c]">•</span>{i}</li>
              ))}
            </ul>
          </Card>
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
              ここから先は、現在地の最適化ではなく、To-Be と GAP の設計に進みます。
            </p>
          </Card>
        </div>
      </section>

      {/* Curriculum */}
      <section id="sessions" className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>Curriculum</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">第2回から第6回の流れ</h2>
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

      {/* How We Work */}
      <section className="container mx-auto max-w-6xl px-5 py-16">
        <SectionEyebrow>How We Work</SectionEyebrow>
        <h2 className="serif-jp text-3xl md:text-4xl font-semibold mb-10 text-[#1a1409]">
          第3回以降は、毎回ミニPDCAを回します
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pdca.map((p, i) => (
            <div
              key={p.label}
              className="rounded-2xl p-6 bg-white/70 border border-white/80 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-3 right-4 serif-jp text-5xl font-semibold text-[#f5ecd8]">{i + 1}</div>
              <div className="relative">
                <div className="text-xs tracking-[0.2em] uppercase text-[#ea580c] font-semibold mb-2">{p.label}</div>
                <div className="text-[14px] leading-[1.7] text-[#3a3225]">{p.body}</div>
              </div>
            </div>
          ))}
        </div>
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
