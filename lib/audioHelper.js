// Audio & Speech Synthesis Engine for KAI NOKKI (AI Jothishyan)

class AudioEngine {
  constructor() {
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.speechVolume = 1.0;
    this.speechRate = 0.95; // Dramatic pace
    this.speechPitch = 0.85; // Deep Jothishyan voice tone
    this.audioContext = null;
    this.isMuted = false;
  }

  // Initialize Web Audio Context for mystical sound effects
  initAudioContext() {
    if (typeof window === "undefined") return;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  // Play synthetic scanner sound effects using Web Audio API
  playSoundEffect(type) {
    if (this.isMuted) return;
    try {
      this.initAudioContext();
      if (!this.audioContext) return;

      const ctx = this.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case "detected":
          // Success chime
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;

        case "steady":
        case "capturing":
          // Pulse scan sound
          osc.type = "triangle";
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.setValueAtTime(650, now + 0.1);
          osc.frequency.setValueAtTime(780, now + 0.2);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
          break;

        case "analyzing":
          // Mystical low humming pulse
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(110, now);
          osc.frequency.linearRampToValueAtTime(220, now + 0.6);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
          osc.start(now);
          osc.stop(now + 0.7);
          break;

        case "error":
          // Warning beep
          osc.type = "square";
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.setValueAtTime(220, now + 0.15);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;

        default:
          // Subtle click
          osc.type = "sine";
          osc.frequency.setValueAtTime(350, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
      }
    } catch (err) {
      console.warn("Audio effect error:", err);
    }
  }

  // Speak Jothishyan Manglish/Malayalam text via Web Speech API
  speak(text, onEndCallback = null) {
    if (typeof window === "undefined" || !this.synth || this.isMuted) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      this.synth.cancel(); // Stop ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.speechVolume;
      utterance.rate = this.speechRate;
      utterance.pitch = this.speechPitch;

      // Select Malayalam (ml-IN) or Indian English (en-IN) voice if available
      const voices = this.synth.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang.includes("ml") || v.lang.includes("ML")) ||
        voices.find((v) => v.lang.includes("en-IN") || v.name.includes("India")) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      if (onEndCallback) {
        utterance.onend = onEndCallback;
        utterance.onerror = onEndCallback;
      }

      this.synth.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis failed:", e);
      if (onEndCallback) onEndCallback();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }
}

export const audioEngine = new AudioEngine();
