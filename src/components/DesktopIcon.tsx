import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { DesktopIconConfig } from '@/types/desktop';

type DesktopIconProps = {
  icon: DesktopIconConfig;
  isSelected: boolean;
  onSelect: (id: DesktopIconConfig['id']) => void;
  onOpen: (id: DesktopIconConfig['id']) => void;
};

function DesktopIcon({ icon, isSelected, onSelect, onOpen }: DesktopIconProps) {
  const iconStyle = {
    '--desktop-icon-x': icon.position.x,
    '--desktop-icon-y': icon.position.y,
  } as CSSProperties;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onSelect(icon.id);
  };

  const handleDoubleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpen(icon.id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      onOpen(icon.id);
    }
  };

  return (
    <motion.button
      type="button"
      className="desktop-icon"
      data-icon-id={icon.id}
      data-selected={isSelected}
      style={iconStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-pressed={isSelected}
      aria-label={`${icon.label} desktop icon`}
    >
      <span className="desktop-icon__tile">
        <img
          className="desktop-icon__image"
          src={icon.imageSrc}
          alt={icon.imageAlt}
          draggable="false"
        />
      </span>
      <span className="desktop-icon__label">{icon.label}</span>
    </motion.button>
  );
}

export default DesktopIcon;
