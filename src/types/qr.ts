export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface URLFormData {
  url: string;
}

export interface TextFormData {
  text: string;
}

export interface EmailFormData {
  email: string;
  subject: string;
  message: string;
}

export interface PhoneFormData {
  countryCode: string;
  phoneNumber: string;
}

export interface WifiFormData {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface QRFormData {
  url: URLFormData;
  text: TextFormData;
  email: EmailFormData;
  phone: PhoneFormData;
  wifi: WifiFormData;
}

export interface QROptions {
  size: number;
  foreground: string;
  background: string;
  margin: number;
  errorCorrection: ErrorCorrectionLevel;
  presetId?: string;
  logoUrl?: string | null;
  logoName?: string;
}

export interface QRConfig {
  type: QRType;
  data: QRFormData;
  options: QROptions;
}

export interface QRPreset {
  id: string;
  name: string;
  description: string;
  foreground: string;
  background: string;
  tag?: string;
}

export interface QRHistoryItem {
  id: string;
  timestamp: number;
  title: string;
  type: QRType;
  payload: string;
  previewDataUrl?: string;
  config: QRConfig;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ContrastAnalysis {
  ratio: number;
  status: 'optimal' | 'good' | 'warning' | 'poor';
  isDarkOnLight: boolean;
  message?: string;
}
