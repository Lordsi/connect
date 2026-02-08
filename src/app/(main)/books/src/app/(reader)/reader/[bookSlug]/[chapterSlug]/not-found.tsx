import Link from "next/link";

export default function ReaderNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 px-4">
      <h1 className="font-serif text-2xl text-stone-900">
        Chapter not found
      </h1>
      <p className="text-stone-600">
        The chapter you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/books"
        className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
      >
        Back to Library
      </Link>
    </div>
  );
}
