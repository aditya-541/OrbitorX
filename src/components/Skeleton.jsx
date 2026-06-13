import { useState } from "react";

const shimmerStyle = {
  backgroundImage:
    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-shimmer 1.6s ease-in-out infinite",
};

const shimmerKeyframes = `
@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

if (typeof document !== "undefined") {
  const styleId = "skeleton-shimmer-keyframes";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = shimmerKeyframes;
    document.head.appendChild(style);
  }
}

export function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`bg-white/5 rounded ${className}`}
      style={shimmerStyle}
      aria-hidden="true"
    />
  );
}

const textWidthMap = {
  full: "w-full",
  "3/4": "w-3/4",
  "1/2": "w-1/2",
};

export function SkeletonText({ width = "full" }) {
  const widthClass = textWidthMap[width] ?? "w-full";
  return (
    <div
      className={`h-3 bg-white/5 rounded ${widthClass}`}
      style={shimmerStyle}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 w-full" aria-hidden="true">
      <div
        className="aspect-[4/3] w-full bg-white/5"
        style={shimmerStyle}
      />
      <div className="p-3 flex flex-col gap-2">
        <SkeletonText width="full" />
        <SkeletonText width="3/4" />
      </div>
    </div>
  );
}

export function LazyImage({ src, alt = "", className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0">
          <SkeletonCard />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-[400ms] ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}

export default { SkeletonBlock, SkeletonText, SkeletonCard, LazyImage };
