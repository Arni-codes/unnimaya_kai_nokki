'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { audioEngine } from '@/lib/audioHelper';
import { Volume2, VolumeX, Sparkles, Smartphone, Hand, MessageSquare, Compass } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [isMockMode, setIsMockMode] = useState(true);

  useEffect(() => {
    // Check local mock setting
    if (typeof window !== 'undefined') {
      const mock = process.env.NEXT_PUBLIC_MOCK_MODE !== 'false';
      setIsMockMode(mock);
    }
  }, []);

  const handleMuteToggle = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <nav className="relative z-50 w-full border-b border-purple-900/30 glass-panel px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 to-amber-600 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#090614] rounded-full flex items-center justify-center">
              <span className="text-xl animate-pulse">🔮</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-gold-glow">KAI NOKKI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 font-mono">
                AI 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight font-serif italic">
              AI Jothishyan • Palm Reader
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-purple-900/40">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === '/'
                ? 'bg-purple-600/40 text-amber-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Home
          </Link>

          <Link
            href="/scan"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === '/scan'
                ? 'bg-purple-600/40 text-amber-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            Scanner
          </Link>

          <Link
            href="/result"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === '/result'
                ? 'bg-purple-600/40 text-amber-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Result
          </Link>

          <Link
            href="/chat"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === '/chat'
                ? 'bg-purple-600/40 text-amber-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Chat
          </Link>

          <Link
            href="/camera"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === '/camera'
                ? 'bg-purple-600/40 text-amber-300 border border-purple-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            Phone Link
          </Link>
        </div>

        {/* Controls Right */}
        <div className="flex items-center gap-3">
          {/* Mock Mode Tag */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            MOCK MODE
          </div>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-xl bg-slate-900/80 border border-purple-500/30 text-slate-300 hover:text-gold hover:border-gold/50 transition-colors"
            title={isMuted ? 'Unmute Jothishyan Voice' : 'Mute Jothishyan Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
