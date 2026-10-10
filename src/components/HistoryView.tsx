import React, { useState } from 'react';
import {
  RotateCcw,
  Trash2,
  Download,
  FileCode2,
  Clock,
  Sparkles,
  QrCode,
  AlertCircle
} from 'lucide-react';
import type { QRConfig, QRHistoryItem } from '../types/qr';
import { downloadQRPNG, downloadQRSVG } from '../utils/download';

interface HistoryViewProps {
  history: QRHistoryItem[];
  onReuse: (config: QRConfig) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
  onNavigateToGenerate: () => void;
}

function formatRelativeTime(timestamp: number): string {
  try {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Recently';
  }
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onReuse,
  onDelete,
  onClear,
  onShowToast,
  onNavigateToGenerate
}) => {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleDownloadPNG = async (item: QRHistoryItem) => {
    try {
      const fileName = await downloadQRPNG(item.config);
      onShowToast(`Downloaded ${fileName}`, 'success');
    } catch {
      onShowToast('Failed to download PNG', 'warning');
    }
  };

  const handleDownloadSVG = async (item: QRHistoryItem) => {
    try {
      const fileName = await downloadQRSVG(item.config);
      onShowToast(`Downloaded ${fileName}`, 'success');
    } catch {
      onShowToast('Failed to download SVG', 'warning');
    }
  };

  const handleConfirmClear = () => {
    onClear();
    setConfirmClearOpen(false);
    onShowToast('QR history cleared', 'info');
  };

  return (
    <div className="history-view-container">
      {/* Header bar */}
      <div className="history-header-bar">
        <div>
          <h2 className="history-page-title">Saved QR Codes</h2>
          <p className="history-page-subtitle">
            {history.length === 0
              ? 'Stored locally in this browser'
              : `${history.length} ${history.length === 1 ? 'code' : 'codes'} saved in local storage`}
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            className="clear-history-action-btn"
            onClick={() => setConfirmClearOpen(true)}
          >
            <Trash2 size={15} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmClearOpen && (
        <div className="modal-backdrop" onClick={() => setConfirmClearOpen(false)}>
          <div className="confirm-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-icon-alert">
              <AlertCircle size={24} />
            </div>
            <h3 className="dialog-title">Clear all QR history?</h3>
            <p className="dialog-desc">
              This will remove all {history.length} saved QR codes from your browser storage. This action cannot be undone.
            </p>
            <div className="dialog-btn-row">
              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => setConfirmClearOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger-action"
                onClick={handleConfirmClear}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Grid or Empty State */}
      {history.length === 0 ? (
        <div className="history-empty-wrapper">
          <div className="history-empty-icon-box">
            <Clock size={32} className="history-empty-icon" />
          </div>
          <h3 className="history-empty-title">No QR codes in history yet</h3>
          <p className="history-empty-desc">
            When you create and download QR codes in QRForge, they are automatically preserved here so you can preview, reuse, and re-download them anytime.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={onNavigateToGenerate}
          >
            <Sparkles size={16} />
            <span>Create your first QR code</span>
          </button>
        </div>
      ) : (
        <div className="history-grid-layout">
          {history.map((item) => (
            <div key={item.id} className="history-item-card">
              {/* Thumbnail */}
              <div
                className="history-thumb-box"
                style={{ backgroundColor: item.config.options.background || '#FFFFFF' }}
              >
                {item.previewDataUrl ? (
                  <img
                    src={item.previewDataUrl}
                    alt={item.title}
                    className="history-thumb-image"
                  />
                ) : (
                  <div className="history-thumb-placeholder">
                    <QrCode size={28} />
                  </div>
                )}
              </div>

              {/* Card Meta */}
              <div className="history-item-info">
                <div className="history-type-time-row">
                  <span className="history-type-pill">{item.type.toUpperCase()}</span>
                  <span className="history-timestamp">{formatRelativeTime(item.timestamp)}</span>
                </div>

                <h4 className="history-item-name" title={item.title}>
                  {item.title}
                </h4>

                <p className="history-payload-snippet" title={item.payload}>
                  {item.payload}
                </p>
              </div>

              {/* Card Actions */}
              <div className="history-actions-bar">
                <button
                  type="button"
                  className="history-action-btn primary-reuse"
                  onClick={() => {
                    onReuse(item.config);
                    onNavigateToGenerate();
                  }}
                  title="Load into Generator"
                >
                  <RotateCcw size={14} />
                  <span>Reuse</span>
                </button>

                <button
                  type="button"
                  className="history-action-btn"
                  onClick={() => handleDownloadPNG(item)}
                  title="Download PNG"
                >
                  <Download size={14} />
                  <span>PNG</span>
                </button>

                <button
                  type="button"
                  className="history-action-btn"
                  onClick={() => handleDownloadSVG(item)}
                  title="Download SVG"
                >
                  <FileCode2 size={14} />
                  <span>SVG</span>
                </button>

                <button
                  type="button"
                  className="history-action-btn delete-btn"
                  onClick={() => {
                    onDelete(item.id);
                    onShowToast('Removed from history', 'info');
                  }}
                  title="Delete from history"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
