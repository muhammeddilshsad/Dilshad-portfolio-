import { cn, isPlaceholderUrl, toast } from '../../lib/utils';

/**
 * External link that degrades gracefully: when the URL is missing or still a
 * placeholder, it renders a button that explains the link is coming soon.
 */
export default function SmartLink({ href, label, pendingMessage, className, children, ...props }) {
  if (isPlaceholderUrl(href)) {
    return (
      <button
        type="button"
        aria-label={`${label} (link coming soon)`}
        title={`${label} — link coming soon`}
        onClick={() => toast(pendingMessage ?? `${label} link coming soon.`)}
        className={cn('cursor-help', className)}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className} {...props}>
      {children}
    </a>
  );
}
