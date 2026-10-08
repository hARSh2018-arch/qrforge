import type { ContrastAnalysis, ErrorCorrectionLevel } from '../types/qr';

export function hexToRgb(hex: string): [number, number, number] {
  let c = hex.trim().replace(/^#/, '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  if (c.length !== 6) {
    return [0, 0, 0];
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function analyzeContrast(fgHex: string, bgHex: string): ContrastAnalysis {
  const [r1, g1, b1] = hexToRgb(fgHex);
  const [r2, g2, b2] = hexToRgb(bgHex);

  const lum1 = getRelativeLuminance(r1, g1, b1);
  const lum2 = getRelativeLuminance(r2, g2, b2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  const roundedRatio = Math.round(ratio * 10) / 10;
  const isDarkOnLight = lum1 < lum2;

  let status: ContrastAnalysis['status'] = 'optimal';
  let message: string | undefined = undefined;

  if (roundedRatio < 3.0) {
    status = 'poor';
    message = '⚠️ Low contrast may affect QR scanning. Recommended minimum ratio is 3:1.';
  } else if (roundedRatio < 4.5) {
    status = 'warning';
    message = '⚠️ Low contrast may affect QR scanning. Standard scanners prefer higher contrast.';
  } else if (roundedRatio < 7.0) {
    status = 'good';
  } else {
    status = 'optimal';
  }

  if (!isDarkOnLight && status !== 'poor' && status !== 'warning') {
    message = 'Inverted colors detected. Modern camera apps support this, but some legacy scanners require dark-on-light.';
  }

  return {
    ratio: roundedRatio,
    status,
    isDarkOnLight,
    message
  };
}

export function getScanReliabilityTips(
  contrast: ContrastAnalysis,
  ecc: ErrorCorrectionLevel,
  hasLogo: boolean,
  margin: number
): { status: 'optimal' | 'good' | 'warning' | 'danger'; warnings: string[] } {
  const warnings: string[] = [];

  if (contrast.status === 'poor' || contrast.status === 'warning') {
    warnings.push('⚠️ Low contrast may affect QR scanning.');
  }

  if (hasLogo && (ecc === 'L' || ecc === 'M')) {
    warnings.push('⚠️ Center logo detected: Quartile (Q) or High (H) error correction recommended for reliable scanning.');
  }

  if (margin === 0) {
    warnings.push('Zero margin (quiet zone) may cause recognition issues on textured backgrounds.');
  }

  let overallStatus: 'optimal' | 'good' | 'warning' | 'danger' = 'optimal';

  if (contrast.status === 'poor') {
    overallStatus = 'danger';
  } else if (warnings.length > 0) {
    overallStatus = 'warning';
  } else if (contrast.status === 'good') {
    overallStatus = 'good';
  }

  return {
    status: overallStatus,
    warnings
  };
}
