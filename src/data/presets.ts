import type { QRPreset } from '../types/qr';

export const PRESETS: QRPreset[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Black QR on pure white',
    foreground: '#000000',
    background: '#ffffff',
    tag: 'Universal'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Clean bright QR on deep slate',
    foreground: '#f8fafc',
    background: '#0f172a',
    tag: 'Dark'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Vibrant cobalt on crisp icy white',
    foreground: '#0284c7',
    background: '#f0f9ff',
    tag: 'Modern'
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Electric cyan accent on void black',
    foreground: '#06b6d4',
    background: '#090d16',
    tag: 'Cyber'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Matrix green on dark obsidian',
    foreground: '#10b981',
    background: '#041710',
    tag: 'Vibrant'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Crimson rose on soft pastel peach',
    foreground: '#e11d48',
    background: '#fff1f2',
    tag: 'Warm'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Refined deep zinc on off-white',
    foreground: '#18181b',
    background: '#fafafa',
    tag: 'Subtle'
  },
  {
    id: 'soft-blue',
    name: 'Soft Blue',
    description: 'Muted slate blue on warm ivory',
    foreground: '#385573',
    background: '#F6F5F0',
    tag: 'Restrained'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Deep pine on gentle sage white',
    foreground: '#243D30',
    background: '#F2F5F2',
    tag: 'Earthy'
  },
  {
    id: 'charcoal',
    name: 'Warm Charcoal',
    description: 'Dark charcoal pattern on warm white',
    foreground: '#303631',
    background: '#FBFAF7',
    tag: 'Premium'
  }
];

export const DEFAULT_CONFIG = {
  type: 'url' as const,
  data: {
    url: { url: 'https://example.com' },
    text: { text: 'Welcome to QRForge! Generate, customize, and share high-quality QR codes in seconds.' },
    email: {
      email: 'recruitment@gdgsrm.org',
      subject: 'GDG SRM 2026 Recruitment Submission',
      message: 'Hello GDG SRM Team, here is my completed submission for the Technical Recruitment challenge.'
    },
    phone: {
      countryCode: '+91',
      phoneNumber: '9876543210'
    },
    wifi: {
      ssid: 'GDG_SRM_WIFI',
      password: 'frontend_mastery_2026',
      encryption: 'WPA' as const,
      hidden: false
    },
    sms: {
      countryCode: '+91',
      phoneNumber: '9876543210',
      message: 'Hello from QRForge!'
    },
    contact: {
      firstName: 'Alex',
      lastName: 'Morgan',
      organization: 'GDG SRM',
      phone: '+919876543210',
      email: 'alex@example.com',
      url: 'https://example.com'
    },
    location: {
      latitude: '12.8231',
      longitude: '80.0442',
      query: 'SRM Institute of Science and Technology'
    },
    event: {
      title: 'GDG Tech Meetup 2026',
      location: 'SRM University Tech Park',
      startDate: '2026-11-15',
      startTime: '10:00',
      endDate: '2026-11-15',
      endTime: '13:00',
      description: 'Hands-on frontend development workshop and networking.'
    }
  },
  options: {
    size: 400,
    foreground: '#000000',
    background: '#ffffff',
    margin: 3,
    errorCorrection: 'M' as const,
    presetId: 'classic',
    logoUrl: null,
    logoName: undefined
  }
};
