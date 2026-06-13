import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "OrbitorX helped us ship our DeFi protocol MVP in weeks, not months. The team understood Web3 architecture from day one — no hand-holding needed.",
    author: "Arjun Mehta",
    role: "Co-founder & CTO",
    company: "Karak Network",
    initials: "AM",
  },
  {
    quote:
      "We needed a partner who could move fast without breaking things. OrbitorX delivered a production-grade smart contract suite with full audit trails. Exactly what an early-stage startup needs.",
    author: "Priya Shankar",
    role: "Founder",
    company: "Brahma Finance",
    initials: "PS",
  },
  {
    quote:
      "The frontend work OrbitorX built for our NFT marketplace is clean, performant, and scales effortlessly. Our users noticed the difference immediately.",
    author: "Rohan Bhatia",
    role: "Product Lead",
    company: "SuperFarm India",
    initials: "RB",
  },
  {
    quote:
      "Working with OrbitorX felt like having a senior engineering team embedded in our startup. They pushed back on bad ideas and shipped the right ones — that's rare.",
    author: "Neha Kapoor",
    role: "CEO",
    company: "Mudrex",
    initials: "NK",
  },
  {
    quote:
      "Our on-chain analytics dashboard went from a rough spec to a live product in under six weeks. OrbitorX's execution pace is unlike any agency I've worked with.",
    author: "Vikram Iyer",
    role: "Head of Engineering",
    company: "Polygon Ventures",
    initials: "VI",
  },
  {
    quote:
      "They didn't just write code — they challenged our architecture, proposed better patterns, and delivered something we're genuinely proud to show investors.",
    author: "Siddharth Rao",
    role: "Founder & CEO",
    company: "Stackr Labs",
    initials: "SR",
  },
];

const VISIBLE_COUNT_DESKTOP = 3;
const ROTATE_INTERVAL = 4000;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const total = testimonials.length;

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex((index + total) % total);
        setAnimating(false);
      }, 350);
    },
    [animating, total]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(activeIndex + 1, "next");
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex, goTo]);

  const getVisibleIndices = () => {
    return [
      activeIndex % total,
      (activeIndex + 1) % total,
      (activeIndex + 2) % total,
    ];
  };

  const slideClass =
    direction === "next"
      ? animating
        ? "-translate-x-4 opacity-0"
        : "translate-x-0 opacity-100"
      : animating
      ? "translate-x-4 opacity-0"
      : "translate-x-0 opacity-100";

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 60%, rgba(255,255,255,0.015) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
            // WHAT BUILDERS SAY
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/85 mb-2">
          Trusted by founders who ship.
        </h2>
        <p className="text-sm text-white/35 mb-14 max-w-xl">
          Real words from teams that have worked with OrbitorX to bring ideas
          on-chain and on-time.
        </p>

        {/* Cards — desktop: 3 visible, mobile: 1 */}
        <div className="relative overflow-hidden">
          {/* Desktop grid */}
          <div
            className={`hidden md:grid grid-cols-3 gap-5 transition-all duration-350 ease-out ${slideClass}`}
          >
            {getVisibleIndices().map((idx, position) => (
              <TestimonialCard
                key={`${idx}-${position}`}
                testimonial={testimonials[idx]}
                dim={position !== 0}
              />
            ))}
          </div>

          {/* Mobile: single card */}
          <div
            className={`md:hidden transition-all duration-350 ease-out ${slideClass}`}
          >
            <TestimonialCard
              testimonial={testimonials[activeIndex]}
              dim={false}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() =>
                goTo(idx, idx > activeIndex ? "next" : "prev")
              }
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                idx === activeIndex
                  ? "w-5 h-1.5 bg-white/50"
                  : "w-1.5 h-1.5 bg-white/15 hover:bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, dim }) {
  const { quote, author, role, company, initials } = testimonial;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-opacity duration-300 ${
        dim ? "opacity-55" : "opacity-100"
      }`}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute top-5 right-6 select-none pointer-events-none font-serif leading-none"
        style={{
          fontSize: "6rem",
          lineHeight: 1,
          color: "rgba(255,255,255,0.06)",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p
        className="relative z-10 text-sm sm:text-[0.9rem] leading-relaxed mb-8"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold tracking-wide"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {initials}
        </div>

        <div>
          <p
            className="text-sm font-medium leading-tight"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {author}
          </p>
          <p
            className="text-xs leading-snug mt-0.5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
