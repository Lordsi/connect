"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type ReaderSettings,
  loadReaderSettings,
  saveReaderSettings,
  getThemeVars,
} from "@/lib/reader-settings";

const ReaderContext = createContext<{
  settings: ReaderSettings;
  updateSettings: (updates: Partial<ReaderSettings>) => void;
  cssVars: Record<string, string>;
} | null>(null);

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<ReaderSettings>(() =>
    loadReaderSettings()
  );

  const cssVars = useMemo(() => getThemeVars(settings), [settings]);

  const updateSettings = useCallback((updates: Partial<ReaderSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      saveReaderSettings(next);
      return next;
    });
  }, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setSettings(loadReaderSettings());
  }, []);

  // Apply CSS variables to the reader content container (for theme scope)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    Object.entries(cssVars).forEach(([key, value]) => {
      el.style.setProperty(key, value);
    });
    return () => {
      Object.keys(cssVars).forEach((key) => el.style.removeProperty(key));
    };
  }, [cssVars]);

  const value = useMemo(
    () => ({ settings, updateSettings, cssVars }),
    [settings, updateSettings, cssVars]
  );

  return (
    <ReaderContext.Provider value={value}>
      <div ref={containerRef} className="reader-theme-container">
        {children}
      </div>
    </ReaderContext.Provider>
  );
}

export function useReaderSettings() {
  const ctx = useContext(ReaderContext);
  if (!ctx) throw new Error("useReaderSettings must be used within ReaderProvider");
  return ctx;
}
