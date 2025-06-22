import { notFound } from 'next/navigation';
import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GameBoardPreloaded } from '@/components/game/game-board-preloaded';
import { Id } from '@/convex/_generated/dataModel';
import { clerkClient } from '@clerk/nextjs/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface GamePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;

  let preloadedGame;
  try {
    preloadedGame = await preloadQuery(api.games.getGame, {
      gameId: id as Id<'games'>,
    });
  } catch (error) {
    console.error('Error loading game:', error);
    notFound();
  }

  // Extract the game data to fetch player information
  const gameData = preloadedQueryResult(preloadedGame);
  if (!gameData || !gameData.game) {
    notFound();
  }

  // Fetch both players' data from Clerk
  const clerk = await clerkClient();
  const players: Record<string, { username: string | null; email: string }> =
    {};

  if (gameData.game.playerA) {
    const playerA = await clerk.users.getUser(gameData.game.playerA);
    players.playerA = {
      username: playerA.username,
      email: playerA.emailAddresses[0]?.emailAddress || '',
    };
  }

  if (gameData.game.playerB) {
    const playerB = await clerk.users.getUser(gameData.game.playerB);
    players.playerB = {
      username: playerB.username,
      email: playerB.emailAddresses[0]?.emailAddress || '',
    };
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/game"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Link>

        {/* Game Board Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <GameBoardPreloaded preloadedGame={preloadedGame} players={players} />
        </div>
      </div>
    </div>
  );
}
