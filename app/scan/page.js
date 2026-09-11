'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PalmScanner from '@/components/PalmScanner';
import CameraConnection from '@/components/CameraConnection';
import { audioEngine } from '@/lib/audioHelper';
import { Smartphone, Sparkles, Hand, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);

  const handleCaptureComplete = () => {
    // Navigate to results page after analysis complete
    router.push('/result');
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 w-full">
      {/* Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPhoneModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-cyan-300 text-xs font-mono hover:border-cyan-400 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Connect Phone Lens</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="w-full max-w-4xl">
        <PalmScanner onCaptureComplete={handleCaptureComplete} remoteStream={remoteStream} />
      </div>

      {/* Phone pairing modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <button
              onClick={() => setShowPhoneModal(false)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-slate-900 border border-purple-500 text-white flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <CameraConnection />
          </div>
        </div>
      )}
    </div>
  );
}
