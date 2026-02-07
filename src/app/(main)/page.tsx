import Link from "next/link";
import { getAuthorInfo, getBooks } from "@/lib/api";
import { FeaturedBooks } from "@/components/books/FeaturedBooks";
import { NewsletterSignup } from "@/components/books/NewsletterSignup";

export default async function HomePage() {
  const [author, featuredBooks] = await Promise.all([
    getAuthorInfo(),
    getBooks({ featured: true }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <h1 className="font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            {author.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600 sm:text-xl">
            {author.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="inline-flex items-center rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
            >
              Explore Books
            </Link>
            <a
              href="#newsletter"
              className="inline-flex items-center rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              Newsletter
            </a>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="border-b border-stone-200 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-medium text-stone-900 sm:text-3xl">
            Featured Works
          </h2>
          <p className="mt-2 text-stone-600">
            Start reading the latest stories
          </p>
          <FeaturedBooks books={featuredBooks} />
        </div>
      </section>

      {/* Author Bio */}
      <section className="border-b border-stone-200 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-medium text-stone-900 sm:text-3xl">
            About the Author
          </h2>
          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
            {author.avatarUrl && (
              <div className="shrink-0">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-stone-200 sm:h-40 sm:w-40" />
              </div>
            )}
            <p className="max-w-2xl text-stone-600 leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
