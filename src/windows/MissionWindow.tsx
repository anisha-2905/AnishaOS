import { useEffect, useMemo, useRef, useState } from 'react';
import { missionArchive } from '@/data/missions';
import type { MissionArchiveRecord } from '@/data/missions';
import '@/styles/mission-window.css';

const terminalPrompt = 'ASA:/mission-control>';

type TerminalLineTone = 'normal' | 'success' | 'error' | 'dim';

type TerminalLine = {
  text: string;
  tone?: TerminalLineTone;
};

type TerminalQueueItem = TerminalLine & {
  command?: boolean;
  pauseAfter?: number;
  typeSpeed?: number;
};

const terminalSignals = {
  keypress: () => undefined,
  commandComplete: () => undefined,
  warning: () => undefined,
};

const formatMissionRecord = (mission: MissionArchiveRecord): TerminalQueueItem[] => [
  { text: mission.id, pauseAfter: 210 },
  { text: '' },
  { text: `TITLE      : ${mission.title}` },
  { text: `COMMANDER  : ${mission.commander}` },
  { text: `DURATION   : ${mission.duration}` },
  { text: `OBJECTIVE  : ${mission.objective}` },
  { text: `RESULT     : ${mission.result}`, tone: 'success', pauseAfter: 210 },
  { text: `DEPLOYMENT : ${mission.deployment}` },
];

const buildTerminalQueue = (): TerminalQueueItem[] => {
  const firstMission = missionArchive.find((mission) => mission.id === 'MISSION-001');
  const lockedMission = missionArchive.find((mission) => mission.id === 'MISSION-002');

  return [
    { text: 'login archive', command: true, pauseAfter: 260 },
    { text: 'Authorizing...', pauseAfter: 260 },
    { text: 'ACCESS GRANTED', tone: 'success', pauseAfter: 320 },
    { text: 'ls', command: true, pauseAfter: 220 },
    { text: 'MISSION-001' },
    { text: 'MISSION-002.locked', tone: 'dim', pauseAfter: 320 },
    { text: 'open MISSION-001', command: true, pauseAfter: 260 },
    { text: 'Reading archive...', pauseAfter: 220 },
    { text: `${'\u2588'.repeat(20)} 100%`, tone: 'success', pauseAfter: 250 },
    { text: 'Retrieving classified mission log...', pauseAfter: 240 },
    { text: 'Mission data loaded.', tone: 'success', pauseAfter: 300 },
    { text: '' },
    ...(firstMission ? formatMissionRecord(firstMission) : []),
    { text: '', pauseAfter: 420 },
    { text: 'open MISSION-002', command: true, pauseAfter: 260 },
    { text: 'ERROR', tone: 'error', pauseAfter: 230 },
    { text: 'MISSION ARCHIVE LOCKED', tone: 'error', pauseAfter: 230 },
    {
      text: lockedMission?.lockedMessage ?? 'Awaiting next professional mission...',
      tone: 'dim',
      pauseAfter: 260,
    },
  ];
};

const getCharacterDelay = (baseDelay: number, shouldReduceMotion: boolean) => {
  if (shouldReduceMotion) {
    return 2;
  }

  const variance = Math.random() * 18 - 7;
  return Math.max(8, baseDelay + variance);
};

function MissionWindow() {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const terminalQueue = useMemo(buildTerminalQueue, []);
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(`${terminalPrompt} `);

  useEffect(() => {
    const timers: number[] = [];
    let isCancelled = false;
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const wait = (delay: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, shouldReduceMotion ? Math.min(delay, 20) : delay);
        timers.push(timer);
      });

    const typeQueueItem = async (item: TerminalQueueItem) => {
      const lineText = item.command ? `${terminalPrompt} ${item.text}` : item.text;
      const baseDelay = item.typeSpeed ?? (item.command ? 28 : 16);

      setCurrentLine('');

      if (lineText.length === 0) {
        setCompletedLines((lines) => [...lines, { text: '' }]);
        await wait(item.pauseAfter ?? 120);
        return;
      }

      for (let charIndex = 0; charIndex <= lineText.length; charIndex += 1) {
        if (isCancelled) {
          return;
        }

        setCurrentLine(lineText.slice(0, charIndex));
        terminalSignals.keypress();
        await wait(getCharacterDelay(baseDelay, shouldReduceMotion));
      }

      if (!isCancelled) {
        setCompletedLines((lines) => [...lines, { text: lineText, tone: item.tone }]);
        setCurrentLine('');
        terminalSignals.commandComplete();
        await wait(item.pauseAfter ?? 180);
      }
    };

    const runTerminalSession = async () => {
      for (const item of terminalQueue) {
        if (isCancelled) {
          return;
        }

        if (item.tone === 'error') {
          terminalSignals.warning();
        }

        await typeQueueItem(item);
      }

      if (!isCancelled) {
        setCurrentLine(`${terminalPrompt} `);
      }
    };

    void runTerminalSession();

    return () => {
      isCancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [terminalQueue]);

  useEffect(() => {
    const screen = screenRef.current;

    if (!screen) {
      return;
    }

    screen.scrollTop = screen.scrollHeight;
  }, [completedLines, currentLine]);

  return (
    <section className="mission-terminal" aria-label="Classified NASA archive terminal">
      <div className="mission-terminal__scan" aria-hidden="true" />
      <div className="mission-terminal__flicker" aria-hidden="true" />
      <div className="mission-terminal__screen" ref={screenRef} aria-live="polite">
        {completedLines.map((line, index) => (
          <span
            // Terminal output can repeat identical text, so index is stable within this append-only log.
            key={`${line.text}-${index}`}
            className="mission-terminal__line"
            data-tone={line.tone ?? 'normal'}
          >
            {line.text || ' '}
          </span>
        ))}
        <span className="mission-terminal__current-line">
          {currentLine}
          <span className="mission-cursor" aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}

export default MissionWindow;
