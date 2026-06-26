import { useEffect, useRef } from 'react';
import '@/styles/starfield.css';

type Star = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  phase: number;
  twinkleSpeed: number;
  driftX: number;
  driftY: number;
  glow: number;
};

const STAR_COUNT = 50;
const MOUSE_RADIUS = 110;
const GLOW_COLOR = '216, 180, 254';

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const createStar = (width: number, height: number): Star => {
  let x = randomBetween(0, width);
  const y = randomBetween(0, height);

  if (width > 680 && x < width * 0.24 && y < height - 96 && Math.random() < 0.72) {
    x = randomBetween(width * 0.24, width);
  }

  return {
    x,
    y,
    baseX: x,
    baseY: y,
    size: randomBetween(1, 3),
    opacity: randomBetween(0.32, 0.68),
    phase: randomBetween(0, Math.PI * 2),
    twinkleSpeed: randomBetween(0.00045, 0.0012),
    driftX: randomBetween(-0.18, 0.18),
    driftY: randomBetween(-0.14, 0.14),
    glow: 0,
  };
};

function InteractiveStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d', { alpha: true });

    if (!context) {
      return undefined;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionQuery.matches;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      starsRef.current = Array.from({ length: STAR_COUNT }, () => createStar(width, height));
    };

    const draw = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const delta = Math.min(time - lastTimeRef.current, 32);
      lastTimeRef.current = time;

      context.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        const driftScale = reducedMotionRef.current ? 0 : delta / 16.67;

        star.baseX += star.driftX * driftScale;
        star.baseY += star.driftY * driftScale;

        if (star.baseX < -6) star.baseX = width + 6;
        if (star.baseX > width + 6) star.baseX = -6;
        if (star.baseY < -6) star.baseY = height + 6;
        if (star.baseY > height + 6) star.baseY = -6;

        star.x = star.baseX + Math.sin(time * 0.00018 + star.phase) * 1.4;
        star.y = star.baseY + Math.cos(time * 0.00016 + star.phase) * 1.2;

        const mouse = mouseRef.current;
        const distance = mouse.active
          ? Math.hypot(mouse.x - star.x, mouse.y - star.y)
          : Number.POSITIVE_INFINITY;
        const targetGlow = distance < MOUSE_RADIUS ? 1 - distance / MOUSE_RADIUS : 0;

        star.glow += (targetGlow - star.glow) * 0.08;

        const twinkle = reducedMotionRef.current
          ? 0
          : (Math.sin(time * star.twinkleSpeed + star.phase) + 1) * 0.11;
        const glowOpacity = star.glow * 0.36;
        const opacity = Math.min(0.96, star.opacity + twinkle + glowOpacity);
        const size = star.size * (1 + star.glow * 0.18);

        context.save();
        context.globalAlpha = opacity;
        context.fillStyle = '#FFFFFF';
        context.shadowColor = `rgba(${GLOW_COLOR}, ${0.7 * star.glow})`;
        context.shadowBlur = 10 * star.glow;
        context.beginPath();
        context.arc(star.x, star.y, size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      if (!document.hidden) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      if (frameRef.current !== null) {
        return;
      }

      lastTimeRef.current = performance.now();
      frameRef.current = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (frameRef.current === null) {
        return;
      }

      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const handleMotionChange = () => {
      reducedMotionRef.current = motionQuery.matches;
    };

    resizeCanvas();
    start();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      stop();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-starfield" aria-hidden="true" />;
}

export default InteractiveStarfield;
