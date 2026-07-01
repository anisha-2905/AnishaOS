import digiJournalImage from '@/assets/projects/digi-journal.png';
import faceAttendanceImage from '@/assets/projects/face-attendance.png';
import mewCafeImage from '@/assets/projects/mewcafe.png';
import sevenSeasImage from '@/assets/projects/seven-seas-travel.png';
import anisharesume from '@/assets/projects/anisharesume.png';

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  notionUrl?: string;
  image: string;
  status: string;
};

export const projects: Project[] = [
  {
    id: 'face-recognition-attendance',
    title: 'Face Recognition Attendance System',
    category: 'Computer Vision / Automation',
    description:
      'A smart attendance workflow that identifies registered users through face recognition and records attendance with less manual effort.',
    techStack: ['Python', 'Flask', 'MySQL', 'OpenCV', 'Face Recognition', 'Bootstrap'], 
    features: [ 'Role-based dashboards for Admin, Teacher, and Student', 
      'Student face registration and attendance marking', 
      'Attendance reports with filters and summaries', 
      'Excel/PDF report export support', ],
    githubUrl: 'https://github.com/anisha-2905/face-recognition-attendance-system',
    notionUrl: 'https://app.notion.com/p/anishadesigncasestudy/Face-Recognition-Attendance-System-37ee6b5a3aab80cbaff8e60db0a3bddc?v=787e6b5a3aab83aaa4ad08010401b715&source=copy_link',
    image: faceAttendanceImage,
    status: 'Prototype',
  },
  {
    id: 'mewcafe',
    title: 'MewCafe',
    category: 'Desktop Application',
    description:
      'A cozy desktop productivity application built with Electron, React, and Vite. MewCafe combines the Pomodoro technique, task management, seasonal themes, ambient sounds, and a pixel-art interface to create a relaxing focus environment.',
    techStack: [
      'Electron',
      'React',
      'Vite',
      'JavaScript',
      'CSS',
      'Framer Motion'
    ],
    features: [
      'Pomodoro timer with focus and break sessions',
      'Task management with local persistence',
      'Daily productivity statistics',
      'Custom frameless desktop window',
    ],
    githubUrl: 'https://github.com/anisha-2905/Mewcafe',
    notionUrl: 'https://app.notion.com/p/anishadesigncasestudy/MewCafe-Focus-Timer-and-To-do-List-2fde6b5a3aab80b887b0c298f97b7cfe?v=787e6b5a3aab83aaa4ad08010401b715&source=copy_link',
    liveUrl: '',
    image: mewCafeImage,
    status: 'Completed',
  },
  {
    id: 'seven-seas-travel',
    title: 'Seven Seas Travel',
    category: 'Travel / Web Experience',
    description:
      'A travel-themed web experience for exploring destinations, packages, and trip information with an emphasis on clear browsing.',
    techStack: ['Framer', 'Responsive Design', 'Web Design', 'Content Structuring'], 
    features: [ 'Designed and developed a live travel agency website', 
      'Created destination and package-focused page sections', 
      'Improved browsing flow for domestic and international travel content', 
      'Handled layout, content integration, testing, and deployment', ], 
    githubUrl: 'https://github.com/anisha-2905/seven-seas-travel-website', 
    notionUrl: 'https://app.notion.com/p/anishadesigncasestudy/SevenSeasTravel-Travel-Agency-Website-Case-Study-210e6b5a3aab835baaab01d06a134dd5?v=787e6b5a3aab83aaa4ad08010401b715&source=copy_link',
    liveUrl: 'https://sevenseastravel.in/', 
    image: sevenSeasImage, 
    status: 'Completed',
  },
  {
  id: 'resume-portfolio',
  title: 'Resume Portfolio',
  category: 'UI/UX Design / Personal Branding',
  description:
    'A responsive resume website designed and built in Framer to present my education, skills, projects, and professional profile through a clean, modern, and user-friendly interface.',
  techStack: [
    'Framer',
    'UI Design',
    'Responsive Design',
    'Typography',
    'Visual Hierarchy',
    'Personal Branding',
  ],
  features: [
    'Designed and developed a responsive personal resume website',
    'Created a clean and professional interface with intuitive navigation',
    'Optimized layouts for desktop, tablet, and mobile devices',
    'Showcased education, projects, skills, and contact information',
  ],
  githubUrl: '',
  notionUrl: '',
  liveUrl: 'https://anisharesume.framer.website/',
  image: anisharesume,
  status: 'Completed',
},
  {
    id: 'digi-journal',
    title: 'Digi Journal',
    category: 'Productivity / Personal Tech',
    description:
      'A digital journaling application designed to organize personal notes, reflections, and daily writing in a clean software interface.',
    techStack: ['React', 'Vite', 'TypeScript', 'CSS', 'react-pageflip'], 
    features: [ 'Closed journal to open-book interaction flow', 
      'Page-flip reading experience', 'Editable journal pages', 
      'Planned backend support with Node.js, Express, and MongoDB', ],
    githubUrl: '',
    notionUrl: '',
    liveUrl: '',
    image: digiJournalImage,
    status: 'In Progress',
  },
  
];
