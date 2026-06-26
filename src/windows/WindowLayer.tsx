import Window from '@/components/Window';
import useWindowManager from '@/hooks/useWindowManager';
import AboutMeWindow from '@/windows/AboutMeWindow';
import EducationWindow from '@/windows/EducationWindow';
import MissionWindow from '@/windows/MissionWindow';
import ProjectsWindow from '@/windows/ProjectsWindow';
import SkillsWindow from '@/windows/SkillsWindow';

const getWindowContent = (windowId: string) => {
  if (windowId === 'about') {
    return <AboutMeWindow />;
  }

  if (windowId === 'projects') {
    return <ProjectsWindow />;
  }

  if (windowId === 'skills') {
    return <SkillsWindow />;
  }

  if (windowId === 'education') {
    return <EducationWindow />;
  }

  if (windowId === 'mission') {
    return <MissionWindow />;
  }

  return null;
};

function WindowLayer() {
  const { activeWindowId, bringToFront, closeWindow, windows } = useWindowManager();

  return (
    <div className="window-layer" aria-label="Open windows">
      {windows.map((windowItem) => (
        <Window
          key={windowItem.id}
          title={windowItem.title}
          isOpen={windowItem.isOpen}
          isActive={activeWindowId === windowItem.id}
          zIndex={windowItem.zIndex}
          onClose={() => closeWindow(windowItem.id)}
          onFocus={() => bringToFront(windowItem.id)}
        >
          {getWindowContent(windowItem.id)}
        </Window>
      ))}
    </div>
  );
}

export default WindowLayer;
