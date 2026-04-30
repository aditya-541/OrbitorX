import { Link } from 'react-router-dom';
import { GlitchText } from '../components/GlitchText.jsx';
import { FadeIn } from '../components/Animations.jsx';

export default function NotFoundPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-black overflow-hidden">
      {/* Pixel grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center flex flex-col items-center gap-8 max-w-xl">
        <FadeIn>
          <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase border border-neon/30 px-4 py-2 neon-glow">
            ERROR · 404
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <GlitchText
            text="LOST IN ORBIT"
            tag="h1"
            repeat
            className="font-pixel text-white text-2xl md:text-4xl leading-tight neon-text neon-flicker"
          />
        </FadeIn>

        <FadeIn delay={200}>
          <p className="font-sans text-white/40 text-sm leading-relaxed">
            This sector of space doesn't exist. The coordinates you entered
            are outside our known orbit.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/"
              className="btn-neon font-pixel text-xs px-8 py-4 tracking-widest transition-all duration-300 pulse"
            >
              ← Return to Base
            </Link>
            <Link
              to="/contact"
              className="btn-ghost font-pixel text-xs px-8 py-4 tracking-widest transition-all duration-300"
            >
              Contact Mission Control
            </Link>
          </div>
        </FadeIn>

        {/* Decorative coordinates */}
        <FadeIn delay={400}>
          <p className="font-mono-custom text-white/15 text-[10px] tracking-widest">
            COORDS: 404.000 · NULL · VOID
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
