import { Atom, Gauge, LayoutDashboard, MonitorSmartphone, PlugZap, Shapes } from 'lucide-react';

export const services = [
  {
    title: 'React Frontend Development',
    description:
      'Component-driven React and Next.js interfaces with predictable state management using Redux Toolkit.',
    icon: Atom,
    tags: ['React.js', 'Next.js', 'TypeScript', 'Redux Toolkit'],
  },
  {
    title: 'Responsive Website Development',
    description:
      'Carefully crafted layouts with Tailwind CSS that feel right on phones, tablets, laptops and large displays.',
    icon: MonitorSmartphone,
    tags: ['Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
  },
  {
    title: 'Dashboard & Admin Panel Development',
    description:
      'Data-rich dashboards with tables, search, filters, sorting, pagination, date ranges and exports.',
    icon: LayoutDashboard,
    tags: ['Data tables', 'Filters', 'Pagination', 'Exports'],
  },
  {
    title: 'REST API Integration',
    description:
      'Axios-based integrations with clean data flows, validation, and thoughtful loading and error states.',
    icon: PlugZap,
    tags: ['Axios', 'REST APIs', 'JWT auth', 'Postman'],
  },
  {
    title: 'UI Implementation',
    description:
      'Turning designs into faithful, accessible and reusable UI components — modals, forms, tables and more.',
    icon: Shapes,
    tags: ['Figma', 'Reusable components', 'Modals', 'Validation'],
  },
  {
    title: 'Performance & UX Improvements',
    description:
      'Resolving bugs, smoothing workflows and improving how fast and intuitive an application feels.',
    icon: Gauge,
    tags: ['Debugging', 'Usability', 'Cloudinary optimization'],
  },
];
