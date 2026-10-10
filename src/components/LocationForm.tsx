import React from 'react';
import { MapPin, Navigation, X } from 'lucide-react';
import type { LocationFormData } from '../types/qr';
import { validateLocation } from '../utils/payload';
import { ValidationMessage } from './ValidationMessage';

interface LocationFormProps {
  data: LocationFormData;
  onChange: (fields: Partial<LocationFormData>) => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({ data, onChange }) => {
  const validation = validateLocation(data.latitude, data.longitude, data.query);
  const isAllEmpty = !data.latitude.trim() && !data.longitude.trim() && !data.query.trim();
  const showError = !isAllEmpty && !validation.isValid;

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onChange({
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6)
          });
        },
        () => {
          alert('Could not access current geolocation. Please ensure permissions are granted.');
        }
      );
    }
  };

  return (
    <div className="form-group-container">
      {/* Search / Address input */}
      <div className="form-sub-field">
        <div className="field-header">
          <label htmlFor="location-query" className="field-label">
            Place Name or Address
          </label>
          <span className="field-hint">e.g. Eiffel Tower, Paris or Street Address</span>
        </div>
        <div className="input-wrapper">
          <span className="input-icon-prefix">
            <MapPin size={18} />
          </span>
          <input
            id="location-query"
            type="text"
            className="base-input"
            value={data.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search address or landmark..."
          />
          {data.query && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => onChange({ query: '' })}
              title="Clear query"
              aria-label="Clear location query"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="form-divider-or">
        <span>or specify geographic coordinates</span>
      </div>

      {/* Lat / Long */}
      <div className="form-row-two-col">
        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="location-lat" className="field-label">
              Latitude
            </label>
          </div>
          <div className="input-wrapper">
            <input
              id="location-lat"
              type="text"
              className="base-input"
              value={data.latitude}
              onChange={(e) => onChange({ latitude: e.target.value })}
              placeholder="e.g. 12.8231"
            />
          </div>
        </div>

        <div className="form-sub-field">
          <div className="field-header">
            <label htmlFor="location-lng" className="field-label">
              Longitude
            </label>
          </div>
          <div className="input-wrapper">
            <input
              id="location-lng"
              type="text"
              className="base-input"
              value={data.longitude}
              onChange={(e) => onChange({ longitude: e.target.value })}
              placeholder="e.g. 80.0442"
            />
          </div>
        </div>
      </div>

      <div className="quick-actions-bar">
        <button
          type="button"
          className="quick-chip-btn"
          onClick={handleUseCurrentLocation}
          title="Detect device GPS coordinates"
        >
          <Navigation size={12} />
          <span>Use My Current Location</span>
        </button>
      </div>

      {showError && <ValidationMessage message={validation.message} />}

      <div className="field-footer-notes">
        <MapPin size={13} className="footer-icon" />
        <span>Scanners open Google Maps or Apple Maps positioned directly at the destination.</span>
      </div>
    </div>
  );
};
