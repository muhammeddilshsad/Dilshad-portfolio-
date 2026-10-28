import { ArrowUpRight, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GithubIcon } from '../ui/BrandIcons';
import SmartLink from '../ui/SmartLink';

const linkClass =
  'inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5';

export default function ProjectLinks({ project }) {
  if (project.privateNote) {
    return (
      <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-strong px-4 py-2.5 text-sm text-muted">
        <Lock className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
        {project.privateNote}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <SmartLink
        href={project.links.live}
        label={`${project.title} live demo`}
        pendingMessage={`The live demo link for ${project.title} will be added soon.`}
        className={cn(linkClass, 'bg-accent text-accent-ink hover:shadow-[0_10px_40px_-10px_var(--accent)]')}
      >
        Live Demo
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </SmartLink>
      <SmartLink
        href={project.links.github}
        label={`${project.title} source on GitHub`}
        pendingMessage={`The GitHub repository for ${project.title} will be added soon.`}
        className={cn(linkClass, 'glass text-fg hover:border-accent/50')}
      >
        <GithubIcon className="size-4" />
        GitHub
      </SmartLink>
    </div>
  );
}
