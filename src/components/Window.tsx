import { AnimatePresence, motion } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import '@/styles/window.css';

type WindowProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isActive?: boolean;
  zIndex?: number;
  onFocus?: () => void;
};

function Window({
  title,
  children,
  isOpen,
  onClose,
  isActive = false,
  zIndex = 30,
  onFocus,
}: WindowProps) {
  const handleWindowPointerDown = () => {
    onFocus?.();
  };

  const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.section
          className="window"
          data-active={isActive}
          style={{ zIndex }}
          drag
          dragMomentum={false}
          dragElastic={0}
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 18 }}
          transition={{ type: 'spring', stiffness: 360, damping: 34 }}
          onPointerDown={handleWindowPointerDown}
          role="dialog"
          aria-modal="false"
          aria-label={title}
        >
          <header className="window__titlebar">
            <span className="window__title">{title}</span>
            <button
              type="button"
              className="window__close-button"
              onClick={handleCloseClick}
              aria-label={`Close ${title}`}
            >
              <span aria-hidden="true">x</span>
            </button>
          </header>
          <div className="window__content">{children}</div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}

export default Window;
