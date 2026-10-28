import { profile } from '../../data/profile';
import { cn } from '../../lib/utils';
import { brandIcons } from './BrandIcons';
import SmartLink from './SmartLink';

export default function SocialLinks({ className, itemClassName }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {profile.socials.map(({ id, label, url }) => {
        const Icon = brandIcons[id];
        return (
          <li key={id}>
            <SmartLink
              href={url}
              label={label}
              className={cn(
                'glass grid size-11 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-text',
                itemClassName,
              )}
            >
              <Icon className="size-[18px]" />
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
}
