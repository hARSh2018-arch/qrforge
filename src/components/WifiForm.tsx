import React, { useState } from 'react';
import { Wifi, KeyRound, Eye, EyeOff, Shield } from 'lucide-react';
import type { WifiFormData, WifiEncryption } from '../types/qr';
import { ValidationMessage } from './ValidationMessage';

interface WifiFormProps {
  data: WifiFormData;
  onChange: (fields: Partial<WifiFormData>) => void;
}

export const WifiForm: React.FC<WifiFormProps> = ({ data, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const showError = data.ssid.trim().length === 0;

  const handleSecurityChange = (encryption: WifiEncryption) => {
    onChange({ encryption });
  };

  return (
    <div className="form-group-container">
      {/* SSID */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="ssid-input" className="field-label">
            Network Name (SSID) <span className="required-star">*</span>
          </label>
        </div>
        <div className={`input-wrapper ${showError ? 'has-error' : ''}`}>
          <span className="input-icon-prefix">
            <Wifi size={18} />
          </span>
          <input
            id="ssid-input"
            type="text"
            className="base-input"
            value={data.ssid}
            onChange={(e) => onChange({ ssid: e.target.value })}
            placeholder="e.g. SRM_Camp_5G"
            autoComplete="off"
            aria-invalid={showError}
          />
        </div>
        {showError && <ValidationMessage message="Please enter the network name." />}
      </div>

      {/* Security Type */}
      <div className="form-sub-field">
        <div className="field-header">
          <label className="field-label">Security Protocol</label>
        </div>
        <div className="pill-selector-group" role="radiogroup" aria-label="Wi-Fi Security Type">
          <button
            type="button"
            className={`pill-btn ${data.encryption === 'WPA' ? 'active' : ''}`}
            onClick={() => handleSecurityChange('WPA')}
            role="radio"
            aria-checked={data.encryption === 'WPA'}
          >
            <Shield size={14} className="pill-icon" />
            <span>WPA / WPA2 / WPA3</span>
          </button>
          <button
            type="button"
            className={`pill-btn ${data.encryption === 'WEP' ? 'active' : ''}`}
            onClick={() => handleSecurityChange('WEP')}
            role="radio"
            aria-checked={data.encryption === 'WEP'}
          >
            <span>WEP (Legacy)</span>
          </button>
          <button
            type="button"
            className={`pill-btn ${data.encryption === 'nopass' ? 'active' : ''}`}
            onClick={() => handleSecurityChange('nopass')}
            role="radio"
            aria-checked={data.encryption === 'nopass'}
          >
            <span>None (Open)</span>
          </button>
        </div>
      </div>

      {/* Password (if not open) */}
      {data.encryption !== 'nopass' && (
        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="wifi-pass-input" className="field-label">
              Network Password
            </label>
          </div>
          <div className="input-wrapper">
            <span className="input-icon-prefix">
              <KeyRound size={18} />
            </span>
            <input
              id="wifi-pass-input"
              type={showPassword ? 'text' : 'password'}
              className="base-input"
              value={data.password}
              onChange={(e) => onChange({ password: e.target.value })}
              placeholder="Wi-Fi password"
              autoComplete="off"
            />
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* Hidden Network Toggle */}
      <div className="form-checkbox-row">
        <label className="checkbox-label" htmlFor="hidden-ssid-checkbox">
          <input
            id="hidden-ssid-checkbox"
            type="checkbox"
            className="base-checkbox"
            checked={data.hidden}
            onChange={(e) => onChange({ hidden: e.target.checked })}
          />
          <span className="checkbox-custom" />
          <span className="checkbox-text">Hidden network (SSID is not broadcasting)</span>
        </label>
      </div>

      <div className="field-footer-notes">
        <span>Devices automatically join the network with zero typing when scanned.</span>
      </div>
    </div>
  );
};
