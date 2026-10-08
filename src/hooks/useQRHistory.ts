import { useState, useEffect, useCallback } from 'react';
import type { QRConfig, QRHistoryItem } from '../types/qr';
import { generatePayload, getPayloadTitle } from '../utils/payload';

const STORAGE_KEY = 'qrforge_recent_history_v1';
const MAX_HISTORY_ITEMS = 12;

export function useQRHistory() {
  const [history, setHistory] = useState<QRHistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse QR history from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save QR history to localStorage:', e);
    }
  }, [history]);

  const addHistoryItem = useCallback((config: QRConfig, previewDataUrl?: string) => {
    const payload = generatePayload(config);
    if (!payload.trim()) return;

    const title = getPayloadTitle(config);
    const newItem: QRHistoryItem = {
      id: `qr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now(),
      title,
      type: config.type,
      payload,
      previewDataUrl,
      config: JSON.parse(JSON.stringify(config))
    };

    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => !(item.type === newItem.type && item.payload === newItem.payload)
      );
      return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear QR history from localStorage:', e);
    }
  }, []);

  return {
    history,
    addHistoryItem,
    deleteHistoryItem,
    clearHistory
  };
}
