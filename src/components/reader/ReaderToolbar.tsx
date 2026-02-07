"use client";

import Link from "next/link";
import { useReaderSettings } from "./ReaderProvider";
import type { FontFamily, BackgroundTheme } from "@/lib/reader-settings";

interface ReaderToolbarProps {
  bookTitle: string;
  chapterTitle: string;
  progress?: number; // 0-100
  // TODO: Add prevChapter/nextChapter links for chapter navigation
}

const FONT_FAMILIES: { value: FontFamily; label: string }[] = [
  { value: "serif", label: "Serif" },
  { value: "sans", label: "Sans" },
  { value: "mono", label: "Mono" },
];

const THEMES: { value: BackgroundTheme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "sepia", label: "Sepia" },
  { value: "dark", label: "Dark" },
];

export function ReaderToolbar({
  bookTitle,
  chapterTitle,
  progress = 0,
}: ReaderToolbarProps) {
  const { settings, updateSettings } = useReaderSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/books"
            className="shrink-0 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            ← Library
          </Link>
          <div className="min-w-0 flex-1 truncate text-center">
            <p className="truncate text-sm font-medium text-stone-900">
              {bookTitle}
            </p>
            <p className="truncate text-xs text-stone-500">{chapterTitle}</p>
          </div>
          <div className="shrink-0 w-16" aria-hidden />
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full bg-stone-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* Settings */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="font-size" className="text-stone-600">
              Font size
            </label>
            <input
              id="font-size"
              type="range"
              min={0.875}
              max={1.5}
              step={0.0625}
              value={settings.fontSize}
              onChange={(e) =>
                updateSettings({ fontSize: parseFloat(e.target.value) })
              }
              className="w-24 accent-stone-700"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="font-family" className="text-stone-600">
              Font
            </label>
            <select
              id="font-family"
              value={settings.fontFamily}
              onChange={(e) =>
                updateSettings({
                  fontFamily: e.target.value as FontFamily,
                })
              }
              className="rounded border border-stone-300 bg-white px-2 py-1 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="line-height" className="text-stone-600">
              Spacing
            </label>
            <select
              id="line-height"
              value={settings.lineHeight}
              onChange={(e) =>
                updateSettings({ lineHeight: parseFloat(e.target.value) })
              }
              className="rounded border border-stone-300 bg-white px-2 py-1 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            >
              <option value={1.4}>Tight</option>
              <option value={1.6}>Normal</option>
              <option value={1.7}>Relaxed</option>
              <option value={1.9}>Loose</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-600">Theme</span>
            <div className="flex gap-1">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => updateSettings({ theme: t.value })}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    settings.theme === t.value
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
