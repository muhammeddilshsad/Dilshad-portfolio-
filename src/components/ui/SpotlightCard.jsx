import { cn } from '../../lib/utils';

// Module-level handler: one stable function for every card. Touch input is
// skipped — the glow is hover-only, and measuring layout mid-scroll costs frames.
function trackPointer(e) {
  if (e.pointerType !== 'mouse') return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

/** Glass card with a soft glow that follows the pointer. */
export default function SpotlightCard({ as: Comp = 'div', className, children, ...props }) {
  return (
    <Comp
      onPointerMove={trackPointer}
      className={cn(
        'glass spotlight rounded-2xl transition-[border-color,transform] duration-300 hover:border-accent/30',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
