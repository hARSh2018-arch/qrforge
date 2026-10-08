import type { QRConfig, ValidationResult } from '../types/qr';

export function escapeWifiString(str: string): string {
  // Wi-Fi QR spec escapes \, ;, ,, :, and "
  return str.replace(/([\\;,":])/g, '\\$1');
}

export function validateUrl(rawUrl: string): ValidationResult {
  if (!rawUrl || !rawUrl.trim()) {
    return { isValid: false, message: 'Please enter a website URL.' };
  }
  const trimmed = rawUrl.trim();
  try {
    const urlToCheck = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(urlToCheck);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return { isValid: false, message: 'Please enter a valid URL (e.g., https://example.com).' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL format.' };
  }
}

export function validateText(text: string): ValidationResult {
  if (!text || !text.trim()) {
    return { isValid: false, message: 'Please enter some text.' };
  }
  if (text.length > 2048) {
    return { isValid: false, message: 'Text exceeds maximum recommended length (2048 characters).' };
  }
  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, message: 'Please enter an email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, message: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone || !phone.trim()) {
    return { isValid: false, message: 'Please enter a phone number.' };
  }
  const cleanDigits = phone.replace(/[\s\-().]/g, '');
  if (!/^\+?[0-9]{5,16}$/.test(cleanDigits)) {
    return { isValid: false, message: 'Please enter a valid phone number (digits only).' };
  }
  return { isValid: true };
}

export function validateWifi(ssid: string): ValidationResult {
  if (!ssid || !ssid.trim()) {
    return { isValid: false, message: 'Please enter the network name.' };
  }
  return { isValid: true };
}

export function validateConfig(config: QRConfig): ValidationResult {
  switch (config.type) {
    case 'url':
      return validateUrl(config.data.url.url);
    case 'text':
      return validateText(config.data.text.text);
    case 'email':
      return validateEmail(config.data.email.email);
    case 'phone':
      return validatePhone(config.data.phone.phoneNumber);
    case 'wifi':
      return validateWifi(config.data.wifi.ssid);
    default:
      return { isValid: true };
  }
}

export function generatePayload(config: QRConfig): string {
  switch (config.type) {
    case 'url': {
      const url = config.data.url.url.trim();
      if (!url) return '';
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
      }
      return url;
    }

    case 'text': {
      return config.data.text.text || '';
    }

    case 'email': {
      const email = config.data.email.email.trim();
      if (!email) return '';
      const params: string[] = [];
      if (config.data.email.subject.trim()) {
        params.push(`subject=${encodeURIComponent(config.data.email.subject.trim())}`);
      }
      if (config.data.email.message.trim()) {
        params.push(`body=${encodeURIComponent(config.data.email.message.trim())}`);
      }
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${email}${query}`;
    }

    case 'phone': {
      const { countryCode, phoneNumber } = config.data.phone;
      const cleanPhone = phoneNumber.replace(/[\s\-()]/g, '');
      if (!cleanPhone) return '';
      const fullNumber = cleanPhone.startsWith('+') ? cleanPhone : `${countryCode}${cleanPhone}`;
      return `tel:${fullNumber}`;
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = config.data.wifi;
      if (!ssid.trim()) return '';
      const enc = encryption === 'nopass' ? 'nopass' : encryption;
      const passPart = encryption !== 'nopass' ? `P:${escapeWifiString(password)};` : '';
      const hiddenPart = hidden ? 'H:true;' : 'H:false;';
      return `WIFI:S:${escapeWifiString(ssid.trim())};T:${enc};${passPart}${hiddenPart};`;
    }

    default:
      return '';
  }
}

export function getPayloadTitle(config: QRConfig): string {
  switch (config.type) {
    case 'url': {
      const url = config.data.url.url.trim();
      return url ? url.replace(/^https?:\/\//i, '') : 'Untitled URL';
    }
    case 'text': {
      const txt = config.data.text.text.trim();
      return txt ? (txt.length > 30 ? `${txt.slice(0, 30)}...` : txt) : 'Empty Text';
    }
    case 'email': {
      const email = config.data.email.email.trim();
      return email ? `Email: ${email}` : 'Untitled Email';
    }
    case 'phone': {
      const { countryCode, phoneNumber } = config.data.phone;
      return phoneNumber ? `${countryCode} ${phoneNumber}` : 'Untitled Phone';
    }
    case 'wifi': {
      const ssid = config.data.wifi.ssid.trim();
      return ssid ? `Wi-Fi: ${ssid}` : 'Untitled Wi-Fi';
    }
  }
}
