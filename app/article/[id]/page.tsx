export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen text-neutral-100">
      <h1>Article title</h1>
      <p>Article body</p>
    </div>
  );
}
