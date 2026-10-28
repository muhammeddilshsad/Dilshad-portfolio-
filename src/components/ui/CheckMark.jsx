import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Rose check badge used in front of list items. */
export default function CheckMark({ className }) {
  return (
    <span
      className={cn('mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent-text', className)}
    >
      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
    </span>
  );
}
