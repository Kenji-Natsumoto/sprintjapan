import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { insightsData } from '@/data/insightsData';

// 論文ページ共通のレイアウト（参考: signity.sprintjapan.net/resources の記事面）。
// 上: ← 一覧へ／題名・副題・著者と日付／ABSTRACT。下: 左 CONTENTS（h2 の目次）・中 本文・右 META＋他の論文。
// 本文の content（Markdown）は各ページの定数が正本の写しであり、ここでは1文字も変えない。

interface InsightPaperProps {
  id: string;
  content: string;
  abstract?: string;
  children?: ReactNode; // 本文の後ろに置くもの（任意）
}

const headingId = (n: number) => `sec-${n}`;

const InsightPaper = ({ id, content, abstract, children }: InsightPaperProps) => {
  const item = insightsData.find((i) => i.id === id);
  const others = insightsData.filter((i) => i.id !== id);

  // 表示用の本文＝先頭の題名ブロック（# 題名／## 副題／Version・Date・Author）を最初の --- まで省く。
  // 題名・副題・著者は上の header に出しているため。content 定数そのものは変えない（正本の写し）。
  const body = useMemo(() => {
    const lines = content.split('\n');
    if (!lines[0]?.startsWith('# ')) return content;
    const cut = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
    return cut > 0 ? lines.slice(cut + 1).join('\n') : content;
  }, [content]);

  // 目次＝本文の「## 」見出し（コードブロック内は除く）
  const sections = useMemo(() => {
    const out: string[] = [];
    let inCode = false;
    body.split('\n').forEach((line) => {
      if (line.trim().startsWith('```')) inCode = !inCode;
      if (inCode) return;
      const m = /^## (.+)$/.exec(line);
      if (m) out.push(m[1].replace(/\*\*/g, '').trim());
    });
    return out;
  }, [body]);

  let h2Index = -1;

  return (
    <main className="sj-paper flex-1 pt-16 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <span id="top" />
        <Link to="/insights/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← インサイト一覧へ
        </Link>

        {item && (
          <header className="mt-6 mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                {item.status}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border border-primary/40 text-primary">
                {item.floor}
              </span>
              <span className="text-xs text-muted-foreground">{item.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{item.title}</h1>
            <p className="text-lg md:text-xl text-primary mb-4">{item.subtitle}</p>
            <p className="text-sm text-muted-foreground">
              {item.author}（株式会社スプリントジャパン / Signity）　{item.date}（{item.version}）
            </p>
            {abstract && (
              <div className="mt-8 border-l-4 border-primary bg-muted/40 px-5 py-4">
                <p className="text-xs font-semibold tracking-widest text-primary mb-2">ABSTRACT</p>
                <p className="leading-relaxed text-foreground/90">{abstract}</p>
              </div>
            )}
          </header>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)_200px] gap-10">
          {/* 左: CONTENTS */}
          <aside className="lg:sticky lg:top-24 self-start order-2 lg:order-1">
            {sections.length > 0 && (
              <nav aria-label="目次">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">CONTENTS</p>
                <ol className="space-y-2 text-sm">
                  {sections.map((title, n) => (
                    <li key={headingId(n)}>
                      <a href={`#${headingId(n)}`} className="text-foreground/80 hover:text-primary transition-colors">
                        {title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>

          {/* 中: 本文 */}
          <article className="min-w-0 order-1 lg:order-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 leading-tight" {...props} />,
                h2: ({ node, ...props }) => {
                  h2Index += 1;
                  return <h2 id={headingId(h2Index)} className="text-2xl md:text-3xl font-bold mt-10 mb-4 leading-tight scroll-mt-24" {...props} />;
                },
                h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg md:text-xl font-semibold mt-6 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-border pl-4 my-4 italic text-muted-foreground" {...props} />
                ),
                hr: () => <hr className="my-8 border-border" />,
                a: ({ node, href, ...props }) => {
                  const isInternal = href?.startsWith('/') || href?.startsWith('#');
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
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse border border-border text-sm" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
                th: ({ node, ...props }) => <th className="border border-border px-3 py-2 text-left font-semibold" {...props} />,
                td: ({ node, ...props }) => <td className="border border-border px-3 py-2 align-top" {...props} />,
                code: ({ node, className, children, ...props }: any) => {
                  const isBlock = className?.includes('language-') || (typeof children === 'string' && children.includes('\n'));
                  if (isBlock) {
                    return (
                      <code className="block font-mono text-sm whitespace-pre" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre className="my-6 p-4 bg-muted rounded-md overflow-x-auto text-sm leading-relaxed" {...props} />
                ),
              }}
            >
              {body}
            </ReactMarkdown>
            {children}
            <div className="mt-12 pt-6 border-t border-border">
              <Link to="/insights/" className="text-primary underline underline-offset-2 hover:opacity-80">
                ← インサイト一覧へ戻る
              </Link>
            </div>
          </article>

          {/* 右: META＋他の論文 */}
          <aside className="lg:sticky lg:top-24 self-start order-3 text-sm">
            {item && (
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">META</p>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-muted-foreground">著者</dt>
                    <dd>{item.author}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">公開日</dt>
                    <dd>{item.date}（{item.version}）</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">階</dt>
                    <dd>{item.floor}</dd>
                  </div>
                </dl>
              </div>
            )}
            <nav aria-label="他の論文">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">他の論文</p>
              <ol className="space-y-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link to={o.path} className="text-foreground/80 hover:text-primary transition-colors">
                      <span className="font-mono text-[11px] text-primary mr-2">{o.floor}</span>
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default InsightPaper;
