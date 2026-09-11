'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generateRoomId } from '@/lib/webrtc';
import { Smartphone, Copy, Check, QrCode, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CameraConnection({ onRoomCreated = null }) {
  const [roomId, setRoomId] = useState('');
  const [copied, setCopied] = useState(false);
  const [cameraUrl, setCameraUrl] = useState('');

  useEffect(() => {
    const code = generateRoomId();
    setRoomId(code);
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/camera?room=${code}`;
      setCameraUrl(url);
      if (onRoomCreated) {
        onRoomCreated(code);
      }
    }
  }, []);

  const handleCopy = () => {
    if (!cameraUrl) return;
    navigator.clipboard.writeText(cameraUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-card-purple p-6 sm:p-8 rounded-3xl border border-purple-500/40 max-w-lg mx-auto shadow-2xl text-center">
      {/* Icon Badge */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-900 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/20 mb-4">
        <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-cyan-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gold-glow mb-2">
        CONNECT YOUR PHONE CAMERA
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        Use your mobile device as a wireless palm scanner lens while viewing results on this computer.
      </p>

      {/* QR Code Container */}
      <div className="inline-block p-4 rounded-2xl bg-white border-4 border-purple-500/50 shadow-xl mb-6 hover:scale-105 transition-transform duration-300">
        {cameraUrl ? (
          <QRCodeSVG value={cameraUrl} size={180} fgColor="#05040a" bgColor="#ffffff" level="H" />
        ) : (
          <div className="w-[180px] h-[180px] flex items-center justify-center text-slate-800 font-mono text-xs">
            Generating QR...
          </div>
        )}
      </div>

      {/* Room Code Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-xs font-mono text-slate-400">ROOM ID:</span>
        <span className="px-3 py-1 rounded-md bg-purple-950/80 border border-purple-500/50 text-cyan-300 font-mono text-sm font-bold tracking-widest">
          {roomId}
        </span>
      </div>

      {/* Copy Link Input */}
      <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-purple-900/60 mb-6">
        <input
          type="text"
          readOnly
          value={cameraUrl}
          className="bg-transparent text-xs text-slate-300 px-2 flex-1 focus:outline-none font-mono truncate"
        />
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/50 hover:bg-purple-600 text-white text-xs font-medium transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>WebRTC Encrypted Peer-to-Peer Stream</span>
      </div>
    </div>
  );
}
