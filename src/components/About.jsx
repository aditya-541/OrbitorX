import { FadeIn, CountUp } from './Animations.jsx';

const STATS = [
  { value: 42,  suffix: '+', label: 'Events Hosted'  },
  { value: 120, suffix: '+', label: 'Startups Scaled' },
  { value: 3,   suffix: 'M+', label: 'Users Reached' },
];

export default function About() {
  return (
    <section id="about" className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-20 flex flex-col gap-4">
            <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase">// THE NUMBERS</p>
            <h2 className="font-pixel text-white text-xl md:text-3xl leading-tight">About OrbitorX</h2>
            <div className="w-24 h-px bg-neon neon-glow" />
          </div>
        </FadeIn>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neon/10 mb-20">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 150} className="bg-black">
              <div className="px-8 py-12 flex flex-col gap-4 border border-neon/10 hover:border-neon/30 transition-colors duration-300">
                <p className="font-pixel text-neon text-3xl md:text-4xl leading-none">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2200} />
                </p>
                <p className="font-mono-custom text-white/40 text-xs tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Manifesto */}
        <FadeIn>
          <div
            className="relative border border-neon/20 p-8 md:p-12 max-w-4xl mx-auto"
            style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.03) 0%, transparent 100%)' }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon" />

            <p className="font-mono-custom text-neon text-xs tracking-widest mb-6">// MANIFESTO</p>
            <blockquote className="font-sans text-white/70 text-base md:text-lg leading-relaxed">
              OrbitorX exists at the intersection of{' '}
              <span className="text-white font-semibold">ambition and execution</span>.
              We don't just advise — we embed, build, and launch alongside founders who
              refuse to orbit the same problems. Every event is a signal. Every startup we touch
              is a bet we believe in. Every product we shape is a statement about what the future
              should feel like.{' '}
              <span className="neon-text font-semibold">We don't just launch. We orbit.</span>
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
