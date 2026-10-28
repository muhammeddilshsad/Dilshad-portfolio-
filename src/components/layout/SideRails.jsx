import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { cvLinkProps } from '../../lib/cv';
import { brandIcons } from '../ui/BrandIcons';
import SmartLink from '../ui/SmartLink';

/** Icon that leans toward the pointer while hovered. */
function Magnetic({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.45);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.45);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

const iconClass = 'grid size-11 place-items-center rounded-full text-muted transition-colors duration-300 hover:text-accent-text';

/** Fixed social links on the left and a vertical résumé link on the right (desktop). */
export default function SideRails() {
  return (
    <>
      <motion.aside
        aria-label="Social links"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-2 xl:flex"
      >
        {profile.socials.map(({ id, label, url }) => {
          const Icon = brandIcons[id];
          return (
            <Magnetic key={id}>
              <SmartLink href={url} label={label} className={iconClass}>
                <Icon className="size-5" />
              </SmartLink>
            </Magnetic>
          );
        })}
        <Magnetic>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} className={iconClass}>
            <Mail className="size-5" aria-hidden="true" />
          </a>
        </Magnetic>
        <span aria-hidden="true" className="mt-2 h-24 w-px bg-gradient-to-b from-line to-transparent" />
      </motion.aside>

      <motion.a
        {...cvLinkProps}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="group fixed right-6 bottom-40 z-40 hidden items-center gap-3 font-mono text-xs font-medium tracking-[0.35em] text-subtle transition-colors duration-500 hover:text-fg xl:flex"
        style={{ transformOrigin: 'right bottom', rotate: -90 }}
      >
        <span className="h-px w-10 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-accent" />
        RESUME
      </motion.a>
    </>
  );
}
