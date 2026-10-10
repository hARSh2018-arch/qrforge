import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { QRTypeSelector } from './components/QRTypeSelector';
import { InputPanel } from './components/InputPanel';
import { PresetSelector } from './components/PresetSelector';
import { CustomizationPanel } from './components/CustomizationPanel';
import { QRPreview } from './components/QRPreview';
import { HistoryView } from './components/HistoryView';
import { Footer } from './components/Footer';
import { AboutModal } from './components/AboutModal';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { useQRGenerator } from './hooks/useQRGenerator';
import { useQRHistory } from './hooks/useQRHistory';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { QRConfig } from './types/qr';

export const App: React.FC = () => {
  // Theme state: defaults to soft light ivory theme per design vision
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('qrforge_theme', 'light');

  // Active top-level view: 'generate' (default workspace) | 'history' (saved codes)
  const [activeView, setActiveView] = useState<'generate' | 'history'>('generate');

  // Main QR generator engine hook
  const {
    config,
    payload,
    contrast,
    scanTips,
    setType,
    updateUrl,
    updateText,
    updateEmail,
    updatePhone,
    updateWifi,
    updateSms,
    updateContact,
    updateLocation,
    updateEvent,
    updateOptions,
    applyPreset,
    resetConfig,
    restoreConfig
  } = useQRGenerator();

  // Local storage history hook
  const { history, addHistoryItem, deleteHistoryItem, clearHistory } = useQRHistory();

  // About Modal state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Light Ivory' : 'Dark Studio'} mode`, 'info');
  };

  const handleApplyPreset = (presetId: string) => {
    applyPreset(presetId);
    showToast(`Applied preset: ${presetId.replace('-', ' ')}`, 'info');
  };

  const handleReset = () => {
    resetConfig();
    showToast('Reset configuration to default', 'info');
  };

  const handleReuseHistory = (savedConfig: QRConfig) => {
    restoreConfig(savedConfig);
    setActiveView('generate');
    showToast(`Restored ${savedConfig.type.toUpperCase()} configuration`, 'success');
  };

  return (
    <div className={`app-root theme-${theme}`}>
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main App Header */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        historyCount={history.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Workspace */}
      <main className="main-content-layout">
        {activeView === 'generate' ? (
          <div className="generator-view-container">
            {/* Introductory Hero Text */}
            <div className="generator-intro-header">
              <h1 className="generator-page-title">Create your QR code</h1>
              <p className="generator-page-desc">
                Generate scannable, high-contrast QR codes with instant live preview and custom styling.
              </p>
            </div>

            {/* Content-type selector */}
            <div className="content-type-selector-wrapper">
              <QRTypeSelector
                activeType={config.type}
                onSelectType={setType}
              />
            </div>

            {/* Unified 2-Column Generator Workspace */}
            <div className="generator-workspace-grid">
              {/* Left Column: Focused Input Area, Presets & Collapsible Customization */}
              <div className="workspace-editor-col">
                {/* Focused Content Input Area */}
                <InputPanel
                  config={config}
                  onUpdateUrl={updateUrl}
                  onUpdateText={updateText}
                  onUpdateEmail={updateEmail}
                  onUpdatePhone={updatePhone}
                  onUpdateWifi={updateWifi}
                  onUpdateSms={updateSms}
                  onUpdateContact={updateContact}
                  onUpdateLocation={updateLocation}
                  onUpdateEvent={updateEvent}
                />

                {/* Restrained Presets Selection */}
                <PresetSelector
                  currentPresetId={config.options.presetId}
                  onSelectPreset={handleApplyPreset}
                />

                {/* Collapsible Advanced Customization Panel */}
                <CustomizationPanel
                  options={config.options}
                  onOptionsChange={updateOptions}
                  onReset={handleReset}
                />
              </div>

              {/* Right Column: Centered Quiet QR Preview */}
              <div className="workspace-preview-col">
                <div className="preview-sticky-wrapper">
                  <QRPreview
                    config={config}
                    payload={payload}
                    contrast={contrast}
                    scanTips={scanTips}
                    onSaveToHistory={addHistoryItem}
                    onShowToast={showToast}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <HistoryView
            history={history}
            onReuse={handleReuseHistory}
            onDelete={deleteHistoryItem}
            onClear={() => {
              clearHistory();
              showToast('Cleared QR code history', 'info');
            }}
            onShowToast={showToast}
            onNavigateToGenerate={() => setActiveView('generate')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
