import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';
import '@/styles/projects-window.css';

const defaultProjectId = 'face-recognition-attendance';
const switchDuration = 440;

type ProjectViewState = 'content' | 'loading';

const getNextProjectImage = (projectId: string) => {
  const currentIndex = projects.findIndex((project) => project.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return nextProject?.image;
};

function ProjectsWindow() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId);
  const [displayedProjectId, setDisplayedProjectId] = useState(defaultProjectId);
  const [viewState, setViewState] = useState<ProjectViewState>('content');
  const [loadingProject, setLoadingProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );

  const displayedProject = useMemo(
    () => projects.find((project) => project.id === displayedProjectId) ?? projects[0],
    [displayedProjectId],
  );

  useEffect(() => {
    const nextImage = getNextProjectImage(displayedProject.id);

    if (!nextImage) {
      return;
    }

    const image = new Image();
    image.src = nextImage;
  }, [displayedProject.id]);

  const handleProjectSelect = (project: Project) => {
    if (project.id === selectedProjectId || viewState === 'loading') {
      return;
    }

    setSelectedProjectId(project.id);
    setLoadingProject(project);
    setViewState('loading');

    window.setTimeout(
      () => {
        setDisplayedProjectId(project.id);
        setViewState('content');
        setLoadingProject(null);
      },
      shouldReduceMotion ? 0 : switchDuration,
    );
  };

  const sectionAnimation = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2, delay, ease: 'easeOut' as const },
        };

  return (
    <section className="projects-app" aria-label="Projects explorer">
      <aside className="projects-app__sidebar" aria-label="Project explorer tree">
        <div className="projects-app__sidebar-header">
          <span className="projects-app__sidebar-title">
            <span className="projects-app__drive-dot" aria-hidden="true" />
            <span>Projects</span>
          </span>
          <button
            type="button"
            className="projects-app__sidebar-toggle"
            onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
            aria-expanded={isSidebarOpen}
            aria-controls="projects-tree"
          >
            {isSidebarOpen ? 'Hide' : 'Open'}
          </button>
        </div>

        <div
          id="projects-tree"
          className="projects-app__tree"
          data-open={isSidebarOpen}
          role="listbox"
          aria-label="Select project"
        >
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="projects-app__tree-item"
              data-active={project.id === selectedProject.id}
              onClick={() => handleProjectSelect(project)}
              role="option"
              aria-selected={project.id === selectedProject.id}
            >
              <span className="projects-app__tree-icon" aria-hidden="true">
                &gt;
              </span>
              <span className="projects-app__tree-label">{project.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <article className="projects-app__main" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {viewState === 'loading' ? (
            <motion.div
              key={`loading-${loadingProject?.id ?? 'project'}`}
              className="projects-app__loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.1 }}
            >
              <span>Loading project...</span>
              <span className="projects-app__loading-bar">████████████ 100%</span>
              <span>Opening {loadingProject?.title ?? 'project archive'}...</span>
            </motion.div>
          ) : (
            <motion.div
              key={displayedProject.id}
              className="projects-app__content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.1, ease: 'easeInOut' }}
            >
              <motion.header className="projects-app__main-header" {...sectionAnimation(0)}>
                <div>
                  <p className="projects-app__category">{displayedProject.category}</p>
                  <h2>{displayedProject.title}</h2>
                </div>
                <span className="projects-app__status">{displayedProject.status}</span>
              </motion.header>

              <motion.div
                className="projects-app__preview"
                aria-label={`${displayedProject.title} screenshot viewer`}
                {...sectionAnimation(0.05)}
              >
                <div className="projects-app__preview-bar">
                  <span />
                  <span />
                  <span />
                  <b>{displayedProject.image ? 'preview.exe' : 'preview_pending.exe'}</b>
                </div>
                <div className="projects-app__preview-screen">
                  {displayedProject.image ? (
                    <button
                      type="button"
                      className="projects-app__screenshot-button"
                      onClick={() => setPreviewProject(displayedProject)}
                      aria-label={`Open larger preview for ${displayedProject.title}`}
                    >
                      <img
                        src={displayedProject.image}
                        alt={`${displayedProject.title} project screenshot`}
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <span className="projects-app__preview-empty">screenshot_holder.empty</span>
                  )}
                </div>
              </motion.div>

              <motion.p className="projects-app__description" {...sectionAnimation(0.1)}>
                {displayedProject.description}
              </motion.p>

              <motion.div
                className="projects-app__stack"
                aria-label="Tech stack"
                {...sectionAnimation(0.15)}
              >
                {displayedProject.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </motion.div>

              <motion.section
                className="projects-app__features"
                aria-labelledby="project-features-heading"
                {...sectionAnimation(0.2)}
              >
                <h3 id="project-features-heading">Key features</h3>
                <ul>
                  {displayedProject.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </motion.section>

              <motion.div className="projects-app__actions" {...sectionAnimation(0.25)}>
                {displayedProject.githubUrl ? (
                  <a href={displayedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                ) : null}
                {displayedProject.notionUrl ? (
                  <a href={displayedProject.notionUrl} target="_blank" rel="noopener noreferrer">
                    Case Study
                  </a>
                ) : null}
                {displayedProject.liveUrl ? (
                  <a href={displayedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                ) : null}
              </motion.div>

              <div className="projects-app__terminal-indicator" aria-hidden="true">
                <span>PROJECT_STATUS: {displayedProject.status}</span>
                <span className="projects-app__cursor">_</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>

      <AnimatePresence>
        {previewProject?.image ? (
          <motion.div
            className="projects-app__preview-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewProject.title} larger screenshot preview`}
            onClick={() => setPreviewProject(null)}
          >
            <div
              className="projects-app__preview-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="projects-app__preview-modal-bar">
                <span />
                <span />
                <span />
                <b>{previewProject.title}</b>
              </span>
              <img src={previewProject.image} alt={`${previewProject.title} project screenshot`} />
              <button
                type="button"
                className="projects-app__preview-close"
                onClick={() => setPreviewProject(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsWindow;
