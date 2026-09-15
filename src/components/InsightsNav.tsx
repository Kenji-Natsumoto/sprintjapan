import { Link } from 'react-router-dom';
import { insightsData } from '@/data/insightsData';

// インサイト各ページ共通のナビゲーション（一覧・7本の相互リンク・前後）。
// 意匠は News.tsx のカテゴリ chip と同じ rounded-full。モバイルでは横スクロール。
const InsightsNav = ({ currentId }: { currentId: string }) => {
  const index = insightsData.findIndex((item) => item.id === currentId);
  const prev = index > 0 ? insightsData[index - 1] : null;
  const next = index >= 0 && index < insightsData.length - 1 ? insightsData[index + 1] : null;

  const chip = 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors';
  const idle = `${chip} border-border text-muted-foreground hover:text-foreground hover:border-primary/60`;
  const active = `${chip} border-primary bg-primary text-primary-foreground`;

  return (
    <nav aria-label="インサイトの記事一覧" className="my-6">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        <Link to="/insights/" className={idle}>
          インサイト一覧
        </Link>
        {insightsData.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={item.id === currentId ? active : idle}
            aria-current={item.id === currentId ? 'page' : undefined}
            title={item.title}
          >
            {item.floor} · {item.title}
          </Link>
        ))}
      </div>
      {(prev || next) && (
        <div className="mt-3 flex justify-between gap-4 text-sm">
          <span>
            {prev && (
              <Link to={prev.path} className="text-primary underline underline-offset-2 hover:opacity-80">
                ← 前: {prev.title}
              </Link>
            )}
          </span>
          <span className="text-right">
            {next && (
              <Link to={next.path} className="text-primary underline underline-offset-2 hover:opacity-80">
                次: {next.title} →
              </Link>
            )}
          </span>
        </div>
      )}
    </nav>
  );
};

export default InsightsNav;
