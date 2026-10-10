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

export function validateSms(phone: string): ValidationResult {
  if (!phone || !phone.trim()) {
    return { isValid: false, message: 'Please enter a recipient phone number.' };
  }
  const cleanDigits = phone.replace(/[\s\-().]/g, '');
  if (!/^\+?[0-9]{5,16}$/.test(cleanDigits)) {
    return { isValid: false, message: 'Please enter a valid phone number.' };
  }
  return { isValid: true };
}

export function validateContact(
  firstName: string,
  lastName: string,
  phone: string,
  email: string
): ValidationResult {
  if (!firstName.trim() && !lastName.trim() && !phone.trim() && !email.trim()) {
    return { isValid: false, message: 'Please provide at least a name, phone number, or email.' };
  }
  return { isValid: true };
}

export function validateLocation(
  latitude: string,
  longitude: string,
  query: string
): ValidationResult {
  if (!query.trim() && (!latitude.trim() || !longitude.trim())) {
    return { isValid: false, message: 'Please provide coordinates or a location search address.' };
  }
  if (latitude.trim() || longitude.trim()) {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return { isValid: false, message: 'Coordinates must be valid numbers (Latitude -90 to 90, Longitude -180 to 180).' };
    }
  }
  return { isValid: true };
}

export function validateEvent(title: string, startDate: string): ValidationResult {
  if (!title || !title.trim()) {
    return { isValid: false, message: 'Please enter an event title.' };
  }
  if (!startDate) {
    return { isValid: false, message: 'Please select a start date.' };
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
    case 'sms':
      return validateSms(config.data.sms.phoneNumber);
    case 'contact':
      return validateContact(
        config.data.contact.firstName,
        config.data.contact.lastName,
        config.data.contact.phone,
        config.data.contact.email
      );
    case 'location':
      return validateLocation(
        config.data.location.latitude,
        config.data.location.longitude,
        config.data.location.query
      );
    case 'event':
      return validateEvent(config.data.event.title, config.data.event.startDate);
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

    case 'sms': {
      const { countryCode, phoneNumber, message } = config.data.sms;
      const cleanPhone = phoneNumber.replace(/[\s\-()]/g, '');
      if (!cleanPhone) return '';
      const fullNumber = cleanPhone.startsWith('+') ? cleanPhone : `${countryCode}${cleanPhone}`;
      return message ? `SMSTO:${fullNumber}:${message}` : `SMSTO:${fullNumber}`;
    }

    case 'contact': {
      const { firstName, lastName, organization, phone, email, url } = config.data.contact;
      if (!firstName.trim() && !lastName.trim() && !organization.trim() && !phone.trim() && !email.trim()) {
        return '';
      }
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'Contact';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName.trim()};${firstName.trim()};;;`,
        `FN:${fullName}`
      ];
      if (organization.trim()) lines.push(`ORG:${organization.trim()}`);
      if (phone.trim()) lines.push(`TEL;TYPE=CELL:${phone.trim()}`);
      if (email.trim()) lines.push(`EMAIL:${email.trim()}`);
      if (url.trim()) {
        const fullUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
        lines.push(`URL:${fullUrl}`);
      }
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'location': {
      const { latitude, longitude, query } = config.data.location;
      if (latitude.trim() && longitude.trim()) {
        return `geo:${latitude.trim()},${longitude.trim()}`;
      }
      if (query.trim()) {
        return `https://maps.google.com/?q=${encodeURIComponent(query.trim())}`;
      }
      return '';
    }

    case 'event': {
      const { title, location, startDate, startTime, endDate, endTime, description } = config.data.event;
      if (!title.trim() || !startDate) return '';
      const formatDt = (d: string, t: string) => {
        const cleanD = d.replace(/-/g, '');
        const cleanT = (t || '00:00').replace(/:/g, '') + '00';
        return `${cleanD}T${cleanT}`;
      };
      const startDt = formatDt(startDate, startTime);
      const endDt = endDate ? formatDt(endDate, endTime || startTime) : startDt;
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title.trim()}`,
        `DTSTART:${startDt}`,
        `DTEND:${endDt}`
      ];
      if (location.trim()) lines.push(`LOCATION:${location.trim()}`);
      if (description.trim()) lines.push(`DESCRIPTION:${description.trim()}`);
      lines.push('END:VEVENT', 'END:VCALENDAR');
      return lines.join('\n');
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
    case 'sms': {
      const { countryCode, phoneNumber } = config.data.sms;
      return phoneNumber ? `SMS: ${countryCode} ${phoneNumber}` : 'Untitled SMS';
    }
    case 'contact': {
      const { firstName, lastName } = config.data.contact;
      const name = `${firstName} ${lastName}`.trim();
      return name ? `Contact: ${name}` : 'Untitled Contact';
    }
    case 'location': {
      const { query, latitude, longitude } = config.data.location;
      if (query.trim()) return `Location: ${query.trim()}`;
      if (latitude.trim() && longitude.trim()) return `Coords: ${latitude}, ${longitude}`;
      return 'Untitled Location';
    }
    case 'event': {
      const { title } = config.data.event;
      return title.trim() ? `Event: ${title.trim()}` : 'Untitled Event';
    }
    default:
      return 'QR Code';
  }
}
