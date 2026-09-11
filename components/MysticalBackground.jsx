'use client';

import { useEffect, useRef } from 'react';

export default function MysticalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create mystical floating particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * 0.02,
      pulseDir: 1,
      color: Math.random() > 0.4 ? '#8b5cf6' : Math.random() > 0.5 ? '#06b6d4' : '#fbbf24',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.alpha += p.pulse * p.pulseDir;
        if (p.alpha > 0.85 || p.alpha < 0.15) p.pulseDir *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05040a]">
      {/* Canvas for floating magical particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Dynamic Background Glowing Orbs */}
      <div className="bg-orb w-[500px] h-[500px] bg-purple-900/25 top-[-100px] left-[-100px] animate-orb-glow" />
      <div className="bg-orb w-[600px] h-[600px] bg-indigo-950/30 bottom-[-150px] right-[-150px] animate-orb-glow" style={{ animationDelay: '2.5s' }} />
      <div className="bg-orb w-[350px] h-[350px] bg-cyan-900/15 top-[35%] right-[10%] animate-orb-glow" style={{ animationDelay: '1.2s' }} />
      <div className="bg-orb w-[400px] h-[400px] bg-amber-900/10 bottom-[20%] left-[10%] animate-orb-glow" style={{ animationDelay: '3.7s' }} />

      {/* Subtle Mystical Symbols Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  );
}
