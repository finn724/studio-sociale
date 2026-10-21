"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

export type ConsentChoice = "accepted" | "necessary-only";

const STORAGE_KEY = "studio-sociale-cookie-consent";

type ConsentContextValue = {
  choice: ConsentChoice | null;
  setChoice: (choice: ConsentChoice) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "necessary-only") return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  return null;
}

function getServerSnapshot(): ConsentChoice | null {
  return null;
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setChoice = useCallback((next: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore write failures
    }
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <ConsentContext.Provider value={{ choice, setChoice }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
