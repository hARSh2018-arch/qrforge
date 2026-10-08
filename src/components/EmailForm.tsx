import React from 'react';
import { Mail, FileText, AlignLeft, X } from 'lucide-react';
import type { EmailFormData } from '../types/qr';
import { validateEmail } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface EmailFormProps {
  data: EmailFormData;
  onChange: (fields: Partial<EmailFormData>) => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ data, onChange }) => {
  const emailValidation = validateEmail(data.email);
  const showError = data.email.trim().length > 0 && !emailValidation.isValid;

  return (
    <div className="form-group-container">
      {/* Email Address */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="email-input" className="field-label">
            Recipient Email Address <span className="required-star">*</span>
          </label>
        </div>
        <div className={`input-wrapper ${showError ? 'has-error' : ''}`}>
          <span className="input-icon-prefix">
            <Mail size={18} />
          </span>
          <input
            id="email-input"
            type="email"
            className="base-input"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="recipient@example.com"
            autoComplete="email"
            spellCheck="false"
            aria-invalid={showError}
          />
          {data.email && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => onChange({ email: '' })}
              title="Clear email"
              aria-label="Clear email"
            >
              <X size={15} />
            </button>
          )}
        </div>
        {showError && <ValidationMessage message={emailValidation.message} />}
      </div>

      {/* Subject Line */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="subject-input" className="field-label">
            Email Subject
          </label>
          <span className="field-hint">Optional</span>
        </div>
        <div className="input-wrapper">
          <span className="input-icon-prefix">
            <FileText size={18} />
          </span>
          <input
            id="subject-input"
            type="text"
            className="base-input"
            value={data.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
            placeholder="Inquiry / Feedback / Meeting Request"
          />
        </div>
      </div>

      {/* Body Message */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="body-input" className="field-label">
            Pre-filled Message Body
          </label>
          <span className="field-hint">Optional</span>
        </div>
        <div className="textarea-wrapper">
          <textarea
            id="body-input"
            className="base-textarea"
            value={data.message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder="Hi there, I wanted to reach out regarding..."
            rows={3}
          />
        </div>
      </div>

      <div className="field-footer-notes">
        <AlignLeft size={13} className="footer-icon" />
        <span>Scanning opens the user's default email client with all fields pre-populated.</span>
      </div>
    </div>
  );
};
