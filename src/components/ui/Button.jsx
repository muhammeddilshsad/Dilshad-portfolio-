import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[box-shadow,border-color,background-color,color] duration-300 select-none';

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
};

const variants = {
  primary:
    'bg-accent text-accent-ink shadow-[0_0_0_0_transparent] hover:shadow-[0_10px_40px_-10px_var(--accent)]',
  secondary: 'glass text-fg hover:border-accent/50 hover:bg-surface-strong',
  ghost: 'text-fg hover:text-accent-text',
};

/** Renders an <a> when `href` is set, otherwise a <button>. */
export default function Button({ href, variant = 'primary', size = 'md', className, children, ...props }) {
  const Comp = href ? motion.a : motion.button;
  const typeProps = href ? {} : { type: props.type ?? 'button' };

  return (
    <Comp
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(base, sizes[size], variants[variant], className)}
      {...typeProps}
      {...props}
    >
      {children}
    </Comp>
  );
}
