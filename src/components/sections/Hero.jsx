import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { profile } from '../../data/profile';
import { ease, fadeUp, stagger } from '../../lib/motion';
import { cvLinkProps } from '../../lib/cv';
import CodeVisual from '../hero/CodeVisual';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';

const headlineWords = profile.headline.split(' ');

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pt-32 pb-20 lg:pt-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <motion.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
              <MapPin className="size-3" aria-hidden="true" />
              Kerala, IN
            </span>
            {profile.roles.join(' | ')}
          </motion.p>

          <h1 id="hero-title" className="font-display">
            <motion.span variants={fadeUp} className="mb-4 block text-xl font-medium text-muted sm:text-2xl">
              Hi, I&apos;m <span className="text-fg">{profile.name}</span>
              <motion.span
                aria-hidden="true"
                className="ml-2 inline-block origin-[70%_70%]"
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.6, delay: 1.2, ease: 'easeInOut' }}
              >
                👋
              </motion.span>
            </motion.span>
            <span className="block text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl xl:text-7xl">
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className={`inline-block ${i >= headlineWords.length - 2 ? 'text-gradient' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease }}
                  >
                    {word}
                  </motion.span>
                  {i < headlineWords.length - 1 && ' '}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg">
              Explore My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button {...cvLinkProps} variant="secondary" size="lg">
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 font-medium text-fg underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:text-accent-text hover:decoration-accent-text"
            >
              Contact Me
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <span aria-hidden="true" className="h-5 w-px bg-line" />
            <SocialLinks />
          </motion.div>
        </motion.div>

        <CodeVisual />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase transition-colors hover:text-fg md:flex"
      >
        Scroll
        <span className="glass animate-nudge grid size-8 place-items-center rounded-full">
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}
