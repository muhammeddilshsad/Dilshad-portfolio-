import { useEffect, useRef } from 'react';
import { cn, prefersReducedMotion } from '../../lib/utils';

const TAU = Math.PI * 2;
const POINTS = 1100;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Pseudo-continents: a few layered waves decide which dots are "land".
const isLand = (lat, lon) =>
  Math.sin(lat * 3.1 + 1.3) * Math.cos(lon * 2.3) +
    0.6 * Math.sin(lon * 5.2 + lat * 2.1) +
    0.35 * Math.cos(lat * 7.3 - lon * 3.7) >
  0.35;

const sphere = Array.from({ length: POINTS }, (_, i) => {
  const y = 1 - (i / (POINTS - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const phi = i * GOLDEN_ANGLE;
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  return { x, y, z, land: isLand(Math.asin(y), Math.atan2(z, x)) };
});

const rings = [
  { tilt: 1.15, yaw: 0.35, radius: 1.42, count: 120, speed: 0.5 },
  { tilt: -0.75, yaw: 1.25, radius: 1.6, count: 140, speed: -0.35 },
  { tilt: 1.45, yaw: -0.9, radius: 1.28, count: 90, speed: 0.8 },
];

function rotate(x, y, z, rotY, rotX) {
  const cy = Math.cos(rotY);
  const sy = Math.sin(rotY);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(rotX);
  const sx = Math.sin(rotX);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

/** Interactive dotted planet with orbiting particle rings. Drag to spin. */
export default function Globe({ className }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const root = document.documentElement;
    const reduceMotion = prefersReducedMotion();
    const baseSpeed = reduceMotion ? 0 : 0.0035;

    let size = 0;
    let frame = 0;
    let visible = false;
    let rotY = 0;
    let rotX = -0.3;
    let velocity = baseSpeed;
    let spin = 0;
    const drag = { active: false, x: 0, y: 0 };

    const draw = () => {
      const light = root.dataset.theme === 'light';
      const rose = light ? '225,29,72' : '251,113,133';
      const ocean = light ? '22,9,13' : '255,228,233';
      const c = size / 2;
      const R = size * 0.3;

      ctx.clearRect(0, 0, size, size);

      // Outer radius stays inside the canvas so the glow never shows a square edge.
      const glow = ctx.createRadialGradient(c, c, R * 0.6, c, c, c);
      glow.addColorStop(0, `rgba(${rose},${light ? 0.12 : 0.2})`);
      glow.addColorStop(1, `rgba(${rose},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      const body = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      body.addColorStop(0, light ? 'rgba(255,255,255,0.95)' : 'rgba(60,14,28,0.95)');
      body.addColorStop(1, light ? 'rgba(252,231,236,0.95)' : 'rgba(10,4,7,0.98)');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = `rgba(${rose},0.35)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const front = [];
      for (const ring of rings) {
        for (let i = 0; i < ring.count; i++) {
          const a = (i / ring.count) * TAU + spin * ring.speed;
          const wobble = 1 + 0.04 * Math.sin(a * 3 + spin);
          let [x, y, z] = rotate(Math.cos(a) * ring.radius * wobble, 0, Math.sin(a) * ring.radius * wobble, 0, ring.tilt);
          [x, y, z] = rotate(x, y, z, ring.yaw, rotX * 0.5);
          const px = c + x * R;
          const py = c + y * R;
          if (z < 0 && Math.hypot(px - c, py - c) < R) continue; // hidden behind the planet
          const depth = (z / ring.radius + 1) / 2;
          const dot = { px, py, r: 0.8 + depth * 1.8, a: 0.15 + depth * 0.75 };
          if (z < 0) drawDot(dot, rose);
          else front.push(dot);
        }
      }

      for (const p of sphere) {
        const [x, y, z] = rotate(p.x, p.y, p.z, rotY, rotX);
        if (z < -0.05) continue;
        const depth = Math.max(z, 0);
        if (p.land) drawDot({ px: c + x * R, py: c + y * R, r: (0.9 + depth * 1.3) * (size / 520), a: 0.35 + depth * 0.65 }, rose);
        else drawDot({ px: c + x * R, py: c + y * R, r: 0.7 * (size / 520), a: 0.06 + depth * 0.14 }, ocean);
      }

      for (const dot of front) drawDot(dot, rose);
    };

    function drawDot({ px, py, r, a }, color) {
      ctx.globalAlpha = a;
      ctx.fillStyle = `rgb(${color})`;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    const loop = () => {
      if (!drag.active) {
        velocity += (baseSpeed - velocity) * 0.02;
        rotY += velocity;
      }
      if (!reduceMotion) spin += 0.004;
      draw();
      frame = requestAnimationFrame(loop);
    };

    // With reduced motion the globe is static: it only redraws on drag, resize or theme change.
    const start = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onDown = (e) => {
      drag.active = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag.active) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      rotY += dx * 0.008;
      rotX = Math.max(-1.1, Math.min(1.1, rotX - dy * 0.006));
      velocity = dx * 0.008;
      if (reduceMotion) draw();
    };
    const onUp = () => {
      drag.active = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    intersection.observe(wrap);
    document.addEventListener('visibilitychange', start);
    const themeObserver = new MutationObserver(() => reduceMotion && draw());
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', start);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn('relative aspect-square w-full', className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      />
    </div>
  );
}
