import { FadeIn } from './Animations.jsx';

const SERVICES = [
  {
    id: 'tech-events',
    icon: '⚡',
    title: 'Tech Event Hosting',
    desc: 'Full‑stack event production — from concept to post‑event analytics.',
  },
  {
    id: 'startup-scaling',
    icon: '🚀',
    title: 'Startup Scaling',
    desc: 'Systems, talent, and frameworks to 10× your growth trajectory.',
  },
  {
    id: 'user-acquisition',
    icon: '📡',
    title: 'User Acquisition & Growth',
    desc: 'Data-driven loops that turn strangers into loyal power users.',
  },
  {
    id: 'marketing',
    icon: '📣',
    title: 'Marketing & Brand Strategy',
    desc: 'Brand positioning and campaigns that stick in the orbital memory.',
  },
  {
    id: 'product-launches',
    icon: '🛸',
    title: 'New Product Launches',
    desc: 'Go‑to‑market playbooks engineered for maximum day‑one velocity.',
  },
  {
    id: 'product-design',
    icon: '🎛️',
    title: 'Product Experience Design',
    desc: 'Interfaces and flows that make users feel the difference.',
  },
];

function ServiceCard({ icon, title, desc, index }) {
  return (
    <FadeIn delay={index * 100}>
      <div
        className="service-card relative bg-dark-2 rounded-none p-6 h-full flex flex-col gap-4 cursor-default group overflow-hidden"
      >
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neon/40 group-hover:border-neon transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neon/40 group-hover:border-neon transition-colors duration-300" />

        {/* Icon */}
        <div className="text-3xl">{icon}</div>

        {/* Title */}
        <h3 className="font-pixel text-white text-[10px] md:text-xs leading-tight group-hover:text-neon transition-colors duration-300">
          {title}
        </h3>

        {/* Desc */}
        <p className="font-sans text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
          {desc}
        </p>

        {/* Hover caret */}
        <span className="font-mono-custom text-neon text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
          → EXPLORE
        </span>
      </div>
    </FadeIn>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-black py-28 px-6 section-parallax">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <FadeIn>
          <div className="mb-16 flex flex-col gap-4">
            <p className="font-mono-custom text-neon text-xs tracking-[0.4em] uppercase">// WHAT WE DO</p>
            <h2 className="font-pixel text-white text-xl md:text-3xl leading-tight">
              Our Services
            </h2>
            <div className="w-24 h-px bg-neon neon-glow" />
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neon/10">
          {SERVICES.map((svc, i) => (
            <div key={svc.id} className="bg-black">
              <ServiceCard {...svc} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
