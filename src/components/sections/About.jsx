import { motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  Layers,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  PlugZap,
  Puzzle,
  Quote,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { fadeUp, inView, stagger } from '../../lib/motion';
import Reveal from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import SpotlightCard from '../ui/SpotlightCard';

const highlights = [
  {
    title: 'Modern Frontend Development',
    description: 'React.js, Next.js and TypeScript applications built with a clean, maintainable structure.',
    icon: Layers,
  },
  {
    title: 'API Integration',
    description: 'REST APIs connected with Axios — with data flows, loading and error states handled cleanly.',
    icon: PlugZap,
  },
  {
    title: 'Responsive UI/UX',
    description: 'Interfaces that adapt gracefully from small mobile screens to wide desktop dashboards.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Reusable Components',
    description: 'Modals, tables, filters and form patterns built once and reused across modules.',
    icon: Puzzle,
  },
];

const facts = [
  { label: 'Role', value: profile.currentRole, icon: Briefcase },
  { label: 'Company', value: profile.currentCompany, icon: Building2 },
  { label: 'Based in', value: profile.location, icon: MapPin },
  { label: 'Email', value: profile.email, icon: Mail, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, icon: Phone, href: profile.phoneHref },
];

const Tech = ({ children }) => <span className="font-medium text-fg">{children}</span>;

export default function About() {
  return (
    <Section id="about" aria-labelledby="about-title">
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow="About Me"
        title={
          <>
            Turning complex requirements into <span className="text-gradient">intuitive interfaces.</span>
          </>
        }
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <p className="text-xl leading-[1.7] text-pretty text-muted sm:text-2xl md:text-[1.7rem] md:leading-[1.65]">
            I&apos;m a React Developer experienced in building responsive, maintainable, and user-friendly web
            applications. I work with <Tech>React.js</Tech>, <Tech>Next.js</Tech>, <Tech>TypeScript</Tech>,{' '}
            <Tech>Redux Toolkit</Tech>, and <Tech>Tailwind CSS</Tech> to create modern frontend experiences.
          </p>
          <p className="mt-8 text-lg leading-[1.8] text-pretty text-muted sm:text-xl">
            My experience includes API integration, dashboards, authentication, reusable components, data tables,
            filtering, and performance improvements. I enjoy solving technical challenges and transforming complex
            requirements into intuitive interfaces.
          </p>

          <figure className="relative mt-10 overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-blush" />
            <figcaption className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-accent-text uppercase">
              <Quote className="size-4" aria-hidden="true" />
              Profile
            </figcaption>
            <blockquote className="text-lg leading-[1.75] text-pretty text-fg/90">{profile.summary}</blockquote>
          </figure>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5">
          <dl className="glass divide-y divide-line overflow-hidden rounded-2xl">
            {facts.map(({ label, value, icon: Icon, href }) => (
              <div key={label} className="group flex items-center gap-5 px-6 py-5 transition-colors hover:bg-surface">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-text transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">{label}</dt>
                  <dd className="mt-0.5 truncate text-lg font-semibold">
                    {href ? (
                      <a href={href} className="transition-colors hover:text-accent-text">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <motion.ul
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {highlights.map(({ title, description, icon: Icon }) => (
          <motion.li key={title} variants={fadeUp}>
            <SpotlightCard className="group h-full p-7 hover:-translate-y-1.5 sm:p-8">
              <span className="mb-8 grid size-14 place-items-center rounded-2xl border border-line bg-surface-strong text-accent-text transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl leading-snug font-bold sm:text-2xl">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
            </SpotlightCard>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
