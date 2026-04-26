import { useState, useCallback } from 'react';
import { events } from '../data/content.js';
import { FadeIn, ParallaxScroll } from './Animations.jsx';

/* ------------------------------------------------------------------ */
/* Lightbox Modal                                                       */
/* ------------------------------------------------------------------ */
function Lightbox({ event, onClose }) {
  if (!event) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${event.title}`}
    >
      <div
        className="relative max-w-4xl w-full mx-4 neon-border p-1 bg-black"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 40px rgba(0,255,255,0.3)' }}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-pixel text-xs text-neon hover:text-white transition-colors tracking-widest"
          id="lightbox-close"
        >
          [CLOSE ✕]
        </button>

        {/* Image */}
        <img
          src={event.src}
          alt={event.title}
          className="w-full h-auto block"
          style={{ maxHeight: '75vh', objectFit: 'cover' }}
        />

        {/* Caption */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-neon/20">
          <span className="font-pixel text-white text-[9px] md:text-xs">{event.title}</span>
          <span className="font-mono-custom text-neon text-xs">
            {event.location} · {event.year}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */
export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const openLightbox  = useCallback((evt) => setSelected(evt), []);
  const closeLightbox = useCallback(() => setSelected(null), []);

  return (
    <section id="work" className="bg-dark-3 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-16 flex flex-col gap-4">
            <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase">// FROM THE GROUND</p>
            <h2 className="font-pixel text-white text-xl md:text-3xl leading-tight">
              Event Gallery
            </h2>
            <div className="w-24 h-px bg-neon neon-glow" />
          </div>
        </FadeIn>

        {/* Masonry‑style grid via CSS columns */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {events.map((evt, i) => (
            <FadeIn key={evt.id} delay={i * 60} className="break-inside-avoid">
              <ParallaxScroll speed={0.04 * ((i % 3) - 1)}>
                <div
                  className="relative group cursor-pointer overflow-hidden border border-transparent hover:border-neon transition-all duration-300"
                  onClick={() => openLightbox(evt)}
                  style={{ boxShadow: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,255,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open photo: ${evt.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(evt)}
                >
                  <img
                    src={evt.src}
                    alt={evt.title}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {/* Scanline flash on overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.04) 0px, rgba(0,255,255,0.04) 1px, transparent 1px, transparent 3px)',
                      }}
                      aria-hidden="true"
                    />
                    <p className="font-pixel text-white text-[9px] relative z-10">{evt.title}</p>
                    <p className="font-mono-custom text-neon text-xs relative z-10">
                      {evt.location} · {evt.year}
                    </p>
                  </div>
                </div>
              </ParallaxScroll>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn className="mt-16 text-center">
          <p className="font-mono-custom text-white/30 text-xs tracking-widest">
            42+ events and counting. Tap any photo to expand.
          </p>
        </FadeIn>
      </div>

      {/* Lightbox */}
      <Lightbox event={selected} onClose={closeLightbox} />
    </section>
  );
}
