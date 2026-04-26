import { clients } from '../data/content.js';
import { FadeIn } from './Animations.jsx';

// Double the list for seamless infinite loop
const doubled = [...clients, ...clients];

export default function Clients() {
  return (
    <section className="bg-dark-2 py-20 px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <FadeIn>
          <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase">
            // TRUSTED BY
          </p>
        </FadeIn>
      </div>

      {/* Marquee container */}
      <div
        className="relative"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        aria-label="Clients ticker"
      >
        <div className="marquee-track select-none">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="inline-flex items-center mx-4 shrink-0"
            >
              <span
                className="font-mono-custom text-xs tracking-widest text-white/50 hover:text-neon transition-colors duration-300 border border-white/10 hover:border-neon/50 px-5 py-2 whitespace-nowrap"
                style={{ transition: 'all 0.3s ease' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
