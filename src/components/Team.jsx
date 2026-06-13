import { useEffect, useRef, useState } from 'react';

const TEAM = [
  { name: 'Aditya Sharma', role: 'Co-Founder & CEO', initials: 'AS' },
  { name: 'Rahul Verma', role: 'Head of Events', initials: 'RV' },
  { name: 'Priya Nair', role: 'Growth Lead', initials: 'PN' },
  { name: 'Karan Mehta', role: 'Tech Lead', initials: 'KM' },
  { name: 'Sneha Reddy', role: 'Community Manager', initials: 'SR' },
  { name: 'Arjun Patel', role: 'Design Director', initials: 'AP' },
];

function TeamCard({ member, index, isVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-xl border bg-white/[0.02] cursor-default"
      style={{
        transform: isVisible
          ? hovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(32px)',
        opacity: isVisible ? 1 : 0,
        borderColor: hovered ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.10)',
        transitionProperty: 'transform, opacity, border-color, background-color',
        transitionDuration: isVisible ? '300ms' : '700ms',
        transitionTimingFunction: 'ease-out',
        transitionDelay: isVisible && !hovered ? `${index * 80}ms` : '0ms',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          backgroundColor: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: hovered ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.10)',
        }}
      >
        <span className="text-white/80 font-mono text-lg font-semibold tracking-wider select-none">
          {member.initials}
        </span>
      </div>

      {/* Name */}
      <p
        className="text-white/85 text-sm font-semibold mb-1.5 leading-snug"
        style={{ fontFamily: 'var(--font-pixel, monospace)' }}
      >
        {member.name}
      </p>

      {/* Role */}
      <p
        className="text-white/40 text-[10px] tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-mono-custom, monospace)' }}
      >
        {member.role}
      </p>
    </div>
  );
}

export default function Team() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]"
    >
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section label */}
        <div
          className="mb-3 transition-all duration-700"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <span
            className="text-white/30 text-[11px] tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-mono-custom, monospace)' }}
          >
            // THE TEAM
          </span>
        </div>

        {/* Heading */}
        <div
          className="mb-14 transition-all duration-700 delay-75"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <h2
            className="text-white/85 text-3xl sm:text-4xl font-semibold leading-tight"
            style={{ fontFamily: 'var(--font-pixel, monospace)' }}
          >
            The people behind OrbitorX
          </h2>
          <p
            className="mt-3 text-white/35 text-sm max-w-xl"
            style={{ fontFamily: 'var(--font-mono-custom, monospace)' }}
          >
            A lean, execution-obsessed crew operating at the intersection of Web3, events, and community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
