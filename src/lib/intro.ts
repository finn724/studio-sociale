import { useSyncExternalStore } from "react";

// Kept on <html> rather than in module state so layout and page chunks always agree.
const EVENT = "ss:intro-done";

export function isIntroDone() {
  const root = document.documentElement;
  return root.dataset.intro === "skip" || root.dataset.introDone === "true";
}

export function markIntroDone() {
  const root = document.documentElement;
  if (root.dataset.introDone === "true") return;
  root.dataset.introDone = "true";
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeIntro(listener: () => void) {
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

export function useIntroDone() {
  return useSyncExternalStore(subscribeIntro, isIntroDone, () => false);
}
