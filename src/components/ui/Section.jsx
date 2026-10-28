import { motion } from 'framer-motion';
import { ease, inView } from '../../lib/motion';
import { cn } from '../../lib/utils';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

const maskReveal = {
  hidden: { y: '105%', rotate: 2 },
  show: { y: 0, rotate: 0, transition: { duration: 1, ease } },
};

export function Section({ id, className, children, ...props }) {
  return (
    <section id={id} className={cn('relative py-28 md:py-36 lg:py-44', className)} {...props}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Section title; the heading slides up from behind a mask as it enters view. */
export function SectionHeading({ index, eyebrow, title, description, id, align = 'left' }) {
  const centered = align === 'center';

  return (
    <Reveal className={cn('mb-16 max-w-4xl md:mb-24', centered && 'mx-auto text-center')}>
      <Eyebrow index={index} className="mb-6">
        {eyebrow}
      </Eyebrow>
      {/* The visible h2 triggers the reveal: the masked span itself is clipped, so it never registers as in view. */}
      <motion.h2
        id={id}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1] font-bold tracking-[-0.045em] text-balance"
      >
        <span className="block overflow-hidden pb-[0.12em]">
          <motion.span className="block" variants={maskReveal}>
            {title}
          </motion.span>
        </span>
      </motion.h2>
      {description && (
        <p
          className={cn(
            'mt-7 max-w-2xl text-lg leading-[1.7] text-pretty text-muted sm:text-xl md:text-[1.375rem]',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
