import { useCallback, useEffect, useRef, useState } from 'react';
import { missionArchive } from '@/data/missions';
import type { MissionArchiveRecord } from '@/data/missions';
import '@/styles/mission-window.css';

const terminalPrompt = 'ASA:/mission-control>';
const progressBar = `${'\u2588'.repeat(20)} 100%`;

type TerminalLineTone = 'normal' | 'success' | 'error' | 'dim';
type TerminalLineKind = 'output' | 'command' | 'mission-option';

type TerminalLine = {
  text: string;
  kind?: TerminalLineKind;
  tone?: TerminalLineTone;
  missionId?: string;
};

type OutputLine = {
  text: string;
  tone?: TerminalLineTone;
  missionId?: string;
};

const terminalSignals = {
  keypress: () => undefined,
  commandComplete: () => undefined,
  warning: () => undefined,
};

const getCharacterDelay = (shouldReduceMotion: boolean) => {
  if (shouldReduceMotion) {
    return 2;
  }

  return Math.max(12, 30 + Math.random() * 20 - 8);
};

const formatMissionRecord = (mission: MissionArchiveRecord): OutputLine[] => [
  { text: mission.id },
  { text: '' },
  { text: `TITLE      : ${mission.title}` },
  { text: `ROLE       : ${mission.role}` },
  { text: `COMMANDER  : ${mission.commander}` },
  { text: `DURATION   : ${mission.duration}` },
  { text: `PERIOD     : ${mission.period}` },
  { text: `OBJECTIVE  : ${mission.objective}` },
  { text: `TOOLS      : ${mission.tools}` },
  { text: `RESULT     : ${mission.result}`, tone: 'success' },
  { text: `DEPLOYMENT : ${mission.deployment}` },
];

function MissionWindow() {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const isMountedRef = useRef(true);
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTerminalBusy, setIsTerminalBusy] = useState(true);

  const wait = useCallback((delay: number) => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, shouldReduceMotion ? Math.min(delay, 20) : delay);
      timersRef.current.push(timer);
    });
  }, []);

  const typeCommand = useCallback(
    async (command: string) => {
      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setCurrentCommand('');

      for (let charIndex = 0; charIndex <= command.length; charIndex += 1) {
        if (!isMountedRef.current) {
          return;
        }

        setCurrentCommand(command.slice(0, charIndex));
        terminalSignals.keypress();
        await wait(getCharacterDelay(shouldReduceMotion));
      }

      if (!isMountedRef.current) {
        return;
      }

      setCompletedLines((lines) => [...lines, { kind: 'command', text: command }]);
      setCurrentCommand('');
      terminalSignals.commandComplete();
      await wait(180);
    },
    [wait],
  );

  const printOutput = useCallback(
    async (lines: OutputLine[], delay = 170) => {
      for (const line of lines) {
        if (!isMountedRef.current) {
          return;
        }

        if (line.tone === 'error') {
          terminalSignals.warning();
        }

        setCompletedLines((currentLines) => [
          ...currentLines,
          {
            kind: line.missionId ? 'mission-option' : 'output',
            text: line.text,
            tone: line.tone,
            missionId: line.missionId,
          },
        ]);
        await wait(line.text.length === 0 ? 90 : delay);
      }
    },
    [wait],
  );

  const runStartupSession = useCallback(async () => {
    setIsTerminalBusy(true);
    await typeCommand('login archive');
    await printOutput([
      { text: 'Authorizing...' },
      { text: 'ACCESS GRANTED', tone: 'success' },
    ]);
    await wait(260);
    await typeCommand('ls');
    await printOutput(
      missionArchive.map((mission) => ({
        text: mission.id,
        tone: mission.locked ? 'dim' : 'normal',
        missionId: mission.id,
      })),
    );
    setIsTerminalBusy(false);
  }, [printOutput, typeCommand, wait]);

  const openMission = useCallback(
    async (missionId: string) => {
      if (isTerminalBusy) {
        return;
      }

      const mission = missionArchive.find((archiveMission) => archiveMission.id === missionId);

      if (!mission) {
        return;
      }

      setIsTerminalBusy(true);
      await typeCommand(`open ${mission.id}`);

      if (mission.locked) {
        await printOutput([
          { text: 'ERROR: MISSION ARCHIVE LOCKED', tone: 'error' },
          { text: 'STATUS: AWAITING NEXT PROFESSIONAL MISSION', tone: 'dim' },
        ]);
        setIsTerminalBusy(false);
        return;
      }

      await printOutput([
        { text: 'Reading archive...' },
        { text: progressBar, tone: 'success' },
        { text: '' },
        ...formatMissionRecord(mission),
      ]);
      setIsTerminalBusy(false);
    },
    [isTerminalBusy, printOutput, typeCommand],
  );

  useEffect(() => {
    const activeTimers: number[] = [];

    timersRef.current = activeTimers;
    isMountedRef.current = true;
    void runStartupSession();

    return () => {
      isMountedRef.current = false;
      activeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [runStartupSession]);

  useEffect(() => {
    const screen = screenRef.current;

    if (!screen) {
      return;
    }

    screen.scrollTop = screen.scrollHeight;
  }, [completedLines, currentCommand, isTerminalBusy]);

  const renderTerminalLine = (line: TerminalLine, index: number) => {
    if (line.kind === 'command') {
      return (
        <span key={`${line.text}-${index}`} className="mission-terminal__line">
          <span className="mission-terminal__prompt">{terminalPrompt}</span>
          <span className="mission-terminal__command"> {line.text}</span>
        </span>
      );
    }

    if (line.kind === 'mission-option') {
      return (
        <button
          key={`${line.text}-${index}`}
          type="button"
          className="mission-terminal__option"
          data-tone={line.tone ?? 'normal'}
          disabled={isTerminalBusy}
          onClick={() => line.missionId && void openMission(line.missionId)}
        >
          {line.text}
        </button>
      );
    }

    return (
      <span
        key={`${line.text}-${index}`}
        className="mission-terminal__line"
        data-tone={line.tone ?? 'normal'}
      >
        {line.text || ' '}
      </span>
    );
  };

  return (
    <section className="mission-terminal" aria-label="Classified NASA archive terminal">
      <div className="mission-terminal__scan" aria-hidden="true" />
      <div className="mission-terminal__flicker" aria-hidden="true" />
      <div className="mission-terminal__screen" ref={screenRef} aria-live="polite">
        {completedLines.map(renderTerminalLine)}
        <span className="mission-terminal__current-line">
          <span className="mission-terminal__prompt">{terminalPrompt}</span>
          <span className="mission-terminal__command"> {currentCommand}</span>
          <span className="mission-cursor" aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}

export default MissionWindow;
