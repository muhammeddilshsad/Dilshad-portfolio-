export const ease = [0.22, 1, 0.36, 1];

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Snappier variant for UI that opens on click (dialogs), where 0.7s feels sluggish. */
export const fadeUpFast = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease } },
};

export const inView = { once: true, amount: 0.2 };
