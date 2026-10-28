import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/utils';

const TAU = Math.PI * 2;
const LINK_RADIUS = 150;

/**
 * Full-screen interactive starfield. Stars drift and twinkle, shift with the
 * pointer (parallax), get pushed aside and linked to the cursor/finger, and a
 * click or tap releases a small burst.
 */
export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const root = document.documentElement;
    const reduceMotion = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let stars = [];
    let bursts = [];
    let frame = 0;
    const pointer = { x: -9999, y: -9999 };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    const createStars = () => {
      const count = Math.round(Math.min((width * height) / 4500, 360));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.1 + 0.3,
        phase: Math.random() * TAU,
        speed: Math.random() * 0.8 + 0.4,
        rose: Math.random() < 0.2,
        ox: 0,
        oy: 0,
      }));
    };

    // Colours are fixed strings and per-star opacity goes through globalAlpha,
    // so the hot loop allocates no strings. Tiny stars are drawn as squares
    // (fillRect), which is far cheaper than arc paths and looks the same at 1–3px.
    function draw(time) {
      const light = root.dataset.theme === 'light';
      const base = light ? 'rgb(22,9,13)' : 'rgb(255,241,242)';
      const rose = light ? 'rgb(225,29,72)' : 'rgb(251,113,133)';
      const pointerActive = pointer.x > -9999;

      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = rose;
      parallax.x += (parallax.tx - parallax.x) * 0.04;
      parallax.y += (parallax.ty - parallax.y) * 0.04;

      for (const s of stars) {
        if (!reduceMotion) {
          s.y -= s.z * 0.08;
          if (s.y < -4) {
            s.y = height + 4;
            s.x = Math.random() * width;
          }
        }

        const x = s.x - parallax.x * s.z * 28 + s.ox;
        const y = s.y - parallax.y * s.z * 28 + s.oy;
        let near = 0;

        if (pointerActive) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_RADIUS * LINK_RADIUS && distSq > 0.25) {
            const dist = Math.sqrt(distSq);
            near = 1 - dist / LINK_RADIUS;
            s.ox += (dx / dist) * near * 1.5;
            s.oy += (dy / dist) * near * 1.5;
            ctx.globalAlpha = near * 0.35;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
        s.ox *= 0.94;
        s.oy *= 0.94;

        const twinkle = reduceMotion ? 0.8 : 0.55 + 0.45 * Math.sin(time * 0.0015 * s.speed + s.phase);
        ctx.globalAlpha = Math.min((light ? 0.4 : 0.85) * s.z * twinkle + near * 0.5, 1);
        ctx.fillStyle = s.rose || near > 0 ? rose : base;
        const size = s.r * 2 * (1 + near * 0.8);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      if (bursts.length) {
        bursts = bursts.filter((p) => p.life > 0);
        ctx.fillStyle = rose;
        ctx.lineWidth = 1;
        for (const p of bursts) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.life -= 0.022;
          const life = Math.max(p.life, 0);
          ctx.beginPath();
          if (p.ring) {
            ctx.globalAlpha = life * 0.6;
            ctx.arc(p.x, p.y, (1 - p.life) * 70, 0, TAU);
            ctx.stroke();
          } else {
            ctx.globalAlpha = life;
            ctx.arc(p.x, p.y, 1.6, 0, TAU);
            ctx.fill();
          }
        }
      }
    }

    const resize = () => {
      // Stars are 1–3px dots; beyond 1.5x DPR only adds pixels to clear and fill.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const widthChanged = window.innerWidth !== width;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Height-only changes (mobile address bar showing/hiding) keep the
      // existing stars so the field doesn't visibly jump while scrolling.
      if (widthChanged) createStars();
      if (reduceMotion) draw(0);
    };

    const loop = (time) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      parallax.tx = e.clientX / width - 0.5;
      parallax.ty = e.clientY / height - 0.5;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e) => {
      onMove(e);
      bursts.push({ x: e.clientX, y: e.clientY, vx: 0, vy: 0, life: 1, ring: true });
      for (let i = 0; i < 22; i++) {
        const angle = (i / 22) * TAU;
        const speed = 1.5 + Math.random() * 3;
        bursts.push({ x: e.clientX, y: e.clientY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1 });
      }
    };
    const onUp = (e) => e.pointerType !== 'mouse' && onLeave();
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);

    // The static (reduced-motion) frame must be redrawn when the theme changes.
    const themeObserver = new MutationObserver(() => reduceMotion && draw(0));
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVisibility);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
