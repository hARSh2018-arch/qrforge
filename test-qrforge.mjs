import {
  validateUrl,
  validateText,
  validateEmail,
  validatePhone,
  validateWifi,
  validateSms,
  validateContact,
  validateLocation,
  validateEvent,
  generatePayload,
  getPayloadTitle,
  escapeWifiString
} from './src/utils/payload.ts';

import {
  hexToRgb,
  getRelativeLuminance,
  analyzeContrast,
  getScanReliabilityTips
} from './src/utils/contrast.ts';

import { PRESETS, DEFAULT_CONFIG } from './src/data/presets.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n--- 1. Testing URL Validation & Generation ---');
assert(validateUrl('https://srmist.edu.in').isValid === true, 'Valid HTTPS URL');
assert(validateUrl('http://example.com/test?a=1').isValid === true, 'Valid HTTP URL with params');
assert(validateUrl('github.com').isValid === true, 'Valid domain without protocol');
assert(validateUrl('invalid url with spaces').isValid === false, 'Invalid URL format rejected');
assert(validateUrl('').isValid === false, 'Empty URL rejected');

console.log('\n--- 2. Testing Text Validation & Generation ---');
assert(validateText('Hello GDG SRM!').isValid === true, 'Valid text message');
assert(validateText('').isValid === false, 'Empty text rejected');
assert(validateText('a'.repeat(2049)).isValid === false, 'Exceeding 2048 chars rejected');

console.log('\n--- 3. Testing Email Validation & Generation ---');
assert(validateEmail('test@example.com').isValid === true, 'Valid email');
assert(validateEmail('invalid-email').isValid === false, 'Invalid email rejected');
assert(validateEmail('').isValid === false, 'Empty email rejected');

const emailConfig = {
  ...DEFAULT_CONFIG,
  type: 'email',
  data: {
    ...DEFAULT_CONFIG.data,
    email: { email: 'test@example.com', subject: 'Hello World', message: 'Test message body' }
  }
};
const emailPayload = generatePayload(emailConfig);
assert(
  emailPayload.startsWith('mailto:test@example.com?subject=Hello%20World&body=Test%20message%20body'),
  'Mailto payload properly RFC URI encoded'
);

console.log('\n--- 4. Testing Phone Validation & Generation ---');
assert(validatePhone('9876543210').isValid === true, 'Valid standard phone');
assert(validatePhone('+919876543210').isValid === true, 'Valid international phone');
assert(validatePhone('abcde').isValid === false, 'Letters in phone rejected');
assert(validatePhone('').isValid === false, 'Empty phone rejected');

const phoneConfig = {
  ...DEFAULT_CONFIG,
  type: 'phone',
  data: {
    ...DEFAULT_CONFIG.data,
    phone: { countryCode: '+91', phoneNumber: '9876543210' }
  }
};
assert(generatePayload(phoneConfig) === 'tel:+919876543210', 'Phone tel: payload generated properly');

console.log('\n--- 5. Testing Wi-Fi Validation & Generation ---');
assert(validateWifi('Campus_WIFI').isValid === true, 'Valid SSID');
assert(validateWifi('').isValid === false, 'Empty SSID rejected');
assert(escapeWifiString('My;Secret,Network"Key\\') === 'My\\;Secret\\,Network\\"Key\\\\', 'Wi-Fi escaping characters properly');

const wifiConfig = {
  ...DEFAULT_CONFIG,
  type: 'wifi',
  data: {
    ...DEFAULT_CONFIG.data,
    wifi: { ssid: 'SRM_WiFi', password: 'secret;password', encryption: 'WPA', hidden: false }
  }
};
const wifiPayload = generatePayload(wifiConfig);
assert(
  wifiPayload === 'WIFI:S:SRM_WiFi;T:WPA;P:secret\\;password;H:false;;',
  'Wi-Fi payload standard MEBKM format generated'
);

console.log('\n--- 6. Testing SMS, Contact, Location & Event Payloads ---');
assert(validateSms('9876543210').isValid === true, 'Valid SMS phone number');
assert(validateSms('').isValid === false, 'Empty SMS phone rejected');
const smsConfig = {
  ...DEFAULT_CONFIG,
  type: 'sms',
  data: {
    ...DEFAULT_CONFIG.data,
    sms: { countryCode: '+1', phoneNumber: '5551234567', message: 'Hello There' }
  }
};
assert(generatePayload(smsConfig) === 'SMSTO:+15551234567:Hello There', 'SMS payload standard SMSTO format generated');

assert(validateContact('John', 'Doe', '123456', 'john@example.com').isValid === true, 'Valid contact');
assert(validateContact('', '', '', '').isValid === false, 'Empty contact rejected');
const contactConfig = {
  ...DEFAULT_CONFIG,
  type: 'contact',
  data: {
    ...DEFAULT_CONFIG.data,
    contact: { firstName: 'John', lastName: 'Doe', organization: 'Acme', phone: '+1234', email: 'j@example.com', url: 'https://j.com' }
  }
};
const contactPayload = generatePayload(contactConfig);
assert(contactPayload.includes('BEGIN:VCARD') && contactPayload.includes('FN:John Doe'), 'Contact vCard standard generated');

assert(validateLocation('37.7749', '-122.4194', '').isValid === true, 'Valid coordinates');
assert(validateLocation('', '', 'Times Square').isValid === true, 'Valid query location');
assert(validateLocation('', '', '').isValid === false, 'Empty location rejected');

assert(validateEvent('Conference', '2026-10-15').isValid === true, 'Valid event');
assert(validateEvent('', '').isValid === false, 'Empty event rejected');
const eventConfig = {
  ...DEFAULT_CONFIG,
  type: 'event',
  data: {
    ...DEFAULT_CONFIG.data,
    event: { title: 'Conference', location: 'Hall 1', startDate: '2026-10-15', startTime: '10:00', endDate: '2026-10-15', endTime: '12:00', description: 'Annual meet' }
  }
};
const eventPayload = generatePayload(eventConfig);
assert(eventPayload.includes('BEGIN:VCALENDAR') && eventPayload.includes('SUMMARY:Conference'), 'Event iCalendar standard generated');

assert(getPayloadTitle(emailConfig) === 'Email: test@example.com', 'getPayloadTitle formatted properly');

console.log('\n--- 7. Testing Contrast & WCAG Scan Reliability ---');
const rgb = hexToRgb('#ffffff');
assert(rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255, 'hexToRgb parsed correctly');
const lum = getRelativeLuminance(255, 255, 255);
assert(lum === 1.0, 'White relative luminance is 1.0');

const highContrast = analyzeContrast('#000000', '#ffffff');
assert(highContrast.ratio >= 20, `Black on white contrast ratio is ~21:1 (actual: ${highContrast.ratio})`);
assert(highContrast.status === 'optimal', 'Black on white status is optimal');

const lowContrast = analyzeContrast('#777777', '#888888');
assert(lowContrast.status === 'poor', 'Low contrast gray on gray flagged as poor');
assert(lowContrast.ratio < 3.0, 'Low contrast ratio below 3:1');

const scanTips = getScanReliabilityTips(lowContrast, 'M', false, 3);
assert(scanTips.warnings.length > 0, 'Scan tips produces warning for low contrast');
assert(scanTips.warnings.some(w => w.includes('Low contrast may affect QR scanning')), 'Specific warning text present');

const logoScanTips = getScanReliabilityTips(highContrast, 'L', true, 3);
assert(logoScanTips.warnings.some(w => w.includes('Center logo detected')), 'Center logo warning with low ECC');

console.log('\n--- 8. Testing Presets ---');
assert(PRESETS.length >= 5, `Defined at least 5 presets (actual: ${PRESETS.length})`);
assert(PRESETS.some(p => p.id === 'classic'), 'Classic preset exists');
assert(PRESETS.some(p => p.id === 'midnight'), 'Midnight preset exists');
assert(PRESETS.some(p => p.id === 'ocean'), 'Ocean preset exists');
assert(PRESETS.some(p => p.id === 'neon'), 'Neon preset exists');
assert(PRESETS.some(p => p.id === 'minimal'), 'Minimal preset exists');
assert(PRESETS.some(p => p.id === 'soft-blue'), 'Soft Blue preset exists');
assert(PRESETS.some(p => p.id === 'forest'), 'Forest preset exists');

console.log(`\n========================================`);
console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
