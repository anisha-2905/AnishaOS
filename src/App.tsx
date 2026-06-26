import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import BootScreen from '@/components/BootScreen';
import { WindowManagerProvider } from '@/context/WindowManagerContext';
import Desktop from '@/layouts/Desktop';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  return (
    <WindowManagerProvider>
      <AnimatePresence>
        {isBooting ? <BootScreen key="boot-screen" onComplete={handleBootComplete} /> : null}
      </AnimatePresence>
      <motion.div
        className="app-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooting ? 0 : 1 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <Desktop />
      </motion.div>
    </WindowManagerProvider>
  );
}

export default App;
