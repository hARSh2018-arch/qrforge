import React from 'react';
import { History, RotateCcw, Trash2, Clock } from 'lucide-react';
import type { QRConfig, QRHistoryItem } from '../types/qr';

interface RecentQRsProps {
  history: QRHistoryItem[];
  onReuse: (config: QRConfig) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

function formatRelativeTime(timestamp: number): string {
  try {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export const RecentQRs: React.FC<RecentQRsProps> = ({
  history,
  onReuse,
  onDelete,
  onClear
}) => {
  return (
    <div className="recent-qrs-container">
      <div className="section-label-row">
        <div className="flex-align-center gap-1.5">
          <History size={14} className="accent-icon" />
          <span className="section-eyebrow">Recent QR Codes</span>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            className="clear-all-link-btn"
            onClick={onClear}
            title="Clear all recent QR history"
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="recent-empty-card">
          <Clock size={20} className="recent-empty-icon" />
          <span className="recent-empty-text">No recent QR codes saved yet</span>
          <span className="recent-empty-hint">Downloaded or saved QR codes appear here for quick reuse</span>
        </div>
      ) : (
        <div className="recent-cards-stack">
          {history.map((item) => (
            <div key={item.id} className="recent-qr-card">
              <div className="recent-thumb-wrapper">
                {item.previewDataUrl ? (
                  <img
                    src={item.previewDataUrl}
                    alt={item.title}
                    className="recent-thumb-img"
                  />
                ) : (
                  <div className="recent-thumb-fallback">
                    <span>QR</span>
                  </div>
                )}
              </div>

              <div className="recent-card-body">
                <div className="recent-card-header">
                  <span className="recent-type-tag">{item.type.toUpperCase()}</span>
                  <span className="recent-time">{formatRelativeTime(item.timestamp)}</span>
                </div>
                <div className="recent-card-title" title={item.payload}>
                  {item.title}
                </div>
              </div>

              <div className="recent-card-actions">
                <button
                  type="button"
                  className="btn-reuse-action"
                  onClick={() => onReuse(item.config)}
                  title="Reuse and restore entire configuration"
                  aria-label={`Reuse ${item.title}`}
                >
                  <RotateCcw size={13} />
                  <span>Reuse</span>
                </button>
                <button
                  type="button"
                  className="btn-delete-action"
                  onClick={() => onDelete(item.id)}
                  title="Delete from history"
                  aria-label={`Delete ${item.title} from history`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
