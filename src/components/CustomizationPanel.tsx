import React, { useRef } from 'react';
import { Sliders, Palette, Image as ImageIcon, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
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
  { level: 'L', name: 'Low', recovery: '~7%', desc: 'Lightest QR code density. Best for clean, high-contrast surfaces without logos.' },
  { level: 'M', name: 'Medium', recovery: '~15%', desc: 'Standard default balance between scanning speed and damage tolerance.' },
  { level: 'Q', name: 'Quartile', recovery: '~25%', desc: 'High resilience. Good for printed badges, outdoor posters, or subtle logos.' },
  { level: 'H', name: 'High', recovery: '~30%', desc: 'Maximum error recovery. Recommended when embedding center logos.' }
];

const POPULAR_COLORS = [
  '#000000', '#ffffff', '#0f172a', '#1e293b',
  '#0284c7', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#8b5cf6', '#ec4899', '#f0f9ff'
];

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  options,
  onOptionsChange,
  onReset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, SVG, or JPG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size should be less than 2MB.');
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
    <div className="customization-panel-container">
      <div className="panel-header-row">
        <div className="flex-align-center gap-2">
          <Sliders size={16} className="accent-icon" />
          <h3 className="panel-title">QR Customization</h3>
        </div>
        <button
          type="button"
          className="reset-btn"
          onClick={onReset}
          title="Reset all settings to default"
        >
          <RotateCcw size={13} />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Colors Section */}
      <div className="custom-section">
        <div className="section-label-row">
          <div className="flex-align-center gap-1.5">
            <Palette size={14} className="accent-icon-muted" />
            <span className="section-subtitle">Color Palette</span>
          </div>
        </div>

        <div className="color-pickers-grid">
          {/* Foreground Color */}
          <div className="color-picker-card">
            <label htmlFor="fg-color" className="color-label">Foreground (Pattern)</label>
            <div className="color-input-combo">
              <input
                id="fg-color"
                type="color"
                className="native-color-picker"
                value={options.foreground}
                onChange={(e) => onOptionsChange({ foreground: e.target.value, presetId: undefined })}
              />
              <input
                type="text"
                className="hex-input"
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
            <div className="swatch-row">
              {POPULAR_COLORS.slice(0, 6).map((c) => (
                <button
                  key={`fg-${c}`}
                  type="button"
                  className={`mini-swatch ${options.foreground.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => onOptionsChange({ foreground: c, presetId: undefined })}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div className="color-picker-card">
            <label htmlFor="bg-color" className="color-label">Background</label>
            <div className="color-input-combo">
              <input
                id="bg-color"
                type="color"
                className="native-color-picker"
                value={options.background}
                onChange={(e) => onOptionsChange({ background: e.target.value, presetId: undefined })}
              />
              <input
                type="text"
                className="hex-input"
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
            <div className="swatch-row">
              {POPULAR_COLORS.slice(6, 12).map((c) => (
                <button
                  key={`bg-${c}`}
                  type="button"
                  className={`mini-swatch ${options.background.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => onOptionsChange({ background: c, presetId: undefined })}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size and Margin Sliders */}
      <div className="custom-section">
        <div className="slider-controls-grid">
          {/* Size */}
          <div className="slider-card">
            <div className="slider-header">
              <label htmlFor="qr-size-slider" className="color-label">Export Canvas Size</label>
              <span className="slider-val-badge">{options.size} × {options.size} px</span>
            </div>
            <input
              id="qr-size-slider"
              type="range"
              min={256}
              max={1024}
              step={32}
              value={options.size}
              onChange={(e) => onOptionsChange({ size: Number(e.target.value) })}
              className="range-slider"
            />
            <div className="slider-range-labels">
              <span>256px</span>
              <span>512px</span>
              <span>1024px</span>
            </div>
          </div>

          {/* Margin */}
          <div className="slider-card">
            <div className="slider-header">
              <label htmlFor="qr-margin-slider" className="color-label">Quiet Zone Margin</label>
              <span className="slider-val-badge">{options.margin} blocks</span>
            </div>
            <input
              id="qr-margin-slider"
              type="range"
              min={0}
              max={8}
              step={1}
              value={options.margin}
              onChange={(e) => onOptionsChange({ margin: Number(e.target.value) })}
              className="range-slider"
            />
            <div className="slider-range-labels">
              <span>0 (None)</span>
              <span>4 (Standard)</span>
              <span>8 (Wide)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Correction Selection */}
      <div className="custom-section">
        <div className="section-label-row">
          <span className="section-subtitle">Error Correction Level (ECC)</span>
        </div>

        <div className="ecc-grid" role="radiogroup" aria-label="Error Correction Level">
          {ERROR_CORRECTION_LEVELS.map((item) => {
            const isSelected = options.errorCorrection === item.level;
            return (
              <button
                key={item.level}
                type="button"
                className={`ecc-card ${isSelected ? 'ecc-active' : ''}`}
                onClick={() => onOptionsChange({ errorCorrection: item.level })}
                role="radio"
                aria-checked={isSelected}
              >
                <div className="ecc-header-row">
                  <span className="ecc-badge">{item.level}</span>
                  <span className="ecc-name">{item.name}</span>
                  <span className="ecc-recovery">{item.recovery}</span>
                </div>
                <p className="ecc-desc">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Logo Center Upload */}
      <div className="custom-section">
        <div className="section-label-row">
          <div className="flex-align-center gap-1.5">
            <ImageIcon size={14} className="accent-icon-muted" />
            <span className="section-subtitle">Center Logo (Optional)</span>
          </div>
          {options.logoUrl && (
            <button
              type="button"
              className="remove-logo-btn"
              onClick={handleRemoveLogo}
              title="Remove logo"
            >
              <Trash2 size={13} />
              <span>Remove</span>
            </button>
          )}
        </div>

        {!options.logoUrl ? (
          <label className="logo-dropzone" htmlFor="logo-file-input">
            <input
              id="logo-file-input"
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
              className="sr-only"
            />
            <ImageIcon size={24} className="dropzone-icon" />
            <div className="dropzone-text">
              <span className="dropzone-title">Upload Center Logo / Watermark</span>
              <span className="dropzone-sub">PNG, SVG or JPG (max 2MB)</span>
            </div>
          </label>
        ) : (
          <div className="logo-preview-card">
            <img src={options.logoUrl} alt="Center Logo" className="logo-thumb-preview" />
            <div className="logo-details">
              <span className="logo-filename">{options.logoName || 'custom-logo.png'}</span>
              <span className="logo-status">Embedded with auto-padded background badge</span>
            </div>
            {options.errorCorrection !== 'H' && options.errorCorrection !== 'Q' && (
              <div className="logo-warning-note">
                <AlertTriangle size={13} />
                <span>Recommendation: High (H) error correction active for maximum reliability.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
