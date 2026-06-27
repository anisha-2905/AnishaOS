export type MissionArchiveRecord = {
  id: string;
  title: string;
  role: string;
  commander: string;
  duration: string;
  period: string;
  objective: string;
  tools: string;
  result: string;
  deployment: string;
  locked?: boolean;
  lockedMessage?: string;
};

export const missionArchive: MissionArchiveRecord[] = [
  {
    id: 'MISSION-001',
    title: 'Seven Seas Travel',
    role: 'Web Development Intern',
    commander: 'Anisha Salaskar',
    duration: '120 Hours',
    period: '09 Dec 2025 - 20 Jan 2026',
    objective: 'Design and develop a responsive travel agency website.',
    tools: 'Framer, Responsive Design, Web Layout, Content Integration',
    result: 'SUCCESS',
    deployment: 'COMPLETE',
  },
  {
    id: 'MISSION-002',
    title: '',
    role: '',
    commander: '',
    duration: '',
    period: '',
    objective: '',
    tools: '',
    result: '',
    deployment: '',
    locked: true,
    lockedMessage: 'Awaiting next professional mission...',
  },
];
