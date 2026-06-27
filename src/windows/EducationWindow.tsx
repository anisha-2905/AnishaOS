import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import earthAsset from '@/assets/education/earth.png';
import moonAsset from '@/assets/education/moon.png';
import rocketAsset from '@/assets/education/rocket.png';
import satelliteAsset from '@/assets/education/satellite.png';
import sunAsset from '@/assets/education/sun.png';
import venusAsset from '@/assets/education/venus.png';
import '@/styles/education-window.css';

type Mission = {
  id: string;
  marker: string;
  mission: string;
  title: string;
  year: string;
  location: string;
  institution: string;
  asset: string;
  x: number;
  y: number;
  size: 'sun' | 'venus' | 'earth';
  tone: string;
};

type RoutePoint = {
  x: number;
  y: number;
};

const sceneHeight = 1900;
const routePath =
  'M 230 190 C 405 315 610 330 690 515 C 760 700 415 735 370 930 C 342 1052 500 1083 570 1110 C 668 1148 668 1256 700 1305';

const routePoints: RoutePoint[] = [
  { x: 23, y: 190 },
  { x: 69, y: 515 },
  { x: 37, y: 930 },
  { x: 57, y: 1110 },
  { x: 70, y: 1305 },
];

const missions: Mission[] = [
  {
    id: 'ssc',
    marker: 'SSC',
    mission: 'Secondary Mission',
    title: 'Secondary School Certificate (SSC)',
    year: '2021',
    location: 'Malad, Mumbai',
    institution: 'St. Francis High School',
    asset: sunAsset,
    x: 22,
    y: 170,
    size: 'sun',
    tone: '#ff9d35',
  },
  {
    id: 'hsc',
    marker: 'HSC',
    mission: 'Pre-University Mission',
    title: 'Higher Secondary Certificate (Commerce)',
    year: '2021-2023',
    location: 'Kandivali, Mumbai',
    institution: 'KES Shroff College',
    asset: venusAsset,
    x: 70,
    y: 500,
    size: 'venus',
    tone: '#ffe2a1',
  },
  {
    id: 'bsc-it',
    marker: 'B.Sc. IT',
    mission: 'Graduate Mission',
    title: 'Bachelor of Science in Information Technology',
    year: '2023-2026',
    location: 'Kandivali, Mumbai',
    institution: 'KES Shroff College',
    asset: earthAsset,
    x: 42,
    y: 945,
    size: 'earth',
    tone: '#76c9ff',
  },
];

const orbitProjects = [
  {
    title: 'Face Recognition Attendance System',
    summary: 'Automated attendance tracking using face recognition and database records.',
  },
  {
    title: 'Digital Journal',
    summary: 'A focused journaling app for organizing daily thoughts and entries.',
  },
  {
    title: 'Portfolio OS',
    summary: 'The AnishaOS desktop portfolio experience with draggable app windows.',
  },
  {
    title: 'BioAttend',
    summary: 'A biometric attendance concept for cleaner academic attendance workflows.',
  },
  {
    title: 'Travel Website',
    summary: 'A complete responsive travel agency website for Seven Seas Travel.',
  },
];

const interpolateRoute = (progress: number) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const scaledProgress = clampedProgress * (routePoints.length - 1);
  const segmentIndex = Math.min(Math.floor(scaledProgress), routePoints.length - 2);
  const segmentProgress = scaledProgress - segmentIndex;
  const start = routePoints[segmentIndex];
  const end = routePoints[segmentIndex + 1];
  const x = start.x + (end.x - start.x) * segmentProgress;
  const y = start.y + (end.y - start.y) * segmentProgress;
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90;

  return { x, y, angle };
};

const getScrollMissionId = (progress: number) => {
  if (progress < 0.28) {
    return 'ssc';
  }

  if (progress < 0.52) {
    return 'hsc';
  }

  if (progress < 0.78) {
    return 'bsc-it';
  }

  return progress < 0.9 ? 'internship' : 'projects';
};

function EducationWindow() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const routePathRef = useRef<SVGPathElement | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const [rocket, setRocket] = useState(() => interpolateRoute(0));
  const activeMissionId = selectedMissionId ?? getScrollMissionId(routeProgress);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const pathElement = routePathRef.current;

    if (!scrollElement || !pathElement) {
      return undefined;
    }

    let animationFrame = 0;
    const pathLength = pathElement.getTotalLength();

    const updateProgress = () => {
      const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
      const nextProgress = maxScroll > 0 ? scrollElement.scrollTop / maxScroll : 0;

      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const distance = Math.min(Math.max(nextProgress, 0), 0.985) * pathLength;
        const point = pathElement.getPointAtLength(distance);
        const lookAhead = pathElement.getPointAtLength(Math.min(distance + 9, pathLength));
        const angle = Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * (180 / Math.PI) + 90;

        setRouteProgress(nextProgress);
        setRocket({ x: point.x / 10, y: point.y, angle });
      });
    };

    updateProgress();
    scrollElement.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      scrollElement.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <section className="education-map" aria-label="Education mission map">
      <div className="education-map__scroll" ref={scrollRef}>
        <div className="education-map__scene" style={{ minHeight: sceneHeight }}>
          <div className="education-map__stars" aria-hidden="true" />
          <div className="education-map__nebula" aria-hidden="true" />

          <svg
            className="education-route"
            viewBox="0 0 1000 1900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="education-route__glow" d={routePath} />
            <path className="education-route__line" d={routePath} />
            <path
              ref={routePathRef}
              className="education-route__complete"
              d={routePath}
              pathLength={1}
              style={{ strokeDasharray: `${Math.min(routeProgress, 0.985)} 1` }}
            />
          </svg>

          <div
            className="education-rocket"
            style={{
              left: `${rocket.x}%`,
              top: `${rocket.y}px`,
              '--rocket-angle': `${rocket.angle}deg`,
            } as CSSProperties}
            aria-hidden="true"
          >
            <div className="education-rocket__ship">
              <img src={rocketAsset} alt="" draggable="false" />
              <span className="education-rocket__exhaust education-rocket__exhaust--one" />
              <span className="education-rocket__exhaust education-rocket__exhaust--two" />
              <span className="education-rocket__exhaust education-rocket__exhaust--three" />
            </div>
          </div>

          {missions.map((mission, index) => {
            const isEarth = mission.id === 'bsc-it';

            return (
              <div
                key={mission.id}
                className={`education-checkpoint${isEarth ? ' earth-system' : ''}`}
                data-card={index === 1 ? 'left' : 'right'}
                data-size={mission.size}
                data-active={activeMissionId === mission.id}
                style={{
                  left: `${mission.x}%`,
                  top: `${mission.y}px`,
                  '--mission-tone': mission.tone,
                  '--float-delay': `${index * -0.8}s`,
                } as CSSProperties}
              >
                {isEarth ? (
                  <>
                    <div className="education-earth-orbit" aria-hidden="true" />
                    <div className="education-earth-orbit-controls" aria-label="Earth orbit missions">
                    <button
                      type="button"
                      className="education-orbit education-orbit--moon"
                      data-active={activeMissionId === 'internship'}
                      onClick={() =>
                        setSelectedMissionId((currentId) =>
                          currentId === 'internship' ? null : 'internship',
                        )
                      }
                      aria-label="Open Internship mission details"
                    >
                      <img src={moonAsset} alt="" draggable="false" />
                      <span>Internship</span>
                      <span className="education-orbit__panel">
                        <span>Internship</span>
                        <strong>Web Development Internship</strong>
                        <em>Seven Seas Travel</em>
                        <small>
                          Designed and developed a complete travel agency website while working with a real
                          client.
                        </small>
                        <span className="education-orbit__tags">
                          <b>Framer</b>
                          <b>Responsive Design</b>
                          <b>UI</b>
                          <b>Deployment</b>
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="education-orbit education-orbit--satellite"
                      data-active={activeMissionId === 'projects'}
                      onClick={() =>
                        setSelectedMissionId((currentId) =>
                          currentId === 'projects' ? null : 'projects',
                        )
                      }
                      aria-label="Open Projects mission details"
                    >
                      <img src={satelliteAsset} alt="" draggable="false" />
                      <span>Projects</span>
                      <span className="education-orbit__panel education-orbit__panel--projects">
                        <span>Projects</span>
                        <strong>Projects Built</strong>
                        <span className="education-project-list">
                          {orbitProjects.map((project) => (
                            <span key={project.title} className="education-project-list__item">
                              <b>{project.title}</b>
                              <small>{project.summary}</small>
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                    </div>
                  </>
                ) : null}

                <button
                  type="button"
                  className="education-mission"
                  onClick={() =>
                    setSelectedMissionId((currentId) =>
                      currentId === mission.id ? null : mission.id,
                    )
                  }
                  aria-label={`Focus ${mission.marker} mission checkpoint`}
                >
                  <img src={mission.asset} alt="" draggable="false" />
                  <span className="education-mission__marker">{mission.marker}</span>
                </button>
                <article className="education-checkpoint-card">
                  <span className="education-checkpoint-card__mission">{mission.mission}</span>
                  <h3>{mission.title}</h3>
                  <div className="education-checkpoint-card__meta" aria-label="Mission details">
                    <span>{mission.year}</span>
                    <span>{mission.location}</span>
                  </div>
                  <p>{mission.institution}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EducationWindow;
