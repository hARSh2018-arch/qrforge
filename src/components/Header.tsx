import React from 'react';
import { QrCode, Sun, Moon, Info, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAbout: () => void;
  onScrollToPresets?: () => void;
  historyCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenAbout,
  onScrollToPresets
}) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo and Brand */}
        <div className="brand-lockup">
          <div className="brand-logo-icon">
            <QrCode size={24} />
            <span className="logo-glow" />
          </div>

          <div className="brand-titles">
            <div className="brand-name-row">
              <span className="brand-name">QRForge</span>
              <span className="gdg-badge">GDG SRM • Frontend Challenge 2026</span>
            </div>
            <p className="brand-subtitle">Generate. Customize. Share.</p>
          </div>
        </div>

        {/* Header Actions / Navigation */}
        <div className="header-actions">
          {onScrollToPresets && (
            <button
              type="button"
              className="header-action-btn desktop-only"
              onClick={onScrollToPresets}
              title="Jump to Presets"
            >
              <Sparkles size={16} />
              <span>Presets</span>
            </button>
          )}

          <button
            type="button"
            className="header-action-btn"
            onClick={onOpenAbout}
            title="About QRForge & Challenge Details"
            aria-label="About QRForge"
          >
            <Info size={16} />
            <span className="desktop-only">About</span>
          </button>

          <a
            href="https://github.com/GDG-SRM"
            target="_blank"
            rel="noopener noreferrer"
            className="header-action-btn desktop-only"
            title="GDG SRM GitHub"
            aria-label="GDG SRM GitHub"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>

          {/* Theme Switcher */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun size={17} className="theme-icon sun-icon" />
            ) : (
              <Moon size={17} className="theme-icon moon-icon" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
