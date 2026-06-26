import { useState } from 'react';
import DesktopIcon from '@/components/DesktopIcon';
import InteractiveStarfield from '@/components/InteractiveStarfield';
import Taskbar from '@/components/Taskbar';
import Wallpaper from '@/components/Wallpaper';
import { desktopIcons } from '@/data/desktopIcons';
import useWindowManager from '@/hooks/useWindowManager';
import type { DesktopIconId } from '@/types/desktop';
import WindowLayer from '@/windows/WindowLayer';
import '@/styles/desktop.css';

function Desktop() {
  const [selectedIconId, setSelectedIconId] = useState<DesktopIconId | null>(null);
  const { openWindow } = useWindowManager();

  const handleOpenIcon = (iconId: DesktopIconId) => {
    const icon = desktopIcons.find((desktopIcon) => desktopIcon.id === iconId);

    setSelectedIconId(iconId);

    if (icon) {
      openWindow({
        id: icon.id,
        title: icon.label,
      });
    }
  };

  return (
    <main
      className="desktop"
      onClick={() => setSelectedIconId(null)}
      aria-label="AnishaOS desktop"
    >
      <Wallpaper />
      <InteractiveStarfield />
      <section className="desktop__icon-layer" aria-label="Desktop icons">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIconId === icon.id}
            onSelect={setSelectedIconId}
            onOpen={handleOpenIcon}
          />
        ))}
      </section>
      <WindowLayer />
      <Taskbar />
    </main>
  );
}

export default Desktop;
