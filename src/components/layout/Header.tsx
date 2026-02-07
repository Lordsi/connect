"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur supports-[backdrop-filter]:bg-stone-50/80">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-stone-900 hover:text-stone-600 transition-colors"
        >
          Auther
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/books"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Books
          </Link>
        </div>
      </nav>
    </header>
  );
}
