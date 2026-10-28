import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll } from '../../lib/scroll';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Accessible dialog: focus trap, Escape to close, scroll lock and focus restore. */
export default function Modal({ open, onClose, labelledBy, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    lockScroll(true);
    requestAnimationFrame(() => dialogRef.current?.focus());

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* A darker scrim instead of a full-screen blur keeps opening instant on phones. */}
          <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/75 sm:backdrop-blur-[2px]" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.16, ease: 'easeIn' } }}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-bg-elevated shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] outline-none sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="glass absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full text-muted transition-all duration-300 hover:rotate-90 hover:text-fg"
            >
              <X className="size-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
