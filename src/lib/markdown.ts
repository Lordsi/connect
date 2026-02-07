/**
 * Minimal Markdown to HTML converter for chapter content.
 * Handles: headers (# ## ###), bold (**), italic (*), paragraphs, horizontal rules.
 * TODO: Consider react-markdown for full CommonMark support if needed.
 */

export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const blocks: string[] = [];
  let inParagraph = false;
  let paragraphBuffer: string[] = [];

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(" ");
      blocks.push(`<p>${inlineToHtml(text)}</p>`);
      paragraphBuffer = [];
    }
    inParagraph = false;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "---") {
      flushParagraph();
      blocks.push("<hr />");
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      blocks.push(`<h3>${inlineToHtml(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      blocks.push(`<h2>${inlineToHtml(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      blocks.push(`<h1>${inlineToHtml(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed === "") {
      flushParagraph();
      continue;
    }
    inParagraph = true;
    paragraphBuffer.push(trimmed);
  }
  flushParagraph();

  return blocks.join("\n");
}

function inlineToHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}
