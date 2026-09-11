'use client';

import { useState, useEffect, useRef } from 'react';
import ScannerOverlay from './ScannerOverlay';
import { audioEngine } from '@/lib/audioHelper';
import { Camera, RefreshCw, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PalmScanner({ onCaptureComplete = null, remoteStream = null }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [scannerState, setScannerState] = useState('WAITING');
  const [handDetected, setHandDetected] = useState(false);
  const [alignmentPct, setAlignmentPct] = useState(60);
  const [stabilityPct, setStabilityPct] = useState(40);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Initialize webcam or remote WebRTC stream
  useEffect(() => {
    let currentStream = null;

    async function startCamera() {
      if (remoteStream && videoRef.current) {
        videoRef.current.srcObject = remoteStream;
        setCameraActive(true);
        return;
      }

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
          currentStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraActive(true);
          }
        } else {
          setCameraError('Webcam access not supported on this device. Running in Simulated Palm Mode.');
        }
      } catch (err) {
        console.warn('Camera access denied or unequipped, switching to Simulated Palm Mode:', err);
        setCameraError('Camera access unavailable. Interactive simulated palm scanner active.');
      }
    }

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [remoteStream]);

  // Automated simulated scanner workflow (works out of the box in mock mode!)
  useEffect(() => {
    let isMounted = true;
    let timerId = null;

    // Simulated detection timeline
    const runScanSequence = async () => {
      // Phase 1: Waiting for hand
      setScannerState('WAITING');
      setHandDetected(false);
      audioEngine.playSoundEffect('click');

      await new Promise((r) => setTimeout(r, 2200));
      if (!isMounted) return;

      // Phase 2: Hand detected
      setScannerState('HAND_DETECTED');
      setHandDetected(true);
      setAlignmentPct(78);
      setStabilityPct(65);
      audioEngine.playSoundEffect('detected');
      audioEngine.speak('Aah... kai kitti.');

      await new Promise((r) => setTimeout(r, 2500));
      if (!isMounted) return;

      // Phase 3: Alignment check
      setScannerState('ALIGN');
      setAlignmentPct(94);
      setStabilityPct(82);
      audioEngine.playSoundEffect('click');
      audioEngine.speak('Kai correct ayi vekku da...');

      await new Promise((r) => setTimeout(r, 2200));
      if (!isMounted) return;

      // Phase 4: Stability countdown
      setScannerState('STABILIZING');
      setStabilityPct(98);
      audioEngine.playSoundEffect('steady');
      audioEngine.speak('Steady ayi vekka da...');

      await new Promise((r) => setTimeout(r, 2200));
      if (!isMounted) return;

      // Phase 5: Capturing frame
      setScannerState('CAPTURING');
      audioEngine.playSoundEffect('capturing');
      audioEngine.speak('Onnu nokkatte...');

      await new Promise((r) => setTimeout(r, 1800));
      if (!isMounted) return;

      // Phase 6: Analyzing AI features
      setScannerState('ANALYZING');
      audioEngine.playSoundEffect('analyzing');
      audioEngine.speak('Hmmmm... ithoru interesting case aanallo...');

      await new Promise((r) => setTimeout(r, 2500));
      if (!isMounted) return;

      // Phase 7: Done -> Callback to results page
      setScannerState('COMPLETED');
      if (onCaptureComplete) {
        onCaptureComplete();
      }
    };

    runScanSequence();

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden glass-panel border-2 border-purple-500/40 shadow-2xl bg-slate-950 aspect-[4/3] sm:aspect-[16/10]">
      {/* Background Video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          cameraActive ? 'opacity-80' : 'opacity-20'
        }`}
      />

      {/* Canvas layer for landmarks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* HUD Scanner Overlay */}
      <ScannerOverlay
        stateKey={scannerState}
        alignmentPct={alignmentPct}
        stabilityPct={stabilityPct}
        handDetected={handDetected}
      />

      {/* Top Banner Warning if Camera is Simulated */}
      {cameraError && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[11px] font-mono backdrop-blur-md flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{cameraError}</span>
        </div>
      )}
    </div>
  );
}
