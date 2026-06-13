import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={[
        "fixed bottom-20 right-4 z-50",
        "flex items-center gap-2 px-4 py-3 rounded-full",
        "bg-[#111] border border-white/20 text-white",
        "shadow-lg shadow-black/40",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50",
        "focus:outline-none focus:ring-2 focus:ring-white/30",
        "select-none",
        visible
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-24 opacity-0 pointer-events-none",
      ].join(" ")}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Pulsing dot indicator */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white opacity-90" />
      </span>

      {/* Chat icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>

      <span className="text-sm font-medium tracking-wide whitespace-nowrap">
        Let&apos;s Talk
      </span>
    </a>
  );
}
