import React, { useState, useRef } from 'react';
import {
  Sliders,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Trash2,
  RotateCcw,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import type { QROptions, ErrorCorrectionLevel } from '../types/qr';

interface CustomizationPanelProps {
  options: QROptions;
  onOptionsChange: (newOptions: Partial<QROptions>) => void;
  onReset: () => void;
}

const ERROR_CORRECTION_LEVELS: {
  level: ErrorCorrectionLevel;
  name: string;
  recovery: string;
  desc: string;
}[] = [
  { level: 'L', name: 'Low', recovery: '7%', desc: 'Fastest scan, low recovery. Ideal for clean surfaces without logos.' },
  { level: 'M', name: 'Medium', recovery: '15%', desc: 'Balanced default for general use on print and web screens.' },
  { level: 'Q', name: 'Quartile', recovery: '25%', desc: 'High damage recovery. Recommended for outdoor print or badges.' },
  { level: 'H', name: 'High', recovery: '30%', desc: 'Maximum error correction. Required when embedding center logos.' }
];

const RESTRAINED_SWATCHES = [
  '#000000', '#303631', '#18181b', '#385573', '#243D30',
  '#FFFFFF', '#FBFAF7', '#F6F5F0', '#F2F5F2', '#E6E8E3'
];

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  options,
  onOptionsChange,
  onReset
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, SVG, or JPG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size should be less than 2MB for optimal performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onOptionsChange({
        logoUrl: result,
        logoName: file.name,
        errorCorrection: options.errorCorrection === 'L' || options.errorCorrection === 'M' ? 'H' : options.errorCorrection
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    onOptionsChange({ logoUrl: null, logoName: undefined });
  };

  return (
    <div className="custom-panel-wrapper">
      <button
        type="button"
        className="custom-accordion-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex-align-center gap-2">
          <Sliders size={16} className="panel-toggle-icon" />
          <span className="panel-toggle-title">Custom Styling & Settings</span>
          <span className="panel-toggle-summary">
            {options.size}px • Margin {options.margin} • ECC {options.errorCorrection}
          </span>
        </div>
        <div className="flex-align-center gap-2">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="custom-accordion-body">
          {/* Header row with reset */}
          <div className="custom-header-row">
            <span className="custom-heading-text">Fine-tune appearance and export parameters</span>
            <button
              type="button"
              className="reset-defaults-btn"
              onClick={onReset}
              title="Return to standard high-contrast defaults"
            >
              <RotateCcw size={13} />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Color pickers */}
          <div className="custom-section-block">
            <label className="section-label-small">Colors</label>
            <div className="color-inputs-duo">
              {/* Foreground */}
              <div className="color-field-card">
                <div className="field-header">
                  <span className="color-field-name">Pattern (Foreground)</span>
                  <span className="color-hex-tag">{options.foreground.toUpperCase()}</span>
                </div>
                <div className="color-picker-input-row">
                  <input
                    type="color"
                    className="native-color-circle"
                    value={options.foreground}
                    onChange={(e) => onOptionsChange({ foreground: e.target.value, presetId: undefined })}
                    aria-label="Foreground Pattern Color"
                  />
                  <input
                    type="text"
                    className="base-input hex-code-input"
                    value={options.foreground.toUpperCase()}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!val.startsWith('#')) val = '#' + val;
                      onOptionsChange({ foreground: val, presetId: undefined });
                    }}
                    maxLength={7}
                    spellCheck="false"
                  />
                </div>
                <div className="swatches-quick-row">
                  {RESTRAINED_SWATCHES.slice(0, 5).map((color) => (
                    <button
                      key={`fg-${color}`}
                      type="button"
                      className={`swatch-circle-btn ${options.foreground.toLowerCase() === color.toLowerCase() ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => onOptionsChange({ foreground: color, presetId: undefined })}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Background */}
              <div className="color-field-card">
                <div className="field-header">
                  <span className="color-field-name">Background</span>
                  <span className="color-hex-tag">{options.background.toUpperCase()}</span>
                </div>
                <div className="color-picker-input-row">
                  <input
                    type="color"
                    className="native-color-circle"
                    value={options.background}
                    onChange={(e) => onOptionsChange({ background: e.target.value, presetId: undefined })}
                    aria-label="Background Color"
                  />
                  <input
                    type="text"
                    className="base-input hex-code-input"
                    value={options.background.toUpperCase()}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!val.startsWith('#')) val = '#' + val;
                      onOptionsChange({ background: val, presetId: undefined });
                    }}
                    maxLength={7}
                    spellCheck="false"
                  />
                </div>
                <div className="swatches-quick-row">
                  {RESTRAINED_SWATCHES.slice(5, 10).map((color) => (
                    <button
                      key={`bg-${color}`}
                      type="button"
                      className={`swatch-circle-btn ${options.background.toLowerCase() === color.toLowerCase() ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => onOptionsChange({ background: color, presetId: undefined })}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Size and Margins */}
          <div className="custom-section-block">
            <div className="sliders-duo-grid">
              {/* Size Slider */}
              <div className="slider-control-group">
                <div className="field-header">
                  <label htmlFor="export-size-slider" className="section-label-small">
                    Export Resolution
                  </label>
                  <span className="slider-current-badge">{options.size} × {options.size} px</span>
                </div>
                <input
                  id="export-size-slider"
                  type="range"
                  min={256}
                  max={1024}
                  step={32}
                  value={options.size}
                  onChange={(e) => onOptionsChange({ size: Number(e.target.value) })}
                  className="base-range-slider"
                />
                <div className="range-endpoints">
                  <span>256px (Compact)</span>
                  <span>512px (Standard)</span>
                  <span>1024px (Print HD)</span>
                </div>
              </div>

              {/* Margin Slider */}
              <div className="slider-control-group">
                <div className="field-header">
                  <label htmlFor="margin-slider" className="section-label-small">
                    Quiet Zone Margin
                  </label>
                  <span className="slider-current-badge">{options.margin} blocks</span>
                </div>
                <input
                  id="margin-slider"
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={options.margin}
                  onChange={(e) => onOptionsChange({ margin: Number(e.target.value) })}
                  className="base-range-slider"
                />
                <div className="range-endpoints">
                  <span>0 (None)</span>
                  <span>3 (Recommended)</span>
                  <span>8 (Wide)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Correction Level */}
          <div className="custom-section-block">
            <div className="field-header">
              <label className="section-label-small">Error Correction Level (ECC)</label>
              <span className="field-hint flex-align-center gap-1">
                <HelpCircle size={12} />
                Higher levels improve scan resilience if damaged
              </span>
            </div>

            <div className="ecc-selector-row" role="radiogroup" aria-label="Error Correction Level">
              {ERROR_CORRECTION_LEVELS.map((item) => {
                const isSelected = options.errorCorrection === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`ecc-button-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => onOptionsChange({ errorCorrection: item.level })}
                  >
                    <div className="ecc-button-header">
                      <span className="ecc-level-pill">{item.level}</span>
                      <span className="ecc-name-text">{item.name}</span>
                      <span className="ecc-recovery-text">{item.recovery}</span>
                    </div>
                    <p className="ecc-desc-text">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Logo */}
          <div className="custom-section-block">
            <div className="field-header">
              <label className="section-label-small">Center Logo / Icon</label>
              <span className="field-hint">Embedded in center with padded safe badge</span>
            </div>

            {!options.logoUrl ? (
              <label className="logo-upload-dropzone" htmlFor="logo-file-input">
                <input
                  id="logo-file-input"
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="sr-only"
                />
                <ImageIcon size={20} className="dropzone-icon-muted" />
                <div className="dropzone-text-block">
                  <span className="dropzone-primary-text">Upload Logo or Watermark</span>
                  <span className="dropzone-secondary-text">PNG, SVG, or JPG (max 2MB)</span>
                </div>
              </label>
            ) : (
              <div className="logo-active-preview-card">
                <img src={options.logoUrl} alt="Center Logo" className="logo-thumbnail-preview" />
                <div className="logo-info-col">
                  <span className="logo-filename-text">{options.logoName || 'Uploaded Logo'}</span>
                  <span className="logo-status-text">Centered with error-correction auto-boosted to High</span>
                </div>
                <button
                  type="button"
                  className="logo-remove-btn"
                  onClick={handleRemoveLogo}
                  title="Remove logo"
                  aria-label="Remove logo"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            )}

            {options.logoUrl && options.errorCorrection !== 'H' && options.errorCorrection !== 'Q' && (
              <div className="reliability-warning-banner">
                <AlertTriangle size={14} />
                <span>Logos obscure center QR blocks: High (H) error correction is strongly recommended.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
