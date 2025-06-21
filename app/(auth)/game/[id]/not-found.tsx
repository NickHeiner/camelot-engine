import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Game Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The game you are looking for does not exist.
      </p>
      <Link
        href="/game"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Back to Games
      </Link>
    </div>
  );
}
