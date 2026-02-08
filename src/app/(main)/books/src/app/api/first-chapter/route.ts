import { NextRequest } from "next/server";
import { getFirstChapterSlug } from "@/lib/api";

/**
 * GET /api/first-chapter?bookSlug=...
 * Returns the first chapter slug for a book.
 */
export async function GET(request: NextRequest) {
  const bookSlug = request.nextUrl.searchParams.get("bookSlug");
  if (!bookSlug) {
    return Response.json({ error: "bookSlug required" }, { status: 400 });
  }
  const slug = await getFirstChapterSlug(bookSlug);
  return Response.json({ slug });
}
