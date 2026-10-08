import React from 'react';
import { Globe, Type, Mail, Phone, Wifi } from 'lucide-react';
import type { QRType } from '../types/qr';
import { QR_TYPES } from '../data/qrTypes';

interface QRTypeSelectorProps {
  activeType: QRType;
  onSelectType: (type: QRType) => void;
}

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({
  activeType,
  onSelectType
}) => {
  const getIcon = (name: string, size = 18) => {
    switch (name) {
      case 'Globe':
        return <Globe size={size} />;
      case 'Type':
        return <Type size={size} />;
      case 'Mail':
        return <Mail size={size} />;
      case 'Phone':
        return <Phone size={size} />;
      case 'Wifi':
        return <Wifi size={size} />;
      default:
        return <Globe size={size} />;
    }
  };

  return (
    <div className="type-selector-container">
      <div className="section-label-row">
        <span className="section-eyebrow">QR Payload Type</span>
        <span className="type-count-badge">5 Types</span>
      </div>

      <div className="type-selector-list" role="tablist" aria-label="QR Code Type Selection">
        {QR_TYPES.map((item) => {
          const isSelected = activeType === item.type;
          return (
            <button
              key={item.type}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`type-card-btn ${isSelected ? 'is-active' : ''}`}
              onClick={() => onSelectType(item.type)}
            >
              <div className="type-card-icon-box">
                {getIcon(item.iconName, 18)}
              </div>
              <div className="type-card-text">
                <div className="type-card-title-row">
                  <span className="type-card-name">{item.name}</span>
                  {isSelected && <span className="active-dot-indicator" />}
                </div>
                <p className="type-card-desc">{item.shortDesc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
