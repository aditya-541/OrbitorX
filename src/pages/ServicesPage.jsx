import { Link } from 'react-router-dom';
import Services from '../components/ServicesScroll.jsx';
import { FadeIn } from '../components/Animations.jsx';

export default function ServicesPage() {
  return (
    <>
      {/* Page hero banner */}
      <section className="relative pt-40 pb-20 px-6 bg-black overflow-hidden">
        {/* Pixel grid bg */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.1) 1px, transparent 1px)',
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

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-widest text-white/30 mb-8">
              <Link to="/" className="hover:text-neon transition-colors duration-200">HOME</Link>
              <span>/</span>
              <span className="text-neon">SERVICES</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase mb-4">
              // WHAT WE DO
            </p>
            <h1 className="font-pixel text-white text-2xl md:text-5xl leading-tight mb-6">
              Our Services
            </h1>
            <div className="w-24 h-px bg-neon neon-glow mb-6" />
            <p className="font-sans text-white/40 text-sm md:text-base max-w-2xl leading-relaxed">
              Eight integrated service pillars — from on-chain intelligence to cinematic production —
              engineered to launch, scale, and sustain ecosystems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services section (reuses the component, hides its own header) */}
      <Services hideHeader />
    </>
  );
}
