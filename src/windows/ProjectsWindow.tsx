import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { projects } from '@/data/projects';
import '@/styles/projects-window.css';

const defaultProjectId = 'face-recognition-attendance';

function ProjectsWindow() {
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId]
  );

  return (
    <section className="projects-app" aria-label="Projects explorer">
      <aside className="projects-app__sidebar" aria-label="Project explorer tree">
        <div className="projects-app__sidebar-header">
          <span className="projects-app__drive-dot" aria-hidden="true" />
          <span>Projects</span>
        </div>

        <div className="projects-app__tree" role="listbox" aria-label="Select project">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="projects-app__tree-item"
              data-active={project.id === selectedProject.id}
              onClick={() => setSelectedProjectId(project.id)}
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
          <motion.div
            key={selectedProject.id}
            className="projects-app__content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <header className="projects-app__main-header">
              <div>
                <p className="projects-app__category">{selectedProject.category}</p>
                <h2>{selectedProject.title}</h2>
              </div>
              <span className="projects-app__status">{selectedProject.status}</span>
            </header>

            <div className="projects-app__preview" aria-label={`${selectedProject.title} screenshot placeholder`}>
              <div className="projects-app__preview-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="projects-app__preview-screen">
                <span className="projects-app__preview-label">{selectedProject.image}</span>
              </div>
            </div>

            <p className="projects-app__description">{selectedProject.description}</p>

            <div className="projects-app__stack" aria-label="Tech stack">
              {selectedProject.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <section className="projects-app__features" aria-labelledby="project-features-heading">
              <h3 id="project-features-heading">Key features</h3>
              <ul>
                {selectedProject.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <div className="projects-app__actions">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {selectedProject.notionUrl ? (
                <a href={selectedProject.notionUrl} target="_blank" rel="noopener noreferrer">
                  Explore Case Study
                </a>
              ) : null}
              {selectedProject.liveUrl ? (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              ) : null}
            </div>

            <div className="projects-app__terminal-indicator" aria-hidden="true">
              <span>PROJECT_STATUS: {selectedProject.status}</span>
              <span className="projects-app__cursor">_</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </article>
    </section>
  );
}

export default ProjectsWindow;
