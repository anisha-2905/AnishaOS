import { createContext } from 'react';
import type { WindowManagerContextValue } from '@/types/window';

export const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);
