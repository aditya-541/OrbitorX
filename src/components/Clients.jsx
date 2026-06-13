import { useRef, useEffect } from 'react';
import { clients } from '../data/content.js';
import { FadeIn } from './Animations.jsx';

const tripled = [...clients, ...clients, ...clients];

export default function Clients() {
  const wrapRef = useRef(null);

  /* subtle 3-D tilt on mouse move */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect  = el.getBoundingClientRect();
      const relY  = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      el.style.transform = `perspective(900px) rotateX(${relY * -4}deg)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(900px) rotateX(0deg)'; };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="clients" className="bg-dark-2 py-20 px-0 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <FadeIn>
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-white/25" />
            <p className="font-mono-custom text-white/30 text-[10px] tracking-[0.4em] uppercase">
              // TRUSTED BY BUILDERS ACROSS ECOSYSTEMS
            </p>
          </div>
        </FadeIn>
      </div>

      {/* 3-D perspective tilt wrapper */}
      <div
        ref={wrapRef}
        style={{ transition: 'transform 0.4s ease', willChange: 'transform' }}
      >
        {/* Row 1 — left to right */}
        <div
          className="relative overflow-hidden mb-4"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div
            className="flex w-max select-none"
            style={{ animation: 'marquee 28s linear infinite' }}
          >
            {tripled.map((name, i) => (
              <ClientChip key={`r1-${i}`} name={name} />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left (reversed) */}
        <div
          className="relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div
            className="flex w-max select-none"
            style={{ animation: 'marquee 22s linear infinite reverse' }}
          >
            {[...tripled].reverse().map((name, i) => (
              <ClientChip key={`r2-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <FadeIn className="mt-14 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-px bg-white/5">
          {[
            { v: '12+', l: 'Ecosystem Partners' },
            { v: '3M+', l: 'Users Reached'      },
            { v: '42+', l: 'Events Executed'     },
          ].map((s) => (
            <div key={s.l} className="bg-dark-2 px-6 py-5 text-center">
              <p className="font-pixel text-white text-lg mb-1">{s.v}</p>
              <p className="font-mono-custom text-white/30 text-[9px] tracking-widest uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function ClientChip({ name }) {
  return (
    <div className="inline-flex items-center mx-3 shrink-0 group cursor-default">
      <span
        className="font-mono-custom text-[11px] tracking-widest px-5 py-2.5 whitespace-nowrap border transition-all duration-300"
        style={{
          color: 'rgba(255,255,255,0.35)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        }}
      >
        {name}
      </span>
    </div>
  );
}
