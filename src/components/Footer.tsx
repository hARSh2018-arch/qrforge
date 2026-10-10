import React from 'react';
import { QrCode } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="flex-align-center gap-1.5">
            <QrCode size={15} className="footer-brand-icon" />
            <span className="footer-brand-title">QRForge</span>
          </div>
          <span className="footer-bullet">•</span>
          <span className="footer-desc-text">
            Client-Side QR Code Studio — 100% Offline & Private
          </span>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/hARSh2018-arch/qrforge"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-flex"
            aria-label="GitHub Repository"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
