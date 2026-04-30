import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';
import { FadeIn } from '../components/Animations.jsx';

export default function WorkPage() {
  return (
    <>
      {/* Page hero banner */}
      <section className="relative pt-40 pb-20 px-6 bg-dark-3 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-widest text-white/30 mb-8">
              <Link to="/" className="hover:text-neon transition-colors duration-200">HOME</Link>
              <span>/</span>
              <span className="text-neon">WORK</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase mb-4">
              // FROM THE GROUND
            </p>
            <h1 className="font-pixel text-white text-2xl md:text-5xl leading-tight mb-6">
              Event Gallery
            </h1>
            <div className="w-24 h-px bg-neon neon-glow mb-6" />
            <p className="font-sans text-white/40 text-sm md:text-base max-w-2xl leading-relaxed">
              42+ events across India and beyond. Every frame is proof of execution —
              real builders, real stages, real impact.
            </p>
          </FadeIn>
        </div>
      </section>

      <Gallery hideHeader />
    </>
  );
}
