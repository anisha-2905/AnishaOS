export type SkillCategory = {
  id: string;
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind',
      'GSAP',
      'Framer Motion',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      'Python',
      'Flask',
      'Node.js',
      'Express',
      'MySQL',
      'MongoDB',
      'SQLite',
      'REST APIs',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Software',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'Figma',
      'Notion',
      'Framer',
      'TouchDesigner',
      'Vite',
    ],
  },
];
