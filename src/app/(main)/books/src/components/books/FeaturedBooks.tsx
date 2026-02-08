import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";
import { getFirstChapterSlug } from "@/lib/api";

interface FeaturedBooksProps {
  books: Book[];
}

export async function FeaturedBooks({ books }: FeaturedBooksProps) {
  if (books.length === 0) return null;

  const booksWithFirstChapter = await Promise.all(
    books.map(async (book) => ({
      book,
      firstChapterSlug: await getFirstChapterSlug(book.slug),
    }))
  );

  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {booksWithFirstChapter.map(({ book, firstChapterSlug }) => (
        <BookCard
          key={book.id}
          book={book}
          firstChapterSlug={firstChapterSlug}
        />
      ))}
    </div>
  );
}
