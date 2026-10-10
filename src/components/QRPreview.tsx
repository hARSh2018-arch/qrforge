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
  QrCode
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
  const [showSpecs, setShowSpecs] = useState(false);

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
        const displaySize = Math.min(config.options.size, 400);
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
      onShowToast('Failed to download PNG file', 'warning');
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
      onShowToast('Failed to download SVG file', 'warning');
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
      onShowToast('Copied QR code image to clipboard', 'success');
      setTimeout(() => setIsCopied(false), 2500);
    } else {
      onShowToast('Copied payload text to clipboard', 'info');
    }
  };

  const getECCRecovery = (level: ErrorCorrectionLevel) => {
    switch (level) {
      case 'L': return '7%';
      case 'M': return '15%';
      case 'Q': return '25%';
      case 'H': return '30%';
    }
  };

  return (
    <div className="preview-card-wrapper">
      {/* Quiet Preview Stage */}
      <div className="preview-stage-container">
        {hasContent && !generationError ? (
          <div
            className="preview-canvas-card"
            style={{ backgroundColor: config.options.background }}
          >
            <canvas ref={canvasRef} className="qr-rendered-canvas" />
          </div>
        ) : (
          <div className="preview-empty-stage">
            <div className="empty-icon-frame">
              <QrCode size={36} className="empty-qr-icon" />
            </div>
            <p className="empty-stage-primary">QR Preview</p>
            <p className="empty-stage-secondary">
              Enter details on the left to preview your live, high-resolution QR code.
            </p>
          </div>
        )}

        {generationError && (
          <div className="preview-error-notice">
            <AlertTriangle size={15} />
            <span>{generationError}</span>
          </div>
        )}
      </div>

      {/* Reliability & Contrast Indicator */}
      <div className="preview-reliability-row">
        <div className="reliability-status-badge">
          {contrast.status === 'optimal' || contrast.status === 'good' ? (
            <span className="status-pill status-optimal">
              <ShieldCheck size={14} />
              <span>Optimal Contrast ({contrast.ratio}:1)</span>
            </span>
          ) : (
            <span className="status-pill status-warning">
              <AlertTriangle size={14} />
              <span>Low Contrast ({contrast.ratio}:1)</span>
            </span>
          )}
        </div>

        <button
          type="button"
          className="specs-toggle-link"
          onClick={() => setShowSpecs(!showSpecs)}
        >
          <Info size={13} />
          <span>{showSpecs ? 'Hide Specs' : 'Specs'}</span>
        </button>
      </div>

      {/* Scan Warnings if any */}
      {scanTips.warnings.length > 0 && (
        <div className="preview-warnings-stack">
          {scanTips.warnings.map((tip, idx) => (
            <div key={idx} className="warning-callout-item">
              <AlertTriangle size={13} className="warning-callout-icon" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}

      {/* Primary and Secondary Action Buttons */}
      <div className="preview-actions-container">
        <button
          type="button"
          className="btn-primary-action"
          onClick={handleDownloadPNG}
          disabled={!hasContent || isDownloading}
          aria-label="Download high-resolution PNG QR Code"
        >
          <Download size={17} />
          <span>Download PNG</span>
          <span className="btn-size-chip">{config.options.size}px</span>
        </button>

        <div className="secondary-buttons-row">
          <button
            type="button"
            className="btn-secondary-action"
            onClick={handleDownloadSVG}
            disabled={!hasContent}
            title="Download pure scalable vector SVG for print and design tools"
          >
            <FileCode2 size={15} />
            <span>Download SVG</span>
          </button>

          <button
            type="button"
            className={`btn-secondary-action ${isCopied ? 'is-copied' : ''}`}
            onClick={handleCopyQR}
            disabled={!hasContent}
            title="Copy QR image directly to clipboard"
          >
            {isCopied ? <Check size={15} /> : <Copy size={15} />}
            <span>{isCopied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible Specs */}
      {showSpecs && (
        <div className="preview-specs-drawer">
          <div className="specs-data-grid">
            <div className="spec-item-box">
              <span className="spec-label-dim">Resolution</span>
              <span className="spec-val-bold">{config.options.size} × {config.options.size} px</span>
            </div>
            <div className="spec-item-box">
              <span className="spec-label-dim">Error Correction</span>
              <span className="spec-val-bold">Level {config.options.errorCorrection} ({getECCRecovery(config.options.errorCorrection)})</span>
            </div>
            <div className="spec-item-box">
              <span className="spec-label-dim">Quiet Zone</span>
              <span className="spec-val-bold">{config.options.margin} blocks</span>
            </div>
            <div className="spec-item-box">
              <span className="spec-label-dim">Payload Length</span>
              <span className="spec-val-bold">{payload.length} chars</span>
            </div>
          </div>
          {hasContent && (
            <div className="raw-payload-preview-row">
              <span className="spec-label-dim">Encoded String:</span>
              <code className="raw-code-pill" title={payload}>
                {payload.length > 45 ? `${payload.substring(0, 45)}...` : payload}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
