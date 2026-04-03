# Lens Bite | Clinical Food Safety Architecture

Lens Bite is a high-fidelity AI platform designed to cross-reference food ingredients with unique user Health Architectures in real-time.

## 🛠 Core Mechanics & Features

### 1. Dual-Path Intelligence Scanner
- **Barcode Decryption**: Real-time barcode scanning using the device camera. It fetches product data from the Open Food Facts API and identifies ingredients instantly.
- **AI Vision Lens**: A multimodal AI scanner (Gemini 2.5 Flash) that captures a photo of any food product, identifies the item, and extracts the full ingredient list even if the packaging is damaged or non-standard.

### 2. Clinical Risk Engine (Genkit)
- **Hazard Detection**: Scans for potential carcinogens, process-induced toxins, and high-risk additives.
- **Safety Metrics**: Calculates a clinical risk score (0-100), Nutri-Score (A-E), and NOVA food processing classification (1-4).
- **Nutrient Profiling**: Provides a deep-dive analysis of Calories, Protein, Carbs, Sodium, and Sugar with traffic-light status indicators.

### 3. Biometric Synchronization
- **Health Architecture**: Secure Firestore profiles storing biometric data (Height, Weight, BMI) and clinical triggers (Allergies, Diabetes, Hypertension, Celiac).
- **Personalized Tips**: An AI logic layer that cross-references scanned ingredients with the user's specific medical profile to provide actionable, clinical-grade safety advice.

### 4. Secure Vault (History)
- **Audit Logging**: Every scan is timestamped and stored in a private Firestore vault.
- **Verification Records**: Users can review previous food safety audits with detailed breakdown summaries.

## 🎨 Visual Architecture & UX
- **3D HUD Command Center**: A persistent, rotating 3D "Power Core" object on the home page built with CSS `perspective-3d`.
- **High-Speed Iris Shutter**: Custom page transitions that mimic a professional camera aperture focal shift.
- **Clinical Typography**: A strict "No Italics" policy using bold, architectural Inter fonts for high readability.
- **Precision Color Palette**:
  - Primary Green: `#2E7D32` (System Active)
  - Scanner Orange: `#F4A261` (Action)
  - Light Shell: `#F7F9FB` (Background)
  - Status Indicators: Safe (#4CAF50), Caution (#F4C542), Alert (#E53935).

## 🚀 Technical Stack
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons.
- **Backend**: Firebase Auth, Firestore, Firebase App Hosting.
- **AI**: Genkit (Google AI Plugin), Gemini 2.5 Flash / Flash-Image.

---
*Every change made to this repository is automatically synchronized with the live clinical environment.*