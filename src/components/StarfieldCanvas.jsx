import { useEffect, useRef, useCallback } from 'react';

/**
 * StarfieldCanvas — animates a particle starfield on a <canvas> element.
 * Lightweight, no external deps.
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const starsRef  = useRef([]);

  const initStars = useCallback((canvas) => {
    const count = Math.floor((canvas.width * canvas.height) / 4000);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.4 + 0.05,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars(canvas);
    };

    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      starsRef.current.forEach((star) => {
        const alpha = star.opacity * (0.6 + 0.4 * Math.sin(t + star.pulse));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Slow drift downward
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Occasional neon cyan tinted stars
      starsRef.current.forEach((star, i) => {
        if (i % 15 === 0) {
          const alpha = 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + star.pulse));
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
}
