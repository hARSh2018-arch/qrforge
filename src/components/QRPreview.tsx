import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  Copy,
  Check,
  FileCode2,
  AlertTriangle,
  ShieldCheck,
  Info,
  Sparkles
} from 'lucide-react';
import type { QRConfig, ContrastAnalysis, ErrorCorrectionLevel } from '../types/qr';
import { downloadQRPNG, downloadQRSVG, copyQRImageToClipboard } from '../utils/download';

interface QRPreviewProps {
  config: QRConfig;
  payload: string;
  contrast: ContrastAnalysis;
  scanTips: { status: 'optimal' | 'good' | 'warning' | 'danger'; warnings: string[] };
  onSaveToHistory: (config: QRConfig, previewUrl: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  config,
  payload,
  contrast,
  scanTips,
  onSaveToHistory,
  onShowToast
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string>('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  const hasContent = Boolean(payload && payload.trim());

  useEffect(() => {
    let isCancelled = false;

    async function drawQR() {
      if (!canvasRef.current) return;
      if (!hasContent) {
        setGenerationError(null);
        return;
      }

      try {
        const canvas = canvasRef.current;
        const displaySize = Math.min(config.options.size, 460);
        canvas.width = displaySize;
        canvas.height = displaySize;

        await QRCode.toCanvas(canvas, payload, {
          width: displaySize,
          margin: config.options.margin,
          errorCorrectionLevel: config.options.errorCorrection,
          color: {
            dark: config.options.foreground,
            light: config.options.background
          }
        });

        if (config.options.logoUrl) {
          try {
            const logo = new Image();
            logo.crossOrigin = 'anonymous';
            await new Promise<void>((resolve, reject) => {
              logo.onload = () => resolve();
              logo.onerror = () => reject(new Error('Logo image load failed'));
              logo.src = config.options.logoUrl!;
            });

            if (isCancelled) return;

            const ctx = canvas.getContext('2d');
            if (ctx) {
              const logoSize = Math.floor(displaySize * 0.22);
              const padding = Math.max(4, Math.floor(logoSize * 0.12));
              const bgSize = logoSize + padding * 2;
              const bgX = (displaySize - bgSize) / 2;
              const bgY = (displaySize - bgSize) / 2;
              const logoX = (displaySize - logoSize) / 2;
              const logoY = (displaySize - logoSize) / 2;
              const radius = Math.floor(bgSize * 0.2);

              ctx.save();
              ctx.fillStyle = config.options.background;
              ctx.beginPath();
              ctx.roundRect(bgX, bgY, bgSize, bgSize, radius);
              ctx.fill();

              ctx.strokeStyle = config.options.foreground;
              ctx.lineWidth = Math.max(1.5, Math.floor(displaySize * 0.005));
              ctx.stroke();

              ctx.beginPath();
              ctx.roundRect(logoX, logoY, logoSize, logoSize, Math.floor(logoSize * 0.15));
              ctx.clip();
              ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
              ctx.restore();
            }
          } catch (e) {
            console.warn('Failed rendering logo to preview canvas:', e);
          }
        }

        if (!isCancelled) {
          setGenerationError(null);
          const dataUrl = canvas.toDataURL('image/png');
          setCanvasDataUrl(dataUrl);
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.error('QR Render Error:', err);
          setGenerationError(err?.message || 'Unable to generate QR code with current payload');
        }
      }
    }

    drawQR();

    return () => {
      isCancelled = true;
    };
  }, [config, payload, hasContent]);

  const handleDownloadPNG = async () => {
    if (!hasContent) {
      onShowToast('Please enter QR content before downloading', 'warning');
      return;
    }
    try {
      setIsDownloading(true);
      const fileName = await downloadQRPNG(config);
      onSaveToHistory(config, canvasDataUrl);
      onShowToast(`Downloaded ${fileName}`, 'success');
    } catch {
      onShowToast('Failed to download PNG', 'warning');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSVG = async () => {
    if (!hasContent) {
      onShowToast('Please enter QR content before downloading', 'warning');
      return;
    }
    try {
      const fileName = await downloadQRSVG(config);
      onSaveToHistory(config, canvasDataUrl);
      onShowToast(`Downloaded ${fileName}`, 'success');
    } catch {
      onShowToast('Failed to download SVG', 'warning');
    }
  };

  const handleCopyQR = async () => {
    if (!hasContent) {
      onShowToast('Please enter QR content before copying', 'warning');
      return;
    }
    const success = await copyQRImageToClipboard(config);
    if (success) {
      setIsCopied(true);
      onShowToast('✓ Copied QR to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2500);
    } else {
      onShowToast('Could not copy image to clipboard in this browser', 'info');
    }
  };

  const getECCDetails = (level: ErrorCorrectionLevel) => {
    switch (level) {
      case 'L': return { recovery: '7%', label: 'Low' };
      case 'M': return { recovery: '15%', label: 'Medium' };
      case 'Q': return { recovery: '25%', label: 'Quartile' };
      case 'H': return { recovery: '30%', label: 'High' };
    }
  };

  return (
    <div className="preview-column-card">
      <div className="preview-header">
        <div className="live-indicator-chip" title="Real-time rendering active">
          <span className="live-pulsing-dot" />
          <span className="live-text">LIVE PREVIEW</span>
        </div>
        <div className="preview-type-badge">
          {config.type.toUpperCase()}
        </div>
      </div>

      <div className="preview-canvas-stage">
        {hasContent && !generationError ? (
          <div
            className="canvas-container-shadow"
            style={{
              backgroundColor: config.options.background,
              borderColor: contrast.status === 'poor' ? '#ef4444' : undefined
            }}
          >
            <canvas ref={canvasRef} className="qr-preview-canvas" />
          </div>
        ) : (
          <div className="preview-empty-state">
            <div className="empty-state-wireframe">
              <div className="wireframe-corner tl" />
              <div className="wireframe-corner tr" />
              <div className="wireframe-corner bl" />
              <div className="wireframe-center">
                <Sparkles size={28} className="empty-sparkle-icon" />
              </div>
            </div>
            <h4 className="empty-state-title">Create your first QR code</h4>
            <p className="empty-state-desc">
              Choose a QR type, enter your details, and preview updates instantaneously.
            </p>
          </div>
        )}

        {generationError && (
          <div className="generation-error-box">
            <AlertTriangle size={18} />
            <span>{generationError}</span>
          </div>
        )}
      </div>

      <div className="reliability-section">
        <div className="contrast-metric-row">
          <div className="metric-item">
            <span className="metric-label">Contrast Ratio:</span>
            <span
              className={`metric-value ${
                contrast.status === 'optimal'
                  ? 'contrast-optimal'
                  : contrast.status === 'good'
                  ? 'contrast-good'
                  : contrast.status === 'warning'
                  ? 'contrast-warning'
                  : 'contrast-danger'
              }`}
            >
              {contrast.ratio} : 1
            </span>
          </div>

          <div className="reliability-pill">
            {contrast.status === 'optimal' || contrast.status === 'good' ? (
              <span className="pill-badge pill-safe">
                <ShieldCheck size={13} />
                <span>Scan Verified</span>
              </span>
            ) : (
              <span className="pill-badge pill-caution">
                <AlertTriangle size={13} />
                <span>Notice</span>
              </span>
            )}
          </div>
        </div>

        {scanTips.warnings.length > 0 && (
          <div className="scan-warnings-list">
            {scanTips.warnings.map((tip, idx) => (
              <div key={idx} className="warning-banner-item">
                <AlertTriangle size={14} className="warning-icon-flex" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="preview-actions-group">
        <button
          type="button"
          className="btn-download-primary"
          onClick={handleDownloadPNG}
          disabled={!hasContent || isDownloading}
          aria-label="Download high-resolution PNG QR Code"
        >
          <Download size={18} />
          <span>Download PNG</span>
          <span className="btn-badge">{config.options.size}px</span>
        </button>

        <div className="secondary-actions-row">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleDownloadSVG}
            disabled={!hasContent}
            title="Download pure vector SVG for print and scaling"
            aria-label="Download SVG format"
          >
            <FileCode2 size={16} />
            <span>Download SVG</span>
          </button>

          <button
            type="button"
            className={`btn-secondary ${isCopied ? 'btn-copied' : ''}`}
            onClick={handleCopyQR}
            disabled={!hasContent}
            title="Copy QR image to clipboard"
            aria-label="Copy QR Code to clipboard"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            <span>{isCopied ? '✓ Copied!' : 'Copy QR'}</span>
          </button>
        </div>
      </div>

      <div className="qr-specs-card">
        <div className="specs-header">
          <Info size={13} className="specs-icon" />
          <span>Payload & Rendering Specs</span>
        </div>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Resolution</span>
            <span className="spec-value">{config.options.size} × {config.options.size} px</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Error Correction</span>
            <span className="spec-value">
              Level {config.options.errorCorrection} ({getECCDetails(config.options.errorCorrection).recovery})
            </span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Quiet Zone</span>
            <span className="spec-value">{config.options.margin} blocks</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Payload Size</span>
            <span className="spec-value">{payload.length} chars</span>
          </div>
        </div>

        {hasContent && (
          <div className="raw-payload-preview">
            <span className="payload-label">Encoded String:</span>
            <code className="payload-code-snippet" title={payload}>
              {payload.length > 55 ? `${payload.substring(0, 55)}...` : payload}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};
