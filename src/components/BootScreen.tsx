import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import preloaderMoon from '@/assets/icons/preloader-moon.png';
import '@/styles/boot-screen.css';

type BootScreenProps = {
  onComplete: () => void;
};

const bootMessages = [
  'Initializing AnishaOS...',
  'Welcome, explorer.',
];

function BootScreen({ onComplete }: BootScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const currentMessage = bootMessages[messageIndex];

  const typedText = useMemo(
    () => currentMessage.slice(0, typedLength),
    [currentMessage, typedLength]
  );

  useEffect(() => {
    const completeTimer = window.setTimeout(onComplete, 4000);

    return () => window.clearTimeout(completeTimer);
  }, [onComplete]);

  useEffect(() => {
    setTypedLength(0);
  }, [messageIndex]);

  useEffect(() => {
    if (typedLength >= currentMessage.length) {
      return undefined;
    }

    const typeTimer = window.setTimeout(() => {
      setTypedLength((currentLength) => currentLength + 1);
    }, prefersReducedMotion ? 10 : 38);

    return () => window.clearTimeout(typeTimer);
  }, [currentMessage.length, prefersReducedMotion, typedLength]);

  useEffect(() => {
    if (messageIndex >= bootMessages.length - 1) {
      return undefined;
    }

    const messageTimer = window.setTimeout(() => {
      setMessageIndex((currentIndex) => currentIndex + 1);
    }, 2000);

    return () => window.clearTimeout(messageTimer);
  }, [messageIndex]);

  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      role="status"
      aria-live="polite"
    >
      <div className="boot-screen__stars" aria-hidden="true" />
      <div className="boot-screen__particles" aria-hidden="true" />
      <motion.div
        className="boot-screen__mascot"
        animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <img
          className="boot-screen__mascot-image"
          src={preloaderMoon}
          alt=""
          draggable="false"
        />
      </motion.div>
      <p className="boot-screen__text">
        {typedText}
        <span className="boot-screen__cursor" aria-hidden="true" />
      </p>
    </motion.div>
  );
}

export default BootScreen;
