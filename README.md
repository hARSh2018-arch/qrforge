# QRForge ⚡

> **Generate. Customize. Share.**  
> *Production-Quality QR Code Generator & Designer*  
> Built for the **GDG on Campus SRM Technical Recruitment 2026–27 – Frontend Domain**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deploy--Ready-black.svg?logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📖 Overview

**QRForge** is an engineered developer-tool web application built from the ground up for the GDG on Campus SRM Technical Recruitment 2026–27 (Frontend Domain). 

Rather than a static prototype, QRForge is a **complete, offline-first, client-side QR generation powerhouse**. It delivers immediate zero-latency live previews, strict schema validation across 5 QR payload formats, a WCAG 2.1 relative luminance contrast analysis engine with scan-reliability warnings, customizable palettes and presets, center logo watermarking, high-resolution PNG & SVG exports, clipboard copying, and resilient browser LocalStorage history with full snapshot restoration.

---

## ✨ Features

- **⚡ Zero-Latency Live Preview:** Updates instantly as you type or adjust sliders — no manual "Generate" button required.
- **🎯 5 Essential QR Payload Encoders:**
  - **Website URL:** Real-time URL format validation, protocol detection (`https://`, `http://`), and quick action chips.
  - **Plain Text:** Live character counter with safe limit enforcement (2048 chars) and density warnings.
  - **Email:** Standard RFC-compliant `mailto:` payload encoder with subject, body, and email address validation.
  - **Phone Number:** Standard `tel:` dialer payload with country calling code picker (+91, +1, +44, etc.) and digit validation.
  - **Wi-Fi Network:** Standard MEBKM `WIFI:` string formatting with SSID validation, WPA/WEP/Open encryption selection, password visibility toggle, and hidden network support.
- **🎨 Deep Design Customization:**
  - **Resolution Slider:** 256px → 1024px dynamic canvas scaling.
  - **Color Picker Engine:** Custom Hex inputs, native color pickers, and instant quick-palette swatches.
  - **Quiet Zone Margin:** 0 to 8 blocks customizable quiet zone padding.
  - **Error Correction Level (ECC):** Selectable `L` (~7%), `M` (~15%), `Q` (~25%), and `H` (~30%) with clear descriptions.
  - **Center Logo / Watermark Upload:** Secure image file picker with auto-padded protective badge, border stroke, and automatic ECC warning.
- **💎 Predefined High-Contrast Presets:**
  - **Classic:** Monochromatic black on pure white.
  - **Midnight:** Bright slate on deep cybernetic obsidian.
  - **Ocean:** Cobalt blue on crisp icy azure.
  - **Neon:** Electric cyan on void black.
  - **Emerald:** Matrix green on dark slate.
  - **Sunset:** Crimson rose on soft pastel peach.
  - **Minimal:** Refined dark zinc on off-white.
- **🛡️ Scan Reliability & WCAG Contrast Engine:**
  - Calculates real-time WCAG 2.1 relative luminance and contrast ratio.
  - Emits clear warnings (`⚠️ Low contrast may affect QR scanning`) when the ratio drops below 3:1.
  - Detects inverted color combinations and provides compatibility advice.
  - Warns when embedding logos with low error correction levels.
- **💾 Browser LocalStorage Persistence:**
  - Automatically records generated/downloaded QR codes into **Recent QR Codes**.
  - Displays thumbnail, payload title, type badge, and relative timestamp.
  - **Reuse Button:** Instantly restores the entire configuration snapshot (type, content, colors, size, margin, ECC).
  - **Delete & Clear All:** Manage history with graceful error handling.
- **📥 High-Resolution Multi-Format Export:**
  - **Download PNG:** Client-side canvas export at selected resolution (`QRForge-[type]-[timestamp].png`).
  - **Download SVG:** Pure scalable vector graphic export for infinite scalability.
  - **Copy QR to Clipboard:** Direct image blob copy via Clipboard API with fallback.
  - **Micro-interactions:** Celebration confetti effect on successful export.
- **🌓 Dark Futuristic & Light Clean Themes:**
  - Default dark cybernetic glassmorphism with subtle glow effects and soft shadows.
  - Clean light mode toggle, persisted in LocalStorage.
- **📱 Fully Responsive:**
  - Desktop: 3-column dashboard (Sidebar, Editor, Live Preview).
  - Tablet: 2-column layout.
  - Mobile: Clean single-column layout with tab navigation between Editor and Live Preview.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Bundler & Tooling** | [Vite 8](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **QR Generation Engine** | `qrcode` (HTML5 Canvas & SVG Vector) |
| **Styling** | Modern CSS3 with CSS Custom Properties, Glassmorphism & Backdrop Filters |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Micro-Interactions** | `canvas-confetti` |
| **Linter & Quality** | Oxlint & TypeScript Strict Type Checking |
| **Storage** | Client-Side Web Storage API (`localStorage`) |

---

## 🏗️ Architecture

```
qrforge/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AboutModal.tsx         # Challenge details & tech spec modal
│   │   ├── CustomizationPanel.tsx # Colors, size, margin, ECC & logo upload
│   │   ├── EmailForm.tsx          # Mailto form with validation
│   │   ├── Footer.tsx             # Recruitment footer & GitHub links
│   │   ├── Header.tsx             # Branding, badge, theme toggle & actions
│   │   ├── Icons.tsx              # Reusable SVG icon components
│   │   ├── InputPanel.tsx         # Dynamic active form renderer
│   │   ├── PhoneForm.tsx          # Phone form with country codes
│   │   ├── PresetSelector.tsx     # Color palette presets
│   │   ├── QRPreview.tsx          # Live canvas, contrast badge & downloads
│   │   ├── QRTypeSelector.tsx     # 5-type selector tabs with descriptions
│   │   ├── RecentQRs.tsx          # Local history cards with reuse & delete
│   │   ├── Sidebar.tsx            # Left column dashboard sidebar
│   │   ├── TextForm.tsx           # Text form with character counter
│   │   ├── Toast.tsx              # Floating toast notification system
│   │   ├── URLForm.tsx            # URL form with protocol helpers
│   │   ├── ValidationMessage.tsx  # Accessible inline validation messages
│   │   └── WifiForm.tsx           # Wi-Fi form with SSID & encryption controls
│   ├── data/
│   │   ├── presets.ts             # Palette definitions & initial defaults
│   │   └── qrTypes.ts             # Metadata & country calling codes
│   ├── hooks/
│   │   ├── useLocalStorage.ts     # Safe typed LocalStorage hook
│   │   ├── useQRGenerator.ts      # Core state machine for configuration & payloads
│   │   └── useQRHistory.ts        # History management & snapshot restoration
│   ├── types/
│   │   └── qr.ts                  # TypeScript types & interface definitions
│   ├── utils/
│   │   ├── contrast.ts            # Relative luminance & WCAG contrast engine
│   │   ├── download.ts            # PNG/SVG exporters, clipboard copy & canvas rendering
│   │   └── payload.ts             # RFC payload generators & schema validators
│   ├── App.tsx                    # Root dashboard layout coordinator
│   ├── index.css                  # Master design system & glassmorphism stylesheet
│   └── main.tsx                   # React root entrypoint
├── index.html                     # HTML5 template with Google Fonts
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── test-qrforge.mjs               # Automated validation & test verification suite
```

---

## 💾 Local Storage Persistence

QRForge persists history and user preferences without any external backend:

1. **Storage Keys:**
   - `qrforge_recent_history_v1`: Stores an array of up to 12 recent QR code snapshots.
   - `qrforge_theme`: Stores the selected visual theme (`dark` or `light`).
2. **Snapshot Integrity:**
   - Each history item stores the timestamp, type, payload string, title, thumbnail, and the complete deep-cloned configuration object (`data` and `options`).
3. **Reuse Action:**
   - Clicking **Reuse** restores the exact fields, colors, error correction, and size back into the active editor state.
4. **Resilience:**
   - All `localStorage` interactions are guarded by `try...catch` blocks to gracefully handle quota limits or private browsing restrictions.

---

## 🔍 Validation Strategy

Validation executes synchronously on input changes, displaying accessible feedback directly beside the corresponding input:

| Type | Validation Rule | Error Feedback |
|---|---|---|
| **URL** | RFC URL format & valid hostname with domain dot | `"Please enter a valid URL (e.g., https://example.com)."` |
| **Plain Text** | Non-empty string & `<= 2048` characters | `"Please enter some text."` / Length warning |
| **Email** | Standard email regex (`user@domain.tld`) | `"Please enter a valid email address."` |
| **Phone** | Clean phone digits between 5 and 16 digits | `"Please enter a valid phone number (digits only)."` |
| **Wi-Fi** | Non-empty SSID network name | `"Please enter the network name."` |

---

## ⚡ Scan Reliability Engine

To prevent users from unintentionally generating unreadable codes, QRForge evaluates optical scan viability in real time:

1. **WCAG 2.1 Relative Luminance:**
   $$L = 0.2126 \times R_{\text{lin}} + 0.7152 \times G_{\text{lin}} + 0.0722 \times B_{\text{lin}}$$
2. **Contrast Ratio Calculation:**
   $$\text{Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
3. **Threshold Indicators:**
   - **Ratio $\ge$ 7.0:1:** Optimal (Scan Verified)
   - **Ratio $\ge$ 4.5:1:** Good
   - **Ratio $<$ 3.0:1:** Danger banner (`⚠️ Low contrast may affect QR scanning. Recommended minimum ratio is 3:1.`)
4. **Inverted Color & Logo Advisories:**
   - Warns when inverted colors (light pattern on dark background) might hinder older laser barcode readers.
   - Alerts the user to bump error correction to **Quartile (Q)** or **High (H)** whenever a center logo is uploaded.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or newer recommended)
- `npm` (v9 or newer)

### Installation

```bash
# Clone the repository
git clone https://github.com/hARSh2018-arch/qrforge.git

# Navigate into the project directory
cd qrforge

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Automated Tests

QRForge includes a built-in automated test suite covering all payload formats, validators, contrast formulas, and presets:

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment on Vercel

QRForge is **100% client-side** and deploy-ready for Vercel:

1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `qrforge` repository.
4. Leave build settings as default:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your application will be live in seconds with global edge CDN caching!

---

## 🧪 Testing Verification Checklist

The application has been verified against the complete recruitment rubric:

- [x] **URL QR:** Valid URL generation, auto-prefixing, validation errors.
- [x] **Text QR:** Real-time generation, character counter, 2048-char boundary.
- [x] **Email QR:** `mailto:` payload format, subject/body parameters, email validation.
- [x] **Phone QR:** `tel:` payload format, country code dropdown, digit validation.
- [x] **Wi-Fi QR:** Standard MEBKM format, WPA/WEP/None protocols, hidden toggle.
- [x] **Real-time Live Preview:** Instant canvas rendering with pulsing live indicator.
- [x] **Color Customization:** Foreground/background color pickers, hex inputs, swatches.
- [x] **Resolution Scaling:** 256px to 1024px dynamic canvas scaling.
- [x] **Error Correction Levels:** L, M, Q, H with detailed recovery descriptions.
- [x] **Quiet Zone Margin:** Slider with visible block values (0 to 8).
- [x] **Presets:** Instant application of Classic, Midnight, Ocean, Neon, Minimal, Sunset, Emerald.
- [x] **Scan Reliability:** Low-contrast warning banners, WCAG ratio badge, logo ECC notice.
- [x] **PNG Download:** Crisp client-side download matching preview exactly (`QRForge-[type]-[timestamp].png`).
- [x] **SVG Download:** Scalable vector SVG file export.
- [x] **Copy QR to Clipboard:** Direct image copy with "✓ Copied!" feedback.
- [x] **Center Logo Upload:** Embedded center logo with protective padding badge.
- [x] **Recent History:** LocalStorage persistence, thumbnail display, timestamp, reuse configuration, delete card, clear all.
- [x] **Reset Defaults:** One-click clean reset.
- [x] **Visual Themes:** Dark futuristic glassmorphic and clean light themes.
- [x] **Responsive Layout:** 3-column desktop, 2-column tablet, 1-column mobile.

---

## 📸 Screenshots

*(Add screenshots of desktop 3-column dashboard, customization panel, and mobile view here before submitting)*

```
[ Desktop 3-Column Dashboard ]
[ Live QR Preview with WCAG Contrast Badge ]
[ Center Logo Upload & Custom Palettes ]
[ Mobile Responsive View ]
```

---

## 🔮 Future Improvements

- Dynamic vCard / MeCard generator for full business contacts.
- Custom QR module shapes (dots, rounded corners, diamond patterns).
- Multiple gradient foreground color styles.
- Batch QR generation from CSV/JSON upload.
- Export to PDF printable sheet with multiple QR sticker labels.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Crafted with precision for GDG on Campus SRM Technical Recruitment 2026–27 (Frontend Domain).**
