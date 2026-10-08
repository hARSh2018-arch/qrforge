import type { QRType } from '../types/qr';

export interface QRTypeMeta {
  type: QRType;
  name: string;
  shortDesc: string;
  iconName: 'Globe' | 'Type' | 'Mail' | 'Phone' | 'Wifi';
  placeholder: string;
}

export const QR_TYPES: QRTypeMeta[] = [
  {
    type: 'url',
    name: 'Website URL',
    shortDesc: 'Link to any website or web page',
    iconName: 'Globe',
    placeholder: 'https://example.com'
  },
  {
    type: 'text',
    name: 'Plain Text',
    shortDesc: 'Display messages, notes, or raw text',
    iconName: 'Type',
    placeholder: 'Enter your message...'
  },
  {
    type: 'email',
    name: 'Email',
    shortDesc: 'Pre-filled email compose prompt',
    iconName: 'Mail',
    placeholder: 'user@example.com'
  },
  {
    type: 'phone',
    name: 'Phone Number',
    shortDesc: 'Instant one-tap call initiation',
    iconName: 'Phone',
    placeholder: '1234567890'
  },
  {
    type: 'wifi',
    name: 'Wi-Fi Network',
    shortDesc: 'Direct zero-friction network connect',
    iconName: 'Wifi',
    placeholder: 'Network Name'
  }
];

export const COUNTRY_CODES = [
  { code: '+1', name: 'US / Canada (+1)' },
  { code: '+91', name: 'India (+91)' },
  { code: '+44', name: 'United Kingdom (+44)' },
  { code: '+61', name: 'Australia (+61)' },
  { code: '+49', name: 'Germany (+49)' },
  { code: '+33', name: 'France (+33)' },
  { code: '+81', name: 'Japan (+81)' },
  { code: '+86', name: 'China (+86)' },
  { code: '+65', name: 'Singapore (+65)' },
  { code: '+971', name: 'UAE (+971)' }
];
