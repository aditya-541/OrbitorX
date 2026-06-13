import { useEffect, useRef, useState } from "react";

// Parses a value string like "42+", "3M+", "120+" into numeric and suffix parts
function parseValue(valueStr) {
  const match = String(valueStr).match(/^([\d.]+)([KMB]?)(\+?)$/i);
  if (!match) return { numeric: 0, multiplier: 1, suffix: valueStr };

  const raw = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const plus = match[3];

  const multipliers = { K: 1000, M: 1000000, B: 1000000000 };
  const multiplier = multipliers[unit] || 1;

  return {
    numeric: raw,
    multiplier,
    unit,
    plus,
    suffix: `${unit}${plus}`,
  };
}

function formatDisplay(current, unit, plus) {
  const unitMultipliers = { K: 1000, M: 1000000, B: 1000000000 };
  const m = unitMultipliers[unit] || 1;

  const raw = current / m;

  let display;
  if (unit && unitMultipliers[unit]) {
    display = Number.isInteger(raw) ? `${raw}` : raw.toFixed(1);
    display = `${display}${unit}`;
  } else {
    display = Math.round(current).toString();
  }

  return `${display}${plus || ""}`;
}

// Easing function: easeOutExpo
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp(target, duration = 1800) {
  const [displayValue, setDisplayValue] = useState(null);
  const elementRef = useRef(null);
  const hasStarted = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const { numeric, multiplier, unit, plus } = parseValue(target);
    const totalTarget = numeric * multiplier;

    // Set initial display before counting starts
    setDisplayValue(formatDisplay(0, unit, plus));

    const startCounting = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const current = eased * totalTarget;

        setDisplayValue(formatDisplay(current, unit, plus));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayValue(formatDisplay(totalTarget, unit, plus));
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return { displayValue, elementRef };
}

export function AnimatedStat({ value, label, size = "lg" }) {
  const { displayValue, elementRef } = useCountUp(value);

  const numberClass =
    size === "lg"
      ? "text-5xl sm:text-6xl font-bold tracking-tight font-mono"
      : "text-3xl sm:text-4xl font-semibold tracking-tight font-mono";

  const labelClass =
    size === "lg"
      ? "text-sm sm:text-base text-white/50 uppercase tracking-widest mt-2"
      : "text-xs sm:text-sm text-white/50 uppercase tracking-widest mt-1";

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center text-center select-none"
    >
      <span className={`${numberClass} text-white`}>
        {displayValue ?? value}
      </span>
      <span className={labelClass}>{label}</span>
    </div>
  );
}

const STATS = [
  { value: "42+", label: "Events Hosted" },
  { value: "120+", label: "Startups Scaled" },
  { value: "3M+", label: "Users Reached" },
];

export default function StatsRow() {
  return (
    <div className="w-full bg-black border border-white/10 rounded-2xl px-6 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x sm:divide-white/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex justify-center">
            <AnimatedStat value={stat.value} label={stat.label} size="lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
