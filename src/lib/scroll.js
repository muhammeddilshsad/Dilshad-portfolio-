import Lenis from 'lenis';
import { prefersReducedMotion } from './utils';

let lenis = null;
let locks = 0;

/** Starts inertia smooth scrolling (skipped when reduced motion is preferred). */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 }, stopInertiaOnNavigate: true });
  if (locks > 0) lenis.stop(); // a lock (e.g. the loader) may already be active
  let frame = requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  });

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };
}

/** Scrolls to a section, even while scrolling is locked (e.g. from the mobile menu). */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -88, force: true });
  else target.scrollIntoView({ behavior: 'smooth' });
}

/** Locks page scrolling (menus, modals, loader). Calls are reference-counted. */
export function lockScroll(locked) {
  locks = Math.max(0, locks + (locked ? 1 : -1));
  const active = locks > 0;
  document.documentElement.style.overflow = active ? 'hidden' : '';
  if (active) lenis?.stop();
  else lenis?.start();
}
