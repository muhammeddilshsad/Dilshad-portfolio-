import { motion } from 'framer-motion';
import { ease, inView } from '../../lib/motion';

/** Fades and lifts its children into view once, when scrolled to. */
export default function Reveal({ as = 'div', delay = 0, y = 24, children, ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.8, delay, ease }}
      {...props}
    >
      {children}
    </Comp>
  );
}
