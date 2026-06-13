import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    year: "2019",
    title: "OrbitorX Founded",
    description: "Started as a 3-person team in Bengaluru",
  },
  {
    year: "2020",
    title: "First 10 Events",
    description: "Pivoted to virtual events during pandemic",
  },
  {
    year: "2021",
    title: "Web3 Focus",
    description: "Began specializing in blockchain ecosystem events",
  },
  {
    year: "2022",
    title: "25+ Events",
    description: "Expanded to Mumbai, Hyderabad, Delhi",
  },
  {
    year: "2023",
    title: "Ecosystem Partnerships",
    description: "Partnered with 8 L1/L2 protocols",
  },
  {
    year: "2024",
    title: "42+ Events, 3M+ Reached",
    description: "Pan-India presence, $50K+ in prize pools managed",
  },
];

function TimelineItem({ milestone, index, isLast }) {
  const itemRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [past, setPast] = useState(false);

  const isRight = index % 2 === 0;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setPast(true), 400);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const dotSize = visible && !past ? "w-3.5 h-3.5" : "w-2.5 h-2.5";
  const dotColor =
    visible && !past
      ? "bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      : past
      ? "bg-white/20"
      : "bg-white/10";

  const slideFrom = isRight ? "translate-x-8" : "-translate-x-8";

  return (
    <div
      ref={itemRef}
      className={`relative flex items-start ${
        isRight ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row gap-0`}
    >
      {/* Desktop: year label side */}
      <div
        className={`hidden md:flex ${
          isRight ? "justify-end pr-6" : "justify-start pl-6"
        } w-1/2 pt-0.5`}
      >
        <span
          className={`font-mono text-sm text-white/60 tracking-widest transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {milestone.year}
        </span>
      </div>

      {/* Center dot */}
      <div className="relative flex flex-col items-center z-10">
        <div
          className={`rounded-full border border-white/30 transition-all duration-500 ${dotSize} ${dotColor} mt-1.5`}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-white/10 mt-1 min-h-[4rem]" />
        )}
      </div>

      {/* Content side */}
      <div
        className={`flex-1 md:w-1/2 ${
          isRight ? "md:pl-6 pl-4" : "md:pr-6 pl-4"
        } pb-10`}
      >
        {/* Mobile: year label */}
        <span
          className={`md:hidden font-mono text-xs text-white/50 tracking-widest block mb-1 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {milestone.year}
        </span>

        <div
          className={`transition-all duration-700 delay-200 ${
            visible
              ? "opacity-100 translate-x-0 translate-y-0"
              : `opacity-0 ${slideFrom} translate-y-2`
          }`}
        >
          <h3 className="text-white/90 font-semibold text-base leading-snug mb-1">
            {milestone.title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            {milestone.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="py-24 px-4 bg-black" id="timeline">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
          Company History
        </h2>
        <p className="text-center text-white/80 text-2xl font-semibold mb-16 tracking-tight">
          Our Journey
        </p>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10" />

          {/* Mobile: left-aligned line */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col">
            {milestones.map((m, i) => (
              <TimelineItem
                key={m.year}
                milestone={m}
                index={i}
                isLast={i === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
