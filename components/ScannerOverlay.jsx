'use client';

import { SCANNER_STATES } from '@/lib/mockData';
import { Sparkles, Scan, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';

export default function ScannerOverlay({
  stateKey = 'WAITING',
  alignmentPct = 85,
  stabilityPct = 90,
  handDetected = false,
  customMessage = null,
}) {
  const currentState = SCANNER_STATES[stateKey] || SCANNER_STATES.WAITING;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6 z-20">
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between w-full">
        {/* Left: Hand Detection Badge */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${
            handDetected
              ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 shadow-lg shadow-emerald-500/20'
              : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
          }`}
        >
          {handDetected ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>HAND DETECTED</span>
            </>
          ) : (
            <>
              <Scan className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>SEARCHING PALM...</span>
            </>
          )}
        </div>

        {/* Right: Technical AI Metrics Panel */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950/75 border border-purple-500/30 text-[11px] font-mono text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">ALIGN:</span>
            <span className="text-cyan-300 font-bold">{handDetected ? `${alignmentPct}%` : '0%'}</span>
          </div>
          <div className="h-3 w-[1px] bg-purple-900/60" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">STABILITY:</span>
            <span className="text-amber-300 font-bold">{handDetected ? `${stabilityPct}%` : '0%'}</span>
          </div>
        </div>
      </div>

      {/* Center Palm Outline Frame & Laser Sweeper */}
      <div className="relative w-full h-full flex items-center justify-center my-2">
        {/* Outer Glowing Target Ring */}
        <div
          className={`w-64 h-80 sm:w-72 sm:h-96 rounded-[50px] border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden ${
            handDetected
              ? 'border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)] bg-cyan-950/10'
              : 'border-purple-500/40 border-dashed shadow-[0_0_20px_rgba(139,92,246,0.2)]'
          }`}
        >
          {/* Animated Scanning Laser Sweep */}
          <div className="scan-line animate-scan-laser" />

          {/* Palm Silhouette Graphic */}
          <div className="opacity-20 text-center select-none pointer-events-none">
            <span className="text-8xl sm:text-9xl block mb-2 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              ✋
            </span>
            <p className="text-[10px] font-mono text-amber-300 tracking-widest uppercase">
              PALM ALIGNMENT ZONE
            </p>
          </div>

          {/* Target Corner Reticles */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
        </div>
      </div>

      {/* Bottom Status Banner & Malayalam Message Box */}
      <div className="w-full flex flex-col items-center gap-2 max-w-lg mx-auto">
        <div className="w-full glass-card-purple p-4 rounded-2xl border border-purple-500/40 text-center shadow-2xl backdrop-blur-xl">
          {/* Malayalam Banner */}
          <h3 className="text-lg sm:text-xl font-extrabold text-gold-glow mb-1 tracking-wide">
            "{customMessage || currentState.malayalamMessage}"
          </h3>

          <p className="text-xs text-purple-200 font-medium">
            {currentState.englishSubText}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950/80 rounded-full h-2 mt-3 overflow-hidden border border-purple-900/50 p-0.5">
            <div
              className="bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400 h-full rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${currentState.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
