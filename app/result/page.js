'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import JothishyanCard from '@/components/JothishyanCard';
import VoicePlayer from '@/components/VoicePlayer';
import { MOCK_JOTHISHYAN_READINGS } from '@/lib/mockData';
import confetti from 'canvas-confetti';
import { Sparkles, MessageSquare, RefreshCw, Hand, Share2 } from 'lucide-react';

export default function ResultPage() {
  const [reading, setReading] = useState(null);

  useEffect(() => {
    // Select mock reading
    const sample = MOCK_JOTHISHYAN_READINGS[0];
    setReading(sample);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#8b5cf6', '#06b6d4'],
      });
    } catch (e) {
      console.warn('Confetti effect unavailable:', e);
    }
  }, []);

  if (!reading) return null;

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full max-w-5xl mx-auto space-y-8">
      {/* Title Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-amber-300 text-xs font-mono mb-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>PALM MAP COMPUTATION COMPLETE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gold-glow tracking-tight">
          THE JOTHISHYAN HAS SPOKEN
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-serif italic max-w-md mx-auto">
          "Enikku oru kaaryam parayan undu... palm lines clear aayi manassilayi!"
        </p>
      </div>

      {/* Main Voice Speech Player */}
      <div className="w-full">
        <VoicePlayer
          text={reading.jothishyanOpening}
          autoPlay={true}
          label={reading.jothishyanOpening}
        />
      </div>

      {/* Overall Astro Profile Card */}
      <div className="w-full glass-card-gold p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono text-amber-300 tracking-widest uppercase block">
            CLASSIFICATION MATRIX
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100">
            {reading.overallScore}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {reading.jothishyanOpening}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-slate-950 border-4 border-amber-400 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
            🔮
          </div>
          <span className="text-[10px] font-mono text-slate-400">100% PARODY ACCURACY</span>
        </div>
      </div>

      {/* 5 Category Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <JothishyanCard category="love" data={reading.love} delay={100} />
        <JothishyanCard category="career" data={reading.career} delay={200} />
        <JothishyanCard category="money" data={reading.money} delay={300} />
        <JothishyanCard category="personality" data={reading.personality} delay={400} />
        <div className="md:col-span-2">
          <JothishyanCard category="future" data={reading.future} delay={500} />
        </div>
      </div>

      {/* Navigation CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
        <Link
          href="/chat"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all hover:scale-105"
        >
          <MessageSquare className="w-5 h-5 text-slate-950" />
          <span>ASK THE JOTHISHYAN (CHAT)</span>
        </Link>

        <Link
          href="/scan"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-purple-500/40 text-slate-200 hover:text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 transition-all hover:bg-purple-950/40"
        >
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <span>RE-SCAN PALM</span>
        </Link>
      </div>
    </div>
  );
}
