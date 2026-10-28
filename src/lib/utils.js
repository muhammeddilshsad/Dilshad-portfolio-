/** Joins class names, skipping falsy values. */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/** True for missing URLs or "YOUR-..." placeholders. */
export const isPlaceholderUrl = (url) => !url || url.includes('YOUR-');

/** True when the visitor asked the OS to reduce motion. */
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Shows a message in the global <Toaster />. */
export const toast = (message) => window.dispatchEvent(new CustomEvent('app:toast', { detail: message }));
