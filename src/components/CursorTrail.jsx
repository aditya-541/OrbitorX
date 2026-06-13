import { useEffect, useRef } from 'react';

const DOTS = 12;
const LERP_FACTOR = 0.2;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function CursorTrail() {
  const dotsRef = useRef([]);
  const positionsRef = useRef(
    Array.from({ length: DOTS }, () => ({ x: -100, y: -100 }))
  );
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = () => {
      const positions = positionsRef.current;
      const dots = dotsRef.current;

      // First dot chases the cursor
      positions[0].x = lerp(positions[0].x, mouseRef.current.x, LERP_FACTOR);
      positions[0].y = lerp(positions[0].y, mouseRef.current.y, LERP_FACTOR);

      // Each subsequent dot chases the one ahead of it
      for (let i = 1; i < DOTS; i++) {
        positions[i].x = lerp(positions[i].x, positions[i - 1].x, LERP_FACTOR);
        positions[i].y = lerp(positions[i].y, positions[i - 1].y, LERP_FACTOR);
      }

      // Apply positions directly via DOM refs for perf
      for (let i = 0; i < DOTS; i++) {
        const el = dots[i];
        if (!el) continue;
        const { x, y } = positions[i];
        // Size: 5px front → 2px back
        const size = 5 - (i / (DOTS - 1)) * 3;
        el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99990,
      }}
    >
      {Array.from({ length: DOTS }, (_, i) => {
        // Opacity: white/50 (0.5) front → white/5 (0.05) back
        const opacity = 0.5 - (i / (DOTS - 1)) * 0.45;

        return (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: '50%',
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
              pointerEvents: 'none',
              willChange: 'transform, width, height',
            }}
          />
        );
      })}
    </div>
  );
}
