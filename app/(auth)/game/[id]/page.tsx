'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { GameBoard } from '@/components/game/game-board';
import { use } from 'react';

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const gameData = useQuery(api.games.getGame, {
    gameId: id as Id<'games'>,
  });

  const currentUserId = 'user-123'; // TODO: Get from auth

  if (!gameData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading game...</div>
      </div>
    );
  }

  if (!gameData.game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Game not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Camelot Game</h1>
      <GameBoard
        game={gameData.game}
        boardSpaces={gameData.boardSpaces}
        currentUserId={currentUserId}
      />
    </div>
  );
}
