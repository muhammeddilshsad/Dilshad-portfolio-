import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Atom, Braces, CheckCircle2, Wind } from 'lucide-react';

// Each line is a list of [tokenType, text] pairs for simple syntax colouring.
const code = [
  [['kw', 'const '], ['var', 'developer'], ['p', ' = {']],
  [['key', '  name'], ['p', ': '], ['str', "'Muhammed Dilshad Tk'"], ['p', ',']],
  [['key', '  role'], ['p', ': '], ['str', "'React Developer'"], ['p', ',']],
  [['key', '  location'], ['p', ': '], ['str', "'Malappuram, Kerala'"], ['p', ',']],
  [['key', '  stack'], ['p', ': ['], ['str', "'React'"], ['p', ', '], ['str', "'Next.js'"], ['p', ', '], ['str', "'TypeScript'"], ['p', '],']],
  [['key', '  state'], ['p', ': '], ['str', "'Redux Toolkit'"], ['p', ',']],
  [['key', '  styling'], ['p', ': '], ['str', "'Tailwind CSS'"], ['p', ',']],
  [['key', '  focus'], ['p', ': '], ['str', "'clean code & great UX'"], ['p', ',']],
  [['p', '};']],
  [],
  [['kw', 'export default '], ['fn', 'developer'], ['p', ';']],
];

const tokenColors = {
  kw: 'text-[#fda4af]',
  var: 'text-[#fecdd3]',
  key: 'text-[#f8f1f2]',
  str: 'text-[#fb7185]',
  fn: 'text-[#fecdd3]',
  p: 'text-white/45',
};

const chips = [
  { label: 'React', icon: Atom, className: '-top-5 left-6 sm:-left-8 sm:top-10', delay: 0 },
  { label: 'TypeScript', icon: Braces, className: '-right-2 top-1/3 sm:-right-10', delay: 1.2 },
  { label: 'Tailwind', icon: Wind, className: '-bottom-5 right-10 sm:right-16', delay: 0.6 },
];

export default function CodeVisual() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });

  const handleMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative mx-auto w-full max-w-[34rem] [perspective:1200px]"
    >
      {/* Orbit rings + glow behind the editor */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_65%)]" />
        <div className="animate-spin-slow absolute top-1/2 left-1/2 size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line" />
        <div className="absolute top-1/2 left-1/2 size-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e090b]/95 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)]"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-white/60">
            developer.js
          </span>
          <span className="ml-auto hidden font-mono text-[11px] text-white/30 sm:block">UTF-8 · JSX</span>
        </div>

        <pre className="overflow-hidden p-3.5 font-mono text-[10px] leading-6 min-[400px]:text-[11px] sm:p-5 sm:text-[13px] sm:leading-7">
          <code>
            {code.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
                className="flex whitespace-pre"
              >
                <span className="mr-3 w-4 shrink-0 text-right text-white/20 select-none sm:mr-4 sm:w-5">{i + 1}</span>
                <span>
                  {line.map(([type, text], j) => (
                    <span key={j} className={tokenColors[type]}>
                      {text}
                    </span>
                  ))}
                  {i === code.length - 1 && (
                    <span className="animate-blink ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-[#fb7185]" />
                  )}
                </span>
              </motion.div>
            ))}
          </code>
        </pre>

        <div className="flex items-center gap-2 border-t border-white/[0.07] bg-white/[0.02] px-4 py-2.5 font-mono text-[11px] text-white/50">
          <CheckCircle2 className="size-3.5 text-[#fb7185]" aria-hidden="true" />
          ready — compiled successfully
          <span className="ml-auto flex items-center gap-1.5">
            <span className="size-1.5 animate-pulse rounded-full bg-[#fb7185]" />
            live
          </span>
        </div>
      </motion.div>

      {chips.map(({ label, icon: Icon, className, delay }) => (
        // Entrance via Framer Motion; the endless float is a CSS animation on the compositor.
        <motion.div
          key={label}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + delay * 0.3, duration: 0.5 }}
          className={`absolute ${className}`}
        >
          <span
            className="glass animate-float flex items-center gap-2 rounded-full bg-bg-elevated/70 px-3.5 py-2 text-xs font-medium shadow-xl"
            style={{ animationDelay: `${delay}s` }}
          >
            <Icon className="size-3.5 text-accent-text" />
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
