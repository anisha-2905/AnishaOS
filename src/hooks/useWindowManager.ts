import { useContext } from 'react';
import { WindowManagerContext } from '@/context/windowManagerContextValue';

function useWindowManager() {
  const contextValue = useContext(WindowManagerContext);

  if (!contextValue) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }

  return contextValue;
}

export default useWindowManager;
