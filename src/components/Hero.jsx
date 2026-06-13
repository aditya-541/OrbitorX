import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchText, TextScramble } from './GlitchText.jsx';
import NetworkOrb from './NetworkOrb.jsx';
import KineticTagline from './KineticTagline.jsx';

function ScrollHint() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none" aria-hidden="true">
      <span className="font-mono-custom text-white text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-5 py-3 border border-neon/15 bg-white/[0.02]">
      <span className="font-mono-custom text-neon text-sm font-bold tracking-tight">{value}</span>
      <span className="font-mono-custom text-white/35 text-[9px] tracking-[0.2em] uppercase">{label}</span>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Pixel grid — subtle */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)' }}
        aria-hidden="true"
      />

      {/* Gradient top-left ambient */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Gradient bottom-right ambient */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-8"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.2) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Layout: two-column on desktop, stacked on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 pb-20">

        {/* Left — text content */}
        <div className="flex flex-col items-start gap-7 max-w-xl page-enter">

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-neon opacity-70" />
            <p className="font-mono-custom text-neon/70 text-[10px] tracking-[0.4em] uppercase">
              EST. 2019 &nbsp;·&nbsp; TECH AGENCY
            </p>
          </div>

          {/* Main heading */}
          <h1 className="flex flex-col gap-3">
            <GlitchText
              text="OrbitorX"
              tag="span"
              repeat
              className="glitch font-pixel text-5xl md:text-7xl lg:text-8xl block shimmer-text neon-flicker"
              style={{ display: 'block', lineHeight: 1.1 }}
            />
            <KineticTagline className="text-lg md:text-2xl tracking-wide" />
          </h1>

          {/* Tagline scramble */}
          <p className="font-mono-custom text-white/50 text-sm tracking-widest">
            <TextScramble text="Tech events · Startup growth · Product launches" delay={600} />
          </p>

          {/* Sub description */}
          <p className="font-sans text-white/40 text-sm leading-relaxed max-w-sm">
            We embed, build, and launch alongside founders who refuse to orbit the same problems.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
            <button
              id="cta-work-with-us"
              onClick={() => navigate('/contact')}
              className="btn-neon font-mono-custom text-xs px-8 py-4 tracking-widest transition-all duration-300 pulse"
            >
              Start a Project →
            </button>
            <button
              id="cta-see-our-work"
              onClick={() => navigate('/work')}
              className="btn-ghost font-mono-custom text-xs px-8 py-4 tracking-widest transition-all duration-300"
            >
              See Our Work
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-px mt-4 bg-neon/10">
            <StatPill value="42+" label="Events Hosted" />
            <StatPill value="120+" label="Startups Scaled" />
            <StatPill value="3M+" label="Users Reached" />
          </div>
        </div>

        {/* Right — 3D NetworkOrb */}
        <div
          className="relative w-full lg:w-[520px] lg:h-[520px] h-[340px] shrink-0"
          style={{ opacity: 0, animation: 'pageEnter 0.9s 0.3s cubic-bezier(.22,1,.36,1) forwards' }}
        >
          <Suspense fallback={null}>
            <NetworkOrb className="w-full h-full" />
          </Suspense>

          {/* Orb label */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1 pointer-events-none">
            <span className="font-mono-custom text-neon/30 text-[8px] tracking-[0.3em] uppercase">Ecosystem Network</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-neon" style={{ boxShadow: '0 0 6px #00FFFF', animation: 'blink 2s ease-in-out infinite' }} />
              <span className="font-mono-custom text-neon/50 text-[8px] tracking-widest">LIVE</span>
            </div>
          </div>

          {/* Acid green corner accent */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-acid/40" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-neon/30" />
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
