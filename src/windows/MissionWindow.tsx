import { useEffect, useRef, useState } from 'react';
import '@/styles/mission-window.css';

const terminalPrompt = 'ASA:/mission-control>';

const bootLines = [
  `${terminalPrompt} Accessing mission logs...`,
  `${terminalPrompt} Loading archive...`,
  `${terminalPrompt} Done.`,
];

const archiveLines = [
  '========================================',
  '',
  'MISSION-001',
  '',
  '========================================',
  '',
  'Title:',
  'Seven Seas Travel',
  '',
  'Commander:',
  'Anisha Salaskar',
  '',
  'Duration:',
  '120 Hours',
  '',
  'Objective:',
  'Develop company website.',
  '',
  'Mission Result:',
  'SUCCESS',
  '',
  'Deployment:',
  'Complete',
  '',
  '========================================',
  '',
  'MISSION-002',
  '',
  'STATUS:',
  'LOCKED',
  '',
  'Awaiting next professional mission...',
];

const missionTwoStartIndex = archiveLines.findIndex((line) => line === 'MISSION-002');

function MissionWindow() {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isArchiveComplete, setIsArchiveComplete] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState('MISSION-001');

  useEffect(() => {
    const timers: number[] = [];
    let isCancelled = false;

    const wait = (delay: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, delay);
        timers.push(timer);
      });

    const typeLine = async (line: string, speed: number) => {
      setCurrentLine('');

      for (let charIndex = 0; charIndex <= line.length; charIndex += 1) {
        if (isCancelled) {
          return;
        }

        setCurrentLine(line.slice(0, charIndex));
        await wait(speed);
      }

      if (!isCancelled) {
        setCompletedLines((lines) => [...lines, line]);
        setCurrentLine('');
      }
    };

    const typeLines = async (lines: string[], speed: number) => {
      for (const line of lines) {
        if (isCancelled) {
          return;
        }

        await typeLine(line, line.length === 0 ? 1 : speed);
        await wait(line.length === 0 ? 90 : 190);
      }
    };

    const runTerminalSession = async () => {
      await typeLines(bootLines, 20);
      await wait(300);

      if (isCancelled) {
        return;
      }

      setCompletedLines([]);
      setCurrentLine('');
      await wait(120);
      await typeLines(archiveLines, 12);
      await wait(160);

      if (!isCancelled) {
        setIsArchiveComplete(true);
      }
    };

    void runTerminalSession();

    return () => {
      isCancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const screen = screenRef.current;

    if (!screen) {
      return;
    }

    screen.scrollTop = screen.scrollHeight;
  }, [completedLines, currentLine, isArchiveComplete]);

  const renderTerminalLine = (line: string, index: number) => {
    const isLockedLine = missionTwoStartIndex !== -1 && index >= missionTwoStartIndex;

    if (isArchiveComplete && line === 'MISSION-001') {
      return (
        <button
          key={`${line}-${index}`}
          type="button"
          className="mission-terminal__selectable-line"
          data-selected={selectedMissionId === 'MISSION-001'}
          onClick={() => setSelectedMissionId('MISSION-001')}
          aria-pressed={selectedMissionId === 'MISSION-001'}
        >
          <span aria-hidden="true">{selectedMissionId === 'MISSION-001' ? '> ' : '  '}</span>
          {line}
        </button>
      );
    }

    return (
      <span
        key={`${line}-${index}`}
        className={isLockedLine ? 'mission-terminal__locked-line' : undefined}
      >
        {line || ' '}
      </span>
    );
  };

  return (
    <section className="mission-terminal" aria-label="Classified NASA archive terminal">
      <div className="mission-terminal__scan" aria-hidden="true" />
      <div className="mission-terminal__flicker" aria-hidden="true" />
      <div className="mission-terminal__screen" ref={screenRef} aria-live="polite">
        {completedLines.map(renderTerminalLine)}
        {!isArchiveComplete ? (
          <span className="mission-terminal__current-line">
            {currentLine}
            <span className="mission-cursor" aria-hidden="true" />
          </span>
        ) : null}
        {isArchiveComplete ? (
          <span className="mission-terminal__current-line">
            {terminalPrompt}
            <span className="mission-cursor" aria-hidden="true" />
          </span>
        ) : null}
      </div>
    </section>
  );
}

export default MissionWindow;
