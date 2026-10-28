import { skills } from '../../data/skills';

/** Infinite scrolling strip of technologies between the hero and About. */
export default function TechMarquee() {
  const items = skills.map((s) => s.name);

  return (
    <div
      aria-hidden="true"
      className="relative border-y border-line bg-surface py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((name) => (
              <li key={name} className="flex items-center font-display text-xl font-medium whitespace-nowrap text-muted sm:text-2xl">
                <span className="px-6">{name}</span>
                <span className="text-accent-text">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
