import React from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import type { SMSFormData } from '../types/qr';
import { COUNTRY_CODES } from '../data/qrTypes';
import { validateSms } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface SMSFormProps {
  data: SMSFormData;
  onChange: (fields: Partial<SMSFormData>) => void;
}

export const SMSForm: React.FC<SMSFormProps> = ({ data, onChange }) => {
  const smsValidation = validateSms(data.phoneNumber);
  const showError = data.phoneNumber.trim().length > 0 && !smsValidation.isValid;

  return (
    <div className="form-group-container">
      {/* Phone Number */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="sms-phone-input" className="field-label">
            Recipient Phone Number <span className="required-star">*</span>
          </label>
          <span className="field-hint">Mobile number for SMS message</span>
        </div>

        <div className="phone-input-row">
          <div className="country-code-wrapper">
            <label htmlFor="sms-country-code-select" className="sr-only">Country Code</label>
            <select
              id="sms-country-code-select"
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
              id="sms-phone-input"
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
        {showError && <ValidationMessage message={smsValidation.message} />}
      </div>

      {/* Pre-filled Message */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="sms-body-input" className="field-label">
            Pre-filled SMS Message
          </label>
          <span className="field-hint">Optional</span>
        </div>
        <div className="textarea-wrapper">
          <textarea
            id="sms-body-input"
            className="base-textarea"
            value={data.message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder="Type pre-filled text message..."
            rows={3}
          />
        </div>
      </div>

      <div className="field-footer-notes">
        <MessageSquare size={13} className="footer-icon" />
        <span>Scanning automatically opens the default messaging app with recipient and text pre-filled.</span>
      </div>
    </div>
  );
};
