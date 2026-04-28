import { useEffect, useRef, useCallback } from 'react';

/**
 * StarfieldCanvas — animates a particle starfield on a <canvas> element.
 * Lightweight, no external deps.
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const starsRef  = useRef([]);
  const cloudsRef = useRef([]);
  const shootsRef = useRef([]);
  const dustRef = useRef([]);

  const initStars = useCallback((canvas) => {
    const reduced = canvas.width < 640;
    const count = reduced ? Math.floor((canvas.width * canvas.height) / 16000) : Math.floor((canvas.width * canvas.height) / 4000);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.4 + 0.05,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));
    if (reduced) {
      cloudsRef.current = [];
      dustRef.current = [];
      shootsRef.current = [];
      return;
    }

    // Nebula clouds (two layered sets for depth)
    const cloudCount = Math.max(2, Math.floor((canvas.width * canvas.height) / 260000));
    cloudsRef.current = [];
    for (let i = 0; i < Math.max(1, Math.floor(cloudCount / 2)); i++) {
      cloudsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.max(canvas.width, canvas.height) * (0.18 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.01,
        hue: 170 + Math.random() * 120,
        alpha: 0.04 + Math.random() * 0.06,
        layer: 0,
      });
    }
    for (let i = 0; i < Math.max(1, Math.floor(cloudCount / 2)); i++) {
      cloudsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.max(canvas.width, canvas.height) * (0.08 + Math.random() * 0.12),
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.03,
        hue: 200 + Math.random() * 80,
        alpha: 0.03 + Math.random() * 0.05,
        layer: 1,
      });
    }

    // Dust particles
    const dustCount = Math.floor((canvas.width * canvas.height) / 90000);
    dustRef.current = Array.from({ length: dustCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: 0.02 + Math.random() * 0.06,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    // Clear any shooting stars
    shootsRef.current = [];
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

      // Draw layered nebula clouds behind stars with blur and color shift
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const c of cloudsRef.current) {
        c.x += c.vx;
        c.y += c.vy;
        c.hue += 0.02 * Math.sin(t + (c.layer || 0));
        if (c.x < -c.r) c.x = canvas.width + c.r;
        if (c.x > canvas.width + c.r) c.x = -c.r;
        if (c.y < -c.r) c.y = canvas.height + c.r;
        if (c.y > canvas.height + c.r) c.y = -c.r;

        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        const colorInner = `hsla(${Math.round(c.hue)}, 95%, 60%, ${c.alpha})`;
        grad.addColorStop(0, colorInner);
        grad.addColorStop(0.45, colorInner.replace(/,\s*[^,]+\)$/, ', 0.16)'));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.filter = c.layer === 0 ? 'blur(60px)' : 'blur(28px)';
        ctx.fillStyle = grad;
        ctx.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
        ctx.filter = 'none';
      }
      ctx.restore();

      // Dust particles for subtle texture
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const d of dustRef.current) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(180,255,255,${d.alpha})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Stars
      for (const star of starsRef.current) {
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
      }

      // Neon-tinted stars
      starsRef.current.forEach((star, i) => {
        if (i % 15 === 0) {
          const alpha = 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + star.pulse));
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
          ctx.fill();
        }
      });

      // Occasionally spawn a shooting star
      if (Math.random() < 0.02 && shootsRef.current.length < 3) {
        shootsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.45,
          vx: (10 + Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1),
          vy: 2 + Math.random() * 2,
          len: 140 + Math.random() * 260,
          life: 0,
        });
      }

      // Draw shooting stars
      for (let i = shootsRef.current.length - 1; i >= 0; i--) {
        const s = shootsRef.current[i];
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.vx * s.len, s.y + s.vy * s.len);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(0,255,255,0.6)');
        grad.addColorStop(1, 'rgba(0,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.vx * s.len, s.y + s.vy * s.len);
        ctx.stroke();
        ctx.restore();

        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        if (s.x < -s.len || s.x > canvas.width + s.len || s.y > canvas.height + s.len || s.life > 120) {
          shootsRef.current.splice(i, 1);
        }
      }

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
      className="fixed inset-0 w-full h-full"
      style={{ display: 'block', zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
