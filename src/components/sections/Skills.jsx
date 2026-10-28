import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { skillCategories, skills } from '../../data/skills';
import { cn } from '../../lib/utils';
import Reveal from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import SpotlightCard from '../ui/SpotlightCard';

const filters = [{ id: 'all', label: 'All' }, ...skillCategories];
const categoryLabel = Object.fromEntries(skillCategories.map((c) => [c.id, c.label]));

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? skills : skills.filter((s) => s.category === filter);

  return (
    <Section id="skills" aria-labelledby="skills-title">
      <SectionHeading
        id="skills-title"
        index="02"
        eyebrow="Technical Skills"
        title={
          <>
            The toolkit behind <span className="text-gradient">the work.</span>
          </>
        }
        description="Technologies I use to design, build and ship modern web applications — from interface to API."
      />

      <Reveal>
        <div role="group" aria-label="Filter skills by category" className="mb-12 flex flex-wrap gap-2.5">
          {filters.map(({ id, label }) => {
            const isActive = filter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                aria-pressed={isActive}
                className={cn(
                  'relative rounded-full border px-5 py-2.5 text-[15px] transition-colors duration-300 sm:px-6 sm:py-3 sm:text-base',
                  isActive ? 'border-transparent text-accent-ink' : 'border-line text-muted hover:text-fg',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map(({ name, category, icon: Icon }, i) => (
            <motion.li
              key={name}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            >
              <SpotlightCard className="group flex h-full flex-col items-start gap-4 p-5 hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-surface-strong text-muted transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-accent/40 group-hover:bg-accent group-hover:text-accent-ink sm:size-14">
                  <Icon className="size-5 sm:size-6" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base leading-tight font-bold sm:text-lg">{name}</span>
                  <span className="mt-1.5 block font-mono text-[11px] tracking-wide text-subtle sm:text-xs">
                    {categoryLabel[category]}
                  </span>
                </span>
              </SpotlightCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
