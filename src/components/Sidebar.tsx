import React from 'react';
import type { QRType, QRConfig, QRHistoryItem } from '../types/qr';
import { QRTypeSelector } from './QRTypeSelector';
import { RecentQRs } from './RecentQRs';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

interface SidebarProps {
  activeType: QRType;
  onSelectType: (type: QRType) => void;
  history: QRHistoryItem[];
  onReuseHistory: (config: QRConfig) => void;
  onDeleteHistory: (id: string) => void;
  onClearHistory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeType,
  onSelectType,
  history,
  onReuseHistory,
  onDeleteHistory,
  onClearHistory
}) => {
  return (
    <aside className="dashboard-sidebar">
      {/* QR Types Navigation */}
      <QRTypeSelector
        activeType={activeType}
        onSelectType={onSelectType}
      />

      {/* Feature Highlights Card */}
      <div className="sidebar-feature-box">
        <div className="feature-item">
          <Zap size={14} className="feature-icon feature-zap" />
          <span>Real-time instant rendering</span>
        </div>
        <div className="feature-item">
          <ShieldCheck size={14} className="feature-icon feature-shield" />
          <span>WCAG contrast scan verification</span>
        </div>
        <div className="feature-item">
          <Layers size={14} className="feature-icon feature-layers" />
          <span>Offline client-side processing</span>
        </div>
      </div>

      {/* Recent QR Codes List */}
      <RecentQRs
        history={history}
        onReuse={onReuseHistory}
        onDelete={onDeleteHistory}
        onClear={onClearHistory}
      />
    </aside>
  );
};
