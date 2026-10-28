import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { services } from '../../data/services';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ease, fadeUp, inView, stagger } from '../../lib/motion';
import { cn } from '../../lib/utils';
import Corners from '../ui/Corners';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import { Section } from '../ui/Section';

/** "What I Do": an accordion — hover (desktop) or tap to expand a service. */
export default function Services() {
  const [active, setActive] = useState(0);
  const hoverable = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <Section id="services" aria-labelledby="services-title">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow index="05" className="mb-6">
            What I Do
          </Eyebrow>
          <h2
            id="services-title"
            className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em] uppercase"
          >
            What
            <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--fg)]">I</span>{' '}
            <span className="text-gradient">Do</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-[1.7] text-muted sm:text-xl">
            Focused frontend work — from first component to polished, production-ready interface.
          </p>
        </Reveal>

        <motion.ul variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={inView} className="border-t border-line">
          {services.map(({ title, description, icon: Icon, tags }, i) => {
            const isActive = active === i;
            const panelId = `service-panel-${i}`;
            return (
              <motion.li
                key={title}
                variants={fadeUp}
                onMouseEnter={() => hoverable && setActive(i)}
                className={cn(
                  'relative border-b border-line transition-colors duration-500',
                  isActive && 'bg-surface',
                )}
              >
                <Corners visible={isActive} />
                <h3>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-5 px-4 py-7 text-left sm:gap-6 sm:px-8 sm:py-8"
                  >
                    <span className="font-mono text-sm text-subtle">0{i + 1}</span>
                    <span
                      className={cn(
                        'flex-1 font-display text-2xl leading-tight font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-3xl',
                        isActive ? 'text-fg' : 'text-muted',
                      )}
                    >
                      {title}
                    </span>
                    <span
                      className={cn(
                        'grid size-12 shrink-0 place-items-center rounded-full border transition-all duration-500',
                        isActive ? 'rotate-0 border-accent bg-accent text-accent-ink' : '-rotate-90 border-line text-muted',
                      )}
                    >
                      <ArrowDownRight className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-5 px-4 pb-8 sm:px-8 sm:pl-[4.1rem]">
                        <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent-text sm:grid">
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="max-w-lg text-lg leading-relaxed text-muted">{description}</p>
                          <p className="mt-6 mb-3 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
                            Skillset &amp; tools
                          </p>
                          <ul className="flex flex-wrap gap-2.5">
                            {tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full border border-line bg-surface-strong px-3.5 py-1.5 text-sm font-medium"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}
