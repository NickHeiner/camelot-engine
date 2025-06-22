import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GameListClient } from '@/components/game/game-list-client';
import { auth } from '@clerk/nextjs/server';

export default async function GameListPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please sign in to view games.</p>
      </div>
    );
  }

  const preloadedAvailableGames = await preloadQuery(
    api.games.getAvailableGames,
    { userId }
  );
  const preloadedMyGames = await preloadQuery(api.games.getMyGames, {
    userId,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Games</h1>
      <GameListClient
        preloadedAvailableGames={preloadedAvailableGames}
        preloadedMyGames={preloadedMyGames}
      />
    </div>
  );
}
