// src/types/global.d.ts
export {};

declare global {
  interface Window {
    addToast?: (message: string, duration?: number) => void;
  }
}
