import { Suspense } from "react";
import { getBooks } from "@/lib/api";
import { BooksLibrary } from "@/components/books/BooksLibrary";

export const metadata = {
  title: "Books | Auther",
  description: "Browse all books and start reading.",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const genre = params.genre ?? undefined;
  const search = params.q ?? undefined;
  const page = parseInt(params.page ?? "1", 10);

  const books = await getBooks({ genre, search });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif text-3xl font-medium text-stone-900 sm:text-4xl">
        Library
      </h1>
      <p className="mt-2 text-stone-600">
        Explore all books. Filter by genre or search by title and tags.
      </p>

      <Suspense fallback={<BooksLibrarySkeleton />}>
        <BooksLibrary
          initialBooks={books}
          initialGenre={genre}
          initialSearch={search}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}

function BooksLibrarySkeleton() {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 animate-pulse rounded-xl border border-stone-200 bg-stone-100"
        />
      ))}
    </div>
  );
}
