# Auther — Author Reading Platform

A minimalist author website with an integrated online reading platform, similar to WebNovel.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Local JSON + Markdown (MVP). Clear upgrade path to Supabase/Firebase.

## File Structure

```
src/
├── app/
│   ├── (main)/                    # Main site layout (header + footer)
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Landing page
│   │   └── books/
│   │       └── page.tsx           # Books library
│   ├── (reader)/                  # Full-screen reader layout
│   │   ├── layout.tsx
│   │   └── reader/[bookSlug]/[chapterSlug]/
│   │       └── page.tsx           # Chapter reader
│   ├── api/
│   │   └── first-chapter/
│   │       └── route.ts           # API for first chapter slug
│   ├── globals.css
│   └── layout.tsx                 # Root layout
├── components/
│   ├── books/
│   │   ├── BookCard.tsx
│   │   ├── BooksLibrary.tsx
│   │   ├── FeaturedBooks.tsx
│   │   └── NewsletterSignup.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── reader/
│       ├── ChapterContent.tsx     # Renders chapter HTML, scroll progress
│       ├── ReaderPageClient.tsx   # Client wrapper with state
│       ├── ReaderProvider.tsx     # Settings context + localStorage
│       └── ReaderToolbar.tsx      # Font, theme, spacing controls
└── lib/
    ├── api.ts                     # Data fetching (books, chapters)
    ├── data/                      # JSON + Markdown content
    │   ├── author.json
    │   ├── books.json
    │   └── chapters/{bookSlug}/
    │       ├── chapters.json
    │       └── {chapterSlug}.md
    ├── markdown.ts                # Minimal Markdown → HTML
    ├── reader-settings.ts         # localStorage persistence
    └── types.ts
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Landing page:** Hero, featured books, author bio, newsletter signup
- **Books page:** Grid, genre filters, search, pagination
- **Reader:** Full-screen chapter view with customizable:
  - Font size (slider)
  - Font family (serif, sans, mono)
  - Line spacing (tight → loose)
  - Background theme (light, sepia, dark)
  - Scroll progress indicator
- **Settings persistence:** Reader preferences saved to `localStorage`

## Adding Content

1. **Books:** Edit `src/lib/data/books.json`
2. **Chapters:** Create `src/lib/data/chapters/{bookSlug}/chapters.json` and `{chapterSlug}.md` files
3. **Author:** Edit `src/lib/data/author.json`

## TODO (Future Features)

- [ ] Auth integration for comments and bookmarks
- [ ] Chapter navigation (prev/next) in reader
- [ ] Migrate to Supabase/Firebase for database and storage
- [ ] Newsletter backend (Mailchimp, ConvertKit, etc.)
