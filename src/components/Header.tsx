import React from 'react';
import { QrCode, Sun, Moon, Info, Sparkles, History } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeaderProps {
  activeView: 'generate' | 'history';
  onSelectView: (view: 'generate' | 'history') => void;
  historyCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  historyCount,
  theme,
  onToggleTheme,
  onOpenAbout
}) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand Logo & Wordmark */}
        <div className="brand-lockup" onClick={() => onSelectView('generate')} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <QrCode size={20} />
          </div>
          <div className="brand-titles">
            <div className="brand-name-row">
              <span className="brand-name">QRForge</span>
              <span className="brand-tagline-badge">Studio</span>
            </div>
          </div>
        </div>

        {/* Minimal Navigation: Generate & History */}
        <nav className="header-nav-tabs" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-tab-btn ${activeView === 'generate' ? 'is-active' : ''}`}
            onClick={() => onSelectView('generate')}
          >
            <Sparkles size={15} />
            <span>Generate</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeView === 'history' ? 'is-active' : ''}`}
            onClick={() => onSelectView('history')}
          >
            <History size={15} />
            <span>History</span>
            {historyCount > 0 && (
              <span className="nav-count-badge">{historyCount}</span>
            )}
          </button>
        </nav>

        {/* Header Actions / Theme / About / GitHub */}
        <div className="header-actions">
          <button
            type="button"
            className="header-icon-btn"
            onClick={onOpenAbout}
            title="About QRForge & Tech Specs"
            aria-label="About QRForge"
          >
            <Info size={16} />
            <span className="btn-label-desktop">About</span>
          </button>

          <a
            href="https://github.com/hARSh2018-arch/qrforge"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon-btn"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <GithubIcon size={16} />
          </a>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'light' ? (
              <Moon size={16} className="theme-icon moon-icon" />
            ) : (
              <Sun size={16} className="theme-icon sun-icon" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
