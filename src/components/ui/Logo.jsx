import { profile } from '../../data/profile';

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid size-10 place-items-center rounded-xl bg-accent font-display text-[15px] font-extrabold tracking-tight text-accent-ink shadow-[0_0_30px_-8px_var(--accent)]">
        {profile.initials}
        <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-bg bg-blush-text" />
      </span>
      <span className="hidden font-display text-[15px] leading-tight font-semibold sm:block">
        {profile.firstName}
        <span className="text-accent-text">.</span>
      </span>
    </span>
  );
}
