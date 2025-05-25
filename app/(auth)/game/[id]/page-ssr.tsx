import { Id } from '@/convex/_generated/dataModel';
import { GameBoardSSR } from '@/components/game/game-board-ssr';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export default async function GamePageSSR({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Preload the game data on the server
  const preloadedGame = await preloadQuery(api.games.getGame, {
    gameId: id as Id<'games'>,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Camelot Game (Server-Side Rendered)
      </h1>
      <GameBoardSSR 
        preloadedGame={preloadedGame}
        gameId={id as Id<'games'>}
      />
    </div>
  );
}