import { motion } from 'framer-motion';

const positions = [
  'top-0 left-0 border-t-2 border-l-2',
  'top-0 right-0 border-t-2 border-r-2',
  'bottom-0 left-0 border-b-2 border-l-2',
  'bottom-0 right-0 border-b-2 border-r-2',
];

/** Four bracket corners framing the parent (which must be `relative`). */
export default function Corners({ visible = true }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute -inset-px">
      {positions.map((pos) => (
        <motion.span
          key={pos}
          initial={false}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
          className={`absolute size-3 border-accent ${pos}`}
        />
      ))}
    </span>
  );
}
