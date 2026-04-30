import { useState } from 'react';
import { FadeIn } from './Animations.jsx';

const SERVICES = [
  {
    id: 'event-ops',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    tag: 'EVENT OPS³',
    title: 'Event Ops³',
    tagline: 'End-to-end decentralized event execution powering the future of developer-first experiences.',
    summary:
      'We architect and execute decentralized hackathons, workshops, and technical events from the ground up — combining operational precision, transparent builder validation, partner-first coordination, and on-chain reporting.',
    bullets: [
      { label: 'Speaker & Partner Coordination', desc: 'Curated talent pipeline — scouting aligned speakers, mentors, judges, and ecosystem partners with full event-day orchestration.' },
      { label: 'Logistics & Venue Management', desc: 'Venue scouting, negotiation, technical setup, travel, hospitality, and stage management for seamless execution.' },
      { label: 'Developer Profile Verification & Selection', desc: 'Screening participant profiles, portfolios, and on-chain credentials to ensure real builders are admitted.' },
      { label: 'Documented Grant Report (On-Chain Report Card)', desc: 'Structured, timestamped proof-of-execution: attendance, submissions, partner metrics, outcomes — published on-chain.' },
      { label: 'KPI Fulfillment & Impact Analysis', desc: 'Measurable KPIs mapped to attendance quality, builder output, partnership depth, and media reach.' },
      { label: 'Conference & Ecosystem Alignment', desc: 'Integration with major ecosystem calendars — co-events, side-tracks, meetups, and collaborative experiences.' },
    ],
  },
  {
    id: 'marketing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    tag: 'MARKETING',
    title: 'Marketing & Promotion',
    tagline: 'Full-stack growth architecture designed to bring ecosystems closer to communities.',
    summary:
      'We build awareness engines rooted in authenticity, community-driven storytelling, and data-backed execution — blending grassroots activation with global visibility.',
    bullets: [
      { label: 'KOL & Influencer Marketing', desc: 'Credible creators, founders, and technical voices amplifying narrative — not noise — with measurable engagement.' },
      { label: 'Social Media & Community Management', desc: 'Brand communication across X, LinkedIn, Discord, Telegram — consistent voice, real-time storytelling, and content cadences.' },
      { label: 'Institutional & Ecosystem Collaborations', desc: 'Universities, accelerators, L1/L2 ecosystems, and dev guilds onboarded into co-campaigns and technical partnerships.' },
      { label: 'Design & Creative Asset Production', desc: 'High-quality graphics, motion reels, clips, teasers, and event visuals reinforcing credibility and premium storytelling.' },
      { label: 'Ambassador & Referral Program', desc: 'Structured ambassador engines with onboarding, training, incentive systems, and referral structures for grassroots growth.' },
    ],
  },
  {
    id: 'community',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    tag: 'COMMUNITY',
    title: 'Community',
    tagline: 'We build persistent, high-intent communities where developers progress, participate, and evolve.',
    summary:
      'Our community engine is built on real participation, learning-first culture, and recognition systems that motivate long-term contribution — transforming followers into loyal contributors, creators, and ecosystem champions.',
    bullets: [
      { label: 'NFC Attendance & Rewards', desc: 'NFC check-ins and reward systems verifying real participation, rewarding consistency, and tracking contribution journeys.' },
      { label: 'X Threads, AMAs & Event Recaps', desc: 'Narrative-driven content cycles — live AMAs, community spotlights, event recaps, and topical threads for real-time dialogue.' },
      { label: 'Retention & Engagement Strategy', desc: 'Habit-forming community systems: activity loops, missions, reward cycles, participation streaks, and contribution tiers.' },
      { label: 'Yappers & Aura Creator Programs', desc: 'Structured creator-in-community programs empowering members to generate content, host discussions, and amplify narratives.' },
      { label: 'Designed Learning Curriculum', desc: 'Modular, gamified learning journeys with progression badges, project-based learning, cohort tracks, and mentorship loops.' },
    ],
  },
  {
    id: 'production',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    tag: 'PRODUCTION',
    title: 'Production',
    tagline: 'Visual storytelling engineered to immortalize every moment.',
    summary:
      'We transform moments, missions, and milestones into compelling visual narratives — blending documentary rigor, brand storytelling, and cinematic craft to capture real builder energy and ecosystem momentum.',
    bullets: [
      { label: 'Photography & Cinematography', desc: 'High-quality photo and video coverage capturing key moments, founder stories, community interactions, and environment shots.' },
      { label: '3D Rendering & Modeling', desc: 'Immersive 3D environments, product renders, digital worlds, and brand-driven visuals for campaigns and metaverse activations.' },
      { label: 'Podcast Production & Live Casting', desc: 'End-to-end production for founder talks, ecosystem interviews, community podcasts, and live broadcasts.' },
      { label: 'Raw Footage Editing & Motion Design', desc: 'Polished reels, highlight trailers, explainers, developer spotlights, and fast-cut motion graphics for social acceleration.' },
      { label: 'Visual FX & Graphic Design', desc: 'High-energy visuals — title sequences, VFX overlays, banners, thumbnails, and ecosystem-aligned branding kits.' },
    ],
  },
  {
    id: 'web2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    tag: 'WEB2 SERVICES',
    title: 'Web2 Services',
    tagline: 'Reliable, scalable, high-performance digital development forming the backbone of modern Web3 growth.',
    summary:
      'We build the digital backbone that powers scalable growth and credibility — combining clean engineering, conversion-driven design, and automation systems to help teams operate efficiently and track real performance.',
    bullets: [
      { label: 'Application & Full-Stack Web Development', desc: 'Responsive, fast, and secure applications with intuitive user journeys, solid backend architecture, and modern UI/UX.' },
      { label: 'Case Studies & Performance Analysis', desc: 'Structured case studies and data-driven storytelling documenting product wins, community success, and ecosystem achievements.' },
      { label: 'Lead Generation & Funnel Optimization', desc: 'Acquisition systems and optimized funnels using landing pages, automation flows, drip journeys, and conversion tracking.' },
      { label: 'Impact Tracking Dashboards', desc: 'Custom dashboards capturing growth, user behavior, event insights, and builder output — turning raw data into actionable intelligence.' },
      { label: 'CRM Automation & SEM Optimization', desc: 'CRM integration, automated outreach pipelines, and paid search management for predictable business growth.' },
    ],
  },
  {
    id: 'content',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    tag: 'CONTENT & STRATEGY',
    title: 'Content & Strategy',
    tagline: 'Strategic narrative design empowering founders, products, and ecosystems to communicate with precision.',
    summary:
      'We engineer narratives that drive perception, adoption, and trust — crafting content that clarifies vision, builds authority, and communicates value with precision across every channel and stakeholder layer.',
    bullets: [
      { label: 'GTM & Campaign Launch Strategy', desc: 'Structured go-to-market strategies with messaging pillars, channel sequencing, content funnels, and KPIs for adoption.' },
      { label: 'Blog Writing & Brand Messaging', desc: 'High-clarity blog content, technical explainers, ecosystem updates, and narrative assets with brand tone and positioning.' },
      { label: 'PR & Media Outreach', desc: 'Relevant media coverage coordinated with reporters, Web3 outlets, newsletters, and ecosystem platforms.' },
      { label: 'Thought Leadership & Founder Narratives', desc: 'Founder voices shaped into strategic public assets — opinion pieces, keynote scripts, podcast storylines, and panel talking points.' },
    ],
  },
  {
    id: 'ecosystem',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    tag: 'ECOSYSTEM GROWTH',
    title: 'Ecosystem Growth & Partnerships',
    tagline: 'Structured partnerships to drive adoption, discover builders, and enable cross-chain collaboration.',
    summary:
      'We architect growth through meaningful, outcomes-driven alliances — connecting builders, protocols, infrastructure partners, and institutions into a unified value network.',
    bullets: [
      { label: 'Cross-Project Collaborations (L1s, L2s, Exchanges, Protocols)', desc: 'Strategic collaboration across chains, infrastructure teams, exchanges, and protocols — joint campaigns, hackathon tracks, and co-marketing.' },
      { label: 'Strategic Partnership Outreach', desc: 'End-to-end partner acquisition — sourcing aligned partners, structuring value-exchange proposals, and leading outreach.' },
      { label: 'Project Scouting & Builder Onboarding', desc: 'High-quality projects, founders, and developer talent onboarded into ecosystem programs, grant funnels, and hackathons.' },
      { label: 'Ecosystem Mapping & Relationship Management', desc: 'Structured relationship maps and CRM pipelines tracking partner maturity, cross-team collaboration, and ecosystem influence.' },
      { label: 'Accelerator & Grant Program Support', desc: 'Support through accelerator programs, funding tracks, and grant applications — including milestone reporting and performance support.' },
    ],
  },
  {
    id: 'onchain',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    tag: 'ON-CHAIN INTEL',
    title: 'On-Chain Intelligence',
    tagline: 'Participation-driven intelligence layer validating real community progress, contribution, and impact.',
    summary:
      'We bring transparency, accountability, and verifiable impact to ecosystem growth — mapping engagement on-chain, issuing participation credentials, and tracking contribution data so real builders get recognized.',
    bullets: [
      { label: 'On-Chain Event Tracking & Verification', desc: 'Event participation and milestone activity recorded on-chain — validating attendance, submission quality, and contributor behavior.' },
      { label: 'NFT Badges & Proof-of-Attendance Analytics', desc: 'Digital credentials and NFT badges tied to real activity — tracking engagement patterns, contribution depth, and cohort retention.' },
      { label: 'DAO-Based KPI Tracking', desc: 'DAO-driven reporting frameworks mapping program KPIs to verifiable metrics for ecosystem funds, delegates, and partners.' },
    ],
  },
];

function BulletItem({ label, desc }) {
  return (
    <li className="flex flex-col gap-1 border-l border-neon/20 pl-4 group/bullet hover:border-neon transition-colors duration-200">
      <span className="font-mono-custom text-white/80 text-[11px] tracking-wide group-hover/bullet:text-neon transition-colors duration-200">
        ▪ {label}
      </span>
      <span className="font-sans text-white/40 text-xs leading-relaxed group-hover/bullet:text-white/60 transition-colors duration-200">
        {desc}
      </span>
    </li>
  );
}

function ServiceCard({ service, index, isOpen, onToggle }) {
  return (
    <FadeIn delay={index * 80}>
      <div
        className={`service-card relative bg-dark-2 rounded-none flex flex-col overflow-hidden cursor-pointer group transition-all duration-300 ${
          isOpen ? 'border-neon/60 shadow-neon' : ''
        }`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        {/* Corner accents */}
        <div className={`absolute top-0 left-0 w-6 h-6 border-t border-l transition-colors duration-300 ${isOpen ? 'border-neon' : 'border-neon/30 group-hover:border-neon'}`} />
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b border-r transition-colors duration-300 ${isOpen ? 'border-neon' : 'border-neon/30 group-hover:border-neon'}`} />

        {/* Header row */}
        <div className="flex items-start gap-4 p-6">
          {/* Icon */}
          <div className={`shrink-0 p-2 border transition-all duration-300 ${isOpen ? 'border-neon text-neon' : 'border-neon/20 text-neon/50 group-hover:border-neon/60 group-hover:text-neon'}`}>
            {service.icon}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <p className="font-mono-custom text-neon/50 text-[9px] tracking-[0.3em] uppercase mb-1">
              {service.tag}
            </p>
            <h3 className={`font-pixel text-[10px] md:text-xs leading-snug transition-colors duration-300 ${isOpen ? 'text-neon' : 'text-white group-hover:text-neon'}`}>
              {service.title}
            </h3>
          </div>

          {/* Toggle indicator */}
          <div className={`shrink-0 font-mono-custom text-neon text-xs border border-neon/30 w-7 h-7 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-neon/10 border-neon rotate-45' : 'group-hover:border-neon/60'}`}>
            +
          </div>
        </div>

        {/* Tagline — always visible */}
        <p className={`font-sans text-xs leading-relaxed px-6 pb-4 transition-colors duration-300 ${isOpen ? 'text-white/70' : 'text-white/40 group-hover:text-white/60'}`}>
          {service.tagline}
        </p>

        {/* Expanded content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: isOpen ? '1200px' : '0px', opacity: isOpen ? 1 : 0 }}
        >
          <div className="px-6 pb-6 flex flex-col gap-6 border-t border-neon/10 pt-5">
            {/* Summary */}
            <p className="font-sans text-white/60 text-sm leading-relaxed border-l-2 border-neon/40 pl-4">
              {service.summary}
            </p>

            {/* Bullet list */}
            <ul className="flex flex-col gap-4">
              {service.bullets.map((b) => (
                <BulletItem key={b.label} label={b.label} desc={b.desc} />
              ))}
            </ul>

            {/* CTA row */}
            <div className="flex items-center gap-3 pt-2">
              <span className="font-mono-custom text-neon text-[10px] tracking-widest">→ GET IN TOUCH</span>
              <div className="flex-1 h-px bg-neon/20" />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Services({ hideHeader = false }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="services" className="bg-black py-28 px-6 section-parallax">
      <div className="max-w-7xl mx-auto">

        {/* Section header — hidden when page already has its own banner */}
        {!hideHeader && (
          <FadeIn>
            <div className="mb-20 flex flex-col gap-4">
              <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase">// WHAT WE DO</p>
              <h2 className="font-pixel text-white text-xl md:text-3xl leading-tight">
                Our Services
              </h2>
              <div className="w-24 h-px bg-neon neon-glow" />
              <p className="font-sans text-white/40 text-sm max-w-xl leading-relaxed mt-2">
                Eight integrated service pillars — from on-chain intelligence to cinematic production — engineered to launch, scale, and sustain ecosystems.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neon/10">
          {SERVICES.map((svc, i) => (
            <div key={svc.id} className="bg-black">
              <ServiceCard
                service={svc}
                index={i}
                isOpen={openId === svc.id}
                onToggle={() => toggle(svc.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <FadeIn className="mt-10 text-center">
          <p className="font-mono-custom text-white/20 text-[10px] tracking-widest">
            CLICK ANY SERVICE TO EXPAND // {SERVICES.length} PILLARS ACTIVE
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
