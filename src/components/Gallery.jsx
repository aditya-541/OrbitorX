import { useState, useCallback, useRef, useEffect } from 'react';
import { events } from '../data/content.js';

/* ------------------------------------------------------------------ */
/* Scroll-reveal hook                                                   */
/* ------------------------------------------------------------------ */
function useScrollReveal(delay = 0, threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return [ref, visible];
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                             */
/* ------------------------------------------------------------------ */
function Lightbox({ event, onClose, onPrev, onNext }) {
  if (!event) return null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${event.title}`}
      style={{ animation: 'fade-in 0.25s ease forwards' }}
    >
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls row */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              className="font-mono-custom text-white/50 text-xs border border-white/15 px-3 py-1.5 hover:border-neon hover:text-neon transition-all duration-200"
              aria-label="Previous"
            >
              ← PREV
            </button>
            <button
              onClick={onNext}
              className="font-mono-custom text-white/50 text-xs border border-white/15 px-3 py-1.5 hover:border-neon hover:text-neon transition-all duration-200"
              aria-label="Next"
            >
              NEXT →
            </button>
          </div>
          <button
            onClick={onClose}
            className="font-pixel text-xs text-neon/70 hover:text-white transition-colors tracking-widest"
            id="lightbox-close"
          >
            [CLOSE ✕]
          </button>
        </div>

        {/* Image container */}
        <div
          className="border border-neon/30 bg-black overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(0,255,255,0.15), 0 0 120px rgba(0,255,255,0.06)' }}
        >
          <img
            src={`/images/events/${event.file}.jpg`}
            alt={event.title}
            className="w-full block"
            style={{ maxHeight: '72vh', objectFit: 'cover' }}
          />
          {/* Caption + about bar */}
          <div className="border-t border-neon/15 bg-dark-2">
            {/* Title row */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neon" style={{ boxShadow: '0 0 6px #00FFFF' }} />
                <span className="font-mono-custom text-white text-xs tracking-wide font-semibold">{event.title}</span>
                {event.subtitle && (
                  <span className="font-mono-custom text-white/30 text-[9px] tracking-widest hidden sm:inline">
                    · {event.subtitle.toUpperCase()}
                  </span>
                )}
              </div>
              <span className="font-mono-custom text-neon/60 text-[10px] tracking-widest">
                {event.location} · {event.year}
              </span>
            </div>
            {/* Tagline + about */}
            {(event.tagline || event.about) && (
              <div className="px-5 py-4 flex flex-col gap-2">
                {event.tagline && (
                  <p className="font-mono-custom text-acid/70 text-[10px] tracking-widest">{event.tagline}</p>
                )}
                {event.about && (
                  <p className="font-sans text-white/45 text-xs leading-relaxed max-w-2xl">{event.about}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal drag-scroll strip (featured)                             */
/* ------------------------------------------------------------------ */
function HorizontalStrip({ events: evts, onOpen }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const [labelRef, labelVisible] = useScrollReveal(0);

  return (
    <div className="mb-20">
      <div
        ref={labelRef}
        className="flex items-center gap-4 mb-6 transition-all duration-700"
        style={{
          opacity: labelVisible ? 1 : 0,
          transform: labelVisible ? 'none' : 'translateX(-24px)',
        }}
      >
        <div className="w-5 h-px bg-acid opacity-70" />
        <p className="font-mono-custom text-acid/70 text-[9px] tracking-[0.4em] uppercase">
          // FEATURED — DRAG TO EXPLORE
        </p>
        <div className="flex-1 h-px bg-neon/8" />
        <p className="font-mono-custom text-white/20 text-[9px] tracking-widest">{evts.length} SESSIONS</p>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4 select-none"
        style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {evts.map((evt, i) => (
          <HorizontalCard key={evt.id} evt={evt} index={i} onOpen={onOpen} />
        ))}
        <div className="shrink-0 w-12" />
      </div>
    </div>
  );
}

function HorizontalCard({ evt, index, onOpen }) {
  const [ref, visible] = useScrollReveal(index * 80);

  return (
    <div
      ref={ref}
      className="shrink-0 w-72 md:w-80 relative group cursor-pointer overflow-hidden border border-white/8 hover:border-neon"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(40px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 80}ms, border-color 0.3s ease`,
      }}
      onClick={() => onOpen(evt)}
      tabIndex={0}
      role="button"
      aria-label={`Open: ${evt.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(evt)}
    >
      <img
        src={`/images/events/${evt.file}.jpg`}
        alt={evt.title}
        className="w-full h-52 object-cover block transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        draggable={false}
      />

      {/* Bottom gradient always visible */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

      {/* Hover scanlines */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.06) 0px, rgba(0,255,255,0.06) 1px, transparent 1px, transparent 3px)' }}
        aria-hidden="true"
      />

      {/* Caption */}
      <div className="absolute bottom-0 inset-x-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-mono-custom text-white text-xs font-semibold tracking-wide">{evt.title}</p>
        {evt.subtitle && <p className="font-sans text-white/45 text-[10px] mt-0.5">{evt.subtitle}</p>}
        <p className="font-mono-custom text-neon/70 text-[9px] tracking-widest mt-0.5">{evt.location} · {evt.year}</p>
      </div>

      {/* Index */}
      <div className="absolute top-3 right-3 font-pixel text-neon/30 text-[8px]">
        {String(evt.id).padStart(2, '0')}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Masonry grid card                                                    */
/* ------------------------------------------------------------------ */
function MasonryCard({ evt, index, onOpen }) {
  const [ref, visible] = useScrollReveal(index * 70);

  return (
    <div
      ref={ref}
      className="break-inside-avoid mb-4 relative group cursor-pointer overflow-hidden border border-white/6 hover:border-neon"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 70}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${index * 70}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
      onClick={() => onOpen(evt)}
      tabIndex={0}
      role="button"
      aria-label={`Open photo: ${evt.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(evt)}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 24px rgba(0,255,255,0.18)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <img
        src={`/images/events/${evt.file}.jpg`}
        alt={evt.title}
        loading="lazy"
        className="w-full h-auto block transition-transform duration-600 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.05) 0px, rgba(0,255,255,0.05) 1px, transparent 1px, transparent 3px)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-mono-custom text-white text-xs font-semibold">{evt.title}</p>
            {evt.subtitle && <p className="font-sans text-white/50 text-[10px] leading-tight">{evt.subtitle}</p>}
            <p className="font-mono-custom text-neon text-[9px] tracking-widest">{evt.location} · {evt.year}</p>
          </div>
          <div className="w-7 h-7 border border-neon/50 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-neon">
              <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Gallery export                                                  */
/* ------------------------------------------------------------------ */
export default function Gallery({ hideHeader = false }) {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openLightbox = useCallback((evt) => {
    const idx = events.findIndex((e) => e.id === evt.id);
    setSelectedIdx(idx);
  }, []);
  const closeLightbox = useCallback(() => setSelectedIdx(null), []);
  const goPrev = useCallback(() => setSelectedIdx((i) => (i - 1 + events.length) % events.length), []);
  const goNext = useCallback(() => setSelectedIdx((i) => (i + 1) % events.length), []);

  const [headerRef, headerVisible] = useScrollReveal(0);

  return (
    <section id="work" className="bg-dark-3 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        {!hideHeader && (
          <div
            ref={headerRef}
            className="mb-16 flex flex-col gap-4 transition-all duration-700"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'none' : 'translateY(24px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-neon opacity-60" />
              <p className="font-mono-custom text-neon/70 text-[10px] tracking-[0.4em] uppercase">// FROM THE GROUND</p>
            </div>
            <h2 className="font-pixel text-white text-xl md:text-3xl leading-tight">Event Gallery</h2>
            <div className="w-20 h-px bg-gradient-to-r from-neon via-acid/50 to-transparent" />
            <p className="font-sans text-white/35 text-sm max-w-lg leading-relaxed mt-1">
              42+ events across India. Real builders. Real energy. Click any photo to expand.
            </p>
          </div>
        )}

        {/* Horizontal drag-scroll strip */}
        <HorizontalStrip events={events} onOpen={openLightbox} />

        {/* Masonry grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-neon/40" />
            <p className="font-mono-custom text-white/25 text-[9px] tracking-[0.4em] uppercase">// ALL EVENTS</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {events.map((evt, i) => (
              <MasonryCard key={evt.id} evt={evt} index={i} onOpen={openLightbox} />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="font-mono-custom text-white/20 text-[10px] tracking-widest">
            42+ EVENTS AND COUNTING // MORE IN ORBIT
          </p>
        </div>
      </div>

      <Lightbox
        event={selectedIdx !== null ? events[selectedIdx] : null}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </section>
  );
}
