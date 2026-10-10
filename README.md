# QRForge ⚡

> **Generate. Customize. Share.**  
> *Production-Quality QR Code Generator & Designer*  
> Built for the **GDG on Campus SRM Technical Recruitment 2026–27 – Frontend Domain**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Vercel-Live--Demo-0070f3.svg?logo=vercel&logoColor=white)](https://qrforge-liard.vercel.app)

🔗 **Live Application URL:** [https://qrforge-liard.vercel.app](https://qrforge-liard.vercel.app)

---

## 📖 Overview

**QRForge** is an engineered developer-tool web application built from the ground up for the GDG on Campus SRM Technical Recruitment 2026–27 (Frontend Domain). 

Rather than a static prototype, QRForge is a **complete, offline-first, client-side QR generation powerhouse**. It delivers immediate zero-latency live previews, strict schema validation across 5 QR payload formats, a WCAG 2.1 relative luminance contrast analysis engine with scan-reliability warnings, customizable palettes and presets, center logo watermarking, high-resolution PNG & SVG exports, clipboard copying, and resilient browser LocalStorage history with full snapshot restoration.

---

## ✨ Features

- **⚡ Zero-Latency Live Preview:** Updates instantly as you type or adjust sliders — no manual "Generate" button required.
- **🎯 9 Essential RFC-Compliant QR Payload Encoders:**
  - **Website URL:** Real-time URL format validation, protocol detection (`https://`, `http://`), and quick action chips.
  - **Plain Text:** Live character counter with safe limit enforcement (2048 chars) and density warnings.
  - **Wi-Fi Network:** Standard MEBKM `WIFI:` string formatting with SSID validation, WPA/WEP/Open encryption selection, password visibility toggle, and hidden network support.
  - **vCard Contact:** Standard vCard 3.0 format for instant address book import (name, phone, email, organization, website).
  - **Email:** Standard RFC-compliant `mailto:` payload encoder with subject, body, and email address validation.
  - **Phone Number:** Standard `tel:` dialer payload with country calling code picker (+91, +1, +44, etc.) and digit validation.
  - **SMS Message:** Standard `SMSTO:` payload for mobile messaging with pre-filled message text.
  - **Map Location:** Geographic coordinates (`geo:`) and Google Maps query search support.
  - **Calendar Event:** Standard iCalendar (`VEVENT`) scheduling format with date, time, location, and description.
- **🎨 Deep Design Customization:**
  - **Resolution Slider:** 256px → 1024px dynamic canvas scaling.
  - **Color Picker Engine:** Custom Hex inputs, native color pickers, and instant quick-palette swatches.
  - **Quiet Zone Margin:** 0 to 8 blocks customizable quiet zone padding.
  - **Error Correction Level (ECC):** Selectable `L` (~7%), `M` (~15%), `Q` (~25%), and `H` (~30%) with clear descriptions.
  - **Center Logo / Watermark Upload:** Secure image file picker with auto-padded protective badge, border stroke, and automatic ECC warning.
- **💎 Predefined High-Contrast Presets:**
  - **Classic:** Monochromatic black on pure white.
  - **Bright Blue:** Signature accent blue on pale surface.
  - **Royal Violet:** Vibrant secondary violet on lavender white.
  - **Crisp Slate:** Deep modern slate pattern on pure white.
  - **Ocean:** Cobalt blue on crisp icy azure.
  - **Soft Blue:** Muted slate blue on warm ivory.
  - **Forest:** Deep pine on gentle sage white.
  - **Minimal:** Refined dark zinc on off-white.
  - **Midnight:** Bright slate on deep cybernetic obsidian.
- **🛡️ Scan Reliability & WCAG Contrast Engine:**
  - Calculates real-time WCAG 2.1 relative luminance and contrast ratio.
  - Emits clear warnings (`⚠️ Low contrast may affect QR scanning`) when the ratio drops below 3:1.
  - Detects inverted color combinations and provides compatibility advice.
  - Warns when embedding logos with low error correction levels.
- **💾 Dedicated History View with Local Persistence:**
  - Automatically records generated/downloaded QR codes into browser storage.
  - Displays thumbnail, payload title, type badge, and relative timestamp.
  - **Reuse Button:** Instantly restores the entire configuration snapshot (type, content, colors, size, margin, ECC) back into the active workspace.
  - **Individual Download & Delete:** Download PNG or SVG directly from history cards, or clear all history with confirmation.
- **📥 High-Resolution Multi-Format Export:**
  - **Download PNG:** Client-side canvas export at selected resolution (`QRForge-[type]-[timestamp].png`).
  - **Download SVG:** Pure scalable vector graphic export for infinite scalability.
  - **Copy QR to Clipboard:** Direct image blob copy via Clipboard API with fallback.
- **📱 Fully Responsive SaaS Workspace:**
  - Desktop: Cohesive 2-column workspace with sticky live preview.
  - Mobile & Tablet: Fluid single-column responsive layout with horizontal scroll navigation.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Bundler & Tooling** | [Vite 8](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **QR Generation Engine** | `qrcode` (HTML5 Canvas & SVG Vector) |
| **Styling** | Modern CSS3 with CSS Custom Properties, SaaS Color System |
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
│   │   ├── ContactForm.tsx        # vCard 3.0 contact details form
│   │   ├── CustomizationPanel.tsx # Colors, size, margin, ECC & logo upload
│   │   ├── EmailForm.tsx          # Mailto form with validation
│   │   ├── EventForm.tsx          # iCalendar event scheduler form
│   │   ├── Footer.tsx             # Clean minimal footer & GitHub links
│   │   ├── Header.tsx             # Branding, navigation tabs & theme toggle
│   │   ├── HistoryView.tsx        # Dedicated QR history gallery & management
│   │   ├── Icons.tsx              # Reusable SVG icon components
│   │   ├── InputPanel.tsx         # Dynamic active form renderer
│   │   ├── LocationForm.tsx       # Geolocation coordinates & search form
│   │   ├── PhoneForm.tsx          # Phone form with country codes
│   │   ├── PresetSelector.tsx     # Color palette presets
│   │   ├── QRPreview.tsx          # Live canvas, contrast badge & downloads
│   │   ├── QRTypeSelector.tsx     # Segmented content-type navigation bar
│   │   ├── SMSForm.tsx            # SMS message & phone form
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
│   ├── App.tsx                    # Root workspace layout coordinator
│   ├── index.css                  # Master design system stylesheet
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
