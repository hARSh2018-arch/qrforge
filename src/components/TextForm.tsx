import React from 'react';
import { Type, X } from 'lucide-react';
import type { TextFormData } from '../types/qr';
import { validateText } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface TextFormProps {
  data: TextFormData;
  onChange: (text: string) => void;
}

const MAX_TEXT_LENGTH = 2048;

export const TextForm: React.FC<TextFormProps> = ({ data, onChange }) => {
  const charCount = data.text.length;
  const isOverLimit = charCount > MAX_TEXT_LENGTH;
  const validation = validateText(data.text);
  const showError = data.text.length > 0 && !validation.isValid;

  return (
    <div className="form-group-container">
      <div className="field-header">
        <label htmlFor="text-input" className="field-label">
          Plain Text or Notes
        </label>
        <span className={`char-counter ${charCount > 1000 ? 'near-limit' : ''}`}>
          {charCount} / {MAX_TEXT_LENGTH} chars
        </span>
      </div>

      <div className={`textarea-wrapper ${showError || isOverLimit ? 'has-error' : ''}`}>
        <textarea
          id="text-input"
          className="base-textarea"
          value={data.text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter any text, code snippet, WiFi instructions, or plain notes..."
          rows={5}
          maxLength={MAX_TEXT_LENGTH}
          aria-invalid={showError || isOverLimit}
        />
        {data.text && (
          <button
            type="button"
            className="textarea-clear-btn"
            onClick={() => onChange('')}
            title="Clear text"
            aria-label="Clear text input"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {showError && <ValidationMessage message={validation.message} />}

      <div className="field-footer-notes">
        <Type size={13} className="footer-icon" />
        <span>Large text payloads generate denser QR codes requiring higher camera resolution to scan.</span>
      </div>
    </div>
  );
};
