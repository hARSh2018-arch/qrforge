import type { QRType } from '../types/qr';

export interface QRTypeMeta {
  type: QRType;
  name: string;
  shortDesc: string;
  iconName: 'Globe' | 'Type' | 'Mail' | 'Phone' | 'Wifi' | 'MessageSquare' | 'User' | 'MapPin' | 'Calendar';
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
    type: 'wifi',
    name: 'Wi-Fi Network',
    shortDesc: 'Direct zero-friction network connect',
    iconName: 'Wifi',
    placeholder: 'Network Name'
  },
  {
    type: 'contact',
    name: 'Contact Card',
    shortDesc: 'vCard address book card with full info',
    iconName: 'User',
    placeholder: 'Contact Name'
  },
  {
    type: 'email',
    name: 'Email Prompt',
    shortDesc: 'Pre-filled email compose prompt',
    iconName: 'Mail',
    placeholder: 'user@example.com'
  },
  {
    type: 'phone',
    name: 'Phone Call',
    shortDesc: 'Instant one-tap direct dialing',
    iconName: 'Phone',
    placeholder: '1234567890'
  },
  {
    type: 'sms',
    name: 'SMS Text',
    shortDesc: 'Pre-filled SMS text message',
    iconName: 'MessageSquare',
    placeholder: '1234567890'
  },
  {
    type: 'location',
    name: 'Map Location',
    shortDesc: 'Coordinates or Google Maps address',
    iconName: 'MapPin',
    placeholder: 'Coordinates or Address'
  },
  {
    type: 'event',
    name: 'Calendar Event',
    shortDesc: 'Add event to Google/Apple Calendar',
    iconName: 'Calendar',
    placeholder: 'Event Title'
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
