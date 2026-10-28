import { AnimatePresence, motion } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/** Listens for `toast()` calls (lib/utils) and shows one message at a time. */
export default function Toaster() {
  const [message, setMessage] = useState(null);
  const timer = useRef();

  useEffect(() => {
    const onToast = (e) => {
      setMessage({ text: e.detail, key: Date.now() });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(null), 4500);
    };
    window.addEventListener('app:toast', onToast);
    return () => {
      window.removeEventListener('app:toast', onToast);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            key={message.key}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="glass-blur pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl bg-bg-elevated/80 px-4 py-3 text-sm shadow-2xl"
          >
            <Info className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
            <p className="text-fg">{message.text}</p>
            <button
              type="button"
              onClick={() => setMessage(null)}
              aria-label="Dismiss notification"
              className="-mr-1 rounded-md p-0.5 text-subtle hover:text-fg"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
