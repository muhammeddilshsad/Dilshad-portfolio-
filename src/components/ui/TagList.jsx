import { cn } from '../../lib/utils';

/** Wrapped row of monospace technology tags. */
export default function TagList({ items, label, className }) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-2.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-surface-strong px-3.5 py-1.5 font-mono text-xs transition-colors hover:border-accent/40"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
