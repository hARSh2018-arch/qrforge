import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InputPanel } from './components/InputPanel';
import { PresetSelector } from './components/PresetSelector';
import { CustomizationPanel } from './components/CustomizationPanel';
import { QRPreview } from './components/QRPreview';
import { Footer } from './components/Footer';
import { AboutModal } from './components/AboutModal';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { useQRGenerator } from './hooks/useQRGenerator';
import { useQRHistory } from './hooks/useQRHistory';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { QRConfig } from './types/qr';

export const App: React.FC = () => {
  // Theme state: defaults to dark futuristic mode, persisted in localStorage
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('qrforge_theme', 'dark');

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

  // Mobile active tab ('editor' | 'preview')
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const presetSectionRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((text: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Futuristic' : 'Light Clean'} mode`, 'info');
  };

  const handleApplyPreset = (presetId: string) => {
    applyPreset(presetId);
    showToast(`Applied preset: ${presetId.charAt(0).toUpperCase() + presetId.slice(1)}`, 'info');
  };

  const handleReset = () => {
    resetConfig();
    showToast('Reset configuration to default', 'info');
  };

  const handleReuseHistory = (savedConfig: QRConfig) => {
    restoreConfig(savedConfig);
    showToast(`Restored ${savedConfig.type.toUpperCase()} configuration`, 'success');
  };

  const handleScrollToPresets = () => {
    presetSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`app-root theme-${theme}`}>
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main App Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAbout={() => setIsAboutOpen(true)}
        onScrollToPresets={handleScrollToPresets}
        historyCount={history.length}
      />

      {/* Mobile Tab Switcher */}
      <div className="mobile-tab-bar">
        <button
          type="button"
          className={`mobile-tab-btn ${mobileTab === 'editor' ? 'active' : ''}`}
          onClick={() => setMobileTab('editor')}
        >
          Editor & Customize
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${mobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          Live Preview & Export
        </button>
      </div>

      {/* Main 3-Column Dashboard Container */}
      <main className="dashboard-layout">
        {/* LEFT COLUMN: Branding, Type Selector & Recent QR History */}
        <div className={`col-left ${mobileTab === 'preview' ? 'mobile-hidden' : ''}`}>
          <Sidebar
            activeType={config.type}
            onSelectType={setType}
            history={history}
            onReuseHistory={handleReuseHistory}
            onDeleteHistory={deleteHistoryItem}
            onClearHistory={() => {
              clearHistory();
              showToast('Cleared QR code history', 'info');
            }}
          />
        </div>

        {/* CENTER COLUMN: Content Inputs, Presets & Customization */}
        <div className={`col-center ${mobileTab === 'preview' ? 'mobile-hidden' : ''}`}>
          {/* Dynamic Payload Form */}
          <InputPanel
            config={config}
            onUpdateUrl={updateUrl}
            onUpdateText={updateText}
            onUpdateEmail={updateEmail}
            onUpdatePhone={updatePhone}
            onUpdateWifi={updateWifi}
          />

          {/* Design Presets */}
          <div ref={presetSectionRef}>
            <PresetSelector
              currentPresetId={config.options.presetId}
              onSelectPreset={handleApplyPreset}
            />
          </div>

          {/* Detailed Customization Panel */}
          <CustomizationPanel
            options={config.options}
            onOptionsChange={updateOptions}
            onReset={handleReset}
          />
        </div>

        {/* RIGHT COLUMN: Live QR Preview, Scan Reliability & Export Controls */}
        <div className={`col-right ${mobileTab === 'editor' ? 'mobile-hidden-on-small' : ''}`}>
          <QRPreview
            config={config}
            payload={payload}
            contrast={contrast}
            scanTips={scanTips}
            onSaveToHistory={addHistoryItem}
            onShowToast={showToast}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* About & Technical Specifications Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
