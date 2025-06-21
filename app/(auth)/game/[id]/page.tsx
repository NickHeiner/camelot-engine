import { Id } from '@/convex/_generated/dataModel';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GameBoardPreloaded } from '@/components/game/game-board-preloaded';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const preloadedGame = await preloadQuery(api.games.getGame, {
    gameId: id as Id<'games'>,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/game"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Camelot</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* Game Board Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <GameBoardPreloaded preloadedGame={preloadedGame} />
        </div>
      </div>
    </div>
  );
}
