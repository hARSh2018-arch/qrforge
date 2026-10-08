import React from 'react';
import { Globe, X } from 'lucide-react';
import type { URLFormData } from '../types/qr';
import { validateUrl } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface URLFormProps {
  data: URLFormData;
  onChange: (url: string) => void;
}

export const URLForm: React.FC<URLFormProps> = ({ data, onChange }) => {
  const validation = validateUrl(data.url);
  const showError = data.url.trim().length > 0 && !validation.isValid;

  const handleClear = () => {
    onChange('');
  };

  const handleQuickProtocol = (protocol: string) => {
    const raw = data.url.replace(/^https?:\/\//i, '');
    onChange(`${protocol}${raw || 'example.com'}`);
  };

  return (
    <div className="form-group-container">
      <div className="field-header">
        <label htmlFor="url-input" className="field-label">
          Target Website URL
        </label>
        <span className="field-hint">Supports HTTPS, HTTP, and direct domain names</span>
      </div>

      <div className={`input-wrapper ${showError ? 'has-error' : ''}`}>
        <span className="input-icon-prefix">
          <Globe size={18} />
        </span>
        <input
          id="url-input"
          type="url"
          className="base-input"
          value={data.url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          autoComplete="url"
          spellCheck="false"
          aria-invalid={showError}
          aria-describedby={showError ? 'url-error' : undefined}
        />
        {data.url && (
          <button
            type="button"
            className="input-clear-btn"
            onClick={handleClear}
            title="Clear input"
            aria-label="Clear URL input"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {showError && <ValidationMessage message={validation.message} />}

      <div className="quick-actions-bar">
        <span className="quick-label">Quick protocols:</span>
        <button
          type="button"
          className="quick-chip-btn"
          onClick={() => handleQuickProtocol('https://')}
        >
          https://
        </button>
        <button
          type="button"
          className="quick-chip-btn"
          onClick={() => handleQuickProtocol('http://')}
        >
          http://
        </button>
      </div>
    </div>
  );
};
