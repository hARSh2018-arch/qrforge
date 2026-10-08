import React from 'react';
import { Phone, X } from 'lucide-react';
import type { PhoneFormData } from '../types/qr';
import { COUNTRY_CODES } from '../data/qrTypes';
import { validatePhone } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface PhoneFormProps {
  data: PhoneFormData;
  onChange: (fields: Partial<PhoneFormData>) => void;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({ data, onChange }) => {
  const phoneValidation = validatePhone(data.phoneNumber);
  const showError = data.phoneNumber.trim().length > 0 && !phoneValidation.isValid;

  return (
    <div className="form-group-container">
      <div className="field-header">
        <label htmlFor="phone-input" className="field-label">
          Phone Number <span className="required-star">*</span>
        </label>
        <span className="field-hint">Generates standard tel: dialing payload</span>
      </div>

      <div className="phone-input-row">
        <div className="country-code-wrapper">
          <label htmlFor="country-code-select" className="sr-only">Country Code</label>
          <select
            id="country-code-select"
            className="base-select country-select"
            value={data.countryCode}
            onChange={(e) => onChange({ countryCode: e.target.value })}
            aria-label="Country calling code"
          >
            {COUNTRY_CODES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} ({item.name.split(' (')[0]})
              </option>
            ))}
            {!COUNTRY_CODES.some((c) => c.code === data.countryCode) && (
              <option value={data.countryCode}>{data.countryCode}</option>
            )}
          </select>
        </div>

        <div className={`input-wrapper flex-1 ${showError ? 'has-error' : ''}`}>
          <span className="input-icon-prefix">
            <Phone size={18} />
          </span>
          <input
            id="phone-input"
            type="tel"
            className="base-input"
            value={data.phoneNumber}
            onChange={(e) => onChange({ phoneNumber: e.target.value })}
            placeholder="98765 43210"
            autoComplete="tel-national"
            aria-invalid={showError}
          />
          {data.phoneNumber && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => onChange({ phoneNumber: '' })}
              title="Clear phone number"
              aria-label="Clear phone number"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {showError && <ValidationMessage message={phoneValidation.message} />}

      <div className="field-footer-notes">
        <span>Instant one-tap direct dialing when scanned on mobile devices.</span>
      </div>
    </div>
  );
};
