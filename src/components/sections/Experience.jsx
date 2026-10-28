import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import { useRef } from 'react';
import { experience } from '../../data/experience';
import { fadeUp, inView, stagger } from '../../lib/motion';
import CheckMark from '../ui/CheckMark';
import Reveal from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import TagList from '../ui/TagList';

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 65%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const dotTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <Section id="experience" aria-labelledby="experience-title">
      <SectionHeading
        id="experience-title"
        index="03"
        eyebrow="Experience"
        align="center"
        title={
          <>
            My career <span className="text-gradient">&amp; experience</span>
          </>
        }
        description="Hands-on experience shipping production interfaces and full-stack features."
      />

      <div ref={timelineRef} className="relative">
        {/* Rail that grows with scroll, tipped by a glowing dot */}
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-line lg:left-1/2">
          <motion.div
            style={{ scaleY: progress }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-transparent via-accent to-accent"
          />
          <motion.span
            style={{ top: dotTop }}
            className="timeline-dot absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          />
        </div>

        <ol className="space-y-24 lg:space-y-36">
          {experience.map((job, index) => (
            <li key={job.company} className="relative grid gap-10 pl-10 lg:grid-cols-2 lg:gap-28 lg:pl-0">
              <Reveal className="lg:text-right">
                <div className="flex items-start justify-between gap-6 lg:flex-row-reverse">
                  <div>
                    <h3 className="font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl">
                      {job.role}
                    </h3>
                    <p className="mt-3 text-xl font-semibold text-accent-text sm:text-2xl">{job.company}</p>
                    <p className="mt-4 inline-block rounded-full border border-line px-3.5 py-1 font-mono text-xs tracking-[0.2em] text-subtle uppercase">
                      {job.type}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden font-display text-8xl leading-none font-bold text-transparent [-webkit-text-stroke:1px_var(--subtle)] sm:block"
                  >
                    0{index + 1}
                  </span>
                </div>

                {job.product && (
                  <div className="mt-10 rounded-2xl border border-line bg-surface p-6 text-left sm:p-7">
                    <p className="flex flex-wrap items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-blush/20 text-blush-text">
                        <HeartPulse className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-xl font-bold sm:text-2xl">{job.product.name}</span>
                      <span className="text-base text-subtle">— {job.product.description}</span>
                    </p>
                    <TagList items={job.product.modules} label={`${job.product.name} modules`} className="mt-4" />
                  </div>
                )}
              </Reveal>

              <div>
                <motion.ul variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView} className="space-y-5">
                  {job.responsibilities.map((item) => (
                    <motion.li key={item} variants={fadeUp} className="flex gap-4 text-lg leading-relaxed text-muted">
                      <CheckMark className="mt-1.5" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                {job.stack && (
                  <TagList items={job.stack} label="Technologies used" className="mt-10 border-t border-line pt-8" />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
