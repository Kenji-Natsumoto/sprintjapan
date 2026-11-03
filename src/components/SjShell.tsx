import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/spj-logo.png';
import SjNav from '@/components/SjNav';
import '@/styles/sj-shell.css';

const THEME_KEY = 'sj-theme';

export const useSjTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  return { theme, toggleTheme };
};

const SjShell = ({ children }: { children: ReactNode }) => {
  const { theme, toggleTheme } = useSjTheme();

  return (
    <div className="sj-page">
      <header>
        <div className="nav-wrap nav">
          <Link to="/">
            <img src={logo} alt="スプリントジャパン株式会社" />
          </Link>
          <SjNav theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      {children}

      <footer>
        <div className="wrap">
          <ul>
            <li><Link to="/services">サービス</Link></li>
            <li><Link to="/insights/">インサイト</Link></li>
            <li><Link to="/company">会社情報</Link></li>
            <li><Link to="/contact">お問い合わせ</Link></li>
          </ul>
          <small>© 2026 Sprint Japan. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default SjShell;
