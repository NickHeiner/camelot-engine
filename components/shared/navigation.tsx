import Link from 'next/link';

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Camelot
          </Link>
          <div className="flex gap-6">
            <Link href="/game" className="hover:underline">
              Play
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <Link href="/history" className="hover:underline">
              History
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
