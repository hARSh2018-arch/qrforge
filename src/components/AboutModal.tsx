import React, { useEffect } from 'react';
import { X, QrCode, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align-center gap-2.5">
            <div className="modal-icon-badge">
              <QrCode size={18} />
            </div>
            <div>
              <h2 className="modal-title">About QRForge</h2>
              <span className="modal-subtitle">Minimal, high-precision QR Code Studio</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close about dialog"
          >
            <X size={17} />
          </button>
        </div>

        <div className="modal-body-scroll">
          <div className="about-hero-box">
            <p className="about-intro-text">
              <strong>QRForge</strong> is an engineered client-side QR Code Generator & Designer.
              Built for speed, scan reliability, and privacy, every operation runs 100% inside your browser
              without data leaving your device.
            </p>
          </div>

          <div className="about-section">
            <h3 className="about-heading flex-align-center gap-2">
              <CheckCircle2 size={15} className="accent-icon" />
              <span>Key Capabilities</span>
            </h3>
            <ul className="about-checklist">
              <li>
                <strong>9 RFC-Compliant Content Types:</strong> Native formatting for URLs, Plain Text, Wi-Fi Networks, vCard Contacts, Email Prompts, Phone Calls, SMS Messages, Map Locations, and Calendar Events.
              </li>
              <li>
                <strong>Real-Time Live Canvas:</strong> Zero-latency canvas re-draws on parameter changes with instant visual preview.
              </li>
              <li>
                <strong>WCAG Contrast Analysis:</strong> Continuous relative luminance calculation between pattern and background colors to prevent unscannable low-contrast palettes.
              </li>
              <li>
                <strong>High-Res Lossless Export:</strong> Scalable Vector (SVG) downloads for print and vector workflows, and PNG exports up to 1024×1024 pixels with optional center logo embedding.
              </li>
              <li>
                <strong>Private Local History:</strong> Re-download, preview, or restore previously generated configurations directly from browser local storage.
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h3 className="about-heading flex-align-center gap-2">
              <ShieldCheck size={15} className="accent-icon" />
              <span>Offline & Privacy Guarantee</span>
            </h3>
            <p className="about-privacy-note">
              No analytics tracking, no server endpoints, and no cloud databases. Your Wi-Fi passwords, contact details, and messages never leave your machine.
            </p>
          </div>

          <div className="about-section">
            <h3 className="about-heading flex-align-center gap-2">
              <Sparkles size={15} className="accent-icon" />
              <span>Technical Stack</span>
            </h3>
            <div className="tech-badge-grid">
              <span className="tech-chip">React 19</span>
              <span className="tech-chip">TypeScript</span>
              <span className="tech-chip">Vite 8</span>
              <span className="tech-chip">HTML5 Canvas API</span>
              <span className="tech-chip">WCAG 2.1 Contrast Engine</span>
              <span className="tech-chip">Lucide Icons</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <span className="modal-footer-brand">QRForge • Client-Side QR Generator</span>
          <button type="button" className="btn-secondary-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
