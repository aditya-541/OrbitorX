import { FadeIn, CountUp } from './Animations.jsx';

const STATS = [
  { value: 42,  suffix: '+',  label: 'Events Hosted',   desc: 'Hackathons, summits, workshops across Asia & beyond' },
  { value: 120, suffix: '+',  label: 'Startups Scaled',  desc: 'From zero-to-launch to Series A growth' },
  { value: 3,   suffix: 'M+', label: 'Users Reached',   desc: 'Through campaigns, communities, and events' },
];

function StatCard({ stat, index }) {
  return (
    <FadeIn delay={index * 120} className="bg-black stat-card">
      <div className="px-8 py-10 flex flex-col gap-4 border border-neon/10 hover:border-neon/30 transition-all duration-500 group h-full">
        {/* Number */}
        <p className="font-pixel leading-none">
          <CountUp
            end={stat.value}
            suffix={stat.suffix}
            duration={2200}
            className="text-4xl md:text-5xl shimmer-text"
          />
        </p>

        {/* Label */}
        <div className="flex flex-col gap-1.5">
          <p className="font-mono-custom text-white/70 text-xs tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
            {stat.label}
          </p>
          <p className="font-sans text-white/30 text-xs leading-relaxed group-hover:text-white/45 transition-colors duration-300">
            {stat.desc}
          </p>
        </div>

        {/* Accent line */}
        <div className="w-8 h-px bg-acid/50 group-hover:w-full transition-all duration-700 ease-out" />
      </div>
    </FadeIn>
  );
}

export default function About({ hideHeader = false }) {
  return (
    <section id="about" className="bg-black py-28 px-6 section-parallax">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        {!hideHeader && (
          <FadeIn>
            <div className="mb-20 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-px bg-acid opacity-60" />
                <p className="font-mono-custom text-acid/70 text-[10px] tracking-[0.4em] uppercase">// THE NUMBERS</p>
              </div>
              <h2 className="font-pixel text-white text-xl md:text-3xl leading-tight">
                About OrbitorX
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-neon via-acid/50 to-transparent" />
            </div>
          </FadeIn>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neon/8 mb-24">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Manifesto */}
        <FadeIn>
          <div className="relative max-w-4xl mx-auto">
            {/* Corner accents — bigger, more dramatic */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-neon" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-acid" />

            <div
              className="border border-neon/15 p-8 md:p-14"
              style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.025) 0%, rgba(57,255,20,0.01) 100%)' }}
            >
              <p className="font-mono-custom text-neon/40 text-[9px] tracking-[0.4em] uppercase mb-8">
                // MANIFESTO
              </p>

              <blockquote className="font-sans text-white/65 text-base md:text-lg leading-relaxed md:leading-loose">
                OrbitorX exists at the intersection of{' '}
                <span className="text-white font-semibold">ambition and execution</span>.
                We don't just advise — we embed, build, and launch alongside founders who
                refuse to orbit the same problems. Every event is a signal. Every startup we touch
                is a bet we believe in. Every product we shape is a statement about what the future
                should feel like.
              </blockquote>

              <p className="font-pixel text-neon text-sm mt-8 neon-text">
                We don't just launch. We orbit.
              </p>

              {/* Decorative data line */}
              <div className="mt-10 flex items-center gap-4 opacity-30">
                <div className="flex-1 h-px bg-gradient-to-r from-neon to-transparent" />
                <span className="font-mono-custom text-neon text-[8px] tracking-widest">EST.2019 · ORBITORX SYSTEMS</span>
                <div className="flex-1 h-px bg-gradient-to-l from-acid to-transparent" />
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
