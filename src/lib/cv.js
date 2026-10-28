import { profile } from '../data/profile';
import { toast } from './utils';

/**
 * Click handler for "Download CV" links. Checks the PDF actually exists before
 * downloading, so a missing file shows a notice instead of an error page.
 */
export async function downloadCv(event) {
  event.preventDefault();
  try {
    const res = await fetch(profile.cvUrl, { method: 'HEAD' });
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.includes('pdf')) throw new Error('CV not found');

    const link = document.createElement('a');
    link.href = profile.cvUrl;
    link.download = profile.cvFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    toast(`The CV is being updated — email ${profile.email} for a copy.`);
  }
}

/** Props shared by every "Download CV" link (works without JS via `download`). */
export const cvLinkProps = { href: profile.cvUrl, download: profile.cvFileName, onClick: downloadCv };
