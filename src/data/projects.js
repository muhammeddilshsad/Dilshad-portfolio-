/**
 * Featured projects — descriptions and highlights are taken word for word
 * from the CV.
 *
 * `links.live` / `links.github`: set to a real URL once available. While they
 * are `null`, the buttons explain that the link is coming soon.
 */
export const projects = [
  {
    id: 'media-platform',
    title: 'Pexels-Inspired Media Platform',
    category: 'Media Sharing Platform',
    summary:
      'A Pexels-style media sharing app for images and videos, with drag-and-drop uploads, real-time preview, a custom masonry gallery and curated collections.',
    tech: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Cloudinary'],
    features: [
      'Built a Pexels-style media sharing app featuring image and video uploads, drag-and-drop interface, and real-time preview.',
      'Designed a custom masonry layout with category filters, titles, and descriptions for a visually dynamic experience.',
      'Integrated authentication, user profiles, protected routes, and tab-based navigation (Gallery, Highlights, Collections).',
      'Used Redux Toolkit for global state management with instant updates for uploads, follows, and leaderboard ranking.',
      'Enhanced app performance using Cloudinary optimization, a responsive navbar, dropdowns, and smooth Tailwind animations.',
    ],
    links: { live: 'https://pexels-clone-psi.vercel.app', github: null },
  },
  {
    id: 'skillmentorx',
    title: 'SkillMentorX Platform',
    category: 'AI-Powered Mentorship',
    summary:
      'An AI-powered mentor–student web app supporting real-time communication, scheduling and progress tracking.',
    tech: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'Redux',
      'MongoDB',
      'Tailwind CSS',
      'Framer Motion',
      'React Hook Form',
      'Axios',
    ],
    features: [
      'Developed an AI-powered mentor-student web app supporting real-time communication, scheduling, and progress tracking.',
      'Designed a modern, mobile-friendly UI using Tailwind CSS and Framer Motion for smooth animations and consistency.',
      'Created modular components for dashboards, chat interfaces, and profiles with efficient state management via Redux.',
      'Integrated secure forms and APIs using React Hook Form, Axios, and Express for mentor registration and authentication.',
      'Optimized SEO and performance using Next.js SSR & SSG, ensuring scalability and clean architectural structure.',
    ],
    links: { live: null, github: null },
  },
  {
    id: 'xtract-healthcare',
    title: 'Xtract Healthcare – Healthcare Management Platform',
    category: 'Healthcare Management',
    summary:
      'Worked on a healthcare management platform designed to streamline and manage healthcare-related workflows. Developed and maintained responsive React.js interfaces for managing users, partners, facilities, payers, payees, clients, projects, reports, and operational processes.',
    tech: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'Axios', 'Redux Toolkit', 'REST APIs'],
    featuresLabel: 'Key contributions',
    features: [
      'Developed and enhanced user-friendly interfaces using React.js, JavaScript, HTML, CSS, Bootstrap, and Tailwind CSS.',
      'Implemented user assignment functionality for tickets and subtasks.',
      'Worked on Payer/Payee Management, Lockbox, Process Queue, Reports, and Dashboard modules.',
      'Integrated frontend applications with REST APIs using Axios and handled API responses and error scenarios.',
      'Implemented search, filtering, sorting, pagination, date-range filtering, export, and data table functionalities.',
      'Developed and maintained reusable React components and improved existing UI/UX.',
      'Implemented permission-based UI functionality, status handling, validation, modals, alerts, and confirmation flows.',
      'Worked with Redux Toolkit for state management where required.',
      'Fixed UI issues, API integration issues, and improved application performance and usability.',
      'Collaborated with the team to implement new features, resolve bugs, and deliver enhancements based on project requirements.',
    ],
    links: { live: null, github: null },
    privateNote: 'Proprietary client product — source and live app are not public.',
  },
];
