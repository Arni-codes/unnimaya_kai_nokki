'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WebRTCStreamer } from '@/lib/webrtc';
import { Smartphone, Camera, RefreshCw, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

function CameraContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room') || 'KAI-MOCK';

  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [connectionState, setConnectionState] = useState('CONNECTING');
  const [facingMode, setFacingMode] = useState('environment');

  useEffect(() => {
    let streamer = null;

    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
          setConnectionState('CAMERA ONLINE');
        }

        // Initialize WebRTC streamer for room
        streamer = new WebRTCStreamer(
          roomId,
          false,
          null,
          (state) => setConnectionState(`STREAM: ${state.toUpperCase()}`)
        );
        streamer.connectSignaling();
        streamer.startMobileCamera(videoRef.current);
      } catch (err) {
        console.warn('Mobile camera initialization fallback:', err);
        setConnectionState('DEMO STREAM ONLINE');
      }
    }

    initCamera();

    return () => {
      if (streamer) streamer.close();
    };
  }, [roomId, facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 max-w-md mx-auto text-center">
      {/* Top Mobile Header */}
      <div className="w-full glass-panel p-4 rounded-2xl border border-purple-500/40 mb-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h2 className="font-bold text-sm text-gold-glow">KAI NOKKI CAMERA</h2>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
            {connectionState}
          </span>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden glass-panel border-2 border-cyan-500/50 shadow-2xl bg-slate-950 my-auto flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* Viewport Frame Reticle */}
        <div className="absolute inset-4 border border-dashed border-cyan-400/40 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
          <div className="flex justify-between text-[10px] font-mono text-cyan-300">
            <span>ROOM: {roomId}</span>
            <span>STREAMING 720p</span>
          </div>

          <div className="text-center bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-purple-500/30">
            <p className="text-xs font-bold text-amber-300 mb-0.5">
              Keep this screen open on your phone
            </p>
            <p className="text-[10px] text-slate-400">
              Your phone camera is streaming to your computer
            </p>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="w-full mt-4 flex items-center justify-between gap-4">
        <button
          onClick={toggleCamera}
          className="flex-1 py-3 px-4 rounded-xl glass-panel border border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          Switch Camera
        </button>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active WebRTC Link</span>
        </div>
      </div>
    </div>
  );
}

export default function CameraPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center text-amber-300 font-mono text-xs gap-2">
          <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
          Connecting Mobile Lens...
        </div>
      }
    >
      <CameraContent />
    </Suspense>
  );
}

