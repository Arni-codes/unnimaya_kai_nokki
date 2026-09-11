# 🔮UNNI MAYA KAI NOKKI (AI Jothishyan)
**Humorous Kerala-Style AI Palm Reader & Parody Experience**

> *"Ninte kai onnu kaanikkeda..."*

UNNI MAYA KAI NOKKI is a full-stack AI web application built with a dark mystical interface ("Kerala jothishyan meets futuristic AI laboratory"). It provides a multi-device palm scanning experience using mobile phone camera WebRTC streaming, real-time palm tracking HUD, humorous Malayalam/Manglish readings, voice synthesis (TTS), and an interactive AI Jothishyan chat bot.

---

## 🔮 Key Features

1. **Cinematic Landing Page (`/`)**: Dark cosmic UI, floating mystical particles, glowing crystal orb, and quick access to mobile camera pairing.
2. **Dedicated Palm Scanner (`/scan`)**: Real-time HUD overlay with palm silhouette, laser sweep lines, hand detection indicators, alignment % metrics, stability checks, and automatic frame capture.
3. **WebRTC Phone Lens (`/camera`)**: Turns any smartphone into a wireless camera input by scanning a QR code or pairing via Room ID.
4. **Jothishyan Result Reveal (`/result`)**: Category prediction cards for **Love**, **Career**, **Money**, **Personality**, and **Future** with TTS voice speech playback and celebratory confetti.
5. **Interactive AI Jothishyan Chat (`/chat`)**: Ask custom questions (*"Ente love life engane aanu?"*, *"Job kittumo?"*, *"Why am I overthinking?"*) with real-time text & Malayalam voice responses.
6. **Full `MOCK_MODE` Support**: Operates 100% out-of-the-box in the browser even without API keys or Python backend active.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, JavaScript, Tailwind CSS, Lucide React, Framer Motion, QR Code React, Canvas Confetti.
- **Computer Vision**: MediaPipe Hands / HTML5 Canvas scanner HUD.
- **Real-Time Streaming**: WebRTC Peer Connection + WebSocket Signaling.
- **Backend (Optional Live Mode)**: Python FastAPI, gTTS, MediaPipe Python, Uvicorn.
- **Audio Engine**: Web Speech API / Web Audio API synth sound effects & Malayalam TTS.

---

## 🚀 How to Run the Application

### 1. Frontend Development Server (Next.js)

```bash
# Navigate to project root
cd d:/useless/unnimaya_kai_nokki

# Install dependencies (if not already installed)
npm install

# Start Next.js dev server
npm run dev
```

Open your browser and navigate to: **`http://localhost:3000`**

---

### 2. Python Backend (Optional - FastAPI)

To enable server-side palm geometry computation and API endpoints:

```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload --port 8000
```

Backend API health check will be live at: **`http://localhost:8000/api/health`**

---

## 📱 Mobile Phone Pairing Flow

1. Open **`http://localhost:3000`** on your PC.
2. Click **"Pair Phone Camera"** on the home page or scanner.
3. Scan the generated QR Code on your mobile phone (or navigate to `http://<YOUR_PC_IP>:3000/camera?room=KAI-XXXX`).
4. The mobile camera stream will mirror to the PC scanner console!

---

## ⚠️ Disclaimer
**UNNI MAYA KAI NOKKI is an AI-generated parody & entertainment experience.** All predictions are completely fictional.
