"use client";

import { useState } from "react";
import { ReaderProvider } from "./ReaderProvider";
import { ReaderToolbar } from "./ReaderToolbar";
import { ChapterContent } from "./ChapterContent";

interface ReaderPageClientProps {
  bookTitle: string;
  chapterTitle: string;
  html: string;
}

export function ReaderPageClient({
  bookTitle,
  chapterTitle,
  html,
}: ReaderPageClientProps) {
  const [progress, setProgress] = useState(0);

  return (
    <ReaderProvider>
      <ReaderToolbar
        bookTitle={bookTitle}
        chapterTitle={chapterTitle}
        progress={progress}
      />
      <ChapterContent html={html} onProgress={setProgress} />
    </ReaderProvider>
  );
}
