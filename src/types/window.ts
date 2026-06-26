import type { ReactNode } from 'react';

export type WindowId = string;

export type ManagedWindow = {
  id: WindowId;
  title: string;
  isOpen: boolean;
  zIndex: number;
};

export type OpenWindowInput = {
  id: WindowId;
  title: string;
};

export type WindowManagerContextValue = {
  windows: ManagedWindow[];
  activeWindowId: WindowId | null;
  openWindow: (windowInput: OpenWindowInput) => void;
  closeWindow: (windowId: WindowId) => void;
  bringToFront: (windowId: WindowId) => void;
};

export type WindowManagerProviderProps = {
  children: ReactNode;
};
