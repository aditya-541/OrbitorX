import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <style>{`
        /* Dot grid background */
        .nf-bg {
          background-color: #000;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* 404 glitch effect */
        @keyframes glitch {
          0%   { clip-path: inset(0 0 100% 0); transform: translateX(0); }
          10%  { clip-path: inset(30% 0 50% 0); transform: translateX(-4px); }
          20%  { clip-path: inset(60% 0 20% 0); transform: translateX(4px); }
          30%  { clip-path: inset(10% 0 80% 0); transform: translateX(-3px); }
          40%  { clip-path: inset(80% 0 5%  0); transform: translateX(3px); }
          50%  { clip-path: inset(40% 0 40% 0); transform: translateX(-2px); }
          60%  { clip-path: inset(0 0 100% 0); transform: translateX(0); }
          100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
        }

        .glitch-layer-1 {
          animation: glitch 4s steps(1) infinite;
          animation-delay: 0s;
        }
        .glitch-layer-2 {
          animation: glitch 4s steps(1) infinite;
          animation-delay: 0.05s;
        }

        /* Scanline sweep */
        @keyframes scanline {
          0%   { top: -8%; opacity: 0; }
          5%   { opacity: 0.18; }
          95%  { opacity: 0.18; }
          100% { top: 108%; opacity: 0; }
        }

        .scanline {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent);
          animation: scanline 3.2s linear infinite;
          pointer-events: none;
        }

        /* Orbital ring */
        @keyframes orbit-spin {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }

        @keyframes orbit-dot {
          from { transform: rotateZ(0deg) translateX(52px) rotateZ(0deg); }
          to   { transform: rotateZ(360deg) translateX(52px) rotateZ(-360deg); }
        }

        .orbital-scene {
          perspective: 400px;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbital-ring {
          width: 104px;
          height: 104px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.22);
          box-shadow: 0 0 0 0.5px rgba(255,255,255,0.06) inset;
          animation: orbit-spin 6s linear infinite;
          position: relative;
        }

        .orbital-ring::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 7px;
          height: 7px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(255,255,255,0.6);
        }

        .orbital-ring-outer {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,0.1);
          position: absolute;
          animation: orbit-spin 10s linear infinite reverse;
        }

        /* Fade-in utility */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fade-up 0.6s ease forwards; opacity: 0; }
        .fade-up-2 { animation: fade-up 0.6s ease 0.15s forwards; opacity: 0; }
        .fade-up-3 { animation: fade-up 0.6s ease 0.3s forwards; opacity: 0; }
        .fade-up-4 { animation: fade-up 0.6s ease 0.45s forwards; opacity: 0; }
        .fade-up-5 { animation: fade-up 0.6s ease 0.6s forwards; opacity: 0; }

        /* Ghost buttons */
        .btn-ghost-mono {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          background: transparent;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        .btn-ghost-mono:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
          border-color: rgba(255,255,255,0.4);
        }
      `}</style>

      <section className="nf-bg relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-lg w-full">

          {/* Animated orbital ring */}
          <div className="fade-up-1 orbital-scene" aria-hidden="true">
            <div className="orbital-ring-outer" />
            <div className="orbital-ring" />
          </div>

          {/* 404 with glitch + scanline */}
          <div className="fade-up-2 relative select-none" aria-hidden="true">
            {/* Base layer */}
            <span
              className="font-pixel text-white"
              style={{ fontSize: 'clamp(5rem, 20vw, 9rem)', lineHeight: 1, display: 'block', letterSpacing: '-0.02em' }}
            >
              404
            </span>

            {/* Glitch layer 1 — red channel offset */}
            <span
              className="glitch-layer-1 font-pixel absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: 'clamp(5rem, 20vw, 9rem)',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.55)',
                mixBlendMode: 'screen',
              }}
            >
              404
            </span>

            {/* Glitch layer 2 — blue channel offset */}
            <span
              className="glitch-layer-2 font-pixel absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: 'clamp(5rem, 20vw, 9rem)',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.35)',
                mixBlendMode: 'screen',
                filter: 'blur(0.5px)',
              }}
            >
              404
            </span>

            {/* Scanline sweep */}
            <div className="scanline" />
          </div>

          {/* Signal lost label */}
          <p
            className="fade-up-3 font-mono tracking-widest uppercase text-white/50 text-xs"
            style={{ letterSpacing: '0.5em' }}
          >
            Signal Lost
          </p>

          {/* Description */}
          <p className="fade-up-4 font-mono text-white/35 text-sm leading-relaxed max-w-sm">
            The page you&apos;re looking for has drifted out of orbit.
          </p>

          {/* Buttons */}
          <div className="fade-up-5 flex flex-col sm:flex-row items-center gap-3">
            <Link to="/" className="btn-ghost-mono">
              ← Back Home
            </Link>
            <Link to="/work" className="btn-ghost-mono">
              View Our Work
            </Link>
          </div>

          {/* Coords footer */}
          <p
            className="fade-up-5 font-mono text-white/10 text-[10px] tracking-widest mt-2"
          >
            COORDS · 404.000 · NULL · VOID
          </p>
        </div>
      </section>
    </>
  );
}
