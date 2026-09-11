'use client';

import { useState, useEffect } from 'react';
import { audioEngine } from '@/lib/audioHelper';
import { Volume2, VolumeX, Play, Pause, RefreshCw } from 'lucide-react';

export default function VoicePlayer({ text, autoPlay = true, label = 'Listen to Jothishyan Voice' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (autoPlay && text) {
      handlePlay();
    }
    return () => {
      audioEngine.stop();
    };
  }, [text]);

  const handlePlay = () => {
    if (!text) return;
    setIsPlaying(true);
    setHasStarted(true);

    audioEngine.speak(text, () => {
      setIsPlaying(false);
    });
  };

  const handleStop = () => {
    audioEngine.stop();
    setIsPlaying(false);
  };

  return (
    <div className="glass-card-gold p-4 rounded-2xl border border-amber-500/40 my-4 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Avatar & Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-900 via-amber-600 to-yellow-400 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xl">
                🔮
              </div>
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold-glow flex items-center gap-2">
              JOTHISHYAN AUDIO SPEECH
              {isPlaying && (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono animate-pulse">
                  SPEAKING
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-300 italic">{label}</p>
          </div>
        </div>

        {/* Center: Animated Voice Waveform Bars */}
        {isPlaying ? (
          <div className="flex items-end gap-1.5 h-7 px-3 py-1 bg-amber-950/40 rounded-lg border border-amber-500/30">
            <span className="w-1.5 bg-amber-400 rounded-full animate-wave-bar" style={{ animationDuration: '0.6s' }} />
            <span className="w-1.5 bg-yellow-300 rounded-full animate-wave-bar" style={{ animationDuration: '0.9s' }} />
            <span className="w-1.5 bg-amber-500 rounded-full animate-wave-bar" style={{ animationDuration: '0.4s' }} />
            <span className="w-1.5 bg-purple-400 rounded-full animate-wave-bar" style={{ animationDuration: '0.7s' }} />
            <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-bar" style={{ animationDuration: '0.5s' }} />
          </div>
        ) : (
          <div className="hidden sm:block text-xs font-mono text-slate-500">
            [ VOICE READY ]
          </div>
        )}

        {/* Right: Play / Replay Controls */}
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/60 text-amber-200 text-xs font-bold transition-all shadow-md"
            >
              <Pause className="w-4 h-4 text-amber-400" />
              STOP VOICE
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              {hasStarted ? 'REPLAY VOICE' : 'PLAY VOICE'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
