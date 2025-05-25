import { Id } from '@/convex/_generated/dataModel';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GameBoardPreloaded } from '@/components/game/game-board-preloaded';

export default async function GamePageHybrid({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Preload on server - this data will be immediately available on client
  // AND will receive real-time updates
  const preloadedGame = await preloadQuery(api.games.getGame, {
    gameId: id as Id<'games'>,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Camelot Game (SSR + Real-time)
      </h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        This page loads instantly with server data AND receives real-time updates!
      </p>
      <GameBoardPreloaded 
        preloadedGame={preloadedGame}
      />
    </div>
  );
}