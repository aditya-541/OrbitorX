import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/content.js';

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <p className="font-mono-custom text-white/40 text-sm tracking-widest">EVENT NOT FOUND</p>
        <button
          onClick={() => navigate('/work')}
          className="font-mono-custom text-white/50 text-xs tracking-widest border border-white/15 px-6 py-3 hover:border-white/40 hover:text-white transition-all duration-200"
        >
          ← BACK TO WORK
        </button>
      </div>
    );
  }

  const currentIdx = events.findIndex((e) => e.id === event.id);
  const prevEvent = events[currentIdx - 1] || null;
  const nextEvent = events[currentIdx + 1] || null;

  return (
    <div className="min-h-screen bg-black">

      {/* ── Hero image strip ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 55vh, 600px)' }}>
        <img
          src={`/images/events/${event.file}.jpg`}
          alt={event.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.65)' }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        {/* Back button */}
        <button
          onClick={() => navigate('/work')}
          className="absolute top-24 left-6 md:left-10 flex items-center gap-2 font-mono-custom text-white/50 text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors duration-200 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          All Events
        </button>

        {/* Event number */}
        <div
          className="absolute top-24 right-6 md:right-10 font-pixel text-white/10 select-none pointer-events-none"
          style={{ fontSize: 'clamp(60px, 12vw, 130px)', lineHeight: 1 }}
        >
          {String(event.id).padStart(2, '0')}
        </div>

        {/* Bottom title overlay */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-10 pb-8">
          <p className="font-mono-custom text-white/35 text-[10px] tracking-[0.4em] uppercase mb-2">
            {event.subtitle}
          </p>
          <h1
            className="font-pixel text-white leading-none"
            style={{ fontSize: 'clamp(28px, 6vw, 64px)' }}
          >
            {event.title}
          </h1>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">

        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-6 border-y border-white/8 py-5 mb-14">
          <MetaItem label="Location" value={event.location} />
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <MetaItem label="Date" value={event.date} />
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <MetaItem label="Highlights" value={event.tagline} wide />
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

          {/* Left — about */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-px bg-white/20" />
              <p className="font-mono-custom text-white/30 text-[9px] tracking-[0.4em] uppercase">
                About This Event
              </p>
            </div>
            <p className="font-sans text-white/70 text-base leading-[1.85]">
              {event.about}
            </p>

            {/* Tagline callout */}
            <div className="border-l-2 border-white/20 pl-5 py-1">
              <p className="font-mono-custom text-white/50 text-sm tracking-wide">
                {event.tagline}
              </p>
            </div>
          </div>

          {/* Right — sidebar info */}
          <div className="flex flex-col gap-6">
            <SideCard label="Event" value={event.title} />
            <SideCard label="Type" value={event.subtitle} />
            <SideCard label="Location" value={event.location} />
            <SideCard label="Date" value={event.date} />
            <SideCard label="Category" value="OrbitorX Produced" />

            {/* CTA */}
            <button
              onClick={() => navigate('/contact')}
              className="mt-4 w-full font-mono-custom text-[10px] tracking-widest py-4 border border-white/25 text-white/60 hover:border-white/60 hover:text-white transition-all duration-300"
            >
              Work With Us →
            </button>
          </div>
        </div>

        {/* ── Event image — full width below content ── */}
        <div className="mt-16 border border-white/8 overflow-hidden">
          <img
            src={`/images/events/${event.file}.jpg`}
            alt={`${event.title} — full view`}
            className="w-full object-cover"
            style={{ maxHeight: '520px' }}
          />
          <div className="px-5 py-3 border-t border-white/8 flex items-center justify-between">
            <span className="font-mono-custom text-white/25 text-[9px] tracking-widest uppercase">{event.title} · {event.year}</span>
            <span className="font-mono-custom text-white/20 text-[9px] tracking-widest uppercase">OrbitorX</span>
          </div>
        </div>

        {/* ── Next / Prev navigation ── */}
        <div className="mt-20 grid grid-cols-2 gap-4 border-t border-white/8 pt-10">
          {prevEvent ? (
            <button
              onClick={() => navigate(`/events/${prevEvent.id}`)}
              className="group flex flex-col gap-2 p-5 border border-white/8 hover:border-white/20 transition-all duration-300 text-left"
            >
              <span className="font-mono-custom text-white/25 text-[9px] tracking-widest uppercase group-hover:text-white/40 transition-colors">← Previous</span>
              <span className="font-pixel text-white/60 text-sm group-hover:text-white transition-colors">{prevEvent.title}</span>
              <span className="font-mono-custom text-white/25 text-[9px]">{prevEvent.location} · {prevEvent.year}</span>
            </button>
          ) : <div />}

          {nextEvent ? (
            <button
              onClick={() => navigate(`/events/${nextEvent.id}`)}
              className="group flex flex-col gap-2 p-5 border border-white/8 hover:border-white/20 transition-all duration-300 text-right ml-auto w-full"
            >
              <span className="font-mono-custom text-white/25 text-[9px] tracking-widest uppercase group-hover:text-white/40 transition-colors">Next →</span>
              <span className="font-pixel text-white/60 text-sm group-hover:text-white transition-colors">{nextEvent.title}</span>
              <span className="font-mono-custom text-white/25 text-[9px]">{nextEvent.location} · {nextEvent.year}</span>
            </button>
          ) : <div />}
        </div>

      </div>
    </div>
  );
}

function MetaItem({ label, value, wide }) {
  return (
    <div className={`flex flex-col gap-1 ${wide ? 'flex-1 min-w-[200px]' : ''}`}>
      <span className="font-mono-custom text-white/25 text-[9px] tracking-[0.35em] uppercase">{label}</span>
      <span className="font-mono-custom text-white/70 text-xs tracking-wide">{value}</span>
    </div>
  );
}

function SideCard({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/6 pb-4">
      <span className="font-mono-custom text-white/25 text-[9px] tracking-[0.35em] uppercase">{label}</span>
      <span className="font-sans text-white/65 text-sm">{value}</span>
    </div>
  );
}
