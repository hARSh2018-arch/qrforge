import React from 'react';
import type { QRConfig } from '../types/qr';
import { URLForm } from './URLForm';
import { TextForm } from './TextForm';
import { EmailForm } from './EmailForm';
import { PhoneForm } from './PhoneForm';
import { WifiForm } from './WifiForm';
import { SMSForm } from './SMSForm';
import { ContactForm } from './ContactForm';
import { LocationForm } from './LocationForm';
import { EventForm } from './EventForm';

interface InputPanelProps {
  config: QRConfig;
  onUpdateUrl: (url: string) => void;
  onUpdateText: (text: string) => void;
  onUpdateEmail: (fields: Partial<QRConfig['data']['email']>) => void;
  onUpdatePhone: (fields: Partial<QRConfig['data']['phone']>) => void;
  onUpdateWifi: (fields: Partial<QRConfig['data']['wifi']>) => void;
  onUpdateSms: (fields: Partial<QRConfig['data']['sms']>) => void;
  onUpdateContact: (fields: Partial<QRConfig['data']['contact']>) => void;
  onUpdateLocation: (fields: Partial<QRConfig['data']['location']>) => void;
  onUpdateEvent: (fields: Partial<QRConfig['data']['event']>) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  config,
  onUpdateUrl,
  onUpdateText,
  onUpdateEmail,
  onUpdatePhone,
  onUpdateWifi,
  onUpdateSms,
  onUpdateContact,
  onUpdateLocation,
  onUpdateEvent
}) => {
  const renderActiveForm = () => {
    switch (config.type) {
      case 'url':
        return <URLForm data={config.data.url} onChange={onUpdateUrl} />;
      case 'text':
        return <TextForm data={config.data.text} onChange={onUpdateText} />;
      case 'wifi':
        return <WifiForm data={config.data.wifi} onChange={onUpdateWifi} />;
      case 'contact':
        return <ContactForm data={config.data.contact} onChange={onUpdateContact} />;
      case 'email':
        return <EmailForm data={config.data.email} onChange={onUpdateEmail} />;
      case 'phone':
        return <PhoneForm data={config.data.phone} onChange={onUpdatePhone} />;
      case 'sms':
        return <SMSForm data={config.data.sms} onChange={onUpdateSms} />;
      case 'location':
        return <LocationForm data={config.data.location} onChange={onUpdateLocation} />;
      case 'event':
        return <EventForm data={config.data.event} onChange={onUpdateEvent} />;
      default:
        return null;
    }
  };

  return (
    <div className="input-panel-card">
      <div className="form-fields-body">
        {renderActiveForm()}
      </div>
    </div>
  );
};

