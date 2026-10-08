import React from 'react';
import { QrCode } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="flex-align-center gap-1.5">
            <QrCode size={16} className="footer-brand-icon" />
            <span className="footer-brand-title">QRForge</span>
          </div>
          <span className="footer-bullet">•</span>
          <span className="footer-recruitment-text">
            Built for GDG on Campus SRM Technical Recruitment 2026–27 (Frontend Domain)
          </span>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/GDG-SRM"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-flex"
            aria-label="GitHub Repository"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
