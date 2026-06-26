import aboutIcon from '@/assets/icons/about-cat-astronaut.png';
import educationIcon from '@/assets/icons/education-book.png';
import journeyIcon from '@/assets/icons/journey-crystal-ball.png';
import projectsIcon from '@/assets/icons/projects-folder.png';
import skillsIcon from '@/assets/icons/skills-card.png';
import type { DesktopIconConfig } from '@/types/desktop';

export const desktopIcons: DesktopIconConfig[] = [
  {
    id: 'about',
    label: 'AboutMe.exe',
    imageSrc: aboutIcon,
    imageAlt: 'Cat astronaut pixel icon',
    position: {
      x: 'var(--desktop-column-1)',
      y: 'var(--desktop-row-1)',
    },
  },
  {
    id: 'projects',
    label: 'Projects.exe',
    imageSrc: projectsIcon,
    imageAlt: 'Folder pixel icon',
    position: {
      x: 'var(--desktop-column-2)',
      y: 'var(--desktop-row-1)',
    },
  },
  {
    id: 'education',
    label: 'Education.exe',
    imageSrc: educationIcon,
    imageAlt: 'Book pixel icon',
    position: {
      x: 'var(--desktop-column-2)',
      y: 'var(--desktop-row-2)',
    },
  },
  {
    id: 'skills',
    label: 'Skills.exe',
    imageSrc: skillsIcon,
    imageAlt: 'Card pixel icon',
    position: {
      x: 'var(--desktop-column-1)',
      y: 'var(--desktop-row-2)',
    },
  },
  {
    id: 'mission',
    label: 'Mission.exe',
    imageSrc: journeyIcon,
    imageAlt: 'Crystal ball pixel icon',
    position: {
      x: 'var(--desktop-column-1)',
      y: 'var(--desktop-row-3)',
    },
  },
];
