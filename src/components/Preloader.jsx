import { useEffect, useState, useRef } from 'react';

const BOOT_LINES = [
  { text: 'ORBITORX SYSTEMS v2.0.24', delay: 0,    color: 'rgba(255,255,255,0.9)' },
  { text: '> INITIALIZING CORE MODULES...', delay: 300,  color: 'rgba(255,255,255,0.45)' },
  { text: '> LOADING ECOSYSTEM NETWORK...', delay: 700,  color: 'rgba(255,255,255,0.45)' },
  { text: '> MOUNTING WEB3 INTERFACE...', delay: 1100, color: 'rgba(255,255,255,0.45)' },
  { text: '> CALIBRATING ORBITAL SYSTEMS...', delay: 1500, color: 'rgba(255,255,255,0.45)' },
  { text: '> VERIFYING ON-CHAIN CREDENTIALS...', delay: 1900, color: 'rgba(255,255,255,0.7)' },
  { text: '> ALL SYSTEMS NOMINAL', delay: 2300, color: 'rgba(255,255,255,0.9)' },
];

function useTypewriter(text, startDelay, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return displayed;
}

function BootLine({ text, delay, color }) {
  const typed = useTypewriter(text, delay);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay - 50);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <p
      className="font-mono-custom text-xs leading-relaxed"
      style={{ color, letterSpacing: '0.05em' }}
    >
      {typed}
      {typed.length < text.length && (
        <span className="inline-block w-2 h-3 bg-current ml-0.5 animate-pulse" />
      )}
    </p>
  );
}

function ProgressBar({ onComplete }) {
  const [width, setWidth] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => {
      const steps = [
        { w: 15,  t: 400  },
        { w: 35,  t: 900  },
        { w: 55,  t: 1400 },
        { w: 72,  t: 1800 },
        { w: 88,  t: 2200 },
        { w: 100, t: 2600 },
      ];
      steps.forEach(({ w, t }) => {
        setTimeout(() => {
          setWidth(w);
          if (w === 100) {
            setTimeout(() => { setDone(true); onComplete(); }, 400);
          }
        }, t);
      });
    }, 100);
    return () => clearTimeout(start);
  }, [onComplete]);

  const filled = Math.floor(width / 5);
  const empty  = 20 - filled;
  const bar    = '█'.repeat(filled) + '░'.repeat(empty);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="font-mono-custom text-[10px] text-white/40 tracking-widest">
          LOADING {width.toString().padStart(3, ' ')}%
        </p>
        {done && (
          <p className="font-mono-custom text-white/60 text-[10px] tracking-widest">
            READY
          </p>
        )}
      </div>
      <p className="font-mono-custom text-white/50 text-xs tracking-wider" style={{ letterSpacing: '0.05em' }}>
        [{bar}]
      </p>
    </div>
  );
}

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false);

  const handleComplete = () => {
    setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 700);
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Terminal window */}
      <div className="relative w-full max-w-lg mx-6">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 border-b-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="font-mono-custom text-white/25 text-[9px] tracking-widest ml-2">
            orbitorx — terminal
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="border border-white/10 p-6 flex flex-col gap-1.5"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.02) 0%, rgba(0,0,0,0.98) 100%)',
            boxShadow: '0 0 60px rgba(0,255,255,0.08), 0 0 120px rgba(0,255,255,0.04)',
          }}
        >
          {BOOT_LINES.map((line) => (
            <BootLine key={line.text} {...line} />
          ))}

          <ProgressBar onComplete={handleComplete} />
        </div>

        {/* Corner accents */}
        <div className="absolute top-10 left-0 w-4 h-4 border-t border-l border-white/25 -translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/15 translate-x-1 translate-y-1" />
      </div>
    </div>
  );
}
