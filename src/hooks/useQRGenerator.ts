import { useState, useMemo, useCallback } from 'react';
import type { QRConfig, QRType, QROptions } from '../types/qr';
import { DEFAULT_CONFIG, PRESETS } from '../data/presets';
import { generatePayload, validateConfig } from '../utils/payload';
import { analyzeContrast, getScanReliabilityTips } from '../utils/contrast';

export function useQRGenerator() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);

  const payload = useMemo(() => {
    return generatePayload(config);
  }, [config]);

  const validation = useMemo(() => {
    return validateConfig(config);
  }, [config]);

  const contrast = useMemo(() => {
    return analyzeContrast(config.options.foreground, config.options.background);
  }, [config.options.foreground, config.options.background]);

  const scanTips = useMemo(() => {
    return getScanReliabilityTips(
      contrast,
      config.options.errorCorrection,
      Boolean(config.options.logoUrl),
      config.options.margin
    );
  }, [contrast, config.options.errorCorrection, config.options.logoUrl, config.options.margin]);

  const setType = useCallback((type: QRType) => {
    setConfig((prev) => ({
      ...prev,
      type
    }));
  }, []);

  const updateUrl = useCallback((url: string) => {
    setConfig((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        url: { url }
      }
    }));
  }, []);

  const updateText = useCallback((text: string) => {
    setConfig((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        text: { text }
      }
    }));
  }, []);

  const updateEmail = useCallback((fields: Partial<QRConfig['data']['email']>) => {
    setConfig((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        email: {
          ...prev.data.email,
          ...fields
        }
      }
    }));
  }, []);

  const updatePhone = useCallback((fields: Partial<QRConfig['data']['phone']>) => {
    setConfig((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        phone: {
          ...prev.data.phone,
          ...fields
        }
      }
    }));
  }, []);

  const updateWifi = useCallback((fields: Partial<QRConfig['data']['wifi']>) => {
    setConfig((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        wifi: {
          ...prev.data.wifi,
          ...fields
        }
      }
    }));
  }, []);

  const updateOptions = useCallback((options: Partial<QROptions>) => {
    setConfig((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        ...options
      }
    }));
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setConfig((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        foreground: preset.foreground,
        background: preset.background,
        presetId: preset.id
      }
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  const restoreConfig = useCallback((savedConfig: QRConfig) => {
    setConfig(JSON.parse(JSON.stringify(savedConfig)));
  }, []);

  return {
    config,
    payload,
    validation,
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
  };
}
