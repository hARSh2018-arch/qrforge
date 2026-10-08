import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import type { QRConfig } from '../types/qr';
import { generatePayload } from './payload';

export function fireCelebration(): void {
  try {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#3b82f6', '#10b981', '#ec4899', '#f59e0b'],
      disableForReducedMotion: true
    });
  } catch {
    // Ignore if not supported
  }
}

export async function renderQRToCanvas(
  config: QRConfig,
  targetSize?: number
): Promise<HTMLCanvasElement> {
  const payload = generatePayload(config);
  const size = targetSize || config.options.size;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  await QRCode.toCanvas(canvas, payload || ' ', {
    width: size,
    margin: config.options.margin,
    errorCorrectionLevel: config.options.errorCorrection,
    color: {
      dark: config.options.foreground,
      light: config.options.background
    }
  });

  if (config.options.logoUrl) {
    try {
      const logoImg = await loadImage(config.options.logoUrl);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const logoSize = Math.floor(size * 0.22);
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;
        const padding = Math.max(4, Math.floor(logoSize * 0.12));
        const bgSize = logoSize + padding * 2;
        const bgX = (size - bgSize) / 2;
        const bgY = (size - bgSize) / 2;
        const radius = Math.floor(bgSize * 0.2);

        ctx.save();
        ctx.fillStyle = config.options.background;
        drawRoundedRect(ctx, bgX, bgY, bgSize, bgSize, radius);
        ctx.fill();

        ctx.strokeStyle = config.options.foreground;
        ctx.lineWidth = Math.max(1.5, Math.floor(size * 0.005));
        ctx.stroke();

        ctx.beginPath();
        drawRoundedRect(ctx, logoX, logoY, logoSize, logoSize, Math.floor(logoSize * 0.15));
        ctx.clip();
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        ctx.restore();
      }
    } catch (e) {
      console.warn('Failed to draw logo on QR code canvas:', e);
    }
  }

  return canvas;
}

export async function downloadQRPNG(config: QRConfig): Promise<string> {
  const canvas = await renderQRToCanvas(config, config.options.size);
  const timestamp = Math.floor(Date.now() / 1000);
  const fileName = `QRForge-${config.type}-${timestamp}.png`;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas to Blob conversion failed'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      fireCelebration();
      resolve(fileName);
    }, 'image/png');
  });
}

export async function downloadQRSVG(config: QRConfig): Promise<string> {
  const payload = generatePayload(config);
  const timestamp = Math.floor(Date.now() / 1000);
  const fileName = `QRForge-${config.type}-${timestamp}.svg`;

  const svgString = await QRCode.toString(payload || ' ', {
    type: 'svg',
    width: config.options.size,
    margin: config.options.margin,
    errorCorrectionLevel: config.options.errorCorrection,
    color: {
      dark: config.options.foreground,
      light: config.options.background
    }
  });

  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  fireCelebration();
  return fileName;
}

export async function copyQRImageToClipboard(config: QRConfig): Promise<boolean> {
  try {
    const canvas = await renderQRToCanvas(config, Math.min(config.options.size, 800));
    
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }

        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            fireCelebration();
            resolve(true);
            return;
          }
        } catch {
          // Fallback below
        }

        try {
          const payload = generatePayload(config);
          await navigator.clipboard.writeText(payload);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch (err) {
    console.error('Error copying QR to clipboard:', err);
    return false;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
