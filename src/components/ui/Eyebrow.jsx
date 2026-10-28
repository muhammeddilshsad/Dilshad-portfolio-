import { cn } from '../../lib/utils';

/** Small numbered label pill shown above section headings, e.g. "01 — About Me". */
export default function Eyebrow({ index, children, className }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/[0.06] px-4 py-1.5 font-mono text-xs tracking-[0.22em] text-accent-text uppercase sm:text-[13px]',
        className,
      )}
    >
      <span className="text-subtle">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-accent-text/60" />
      {children}
    </p>
  );
}
