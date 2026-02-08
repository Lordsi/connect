/**
 * Reader settings: font size, font family, line spacing, background theme.
 * Persisted in localStorage. Uses CSS variables for theme application.
 */

export type FontFamily = "serif" | "sans" | "mono";
export type BackgroundTheme = "light" | "sepia" | "dark";

export interface ReaderSettings {
  fontSize: number; // rem base
  fontFamily: FontFamily;
  lineHeight: number;
  theme: BackgroundTheme;
}

const STORAGE_KEY = "auther-reader-settings";

const DEFAULTS: ReaderSettings = {
  fontSize: 1.125,
  fontFamily: "serif",
  lineHeight: 1.7,
  theme: "light",
};

/**
 * Map settings to CSS variable values.
 */
export function getThemeVars(settings: ReaderSettings): Record<string, string> {
  const themes: Record<BackgroundTheme, { bg: string; text: string }> = {
    light: { bg: "#fafafa", text: "#1a1a1a" },
    sepia: { bg: "#f4ecd8", text: "#5c4b37" },
    dark: { bg: "#1a1a1a", text: "#e8e8e8" },
  };
  const t = themes[settings.theme];
  const fonts: Record<FontFamily, string> = {
    serif: "Georgia, 'Times New Roman', serif",
    sans: "system-ui, -apple-system, sans-serif",
    mono: "'Courier New', monospace",
  };
  return {
    "--reader-bg": t.bg,
    "--reader-text": t.text,
    "--reader-font-size": `${settings.fontSize}rem`,
    "--reader-line-height": String(settings.lineHeight),
    "--reader-font-family": fonts[settings.fontFamily],
  };
}

export function loadReaderSettings(): ReaderSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<ReaderSettings>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export function saveReaderSettings(settings: ReaderSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors (e.g. private mode)
  }
}
