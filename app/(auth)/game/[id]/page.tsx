import { Id } from '@/convex/_generated/dataModel';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GameBoardPreloaded } from '@/components/game/game-board-preloaded';

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const preloadedGame = await preloadQuery(api.games.getGame, {
    gameId: id as Id<'games'>,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Camelot Game</h1>
      <GameBoardPreloaded preloadedGame={preloadedGame} />
    </div>
  );
}
