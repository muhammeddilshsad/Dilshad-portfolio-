import { ArrowUp, Mail } from 'lucide-react';
import { footerLinks } from '../../data/navigation';
import { profile } from '../../data/profile';
import Logo from '../ui/Logo';
import SocialLinks from '../ui/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="container-x py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_auto]">
          <div className="max-w-sm">
            <a href="#home" aria-label="Back to top" className="inline-block rounded-xl">
              <Logo />
            </a>
            <p className="mt-5 leading-relaxed text-muted">{profile.tagline}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent-text"
            >
              <Mail className="size-4" aria-hidden="true" />
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {footerLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-sm text-muted transition-colors hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Connect</p>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            Back to top
            <span className="glass grid size-8 place-items-center rounded-full transition-transform group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
