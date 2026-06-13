import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchText, TextScramble } from './GlitchText.jsx';
import NetworkOrb from './NetworkOrb.jsx';
import KineticTagline from './KineticTagline.jsx';

function ScrollHint() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none" aria-hidden="true">
      <span className="font-mono-custom text-white text-[8px] tracking-[0.4em] uppercase">Scroll</span>
      <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300">
      <span className="font-mono-custom text-white text-base font-semibold tracking-tight">{value}</span>
      <span className="font-mono-custom text-white/35 text-[9px] tracking-[0.25em] uppercase">{label}</span>
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
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Radial vignette — keeps edges dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.85) 100%)' }}
        aria-hidden="true"
      />

      {/* Very subtle off-center light source */}
      <div
        className="absolute top-[-120px] left-[-80px] w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 pt-28 pb-20">

        {/* Left — text */}
        <div className="flex flex-col items-start gap-8 max-w-2xl page-enter">

          {/* Eyebrow badge */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-white/30" />
            <p className="font-mono-custom text-white/35 text-[10px] tracking-[0.45em] uppercase">
              EST. 2019 &nbsp;·&nbsp; TECH AGENCY
            </p>
          </div>

          {/* Main heading */}
          <h1 className="flex flex-col gap-2">
            {/* Brand name — large, clean white, no color shimmer */}
            <span
              className="font-pixel block leading-none"
              style={{
                fontSize: 'clamp(52px, 10vw, 100px)',
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              OrbitorX
            </span>
            {/* Kinetic word flip below — slightly smaller, muted */}
            <KineticTagline className="text-xl md:text-3xl tracking-wide" />
          </h1>

          {/* Descriptor line */}
          <p className="font-mono-custom text-white/40 text-[11px] tracking-[0.3em] uppercase">
            Tech events &nbsp;·&nbsp; Startup growth &nbsp;·&nbsp; Product launches
          </p>

          {/* Body copy */}
          <p className="font-sans text-white/55 text-sm leading-[1.75] max-w-md">
            We embed, build, and launch alongside founders who refuse to orbit the same problems.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3 mt-1">
            <button
              onClick={() => navigate('/contact')}
              className="hero-cta-primary font-mono-custom text-[11px] px-8 py-4 tracking-widest"
            >
              Start a Project →
            </button>
            <button
              onClick={() => navigate('/work')}
              className="hero-cta-ghost font-mono-custom text-[11px] px-8 py-4 tracking-widest"
            >
              See Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap border border-white/8 divide-x divide-white/8">
            <StatPill value="42+" label="Events Hosted" />
            <StatPill value="120+" label="Startups Scaled" />
            <StatPill value="3M+" label="Users Reached" />
          </div>
        </div>

        {/* Right — 3D orb */}
        <div
          className="relative w-full lg:w-[500px] lg:h-[500px] h-[320px] shrink-0"
          style={{ opacity: 0, animation: 'pageEnter 1s 0.2s cubic-bezier(.22,1,.36,1) forwards' }}
        >
          <Suspense fallback={null}>
            <NetworkOrb className="w-full h-full" />
          </Suspense>

          {/* Clean corner frames */}
          <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-white/15" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/10" />

          {/* Status indicator */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none">
            <div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              style={{ animation: 'blink 2.5s ease-in-out infinite' }}
            />
            <span className="font-mono-custom text-white/25 text-[8px] tracking-[0.3em] uppercase">Live</span>
          </div>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
