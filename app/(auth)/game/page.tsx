import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GameListClient } from '@/components/game/game-list-client';

export default async function GameListPage() {
  const preloadedAvailableGames = await preloadQuery(api.games.getAvailableGames);
  const preloadedMyGames = await preloadQuery(api.games.getMyGames, { 
    userId: 'user-123' // TODO: Get from auth
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