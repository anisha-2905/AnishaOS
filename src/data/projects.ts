import digiJournalImage from '@/assets/projects/digi-journal.png';
import faceAttendanceImage from '@/assets/projects/face-attendance.png';
import mewCafeImage from '@/assets/projects/mewcafe.png';
import sevenSeasImage from '@/assets/projects/seven-seas-travel.png';

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
    image: digiJournalImage,
    status: 'In Progress',
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
    id: 'bioattend',
    title: 'BioAttend',
    category: 'Attendance / System Design',
    description:
      'A biometric attendance concept focused on improving reliability, record keeping, and verification in attendance systems.',
    techStack: ['Python', 'Database Design', 'Fingerprint Sensor', 'UI Flow', 'Hardware Integration'], 
    features: [ 'Fingerprint-based attendance verification flow', 
      'Student and attendance record management', 
      'Backend, frontend, database, and hardware integration', 
      'Built as an academic system design project', ],
    githubUrl: '',
    notionUrl:'',
    image: '',
    status: 'Completed',
  },
  {
    id: 'mewcafe',
    title: 'MewCafe',
    category: 'Cafe / Frontend UI',
    description:
      'A playful cafe interface project with menu browsing, visual hierarchy, and a friendly ordering-style user experience.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Framer', 'UI Design'], 
    features: [ 'Focus timer for study and work sessions', 
      'Simple to-do task input flow', 'Minimal and friendly interface', 
      'Built as a self-learning frontend project', ],
    githubUrl: 'https://github.com/anisha-2905',
    notionUrl: 'https://app.notion.com/p/anishadesigncasestudy/MewCafe-Focus-Timer-and-To-do-List-2fde6b5a3aab80b887b0c298f97b7cfe?v=787e6b5a3aab83aaa4ad08010401b715&source=copy_link',
    liveUrl: 'https://mewcafe.framer.website/',
    image: mewCafeImage,
    status: 'Completed',
  },
];
