import Link from "next/link";
import { getAuthorInfo } from "@/lib/api";

export async function Footer() {
  const author = await getAuthorInfo();

  return (
    <footer className="border-t border-stone-200 bg-stone-100/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-serif text-lg text-stone-900 hover:text-stone-600 transition-colors"
            >
              {author.name}
            </Link>
            <p className="mt-1 text-sm text-stone-600">{author.tagline}</p>
          </div>
          <div className="flex gap-6" aria-label="Social links">
            {author.socialLinks.twitter && (
              <a
                href={author.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                Twitter
              </a>
            )}
            {author.socialLinks.instagram && (
              <a
                href={author.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                Instagram
              </a>
            )}
            {author.socialLinks.website && (
              <a
                href={author.socialLinks.website}
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                Website
              </a>
            )}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {author.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
