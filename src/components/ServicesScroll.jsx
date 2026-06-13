import { useRef, useEffect, useState } from 'react';

/* ─── Service data ─────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'event-ops',
    num: '01',
    tag: 'EVENT OPS³',
    title: 'Event Ops³',
    tagline: 'End-to-end decentralized event execution powering the future of developer-first experiences.',
    summary: 'We architect and execute decentralized hackathons, workshops, and technical events — combining operational precision, transparent builder validation, and on-chain reporting.',
    bullets: ['Speaker & Partner Coordination', 'Logistics & Venue Management', 'Developer Profile Verification', 'Documented Grant Report', 'KPI Fulfillment & Impact Analysis', 'Conference & Ecosystem Alignment'],
    accent: '#00FFFF',
    accentDim: 'rgba(0,255,255,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h16.5m0 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    id: 'marketing',
    num: '02',
    tag: 'MARKETING',
    title: 'Marketing & Promotion',
    tagline: 'Full-stack growth architecture designed to bring ecosystems closer to communities.',
    summary: 'We build awareness engines rooted in authenticity, community-driven storytelling, and data-backed execution — blending grassroots activation with global visibility.',
    bullets: ['KOL & Influencer Marketing', 'Social Media Management', 'Institutional Collaborations', 'Design & Creative Assets', 'Ambassador Programs'],
    accent: '#39FF14',
    accentDim: 'rgba(57,255,20,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535" />
      </svg>
    ),
  },
  {
    id: 'community',
    num: '03',
    tag: 'COMMUNITY',
    title: 'Community',
    tagline: 'We build persistent, high-intent communities where developers progress and evolve.',
    summary: 'Our community engine is built on real participation, learning-first culture, and recognition systems that motivate long-term contribution.',
    bullets: ['NFC Attendance & Rewards', 'X Threads, AMAs & Recaps', 'Retention & Engagement', 'Creator Programs', 'Designed Learning Curriculum'],
    accent: '#7B2FFF',
    accentDim: 'rgba(123,47,255,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'production',
    num: '04',
    tag: 'PRODUCTION',
    title: 'Production',
    tagline: 'Visual storytelling engineered to immortalize every moment.',
    summary: 'We transform moments, missions, and milestones into compelling visual narratives — blending documentary rigor, brand storytelling, and cinematic craft.',
    bullets: ['Photography & Cinematography', '3D Rendering & Modeling', 'Podcast & Live Casting', 'Raw Footage Editing', 'Visual FX & Graphic Design'],
    accent: '#FF6B00',
    accentDim: 'rgba(255,107,0,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
  },
  {
    id: 'web2',
    num: '05',
    tag: 'WEB2 SERVICES',
    title: 'Web2 Services',
    tagline: 'Reliable, scalable digital development forming the backbone of Web3 growth.',
    summary: 'We build the digital backbone that powers scalable growth — combining clean engineering, conversion-driven design, and automation systems.',
    bullets: ['Full-Stack Web Development', 'Case Studies & Analysis', 'Lead Generation & Funnels', 'Impact Tracking Dashboards', 'CRM & SEM Optimization'],
    accent: '#00FFFF',
    accentDim: 'rgba(0,255,255,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: 'content',
    num: '06',
    tag: 'CONTENT & STRATEGY',
    title: 'Content & Strategy',
    tagline: 'Strategic narrative design empowering founders and ecosystems to communicate with precision.',
    summary: 'We engineer narratives that drive perception, adoption, and trust — crafting content that clarifies vision and builds authority across every channel.',
    bullets: ['GTM & Campaign Strategy', 'Blog Writing & Brand Messaging', 'PR & Media Outreach', 'Thought Leadership & Founder Narratives'],
    accent: '#39FF14',
    accentDim: 'rgba(57,255,20,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    id: 'ecosystem',
    num: '07',
    tag: 'ECOSYSTEM GROWTH',
    title: 'Ecosystem Growth',
    tagline: 'Structured partnerships to drive adoption, discover builders, and enable cross-chain collaboration.',
    summary: 'We architect growth through meaningful, outcomes-driven alliances — connecting builders, protocols, and institutions into a unified value network.',
    bullets: ['Cross-Project Collaborations', 'Strategic Partnership Outreach', 'Project Scouting & Onboarding', 'Ecosystem Mapping', 'Accelerator & Grant Support'],
    accent: '#7B2FFF',
    accentDim: 'rgba(123,47,255,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    id: 'onchain',
    num: '08',
    tag: 'ON-CHAIN INTEL',
    title: 'On-Chain Intelligence',
    tagline: 'Participation-driven intelligence layer validating real community progress and impact.',
    summary: 'We bring transparency and verifiable impact to ecosystem growth — mapping engagement on-chain and issuing participation credentials so real builders get recognized.',
    bullets: ['On-Chain Event Tracking', 'NFT Badges & POAP Analytics', 'DAO-Based KPI Tracking'],
    accent: '#FF6B00',
    accentDim: 'rgba(255,107,0,0.08)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

/* ─── Hook: maps scroll position inside outer container → active index ─ */
function useStickyScroll(ref, count) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0-1 within current step

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // total scrollable distance inside the outer container
      const totalH = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const ratio = Math.min(1, scrolled / totalH); // 0 → 1 across whole section

      const step = 1 / count;
      const idx = Math.min(count - 1, Math.floor(ratio / step));
      const stepProgress = (ratio - idx * step) / step; // 0-1 within current step

      setActive(idx);
      setProgress(stepProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, count]);

  return { active, progress };
}

/* ─── Single card (absolutely positioned, transitions in/out) ────── */
function ServiceCard({ service, state }) {
  // state: 'prev' | 'active' | 'next'
  const isActive = state === 'active';
  const isPrev   = state === 'prev';

  const style = {
    position: 'absolute',
    inset: 0,
    transition: 'opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1)',
    opacity:   isActive ? 1 : 0,
    transform: isActive
      ? 'translateY(0) scale(1)'
      : isPrev
        ? 'translateY(-3%) scale(0.97)'
        : 'translateY(4%) scale(0.97)',
    pointerEvents: isActive ? 'auto' : 'none',
  };

  return (
    <div style={style}>
      <div className="h-full flex flex-col lg:flex-row gap-0">

        {/* LEFT — giant number + meta */}
        <div className="lg:w-[340px] shrink-0 flex flex-col justify-between border-r border-white/6 px-10 py-14 lg:py-20">

          {/* Service number */}
          <div>
            <p
              className="font-pixel leading-none select-none"
              style={{
                fontSize: 'clamp(80px, 14vw, 160px)',
                color: service.accent,
                opacity: 0.12,
                lineHeight: 1,
              }}
            >
              {service.num}
            </p>
          </div>

          {/* Tag + title */}
          <div className="flex flex-col gap-4 mt-auto">
            <p
              className="font-mono-custom text-[9px] tracking-[0.35em] uppercase"
              style={{ color: service.accent, opacity: 0.7 }}
            >
              {service.tag}
            </p>
            <h3
              className="font-pixel leading-snug"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                color: '#fff',
              }}
            >
              {service.title}
            </h3>

            {/* Accent line */}
            <div
              className="w-12 h-0.5 rounded-full"
              style={{ background: service.accent, boxShadow: `0 0 8px ${service.accent}` }}
            />
          </div>

          {/* Icon */}
          <div
            className="mt-10 w-14 h-14 shrink-0"
            style={{ color: service.accent, opacity: 0.6 }}
          >
            {service.icon}
          </div>
        </div>

        {/* RIGHT — tagline + summary + bullets */}
        <div className="flex-1 flex flex-col justify-center px-10 lg:px-16 py-14 lg:py-20 gap-8 overflow-y-auto">

          {/* Tagline */}
          <p
            className="font-sans leading-relaxed"
            style={{
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 300,
            }}
          >
            {service.tagline}
          </p>

          {/* Summary */}
          <p className="font-sans text-white/40 text-sm leading-relaxed max-w-xl">
            {service.summary}
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-3">
            {service.bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-center gap-3"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(16px)',
                  transition: `opacity 0.5s ease ${300 + i * 60}ms, transform 0.5s ease ${300 + i * 60}ms`,
                }}
              >
                <span
                  className="shrink-0 w-1 h-1 rounded-full"
                  style={{ background: service.accent, boxShadow: `0 0 6px ${service.accent}` }}
                />
                <span className="font-mono-custom text-white/55 text-xs tracking-wide">{b}</span>
              </li>
            ))}
          </ul>

          {/* CTA row */}
          <div
            className="flex items-center gap-3 mt-2"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.5s ease 700ms',
            }}
          >
            <span
              className="font-mono-custom text-[10px] tracking-widest"
              style={{ color: service.accent }}
            >
              → GET IN TOUCH
            </span>
            <div className="flex-1 h-px" style={{ background: `${service.accent}30` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */
export default function ServicesScroll({ hideHeader = false }) {
  const outerRef = useRef(null);
  const count    = SERVICES.length;
  const { active } = useStickyScroll(outerRef, count);

  const svc = SERVICES[active];

  return (
    <section
      id="services"
      ref={outerRef}
      style={{ height: `${count * 100}vh` }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Dynamic background wash */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${svc.accentDim} 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Pixel grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* ── Content shell ── */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col">

          {/* Top bar: section label + service counter */}
          <div className="flex items-center justify-between pt-6 shrink-0">
            {!hideHeader && (
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-neon/50" />
                <p className="font-mono-custom text-neon/50 text-[9px] tracking-[0.4em] uppercase">
                  // WHAT WE DO
                </p>
              </div>
            )}

            {/* Service index + total */}
            <div className="flex items-center gap-2 ml-auto">
              <span
                className="font-pixel text-xs transition-all duration-400"
                style={{ color: svc.accent }}
              >
                {svc.num}
              </span>
              <span className="font-mono-custom text-white/20 text-xs">/ {String(count).padStart(2,'0')}</span>
            </div>
          </div>

          {/* Title strip at top on mobile */}
          <div className="lg:hidden shrink-0 mt-6 mb-4">
            <p
              className="font-mono-custom text-[9px] tracking-[0.35em] uppercase transition-colors duration-400"
              style={{ color: svc.accent, opacity: 0.7 }}
            >
              {svc.tag}
            </p>
            <h3 className="font-pixel text-white text-lg mt-1">{svc.title}</h3>
          </div>

          {/* ── Card stack area ── */}
          <div className="relative flex-1 min-h-0 mt-4 mb-4">
            {SERVICES.map((s, i) => {
              const state = i === active ? 'active' : i < active ? 'prev' : 'next';
              // Only render active ± 1 for perf
              if (Math.abs(i - active) > 1) return null;
              return <ServiceCard key={s.id} service={s} state={state} />;
            })}
          </div>

          {/* ── Bottom progress bar + dots ── */}
          <div className="shrink-0 pb-8 flex flex-col gap-3">

            {/* Dot navigation */}
            <div className="flex items-center gap-2">
              {SERVICES.map((s, i) => (
                <div
                  key={s.id}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width:  i === active ? '24px' : '6px',
                    height: '6px',
                    background: i === active ? svc.accent : 'rgba(255,255,255,0.15)',
                    boxShadow: i === active ? `0 0 8px ${svc.accent}` : 'none',
                  }}
                />
              ))}

              <span className="font-mono-custom text-white/20 text-[9px] tracking-widest ml-auto">
                SCROLL TO NAVIGATE
              </span>
            </div>

            {/* Progress track */}
            <div className="w-full h-px bg-white/8 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full transition-all duration-300"
                style={{
                  width: `${((active) / (count - 1)) * 100}%`,
                  background: `linear-gradient(90deg, ${svc.accent}, ${svc.accent}80)`,
                  boxShadow: `0 0 6px ${svc.accent}`,
                  transition: 'width 0.4s cubic-bezier(.22,1,.36,1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
