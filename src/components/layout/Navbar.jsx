import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../hooks/useTheme';
import { cvLinkProps } from '../../lib/cv';
import { ease } from '../../lib/motion';
import { lockScroll, scrollToSection } from '../../lib/scroll';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    lockScroll(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-4 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
      >
        Skip to content
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={cn('container-x transition-[padding] duration-300', scrolled ? 'pt-3' : 'pt-5')}>
        <nav
          aria-label="Primary"
          className={cn(
            'flex items-center justify-between rounded-2xl border px-2.5 py-2 transition-all duration-300 sm:px-3',
            scrolled || open
              ? 'glass-blur bg-bg/60 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)]'
              : 'border-transparent',
          )}
        >
          <a href="#home" aria-label={`${profile.name} — back to top`} className="rounded-xl">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full border border-line bg-surface-strong"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="glass relative grid size-10 place-items-center overflow-hidden rounded-full text-muted transition-colors hover:text-accent-text"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 16, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -16, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Button
              {...cvLinkProps}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="glass grid size-10 place-items-center rounded-full text-fg lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className="glass-blur mt-2 rounded-2xl bg-bg/85 p-3 lg:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        requestAnimationFrame(() => scrollToSection(id));
                      }}
                      aria-current={active === id ? 'true' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-2xl font-medium transition-colors',
                        active === id ? 'bg-surface-strong text-fg' : 'text-muted hover:text-fg',
                      )}
                    >
                      {label}
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <Button
                {...cvLinkProps}
                onClick={(e) => {
                  setOpen(false);
                  cvLinkProps.onClick(e);
                }}
                className="mt-3 w-full sm:hidden"
              >
                <Download className="size-4" aria-hidden="true" />
                Download CV
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
