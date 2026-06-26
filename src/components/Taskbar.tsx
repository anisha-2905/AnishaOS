import { useEffect, useState } from 'react';
import { taskbarLinks } from '@/data/taskbarLinks';
import type { TaskbarLinkId } from '@/types/taskbar';
import preloaderMoon from '@/assets/icons/preloader-moon.png';
import '@/styles/taskbar.css';

function formatClockTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

function TaskbarIcon({ id }: { id: TaskbarLinkId }) {
  if (id === 'github') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="taskbar__icon-svg">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.51.47-3.16-.63-3.36-1.2-.11-.29-.6-1.2-1.03-1.44-.35-.19-.85-.66-.01-.67.79-.01 1.35.74 1.54 1.05.9 1.55 2.34 1.11 2.91.85.09-.67.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.11.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.28 9.28 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.32.68.93.68 1.89 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (id === "notion") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="taskbar__icon-svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3.5 18.5 2l.5 17.5L6 22 5 3.5Z" />
        <path d="M8 6h5.5" />
        <path d="M8 9v7" />
        <path d="M8 9l5 7V9" />
        <path d="M13 9v7" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="taskbar__icon-svg">
        <path
          fill="currentColor"
          d="M5.36 8.96H2.72v12.16h2.64V8.96ZM4.04 3.04a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1Zm7.2 5.92H8.72v12.16h2.64v-6.38c0-1.68.31-3.31 2.4-3.31 2.06 0 2.08 1.93 2.08 3.42v6.27h2.64v-7.07c0-3.47-.74-5.35-4.18-5.35-1.65 0-2.76.91-3.21 1.77h-.04l.19-1.51Z"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="taskbar__icon-svg">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16v12H4V6Zm0 1 8 6 8-6"
      />
    </svg>
  );
}

function Taskbar() {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <footer className="taskbar" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        className="taskbar__start-button"
        aria-label="AnishaOS menu"
      >
        <img
          src={preloaderMoon}
          alt=""
          className="taskbar__start-icon"
          draggable={false}
        />

        <span className="taskbar__start-title">
          AnishaOS
        </span>
      </button>

      <nav className="taskbar__links" aria-label="Profile links">
        {taskbarLinks.map((link) => (
          <a
            key={link.id}
            className="taskbar__icon-link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel ?? link.label}
            title={link.label}
          >
            <TaskbarIcon id={link.id} />
          </a>
        ))}
        <time className="taskbar__clock" dateTime={currentTime.toISOString()}>
          {formatClockTime(currentTime)}
        </time>
      </nav>
    </footer>
  );
}

export default Taskbar;
