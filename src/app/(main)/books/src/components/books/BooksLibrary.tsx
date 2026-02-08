"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";

const ITEMS_PER_PAGE = 9;
const GENRES = ["Fantasy", "Literary Fiction", "Thriller"];

interface BooksLibraryProps {
  initialBooks: Book[];
  initialGenre?: string;
  initialSearch?: string;
  currentPage: number;
}

export function BooksLibrary({
  initialBooks,
  initialGenre,
  initialSearch,
  currentPage,
}: BooksLibraryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [books, setBooks] = useState(initialBooks);
  const [firstChapterSlugs, setFirstChapterSlugs] = useState<
    Record<string, string | null>
  >({});
  const [searchInput, setSearchInput] = useState(initialSearch ?? "");

  const updateParams = useCallback(
    (updates: { genre?: string; q?: string; page?: number }) => {
      const next = new URLSearchParams(searchParams.toString());
      if (updates.genre !== undefined) {
        if (updates.genre) next.set("genre", updates.genre);
        else next.delete("genre");
      }
      if (updates.q !== undefined) {
        if (updates.q) next.set("q", updates.q);
        else next.delete("q");
      }
      if (updates.page !== undefined) {
        if (updates.page > 1) next.set("page", String(updates.page));
        else next.delete("page");
      }
      router.push(`/books?${next.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  useEffect(() => {
    const fetchSlugs = async () => {
      const slugs: Record<string, string | null> = {};
      await Promise.all(
        books.map(async (book) => {
          const res = await fetch(
            `/api/first-chapter?bookSlug=${encodeURIComponent(book.slug)}`
          );
          const data = await res.json();
          slugs[book.slug] = data.slug ?? null;
        })
      );
      setFirstChapterSlugs(slugs);
    };
    fetchSlugs();
  }, [books]);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = books.slice(start, start + ITEMS_PER_PAGE);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput || undefined, page: 1 });
  };

  return (
    <div className="mt-10">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search books..."
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500 w-64"
            aria-label="Search books"
          />
          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
          >
            Search
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams({ genre: undefined })}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              !initialGenre
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            All
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => updateParams({ genre: g, page: 1 })}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                initialGenre === g
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {paginatedBooks.length === 0 ? (
        <p className="mt-12 text-center text-stone-600">
          No books found. Try adjusting your search or filters.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              firstChapterSlug={firstChapterSlugs[book.slug] ?? null}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <button
            onClick={() => updateParams({ page: currentPage - 1 })}
            disabled={currentPage <= 1}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-stone-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => updateParams({ page: currentPage + 1 })}
            disabled={currentPage >= totalPages}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
