import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
      }
      m.setAttribute('content', description);
    }
  }, [title, description]);
};

export const StatusChip = ({ status }: { status: '公開中' | '準備中' }) => {
  const isLive = status === '公開中';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isLive
          ? 'bg-[#0a8a7a]/15 text-[#0a8a7a] border border-[#0a8a7a]/30'
          : 'bg-[#d97706]/15 text-[#b45309] border border-[#d97706]/30'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-[#0a8a7a]' : 'bg-[#d97706]'}`} />
      {status}
    </span>
  );
};

export const HubHeader = ({ subtitle = 'Participant Guide' }: { subtitle?: string }) => (
  <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fbf6ec]/85 border-b border-[#e8dfc9]">
    <div className="container mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
      <Link to="/ai-discovery-community" className="flex items-center gap-3 group">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] text-white grid place-items-center font-bold shadow-md shadow-[#ea580c]/20">
          SJ
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-semibold text-[#1a1a1a]" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            Sprint Japan
          </span>
          <span className="text-[11px] text-[#8a7a5a] tracking-wide uppercase">{subtitle}</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-7 text-sm text-[#3a3225]">
        <a href="#overview" className="hover:text-[#ea580c] transition-colors">概要</a>
        <a href="#sessions" className="hover:text-[#ea580c] transition-colors">各回の流れ</a>
        <a href="#slides" className="hover:text-[#ea580c] transition-colors">当日のスライド</a>
        <a href="#faq" className="hover:text-[#ea580c] transition-colors">FAQ</a>
      </nav>
    </div>
  </header>
);

export const HubFooter = () => (
  <footer className="border-t border-[#e8dfc9] mt-24">
    <div className="container mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-[#6b5d44]">
      <div>
        <div className="font-medium text-[#3a3225]">AIでやりたいこと発見コミュニティ</div>
        <div className="mt-1">共催：夏本健司 × 湯川鶴章 ／ <a href="https://sprintjapan.net/" className="hover:text-[#ea580c] transition-colors">SPRINT Japan</a></div>
      </div>
      <a href="#top" className="hover:text-[#ea580c] transition-colors">このページの先頭へ ↑</a>
    </div>
  </footer>
);

export const HubShell = ({ children }: { children: ReactNode }) => (
  <div
    id="top"
    className="min-h-screen text-[#1f1a12]"
    style={{
      background:
        'radial-gradient(1200px 600px at 10% -10%, #fef3df 0%, transparent 60%), radial-gradient(1000px 500px at 100% 10%, #fde4cf 0%, transparent 55%), linear-gradient(180deg, #fbf6ec 0%, #f5ecd8 100%)',
      fontFamily: '"Noto Sans JP", system-ui, sans-serif',
    }}
  >
    <style>{`
      .serif-jp { font-family: "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif; }
    `}</style>
    {children}
  </div>
);
