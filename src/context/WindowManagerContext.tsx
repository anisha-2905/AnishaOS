import { useCallback, useMemo, useRef, useState } from 'react';
import { WindowManagerContext } from '@/context/windowManagerContextValue';
import type {
  ManagedWindow,
  OpenWindowInput,
  WindowId,
  WindowManagerProviderProps,
} from '@/types/window';

const baseWindowZIndex = 30;

function WindowManagerProvider({ children }: WindowManagerProviderProps) {
  const [windows, setWindows] = useState<ManagedWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const nextZIndexRef = useRef(baseWindowZIndex);

  const getNextZIndex = useCallback(() => {
    nextZIndexRef.current += 1;
    return nextZIndexRef.current;
  }, []);

  const bringToFront = useCallback(
    (windowId: WindowId) => {
      const zIndex = getNextZIndex();
      setActiveWindowId(windowId);
      setWindows((currentWindows) =>
        currentWindows.map((windowItem) =>
          windowItem.id === windowId ? { ...windowItem, zIndex } : windowItem
        )
      );
    },
    [getNextZIndex]
  );

  const openWindow = useCallback(
    ({ id, title }: OpenWindowInput) => {
      const zIndex = getNextZIndex();
      setActiveWindowId(id);
      setWindows((currentWindows) => {
        const existingWindow = currentWindows.find((windowItem) => windowItem.id === id);

        if (existingWindow) {
          return currentWindows.map((windowItem) =>
            windowItem.id === id
              ? { ...windowItem, title, isOpen: true, zIndex }
              : windowItem
          );
        }

        return [
          ...currentWindows,
          {
            id,
            title,
            isOpen: true,
            zIndex,
          },
        ];
      });
    },
    [getNextZIndex]
  );

  const closeWindow = useCallback((windowId: WindowId) => {
    setWindows((currentWindows) =>
      currentWindows.map((windowItem) =>
        windowItem.id === windowId ? { ...windowItem, isOpen: false } : windowItem
      )
    );
    setActiveWindowId((currentActiveWindowId) =>
      currentActiveWindowId === windowId ? null : currentActiveWindowId
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      bringToFront,
    }),
    [activeWindowId, bringToFront, closeWindow, openWindow, windows]
  );

  return (
    <WindowManagerContext.Provider value={contextValue}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export { WindowManagerProvider };
