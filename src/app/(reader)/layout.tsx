/**
 * Full-screen reader layout. No header/footer for immersive reading.
 */
export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
