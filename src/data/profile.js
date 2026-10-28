/**
 * Personal details used across the site.
 *
 * Any social URL containing "YOUR-" is treated as a placeholder: it is
 * rendered as a "link coming soon" button instead of a broken link.
 *
 * 📄 CV — the PDF lives at /public/Muhammed-Dilshad-Tk-CV.pdf (same name as
 * `cvUrl` below). If the file is missing, the Download CV buttons show a
 * friendly notice instead of downloading an error page.
 */
export const profile = {
  name: 'Muhammed Dilshad Tk',
  firstName: 'Dilshad',
  initials: 'MD',
  roles: ['React Developer', 'Frontend Engineer'],
  headline: 'Building Modern Web Experiences That Make an Impact.',
  intro:
    "I'm a React Developer passionate about building responsive, scalable, and visually engaging web applications with clean code and exceptional user experiences.",
  tagline: 'React Developer crafting responsive, modern and user-friendly web experiences.',
  // Profile summary, word for word from the CV.
  summary:
    'React Developer skilled in building fast, responsive, and scalable web applications using React.js, Next.js, and TypeScript. Experienced in Redux Toolkit for state management and Tailwind CSS for modern UI design. Proficient in API integration, authentication, and performance optimization. Passionate about creating clean, dynamic, and maintainable interfaces, and eager to contribute to impactful projects in a collaborative environment.',
  email: 'diludilshazz42@gmail.com',
  phone: '+91 87140 97500',
  phoneHref: 'tel:+918714097500',
  location: 'Malappuram, Kerala, India',
  currentRole: 'React Developer',
  currentCompany: 'Aventus Informatics LLP',
  cvUrl: '/Muhammed-Dilshad-Tk-CV.pdf',
  cvFileName: 'Muhammed-Dilshad-Tk-CV.pdf',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/muhammeddilshsad' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammed-dilshad-/' },
  ],
};
