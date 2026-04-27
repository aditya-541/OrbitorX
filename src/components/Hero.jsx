// Starfield is now rendered globally in App.jsx
import { GlitchText, TextScramble } from './GlitchText.jsx';

/* Orbital ring SVG with slow rotation */
function OrbitalRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {/* Outer ring */}
      <svg
        className="orbital-ring absolute opacity-20"
        style={{ width: 'min(700px, 90vw)', height: 'min(700px, 90vw)', animationDuration: '22s' }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <ellipse cx="200" cy="200" rx="195" ry="60" stroke="#00FFFF" strokeWidth="0.8" strokeDasharray="6 4" />
      </svg>
      {/* Middle ring */}
      <svg
        className="absolute opacity-15"
        style={{
          width: 'min(500px, 70vw)', height: 'min(500px, 70vw)',
          animation: 'orbit 16s linear infinite reverse',
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <ellipse cx="200" cy="200" rx="195" ry="80" stroke="#00FFFF" strokeWidth="0.5" strokeDasharray="3 6" />
      </svg>
      {/* Dot on outer ring */}
      <svg
        className="orbital-ring absolute opacity-70"
        style={{ width: 'min(700px, 90vw)', height: 'min(700px, 90vw)', animationDuration: '22s' }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="5" r="4" fill="#00FFFF" style={{ filter: 'drop-shadow(0 0 6px #00FFFF)' }} />
      </svg>
    </div>
  );
}

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pixel-grid-bg"
    >
      {/* Orbital rings */}
      <OrbitalRing />

      {/* Pixel grid overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-8 max-w-5xl mx-auto float-slower">
        {/* Eyebrow */}
        <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase border border-neon/30 px-4 py-2 neon-glow">
          EST. 2019 · TECH AGENCY
        </p>

        {/* Main heading */}
        <h1 className="font-pixel text-white leading-tight">
          <GlitchText
            text="OrbitorX"
            tag="span"
            repeat
            className="glitch font-pixel text-4xl md:text-6xl lg:text-7xl block neon-text float-slow neon-flicker"
            style={{ display: 'block' }}
          />
        </h1>

        {/* Tagline */}
        <p className="font-mono-custom text-white/80 text-base md:text-xl tracking-widest float-slow">
          <TextScramble text="We Launch. You Scale." delay={800} />
          <span className="cursor-blink" />
        </p>

        {/* Sub-description */}
        <p className="font-sans text-white/40 text-sm md:text-base max-w-md leading-relaxed">
          Tech events · Startup growth · Product launches · Brand strategy
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 float-slow">
          <button
            id="cta-work-with-us"
            onClick={scrollToServices}
            className="btn-neon font-pixel text-xs px-8 py-4 tracking-widest transition-all duration-300 pulse"
          >
            Work With Us
          </button>
          <button
            id="cta-see-our-work"
            onClick={scrollToWork}
            className="btn-ghost font-pixel text-xs px-8 py-4 tracking-widest transition-all duration-300"
          >
            See Our Work
          </button>
        </div>

        {/* Scroll hint removed */}
      </div>
    </section>
  );
}
