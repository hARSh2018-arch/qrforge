import React from 'react';
import { User, Phone, Mail, Building, Globe, X } from 'lucide-react';
import type { ContactFormData } from '../types/qr';
import { validateContact } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface ContactFormProps {
  data: ContactFormData;
  onChange: (fields: Partial<ContactFormData>) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data, onChange }) => {
  const validation = validateContact(data.firstName, data.lastName, data.phone, data.email);
  const isAllEmpty = !data.firstName.trim() && !data.lastName.trim() && !data.phone.trim() && !data.email.trim();
  const showError = !isAllEmpty && !validation.isValid;

  return (
    <div className="form-group-container">
      {/* Name Fields */}
      <div className="form-row-two-col">
        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="contact-first-name" className="field-label">
              First Name
            </label>
          </div>
          <div className="input-wrapper">
            <span className="input-icon-prefix">
              <User size={18} />
            </span>
            <input
              id="contact-first-name"
              type="text"
              className="base-input"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              placeholder="e.g. John"
              autoComplete="given-name"
            />
            {data.firstName && (
              <button
                type="button"
                className="input-clear-btn"
                onClick={() => onChange({ firstName: '' })}
                title="Clear first name"
                aria-label="Clear first name"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="contact-last-name" className="field-label">
              Last Name
            </label>
          </div>
          <div className="input-wrapper">
            <input
              id="contact-last-name"
              type="text"
              className="base-input"
              value={data.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              placeholder="e.g. Doe"
              autoComplete="family-name"
            />
            {data.lastName && (
              <button
                type="button"
                className="input-clear-btn"
                onClick={() => onChange({ lastName: '' })}
                title="Clear last name"
                aria-label="Clear last name"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="contact-phone" className="field-label">
            Mobile Phone Number
          </label>
        </div>
        <div className="input-wrapper">
          <span className="input-icon-prefix">
            <Phone size={18} />
          </span>
          <input
            id="contact-phone"
            type="tel"
            className="base-input"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
          {data.phone && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => onChange({ phone: '' })}
              title="Clear phone"
              aria-label="Clear phone"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="contact-email" className="field-label">
            Email Address
          </label>
        </div>
        <div className="input-wrapper">
          <span className="input-icon-prefix">
            <Mail size={18} />
          </span>
          <input
            id="contact-email"
            type="email"
            className="base-input"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="john.doe@example.com"
            autoComplete="email"
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
      </div>

      {/* Company / Organization & Website */}
      <div className="form-row-two-col">
        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="contact-org" className="field-label">
              Organization
            </label>
          </div>
          <div className="input-wrapper">
            <span className="input-icon-prefix">
              <Building size={18} />
            </span>
            <input
              id="contact-org"
              type="text"
              className="base-input"
              value={data.organization}
              onChange={(e) => onChange({ organization: e.target.value })}
              placeholder="Company or School"
            />
          </div>
        </div>

        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="contact-url" className="field-label">
              Website
            </label>
          </div>
          <div className="input-wrapper">
            <span className="input-icon-prefix">
              <Globe size={18} />
            </span>
            <input
              id="contact-url"
              type="url"
              className="base-input"
              value={data.url}
              onChange={(e) => onChange({ url: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {showError && <ValidationMessage message={validation.message} />}

      <div className="field-footer-notes">
        <User size={13} className="footer-icon" />
        <span>Generates a universal vCard 3.0 string. Scanners can save all fields directly to Address Book.</span>
      </div>
    </div>
  );
};
