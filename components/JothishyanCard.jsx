'use client';

import { Sparkles, Heart, Briefcase, DollarSign, Brain, Target, AlertCircle } from 'lucide-react';

export default function JothishyanCard({ category, data, delay = 0 }) {
  if (!data) return null;

  return (
    <div
      className="glass-card-purple p-6 rounded-3xl border border-purple-500/30 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />

      {/* Header with Emoji & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
          {data.icon || '🔮'}
        </div>
        <div>
          <span className="text-[10px] font-mono text-purple-300 tracking-widest uppercase block">
            JOTHISHYAN PREDICTION
          </span>
          <h4 className="text-lg font-bold text-gold-glow">{data.title}</h4>
        </div>
      </div>

      {/* Manglish Humorous Observation */}
      <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed mb-4 italic bg-slate-950/40 p-4 rounded-2xl border border-purple-900/40">
        "{data.manglish}"
      </p>

      {/* Jothishyan Parody Advice */}
      <div className="flex items-start gap-2 text-xs text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-500/25">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-200">Jothishyan Tip: </span>
          <span>{data.advice}</span>
        </div>
      </div>
    </div>
  );
}
