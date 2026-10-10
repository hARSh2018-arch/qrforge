import React from 'react';
import { Calendar, MapPin, AlignLeft, X } from 'lucide-react';
import type { EventFormData } from '../types/qr';
import { validateEvent } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface EventFormProps {
  data: EventFormData;
  onChange: (fields: Partial<EventFormData>) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ data, onChange }) => {
  const validation = validateEvent(data.title, data.startDate);
  const showError = data.title.trim().length > 0 && !validation.isValid;

  return (
    <div className="form-group-container">
      {/* Event Title */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="event-title" className="field-label">
            Event Title <span className="required-star">*</span>
          </label>
        </div>
        <div className={`input-wrapper ${showError && !data.title.trim() ? 'has-error' : ''}`}>
          <span className="input-icon-prefix">
            <Calendar size={18} />
          </span>
          <input
            id="event-title"
            type="text"
            className="base-input"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Annual Design Conference 2026"
          />
          {data.title && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => onChange({ title: '' })}
              title="Clear event title"
              aria-label="Clear event title"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="event-location" className="field-label">
            Location / Venue
          </label>
          <span className="field-hint">Physical venue or meeting URL</span>
        </div>
        <div className="input-wrapper">
          <span className="input-icon-prefix">
            <MapPin size={18} />
          </span>
          <input
            id="event-location"
            type="text"
            className="base-input"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Auditorium Hall 3 or Zoom Link"
          />
        </div>
      </div>

      {/* Date & Time Range */}
      <div className="form-row-two-col">
        {/* Start */}
        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="event-start-date" className="field-label">
              Start Date & Time <span className="required-star">*</span>
            </label>
          </div>
          <div className="input-row-flex gap-2">
            <input
              id="event-start-date"
              type="date"
              className="base-input date-input flex-1"
              value={data.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
            />
            <input
              type="time"
              className="base-input time-input flex-1"
              value={data.startTime}
              onChange={(e) => onChange({ startTime: e.target.value })}
              aria-label="Start time"
            />
          </div>
        </div>

        {/* End */}
        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="event-end-date" className="field-label">
              End Date & Time
            </label>
          </div>
          <div className="input-row-flex gap-2">
            <input
              id="event-end-date"
              type="date"
              className="base-input date-input flex-1"
              value={data.endDate}
              onChange={(e) => onChange({ endDate: e.target.value })}
            />
            <input
              type="time"
              className="base-input time-input flex-1"
              value={data.endTime}
              onChange={(e) => onChange({ endTime: e.target.value })}
              aria-label="End time"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="event-description" className="field-label">
            Event Description
          </label>
          <span className="field-hint">Optional</span>
        </div>
        <div className="textarea-wrapper">
          <textarea
            id="event-description"
            className="base-textarea"
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Agenda, keynote speakers, or instructions..."
            rows={2}
          />
        </div>
      </div>

      {showError && <ValidationMessage message={validation.message} />}

      <div className="field-footer-notes">
        <AlignLeft size={13} className="footer-icon" />
        <span>Generates standard iCalendar (VEVENT) payload. Devices prompt to add directly to calendar.</span>
      </div>
    </div>
  );
};
