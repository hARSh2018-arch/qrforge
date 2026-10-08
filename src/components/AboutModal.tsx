import React, { useEffect } from 'react';
import { X, QrCode, CheckCircle2, Cpu } from 'lucide-react';

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
              <QrCode size={20} />
            </div>
            <div>
              <h2 className="modal-title">About QRForge</h2>
              <span className="modal-subtitle">GDG on Campus SRM • Frontend Domain 2026–27</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close about modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body-scroll">
          <div className="about-hero-box">
            <p className="about-intro-text">
              <strong>QRForge</strong> is an engineered, production-ready QR Code Designer & Utility
              built for the <strong>GDG on Campus SRM Technical Recruitment 2026–27</strong>.
              Engineered with a high-performance client-side rendering pipeline, real-time live preview,
              dynamic payload encoders, WCAG scan-reliability validation, and local persistence.
            </p>
          </div>

          <div className="about-section">
            <h3 className="about-heading flex-align-center gap-2">
              <CheckCircle2 size={16} className="accent-icon" />
              <span>Core Engineering Highlights</span>
            </h3>
            <ul className="about-checklist">
              <li>
                <strong>Instant Live Generation:</strong> Zero-latency canvas re-draws on any parameter alteration. No manual generate button needed.
              </li>
              <li>
                <strong>Payload Encoding Engines:</strong> Native formatting for RFC-compliant URLs, plain text, RFC-compliant Mailto envelopes, Tel URLs, and standard Wi-Fi configuration strings.
              </li>
              <li>
                <strong>WCAG Contrast & Scan Reliability Engine:</strong> Real-time relative luminance calculation measuring foreground vs background contrast ratio, with intelligent warnings against unreadable low-contrast configurations.
              </li>
              <li>
                <strong>Multi-Format Client-Side Export:</strong> Lossless high-res PNG (256px to 1024px) with optional center logo embedding, scalable vector SVG download, and direct clipboard image copy.
              </li>
              <li>
                <strong>Resilient Local Persistence:</strong> Browser LocalStorage history with full snapshot restore and quota safety.
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h3 className="about-heading flex-align-center gap-2">
              <Cpu size={16} className="accent-icon" />
              <span>Technical Architecture</span>
            </h3>
            <div className="tech-badge-grid">
              <span className="tech-chip">React 19</span>
              <span className="tech-chip">Vite 8</span>
              <span className="tech-chip">TypeScript</span>
              <span className="tech-chip">HTML5 Canvas API</span>
              <span className="tech-chip">Lucide Icons</span>
              <span className="tech-chip">WCAG 2.1 Contrast</span>
              <span className="tech-chip">Vercel Deploy Ready</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <span className="modal-footer-brand">QRForge • Built with passion for GDG SRM</span>
          <button type="button" className="btn-primary-compact" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
