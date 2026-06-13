import { Link } from 'react-router-dom';
import About    from '../components/About.jsx';
import Clients  from '../components/Clients.jsx';
import Team     from '../components/Team.jsx';
import Timeline from '../components/Timeline.jsx';
import { FadeIn } from '../components/Animations.jsx';

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-40 pb-20 px-6 bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] tracking-widest text-white/25 mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors duration-200">HOME</Link>
              <span>/</span>
              <span className="text-white/50">ABOUT</span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-white/25" />
              <p className="font-mono-custom text-white/30 text-[10px] tracking-[0.4em] uppercase">// THE STORY</p>
            </div>
            <h1 className="font-pixel text-white text-2xl md:text-5xl leading-tight mb-6">
              About OrbitorX
            </h1>
            <div className="w-20 h-px bg-white/20 mb-6" />
            <p className="font-sans text-white/45 text-sm md:text-base max-w-2xl leading-relaxed">
              We exist at the intersection of ambition and execution — embedding alongside
              founders who refuse to orbit the same problems.
            </p>
          </FadeIn>
        </div>
      </section>

      <About hideHeader />
      <Timeline />
      <Team />
      <Clients />
    </>
  );
}
