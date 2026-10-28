import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Info, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { cn } from '../../lib/utils';
import Globe from '../contact/Globe';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import SocialLinks from '../ui/SocialLinks';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.';
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.';
  return errors;
}

function Field({ id, label, error, as = 'input', className, ...props }) {
  const Comp = as;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <Comp
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-xl border bg-bg/70 px-4 py-3 text-base text-fg placeholder:text-subtle transition-[border-color,box-shadow,background-color] duration-300 outline-none',
          'focus:border-accent-text focus:bg-bg focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]',
          error ? 'border-red-400/70' : 'border-line',
          as === 'textarea' && 'h-28 resize-none sm:h-32',
        )}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-[13px] text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSubmitted(true);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
      aria-describedby="form-note"
      className="glass rounded-3xl bg-bg-elevated/60 p-5 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.7)] sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your Name" autoComplete="name" placeholder="What's your name?" value={values.name} onChange={handleChange} error={errors.name} />
        <Field id="email" label="Your Email" type="email" autoComplete="email" placeholder="What's your email?" value={values.email} onChange={handleChange} error={errors.email} />
        <Field id="subject" label="Subject" placeholder="What's this about?" value={values.subject} onChange={handleChange} error={errors.subject} className="sm:col-span-2" />
        <Field id="message" as="textarea" label="Your Message" placeholder="What do you want to say?" value={values.message} onChange={handleChange} error={errors.message} className="sm:col-span-2" />
      </div>

      <div className="mt-5 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="flex gap-2 text-[13px] leading-snug text-subtle sm:max-w-xs">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          No backend — sending opens your email app with the message pre-filled.
        </p>
        <Button type="submit" className="w-full shrink-0 sm:w-auto">
          Send Message
          <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
          >
            <Check className="size-4 text-accent-text" aria-hidden="true" />
            <span className="text-accent-text">Opening your email app…</span>
            Nothing happened? Write to{' '}
            <a href={`mailto:${profile.email}`} className="text-fg underline underline-offset-4 hover:text-accent-text">
              {profile.email}
            </a>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
    >
      {copied ? <Check className="size-3.5 text-accent-text" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

function ContactDetails() {
  return (
    <ul className="glass divide-y divide-line rounded-2xl">
      <li className="flex items-center gap-3.5 p-3.5 sm:p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-text">
          <Mail className="size-[18px]" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">Email</p>
          <a
            href={`mailto:${profile.email}`}
            className="block truncate font-semibold transition-colors hover:text-accent-text"
          >
            {profile.email}
          </a>
        </div>
        <CopyEmail />
      </li>
      <li className="flex items-center gap-3.5 p-3.5 sm:p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-text">
          <Phone className="size-[18px]" aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">Phone</p>
          <a href={profile.phoneHref} className="font-semibold transition-colors hover:text-accent-text">
            {profile.phone}
          </a>
        </div>
      </li>
      <li className="flex items-center gap-3.5 p-3.5 sm:p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-text">
          <MapPin className="size-[18px]" aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">Location</p>
          <p className="font-semibold">{profile.location}</p>
        </div>
      </li>
      <li className="flex items-center justify-between gap-4 p-3.5 sm:p-4">
        <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">Find me online</p>
        <SocialLinks />
      </li>
    </ul>
  );
}

/**
 * Compact contact screen: sized to fit below the fixed navbar so the details
 * and every form field are visible together on laptops and desktops.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex items-center py-16 lg:min-h-[calc(100svh-5.5rem)] lg:py-8"
    >
      <div className="container-x grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <Eyebrow index="06">Contact</Eyebrow>
              <p className="mt-4 font-display text-xl font-semibold text-accent-text">Get in Touch</p>
              <h2
                id="contact-title"
                className="font-display text-[clamp(3rem,7vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.05em]"
              >
                Contact<span className="text-accent">.</span>
              </h2>
            </div>
            <Globe className="hidden w-36 shrink-0 sm:block lg:w-40 xl:w-48" />
          </div>

          <p className="max-w-md leading-relaxed text-muted sm:text-lg">
            Have a role, a project or just want to say hello? My inbox is always open.
          </p>

          <ContactDetails />
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
