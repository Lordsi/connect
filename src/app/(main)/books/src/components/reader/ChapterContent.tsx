"use client";

import { useRef, useEffect } from "react";
import { markdownToHtml } from "@/lib/markdown";

interface ChapterContentProps {
  html: string;
  onProgress?: (progress: number) => void;
}

/**
 * Renders chapter HTML and reports scroll progress for the progress indicator.
 */
export function ChapterContent({ html, onProgress }: ChapterContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !onProgress) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 100;
      onProgress(progress);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onProgress]);

  return (
    <div
      ref={containerRef}
      className="reader-content max-h-[calc(100vh-220px)] overflow-y-auto px-4 py-8"
      style={{
        background: "var(--reader-bg)",
        color: "var(--reader-text)",
        fontSize: "var(--reader-font-size)",
        lineHeight: "var(--reader-line-height)",
        fontFamily: "var(--reader-font-family)",
      }}
    >
      <article
        className="mx-auto max-w-2xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
