import { motion } from 'framer-motion';
import { fadeUpFast, stagger } from '../../lib/motion';
import CheckMark from '../ui/CheckMark';
import Corners from '../ui/Corners';
import Modal from '../ui/Modal';
import TagList from '../ui/TagList';
import ProjectLinks from './ProjectLinks';

/** `project` stays set while closing so the exit animation keeps its content. */
export default function ProjectModal({ open, project, index, onClose }) {
  const titleId = project ? `${project.id}-dialog-title` : undefined;

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      {project && (
        <motion.div variants={stagger(0.035, 0.05)} initial="hidden" animate="show">
          <header className="relative overflow-hidden border-b border-line p-7 pr-16 sm:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -bottom-10 font-display text-[10rem] leading-none font-bold text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--accent)_40%,transparent)] select-none"
            >
              0{index + 1}
            </span>
            <motion.p variants={fadeUpFast} className="font-mono text-xs tracking-[0.2em] text-accent-text uppercase">
              0{index + 1} — {project.category}
            </motion.p>
            <motion.h3
              variants={fadeUpFast}
              id={titleId}
              className="relative mt-3 font-display text-3xl leading-tight font-bold tracking-tight sm:text-5xl"
            >
              {project.title}
            </motion.h3>
            <motion.p variants={fadeUpFast} className="relative mt-4 max-w-xl leading-relaxed text-muted">
              {project.summary}
            </motion.p>
          </header>

          <div className="grid gap-10 p-7 sm:p-10 md:grid-cols-[1.4fr_1fr]">
            <motion.section variants={fadeUpFast}>
              <h4 className="mb-4 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
                {project.featuresLabel ?? 'Highlights'}
              </h4>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <CheckMark />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={fadeUpFast}>
              <div className="relative rounded-2xl border border-line bg-surface p-5">
                <Corners />
                <h4 className="mb-4 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Tech stack</h4>
                <TagList items={project.tech} label="Tech stack" />
              </div>
            </motion.section>
          </div>

          <motion.footer variants={fadeUpFast} className="border-t border-line p-7 sm:px-10">
            <ProjectLinks project={project} />
          </motion.footer>
        </motion.div>
      )}
    </Modal>
  );
}
