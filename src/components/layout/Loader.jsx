import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { lockScroll } from '../../lib/scroll';

const MIN_DURATION = 1100;
const MAX_WAIT = 2500;

const whenReady = () =>
  Promise.race([
    Promise.all([
      document.fonts?.ready,
      document.readyState === 'complete'
        ? null
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true })),
    ]),
    new Promise((resolve) => setTimeout(resolve, MAX_WAIT)),
  ]);

function MarqueeRow({ reverse }) {
  const text = [...profile.roles, ...profile.roles];
  return (
    <div className="flex w-max" style={{ animation: `marquee 26s linear infinite${reverse ? ' reverse' : ''}` }}>
      {[0, 1].map((copy) => (
        <span key={copy} className="flex shrink-0 items-center">
          {text.map((role, i) => (
            <span
              key={i}
              className={`flex items-center px-6 font-display text-[16vw] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap uppercase sm:text-[9vw] ${
                i % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_var(--line)]' : 'text-fg/90'
              }`}
            >
              {role}
              <span className="ml-12 text-accent">✦</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

/** Intro screen: scrolling role names and a percentage pill, then a curtain reveal. */
export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    lockScroll(true);
    let ready = false;
    let frame;
    let finished = false;
    const start = performance.now();
    whenReady().then(() => (ready = true));

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setTimeout(onDone, 250);
    };

    const tick = (now) => {
      const t = Math.min((now - start) / MIN_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * (ready ? 100 : 92));
      if (value >= 100) return finish();
      setProgress(value);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Safety net: never hold the visitor if animation frames are throttled.
    const fallback = setTimeout(finish, MIN_DURATION + MAX_WAIT);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      lockScroll(false);
    };
  }, [onDone]);

  const done = progress >= 100;

  return (
    <motion.div
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed inset-0 z-[90] flex flex-col justify-center gap-4 overflow-hidden bg-bg"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        aria-hidden="true"
        className="loader-orb absolute top-1/2 left-1/2 size-[30rem] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)' }}
      />

      <div aria-hidden="true" className="opacity-90">
        <MarqueeRow />
      </div>
      <div aria-hidden="true" className="opacity-90">
        <MarqueeRow reverse />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: done ? 1.06 : 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="loader-pill relative rounded-full p-[2px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
        >
          <div className="flex h-20 w-72 items-center justify-between rounded-full bg-[#050304] px-9 text-white sm:h-24 sm:w-80">
            <span className="font-display text-lg font-medium tracking-[0.2em]">{done ? 'WELCOME' : 'LOADING'}</span>
            <span className="flex items-center font-mono text-lg text-white/60">
              {progress}%
              <span className="animate-blink ml-1 inline-block h-6 w-2.5 bg-accent" />
            </span>
          </div>
        </motion.div>
      </div>

      <p className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-sm font-semibold tracking-wide whitespace-nowrap sm:left-10 sm:translate-x-0">
        {profile.name}
      </p>
    </motion.div>
  );
}
