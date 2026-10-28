import { motion } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { ease, fadeUp, inView, stagger } from '../../lib/motion';
import ProjectLinks from '../projects/ProjectLinks';
import ProjectModal from '../projects/ProjectModal';
import { GithubIcon } from '../ui/BrandIcons';
import CheckMark from '../ui/CheckMark';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import SpotlightCard from '../ui/SpotlightCard';
import TagList from '../ui/TagList';

/** One project with its full CV description, every technology and every highlight. */
function ProjectCard({ project, index, onOpen }) {
  return (
    <SpotlightCard
      as="article"
      aria-labelledby={`${project.id}-title`}
      className="group relative overflow-hidden p-6 sm:p-10 lg:p-12"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-[0.15] bg-gradient-to-r from-accent via-accent-text to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
      />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden="true"
              className="font-display text-7xl leading-none font-bold text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--subtle)] group-hover:text-accent group-hover:[-webkit-text-stroke:1px_transparent] sm:text-8xl"
            >
              0{index + 1}
            </span>
            <span className="mt-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-muted uppercase sm:text-xs">
              {project.category}
            </span>
          </div>

          <h3
            id={`${project.id}-title`}
            className="mt-8 font-display text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-[2.6rem]"
          >
            {project.title}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{project.summary}</p>

          <p className="mt-8 mb-3 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Technologies</p>
          <TagList items={project.tech} label="Technologies" />

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ProjectLinks project={project} />
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-haspopup="dialog"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
            >
              <Maximize2 className="size-4" aria-hidden="true" />
              Focus view
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 lg:border-l lg:border-line lg:pl-14">
          <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
            {project.featuresLabel ?? 'Highlights'}
          </p>
          <motion.ul
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="divide-y divide-line"
          >
            {project.features.map((feature) => (
              <motion.li
                key={feature}
                variants={fadeUp}
                className="flex gap-4 py-4 text-base leading-relaxed text-muted first:pt-0 last:pb-0 sm:text-[17px]"
              >
                <CheckMark />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </SpotlightCard>
  );
}

function GithubCta() {
  const github = profile.socials.find((s) => s.id === 'github');
  return (
    <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
      <p className="font-display text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-3xl">
        More experiments <span className="text-gradient">on GitHub.</span>
      </p>
      <SmartLink
        href={github?.url}
        label="GitHub profile"
        className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-text"
      >
        <GithubIcon className="size-4" />
        Visit profile
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </SmartLink>
    </div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);

  const openProject = useCallback((index) => {
    setShown(index);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Section id="projects" aria-labelledby="projects-title">
      <SectionHeading
        id="projects-title"
        index="04"
        eyebrow="Featured Projects"
        title={
          <>
            Selected <span className="text-gradient">work.</span>
          </>
        }
        description="Projects from my CV — full descriptions, the technologies behind them and what I built."
      />

      <div className="space-y-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease }}
          >
            <ProjectCard project={project} index={i} onOpen={openProject} />
          </motion.div>
        ))}
        <GithubCta />
      </div>

      <ProjectModal open={open} project={projects[shown]} index={shown} onClose={close} />
    </Section>
  );
}
