export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const footerLinks = [
  ...navLinks.filter((link) => link.id !== 'home' && link.id !== 'contact'),
  { id: 'services', label: 'What I Do' },
  { id: 'contact', label: 'Contact' },
];
