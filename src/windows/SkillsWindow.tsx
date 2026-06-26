import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import moonCard from '@/assets/skills/moon-card.png';
import saturnCard from '@/assets/skills/saturn-card.png';
import sunCard from '@/assets/skills/sun-card.png';
import { skillCategories } from '@/data/skills';
import '@/styles/skills-window.css';

const cardTilt = [-3, 0, 3];

const cardArtworkById: Record<string, string> = {
  frontend: sunCard,
  backend: saturnCard,
  tools: moonCard,
};

function SkillsWindow() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleCardClick = (cardId: string) => {
    setOpenCardId((currentCardId) => (currentCardId === cardId ? null : cardId));
  };

  return (
    <section className="skills-app" aria-label="Celestial skill cards">
      <div className="skills-app__stars" aria-hidden="true" />
      <header className="skills-app__header">
        <span>Select a Celestial Card</span>
      </header>

      <div className="skills-app__card-stage">
        {skillCategories.map((category, index) => {
          const isOpen = openCardId === category.id;
          const baseTilt = cardTilt[index] ?? 0;

          return (
            <motion.button
              key={category.id}
              type="button"
              className="skills-card"
              data-card={category.id}
              data-open={isOpen}
              onClick={() => handleCardClick(category.id)}
              aria-pressed={isOpen}
              aria-label={`${category.title} skills card`}
              animate={
                prefersReducedMotion
                  ? { y: 0, rotate: baseTilt }
                  : {
                      y: [0, index % 2 === 0 ? -4 : 4, 0],
                      rotate: [
                        baseTilt,
                        index === 1 ? baseTilt : baseTilt + (index === 0 ? -1.5 : 1.5),
                        baseTilt,
                      ],
                    }
              }
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.04,
                      rotate: baseTilt + (index === 0 ? -1 : index === 2 ? 1 : 0),
                    }
              }
              transition={{
                y: {
                  duration: 4.8 + index * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 5.2 + index * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.28,
                  ease: 'easeOut',
                },
              }}
            >
              <span className="skills-card__inner">
                <span className="skills-card__face skills-card__front">
                  <img src={cardArtworkById[category.id]} alt="" draggable="false" />
                  <span>{category.title}</span>
                </span>

                <span className="skills-card__face skills-card__back">
                  <span className="skills-card__divider" aria-hidden="true" />
                  <strong>{category.title}</strong>
                  <span className="skills-card__skill-list">
                    {category.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </span>
                  <span className="skills-card__divider" aria-hidden="true" />
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="skills-app__hint">Click a card to reveal skills</p>
    </section>
  );
}

export default SkillsWindow;
