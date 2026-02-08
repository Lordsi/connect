/**
 * Data fetching layer for books and chapters.
 * MVP: reads from local JSON/MD files.
 * Upgrade path: replace with Supabase/Firebase client calls.
 */

import type { Book, Chapter, AuthorInfo } from "./types";

/**
 * Fetch all books. Supports optional genre filter and search.
 */
export async function getBooks(options?: {
  genre?: string;
  search?: string;
  featured?: boolean;
}): Promise<Book[]> {
  // MVP: import directly; in production, fetch from API
  const { default: books } = await import("./data/books.json");
  let results = Array.isArray(books) ? (books as Book[]) : [];

  if (options?.genre) {
    results = results.filter((b) => b.genre === options.genre);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (options?.featured) {
    results = results.filter((b) => b.featured);
  }

  return results;
}

/**
 * Fetch a single book by slug.
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((b) => b.slug === slug) ?? null;
}

/**
 * Fetch author info for landing page.
 */
export async function getAuthorInfo(): Promise<AuthorInfo> {
  const { default: author } = await import("./data/author.json");
  return author as AuthorInfo;
}

/**
 * Fetch chapter metadata for a book.
 */
export async function getChapters(bookSlug: string): Promise<Chapter[]> {
  try {
    const { default: chapters } = await import(
      `./data/chapters/${bookSlug}/chapters.json`
    );
    return Array.isArray(chapters) ? chapters : [];
  } catch {
    return [];
  }
}

/**
 * Fetch full chapter content (markdown) by book slug and chapter slug.
 * Uses fs for server-side reading; replace with Supabase storage in production.
 */
export async function getChapterContent(
  bookSlug: string,
  chapterSlug: string
): Promise<string | null> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const base = path.join(process.cwd(), "src", "lib", "data", "chapters");
    const filePath = path.join(base, bookSlug, `${chapterSlug}.md`);
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch {
    return null;
  }
}

/**
 * Get a single chapter's metadata by book and chapter slug.
 */
export async function getChapter(
  bookSlug: string,
  chapterSlug: string
): Promise<Chapter | null> {
  const chapters = await getChapters(bookSlug);
  return chapters.find((c) => c.slug === chapterSlug) ?? null;
}

/**
 * Get the first chapter slug for a book (for "Start Reading" links).
 */
export async function getFirstChapterSlug(bookSlug: string): Promise<string | null> {
  const chapters = await getChapters(bookSlug);
  const first = chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)[0];
  return first?.slug ?? null;
}
