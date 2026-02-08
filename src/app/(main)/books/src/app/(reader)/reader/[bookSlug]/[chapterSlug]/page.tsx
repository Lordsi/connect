import { notFound } from "next/navigation";
import {
  getBookBySlug,
  getChapter,
  getChapterContent,
  getChapters,
} from "@/lib/api";
import { markdownToHtml } from "@/lib/markdown";
import { ReaderPageClient } from "@/components/reader/ReaderPageClient";

interface ReaderPageProps {
  params: Promise<{ bookSlug: string; chapterSlug: string }>;
}

export async function generateMetadata({ params }: ReaderPageProps) {
  const { bookSlug, chapterSlug } = await params;
  const [book, chapter] = await Promise.all([
    getBookBySlug(bookSlug),
    getChapter(bookSlug, chapterSlug),
  ]);
  if (!book || !chapter) return { title: "Chapter Not Found" };
  return {
    title: `${chapter.title} | ${book.title}`,
    description: `Read ${chapter.title} from ${book.title}`,
  };
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { bookSlug, chapterSlug } = await params;

  const [book, chapter, rawContent] = await Promise.all([
    getBookBySlug(bookSlug),
    getChapter(bookSlug, chapterSlug),
    getChapterContent(bookSlug, chapterSlug),
  ]);

  if (!book || !chapter || !rawContent) {
    notFound();
  }

  const html = markdownToHtml(rawContent);

  return (
    <ReaderPageClient
      bookTitle={book.title}
      chapterTitle={chapter.title}
      html={html}
    />
  );
}
