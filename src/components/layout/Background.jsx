import StarField from './StarField';

const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Soft glows drawn with radial gradients: same look as a heavy blur() filter,
// but rasterised once instead of re-filtered while they drift.
const glow = (color) => ({
  opacity: 'var(--blob-opacity)',
  background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
});

/** Fixed decorative backdrop: interactive stars, drifting glows and film grain. */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute -top-[30rem] -left-[28rem] size-[60rem]" style={glow('var(--accent)')} />
      <div className="animate-drift-slow absolute top-[10%] -right-[30rem] size-[56rem]" style={glow('var(--blush)')} />
      <StarField />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: noise }} />
    </div>
  );
}
