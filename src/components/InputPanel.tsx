import React from 'react';
import type { QRConfig } from '../types/qr';
import { URLForm } from './URLForm';
import { TextForm } from './TextForm';
import { EmailForm } from './EmailForm';
import { PhoneForm } from './PhoneForm';
import { WifiForm } from './WifiForm';
import { Edit3 } from 'lucide-react';

interface InputPanelProps {
  config: QRConfig;
  onUpdateUrl: (url: string) => void;
  onUpdateText: (text: string) => void;
  onUpdateEmail: (fields: Partial<QRConfig['data']['email']>) => void;
  onUpdatePhone: (fields: Partial<QRConfig['data']['phone']>) => void;
  onUpdateWifi: (fields: Partial<QRConfig['data']['wifi']>) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  config,
  onUpdateUrl,
  onUpdateText,
  onUpdateEmail,
  onUpdatePhone,
  onUpdateWifi
}) => {
  const renderActiveForm = () => {
    switch (config.type) {
      case 'url':
        return <URLForm data={config.data.url} onChange={onUpdateUrl} />;
      case 'text':
        return <TextForm data={config.data.text} onChange={onUpdateText} />;
      case 'email':
        return <EmailForm data={config.data.email} onChange={onUpdateEmail} />;
      case 'phone':
        return <PhoneForm data={config.data.phone} onChange={onUpdatePhone} />;
      case 'wifi':
        return <WifiForm data={config.data.wifi} onChange={onUpdateWifi} />;
      default:
        return null;
    }
  };

  return (
    <div className="input-panel-card">
      <div className="panel-header-row">
        <div className="flex-align-center gap-2">
          <Edit3 size={16} className="accent-icon" />
          <h3 className="panel-title">Payload Content</h3>
        </div>
        <span className="live-badge-subtle">Instant Preview Sync</span>
      </div>

      <div className="form-fields-body">
        {renderActiveForm()}
      </div>
    </div>
  );
};
