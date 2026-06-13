import { useEffect, useRef, useState } from 'react';

const SELECTORS = 'a, button, [role="button"], input, textarea, label, [data-cursor]';

export default function MagneticCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: -100, y: -100 });
  const ring     = useRef({ x: -100, y: -100 });
  const raf      = useRef(null);
  const [color,  setColor]  = useState('rgba(255,255,255,0.9)');
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    /* ── smooth ring animation ── */
    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    /* ── pointer move ── */
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    /* ── hover detection ── */
    const onEnter = (e) => {
      const el = e.target.closest(SELECTORS);
      if (!el) return;
      setHovered(true);

      // pick accent color from data-cursor-color or element style
      setColor('rgba(255,255,255,0.95)');

      // magnetic pull: shift dot toward center of element
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      // gentle nudge
      pos.current.x += (cx - pos.current.x) * 0.18;
      pos.current.y += (cy - pos.current.y) * 0.18;
    };

    const onLeave = () => {
      setHovered(false);
      setColor('rgba(255,255,255,0.9)');
    };

    const onHide  = () => setHidden(true);
    const onShow  = () => setHidden(false);

    window.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseover',  onEnter, { passive: true });
    document.addEventListener('mouseout',   onLeave, { passive: true });
    document.addEventListener('mouseleave', onHide,  { passive: true });
    document.addEventListener('mouseenter', onShow,  { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onEnter);
      document.removeEventListener('mouseout',   onLeave);
      document.removeEventListener('mouseleave', onHide);
      document.removeEventListener('mouseenter', onShow);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          width:  hovered ? '10px' : '8px',
          height: hovered ? '10px' : '8px',
          borderRadius: '50%',
          background: color,
          boxShadow: 'none',
          opacity: hidden ? 0 : 1,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{
          width:  hovered ? '44px' : '32px',
          height: hovered ? '44px' : '32px',
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: hidden ? 0 : hovered ? 0.8 : 0.35,
          boxShadow: 'none',
          transition: 'width 0.35s cubic-bezier(.22,1,.36,1), height 0.35s cubic-bezier(.22,1,.36,1), opacity 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
