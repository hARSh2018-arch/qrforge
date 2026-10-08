import React from 'react';
import { Sparkles } from 'lucide-react';
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
    <div className="preset-selector-container">
      <div className="section-label-row">
        <div className="flex-align-center gap-2">
          <Sparkles size={15} className="accent-icon" />
          <span className="section-eyebrow">Design Presets</span>
        </div>
        <span className="field-hint">Instant high-contrast palettes</span>
      </div>

      <div className="preset-grid">
        {PRESETS.map((preset: QRPreset) => {
          const isActive = currentPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              className={`preset-card ${isActive ? 'preset-active' : ''}`}
              onClick={() => onSelectPreset(preset.id)}
              title={`${preset.name} - ${preset.description}`}
            >
              <div
                className="preset-swatch-box"
                style={{ backgroundColor: preset.background }}
              >
                <div
                  className="preset-swatch-inner"
                  style={{ backgroundColor: preset.foreground }}
                />
              </div>

              <div className="preset-info">
                <div className="preset-name-row">
                  <span className="preset-name">{preset.name}</span>
                  {preset.tag && <span className="preset-tag">{preset.tag}</span>}
                </div>
                <span className="preset-desc">{preset.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
