import Link from "next/link";
import type { Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
  firstChapterSlug: string | null;
}

export function BookCard({ book, firstChapterSlug }: BookCardProps) {
  const readUrl =
    firstChapterSlug ? `/reader/${book.slug}/${firstChapterSlug}` : null;
  const canRead = !!readUrl;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[2/3] bg-stone-200">
        <div className="flex h-full items-center justify-center text-stone-400 text-sm">
          Cover
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700">
          {book.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-stone-600 line-clamp-3">
          {book.description}
        </p>
        {canRead ? (
          <Link
            href={readUrl}
            className="mt-4 inline-flex w-fit items-center rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            Start Reading
          </Link>
        ) : (
          <span className="mt-4 inline-flex w-fit items-center rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium text-stone-500">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  );
}
