import React from 'react';
import { PRESETS } from '../data/presets';
import type { QRPreset } from '../types/qr';

interface PresetSelectorProps {
  currentPresetId?: string;
  onSelectPreset: (presetId: string) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  currentPresetId,
  onSelectPreset
}) => {
  return (
    <div className="preset-selector-section">
      <div className="section-label-row">
        <label className="section-eyebrow">Design Presets</label>
        <span className="field-hint">High-contrast, scan-tested color palettes</span>
      </div>

      <div className="preset-chips-scroll" role="radiogroup" aria-label="Color Presets">
        {PRESETS.map((preset: QRPreset) => {
          const isActive = currentPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`preset-pill-btn ${isActive ? 'preset-active' : ''}`}
              onClick={() => onSelectPreset(preset.id)}
              title={`${preset.name}: ${preset.description}`}
            >
              <span
                className="preset-swatch-badge"
                style={{ backgroundColor: preset.background }}
              >
                <span
                  className="preset-swatch-dot"
                  style={{ backgroundColor: preset.foreground }}
                />
              </span>
              <span className="preset-pill-name">{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
