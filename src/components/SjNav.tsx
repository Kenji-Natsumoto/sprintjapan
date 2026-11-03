// 新デザイン共通のグローバルナビ（SjShell と Home のヘッダーで使う）
// PC: 「サービス」にマウス／フォーカスでドロップダウン。スマホ（768px以下）: ☰ で全画面メニュー。
import { KeyboardEvent as ReactKeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { services, SERVICES_PATH } from '@/data/servicesData';
import '@/styles/sj-nav.css';

interface Props {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

const ThemeButton = ({ theme, toggleTheme }: Props) => (
  <button className="theme-btn" onClick={toggleTheme} aria-label="テーマ切替">
    {theme === 'dark' ? '○' : '●'}
    <span className="tlabel">{theme === 'dark' ? 'ライト' : 'ダーク'}</span>
  </button>
);

const SjNav = ({ theme, toggleTheme }: Props) => {
  const location = useLocation();
  const [ddOpen, setDdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ddRef = useRef<HTMLLIElement>(null);
  // Esc で閉じた直後、ボタンへフォーカスを戻したときに再び開かないようにする
  const escClosedRef = useRef(false);
  const ddBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ddId = useId();
  const menuId = useId();

  // ページを移ったら閉じる
  useEffect(() => {
    setDdOpen(false);
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // PC幅に広がったらスマホメニューを閉じる
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // スマホメニュー: 背面スクロール固定・Escで閉じる・フォーカスをメニュー内に留める
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current || !menuBtnRef.current) return;
      const items = [menuBtnRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const onDdKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape' && ddOpen) {
      escClosedRef.current = true;
      setDdOpen(false);
      ddBtnRef.current?.focus();
    }
  };

  return (
    <>
      <ul className="sjn-desktop">
        <li>
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
        </li>
        <li
          ref={ddRef}
          className={`sjn-dd${ddOpen ? ' is-open' : ''}`}
          onMouseEnter={() => {
            escClosedRef.current = false;
            setDdOpen(true);
          }}
          onMouseLeave={() => setDdOpen(false)}
          onFocus={() => {
            if (!escClosedRef.current) setDdOpen(true);
          }}
          onBlur={(e) => {
            if (!ddRef.current?.contains(e.relatedTarget as Node | null)) {
              escClosedRef.current = false;
              setDdOpen(false);
            }
          }}
          onKeyDown={onDdKeyDown}
        >
          <Link to={SERVICES_PATH}>サービス</Link>
          <button
            ref={ddBtnRef}
            type="button"
            className="sjn-dd-toggle"
            aria-expanded={ddOpen}
            aria-controls={ddId}
            aria-label="サービスの一覧を開く"
            onClick={() => setDdOpen((v) => !v)}
          >
            <span aria-hidden="true">▾</span>
          </button>
          <div id={ddId} className="sjn-dd-panel" hidden={!ddOpen}>
            {services.map((s) => (
              <Link key={s.id} to={s.to} className={`sjn-dd-item${s.featured ? ' is-featured' : ''}`}>
                <span className="sjn-dd-name">{s.navLabel}</span>
                <span className="sjn-dd-sub">{s.name}</span>
              </Link>
            ))}
            <Link to={SERVICES_PATH} className="sjn-dd-all">サービス一覧へ →</Link>
          </div>
        </li>
        <li><Link to="/insights/">インサイト</Link></li>
        <li><Link to="/company">会社情報</Link></li>
        <li><Link to="/news">ニュース</Link></li>
        <li><Link to="/contact" className="cta">お問い合わせ</Link></li>
      </ul>

      <div className="sjn-mobile">
        <ThemeButton theme={theme} toggleTheme={toggleTheme} />
        <button
          ref={menuBtnRef}
          type="button"
          className="sjn-burger"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        className="sjn-menu"
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
      >
        <Link to={SERVICES_PATH} className="sjn-menu-head">
          サービス <span aria-hidden="true">→</span>
        </Link>
        <div className="sjn-menu-cards">
          {services.map((s) => (
            <Link key={s.id} to={s.to} className={`sjn-menu-card${s.featured ? ' is-featured' : ''}`}>
              <span className="sjn-menu-en">{s.en}</span>
              <span className="sjn-menu-name">{s.navLabel}</span>
              <span className="sjn-menu-sub">{s.name}</span>
            </Link>
          ))}
        </div>
        <div className="sjn-menu-links">
          <Link to="/insights/">インサイト</Link>
          <Link to="/company">会社情報</Link>
          <Link to="/news">ニュース</Link>
        </div>
        <Link to="/contact" className="sjn-menu-cta">お問い合わせ</Link>
      </div>
    </>
  );
};

export default SjNav;
