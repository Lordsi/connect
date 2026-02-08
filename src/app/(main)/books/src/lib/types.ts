/**
 * Core type definitions for the Author Reading Platform.
 * Structured for easy migration to Supabase/Firebase schema later.
 */

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl: string;
  tags: string[];
  genre: string;
  chapters: number;
  status: "ongoing" | "completed";
  featured?: boolean;
  createdAt: string;
}

export interface Chapter {
  id: string;
  bookId: string;
  bookSlug: string;
  chapterNumber: number;
  title: string;
  slug: string;
  content: string; // Markdown or HTML
  wordCount: number;
  publishedAt: string;
}

export interface AuthorInfo {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}
