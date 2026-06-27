export type MissionArchiveRecord = {
  id: string;
  title: string;
  commander: string;
  duration: string;
  objective: string;
  result: string;
  deployment: string;
  locked?: boolean;
  lockedMessage?: string;
};

export const missionArchive: MissionArchiveRecord[] = [
  {
    id: 'MISSION-001',
    title: 'Seven Seas Travel',
    commander: 'Anisha Salaskar',
    duration: '120 Hours',
    objective: 'Develop company website.',
    result: 'SUCCESS',
    deployment: 'COMPLETE',
  },
  {
    id: 'MISSION-002',
    title: '',
    commander: '',
    duration: '',
    objective: '',
    result: '',
    deployment: '',
    locked: true,
    lockedMessage: 'Awaiting next professional mission...',
  },
];
