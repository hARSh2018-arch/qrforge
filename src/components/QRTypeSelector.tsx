import React from 'react';
import {
  Globe,
  Type,
  Wifi,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Calendar
} from 'lucide-react';
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
  const renderIcon = (name: string, size = 16) => {
    switch (name) {
      case 'Globe':
        return <Globe size={size} />;
      case 'Type':
        return <Type size={size} />;
      case 'Wifi':
        return <Wifi size={size} />;
      case 'User':
        return <User size={size} />;
      case 'Mail':
        return <Mail size={size} />;
      case 'Phone':
        return <Phone size={size} />;
      case 'MessageSquare':
        return <MessageSquare size={size} />;
      case 'MapPin':
        return <MapPin size={size} />;
      case 'Calendar':
        return <Calendar size={size} />;
      default:
        return <Globe size={size} />;
    }
  };

  return (
    <nav className="type-nav-wrapper" aria-label="QR Code Content Types">
      <div className="type-segmented-bar" role="tablist">
        {QR_TYPES.map((item) => {
          const isSelected = activeType === item.type;
          return (
            <button
              key={item.type}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`type-tab-item ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectType(item.type)}
              title={`${item.name} — ${item.shortDesc}`}
            >
              <span className="type-tab-icon">
                {renderIcon(item.iconName, 16)}
              </span>
              <span className="type-tab-label">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
