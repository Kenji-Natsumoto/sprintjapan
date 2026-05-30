import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const content = `# AIエージェント集合体による「意思決定生成企業（Customer-Generating AI Company）」の提案

## ― AIが意思決定に「署名する」組織モデルの理論的考察 ―

## 要旨（Abstract）

本稿は、従来の企業モデルが前提としてきた「人間中心の意思決定構造」を再検討し、AIエージェントの集合体が意思決定生成・固定・学習の中核を担う新たな企業形態「AIカンパニー」の理論モデルを提案する。

本研究の中心的問いは次の3点である。

1. AIは、現行の会社法制下において経営主体となりうるのか
2. 人的労働への依存を前提としないスケーラブルな事業創出モデルは可能か
3. AIが意思決定に「署名する」とは、組織論的にいかなる意味を持つのか

本稿では、AIを法的代表者とすることは不可能である一方、意思決定の生成・評価・固定をAIに委譲することで、**実質的にAIが経営を担う企業構造**が成立しうることを示す。

さらに、顧客を「探索対象」ではなく「生成される存在」と再定義し、意思決定の確定（decision locking）を価値の源泉とする新たなビジネスモデルの可能性を論じる。

---

## 1. はじめに（Introduction）

近年、生成AIおよび自律型AIエージェントの進展により、企業活動における意思決定の在り方が根本から揺らいでいる。

しかし現行の議論の多くは、AIを「意思決定支援ツール」あるいは「業務効率化手段」として扱うに留まり、**AIが組織そのものの構造を再定義する可能性**については、十分に検討されていない。

本稿は、「AIがCEOになれない」という法的制約を出発点としながら、**CEOという役割そのものを分解・再構成する**ことで、AIが事実上の経営主体となる組織モデルを理論的に検討する。

---

## 2. 問題設定（Problem Statement）

### 2.1 現行企業モデルの構造的限界

従来の企業は、以下の前提に基づいて設計されてきた。

- 意思決定は人間が行う
- 戦略設計は会議によって合意される
- 顧客は外部に存在し、探索・獲得の対象である
- 組織の成長は人材育成に依存する

このモデルは、AI時代において次の問題を抱える。

1. 意思決定の属人化と再現性の欠如
2. 人的リソースがスケーラビリティの制約条件となる
3. 「決めたふり」「合意したふり」が構造的に温存される

---

### 2.2 研究課題

本稿では、以下の研究課題（RQ）を設定する。

- **RQ1**：AIは、法的責任主体ではなくとも、経営主体たりうるか
- **RQ2**：人間の営業・会議・指示を起点としない企業は成立するか
- **RQ3**：AIが意思決定に「署名する」とは、何を意味するのか

---

## 3. 理論的背景（Theoretical Background）

### 3.1 CEO機能の分解

CEOの役割は、以下に分解できる。

1. 意思決定の生成
2. 選択肢の評価
3. 資源配分の判断
4. 決定の固定
5. 法的・社会的責任の引受

このうち、⑤のみが人間に固有であり、①〜④はAIに委譲可能である。

---

### 3.2 意思決定と「署名」の関係

署名とは、意思決定そのものではない。署名は、意思決定を**不可逆的に固定する行為**である。

従来の組織では、署名は人間同士の信頼関係に依存しており、記憶の歪み、忖度、改ざんが避けられなかった。

---

## 4. 提案モデル（Proposed Model）

### 4.1 AIカンパニーの定義

本稿では、AIカンパニーを次のように定義する。

> **AIエージェント集合体が、意思決定の生成・評価・固定・学習を担い、人間は法的責任と最終拒否権のみを保持する組織形態**

---

### 4.2 顧客概念の再定義

従来：顧客 = 外部に存在し、探索・獲得される主体

本モデル：顧客 = **プロダクトとの相互作用を通じて生成される主体**

顧客は、使用・思考・判断のプロセスに巻き込まれた瞬間に生成される。

---

### 4.3 価値創出点としての「意思決定の固定」

本モデルにおいて、課金対象は以下ではない。

- 利用回数
- 機能
- データ保存

価値が発生するのは、

> **意思決定がAIによって記録・文脈化され、後戻りできない状態として固定される瞬間**

である。

---

## 5. AIによる「署名」の概念（AI Signature）

### 5.1 定義

AIによる署名とは、

> **人間の意思決定が、どの前提・選択肢・リスク評価のもとで行われたかを改ざん不能な形で記録・保持する行為**

である。

---

### 5.2 責任との関係

- 法的責任：人間
- 判断の記憶・一貫性：AI

AIは責任を取らないが、**意思決定の保証人**として機能する。

---

## 6. 考察（Discussion）

本モデルが導入されると、以下の変化が生じる。

- 曖昧な決断が残らなくなる
- 「決めなかった責任」が可視化される
- 意思決定の進化が学習可能になる

これは監視でも管理でもなく、**意思決定のインフラ化**である。

---

## 7. 結論と今後の課題（Conclusion & Future Work）

本稿は、AIがCEOとなるのではなく、**CEO機能をAIに委譲する企業モデル**を理論的に提示した。

今後の課題は以下である。

- 実証ケースの構築
- 法制度との整合性検討
- 複数AI署名間のコンフリクト解消

本研究は、企業という概念の再定義に向けた第一歩である。
`;

const AINativeCompany = () => {
  useEffect(() => {
    document.title = '意思決定生成企業の提案 ― AIが意思決定に「署名する」組織モデル';

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta(
      'meta[name="description"]',
      'name',
      'description',
      'AIエージェント集合体が意思決定の生成・固定・学習を担う新たな企業形態「AIカンパニー」の理論モデル提案。'
    );
    setMeta('meta[property="og:title"]', 'property', 'og:title', '意思決定生成企業の提案 ― AIが意思決定に「署名する」組織モデル');
    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      'AIエージェント集合体が意思決定の生成・固定・学習を担う新たな企業形態「AIカンパニー」の理論モデル提案。'
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/ai-native-company/`;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-3xl mb-16" aria-labelledby="latest-paper-title">
          <div className="glass-card-strong gradient-border p-6 md:p-10 relative overflow-hidden">
            <div className="mesh-gradient absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground glow-primary">
                  NEW
                </span>
                <span className="text-xs font-medium text-muted-foreground tracking-wider">
                  2026-05-30 公開 ・ 最新論文
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border border-primary/40 text-primary">
                  LOCKED
                </span>
              </div>

              <h2 id="latest-paper-title" className="text-3xl md:text-4xl font-bold leading-tight mb-3 gradient-text">
                Closed Loop と「学習する組織」
              </h2>
              <p className="text-lg md:text-xl text-foreground/90 mb-1">― 人格は分けろ、プロセスは分けるな ―</p>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                AI-Native Company における実行アーキテクチャの選択
              </p>
              <p className="text-xs text-muted-foreground mb-8">
                著者: 夏本健司（株式会社スプリントジャパン 代表取締役）
              </p>

              <blockquote className="border-l-4 border-primary pl-5 my-6 text-foreground/95">
                <p className="font-bold text-lg md:text-xl mb-4 leading-relaxed">
                  「人格は分けろ、プロセスは分けるな。代わりに Closed Loop を分けろ。」
                </p>
                <p className="leading-relaxed">
                  これは AI-Native Company（signity）の実装段階で得られた、世界的にも稀少な設計原則である。本稿は、AI界隈で常識化しつつある「Agent Team を独立プロセスとして分離する」という直感に正面から反論し、単一 Orchestrator + Closed Loop 並走という代替アーキテクチャを理論化する。
                </p>
              </blockquote>

              <div className="mt-10">
                <h3 className="text-xl md:text-2xl font-bold mb-4">要旨（Abstract）</h3>
                <div className="space-y-4 leading-relaxed text-foreground/90">
                  <p>
                    本稿は、AI-Native Company（signity）の実装段階において直面する「AIエージェントを独立プロセスとして分離すべきか否か」という設計問題を扱う。
                  </p>
                  <p>
                    近年、AI界隈では「Agent Team」「マルチエージェント」「エージェント協調」が高度なAI活用の代名詞として語られている。しかし筆者が Phase 2（Traction）に至る過程で観測した結論は、その直感とは反対方向である。
                  </p>
                  <p>
                    本稿は、AI-Native Company の実装層を <strong>(A) 人格（Persona）／(B) 実行主体（Process）／(C) 自律ジョブ（Closed Loop）</strong> の三層に分離し、それぞれの「分け方」を独立に決定すべきことを示す。さらに、世間で語られる「ワークフロー」と本稿でいう「Closed Loop」が機構・機能・目的のいずれにおいても別概念であることを明らかにし、現在各社が鎬を削る「学習するAI」「成長するAI」との接続点を提示する。
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: '三層分離モデル',
                    body: 'AI-Native Company の実装層を「人格 / 実行主体 / Closed Loop」の三層に分離する。人格は分けろ（例: ZENT PM 鷹野誠、VibeRush PM レオ・ヴァンス、SPJ広報 PM 岬航 など、役割ごとに異なるレンズを設計する）、実行主体は分けるな、Closed Loop は積極的に分けろ。Agent Team 神話に対する根本的反論。',
                  },
                  {
                    title: 'ワークフロー ≠ Closed Loop',
                    body: 'ワークフローは PDCA の P と D を自動化する仕組み。Closed Loop は C と A まで含めた循環全体を自動化する。Closed Loop ⊃ ワークフロー + 観測 + 履歴 + 次回反映。世間の「自動化」議論はワークフローしか語っていない。',
                  },
                  {
                    title: '学習を組織構造に置く',
                    body: '現在各社が鎬を削る「学習するAI」はモデル内部の重みの更新を議論する。本稿の Closed Loop は、学習をモデル内部ではなく組織構造（git・蓄積ログ・意思決定履歴）に置く。モデル切替に耐える長期記憶を組織側に蓄積する。',
                  },
                ].map((c) => (
                  <div key={c.title} className="glass-card p-5 hover-lift">
                    <h4 className="text-base md:text-lg font-bold mb-3 text-primary">{c.title}</h4>
                    <p className="text-sm leading-relaxed text-foreground/85">{c.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-xl md:text-2xl font-bold mb-4">参考文献・関連ドキュメント</h3>
                <ul className="space-y-2 text-sm md:text-base">
                  <li>
                    夏本健司『AIエージェント集合体による「意思決定生成企業」の提案』{' '}
                    <a href="#top" className="text-primary underline underline-offset-2 hover:opacity-80">本ページ上部</a>
                  </li>
                  <li>
                    夏本健司『
                    <a href="/ai-native-company/harness-infrastructure/" className="text-primary underline underline-offset-2 hover:opacity-80">
                      AI-Native Company のためのハーネス・インフラ設計
                    </a>
                    』
                  </li>
                  <li>
                    夏本健司『
                    <a href="/ai-native-company/effectiveness-over-efficiency/" className="text-primary underline underline-offset-2 hover:opacity-80">
                      なぜ「AI業務効率化」は失敗するのか ― 効率性ではなく効果性を
                    </a>
                    』
                  </li>
                  <li>
                    夏本健司『
                    <a href="/ai-native-company/organization-optimization/" className="text-primary underline underline-offset-2 hover:opacity-80">
                      ジャック・ドーシーモデルのAIネイティブカンパニーへの応用
                    </a>
                    』
                  </li>
                  <li>
                    夏本健司『
                    <a href="/ai-native-company/tool-integration-guide/" className="text-primary underline underline-offset-2 hover:opacity-80">
                      AI-Nativeスタートアップ ツール連携設計ガイド
                    </a>
                    』
                  </li>
                  <li className="text-muted-foreground">Anthropic『Harness Design』（外部Evaluator分離パターン）</li>
                  <li className="text-muted-foreground">Teresa Torres『Continuous Discovery Habits』（PDCA循環の参考）</li>
                </ul>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/Kenji-Natsumoto/AI-Company/blob/main/docs/ja/closed-loop-architecture-v0.1.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
                >
                  論文全文を読む（GitHub） →
                </a>
                <a
                  href="#papers"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  他の論文を見る
                </a>
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                2026-05-30 公開 / AI Signature により LOCKED / Building in Public 対応稿
              </p>
            </div>
          </div>
        </section>

        <article id="papers" className="container mx-auto px-4 max-w-3xl">
          <span id="top" />

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 leading-tight" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 leading-tight" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
              p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-border pl-4 my-4 italic text-muted-foreground" {...props} />
              ),
              hr: () => <hr className="my-8 border-border" />,
              a: ({ node, href, ...props }) => {
                const isInternal = href?.startsWith('/');
                return (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                    {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    {...props}
                  />
                );
              },
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AINativeCompany;
