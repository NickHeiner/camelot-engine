import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Camelot</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Experience the classic board game online. Challenge friends or play against opponents from around the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/game"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Play Now
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">♟️</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Strategic Gameplay</h3>
          <p className="text-muted-foreground">
            Master the unique movement patterns and capture mechanics of Camelot
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌐</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Online Multiplayer</h3>
          <p className="text-muted-foreground">
            Play with friends or match with players worldwide in real-time
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-muted-foreground">
            View your game history, statistics, and improve your skills
          </p>
        </div>
      </div>
    </div>
  );
}