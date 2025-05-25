'use client';

import { useState } from 'react';
import { useMutation, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import type { Coordinates } from '@/lib/engine/types';
import type { Preloaded } from 'convex/nextjs';

interface GameBoardPreloadedProps {
  preloadedGame: Preloaded<typeof api.games.getGame>;
}

export function GameBoardPreloaded({ preloadedGame }: GameBoardPreloadedProps) {
  // This hook hydrates the preloaded data AND subscribes to real-time updates
  const gameData = usePreloadedQuery(preloadedGame);
  const [selectedSpace, setSelectedSpace] = useState<Coordinates | null>(null);
  const makeMove = useMutation(api.moves.makeMove);
  const { user } = useUser();
  const currentUserId = user?.id;

  if (!gameData || !gameData.game) {
    return <div className="text-center text-red-500">Game not found</div>;
  }

  const { game, boardSpaces } = gameData;

  const isMyTurn =
    game.status === 'playing' &&
    ((game.currentPlayer === 'playerA' && game.playerA === currentUserId) ||
      (game.currentPlayer === 'playerB' && game.playerB === currentUserId));

  const handleSpaceClick = async (row: number, col: number) => {
    if (!isMyTurn) return;

    const clickedSpace = boardSpaces.find(
      (s) => s.row === row && s.col === col
    );

    if (!selectedSpace) {
      if (clickedSpace?.piece?.player === game.currentPlayer) {
        setSelectedSpace({ row, col });
      }
    } else {
      if (!currentUserId) return;
      try {
        await makeMove({
          gameId: game._id,
          userId: currentUserId,
          from: selectedSpace,
          to: { row, col },
        });
        setSelectedSpace(null);
      } catch (error) {
        console.error('Move failed:', error);
        setSelectedSpace(null);
      }
    }
  };

  const renderSpace = (row: number, col: number) => {
    const space = boardSpaces.find((s) => s.row === row && s.col === col);
    const isSelected = selectedSpace?.row === row && selectedSpace?.col === col;
    const piece = space?.piece;

    return (
      <div
        key={`${row}-${col}`}
        onClick={() => handleSpaceClick(row, col)}
        className={`
          w-12 h-12 border border-gray-400 flex items-center justify-center cursor-pointer
          ${isSelected ? 'bg-blue-200' : 'bg-gray-100'}
          ${isMyTurn ? 'hover:bg-gray-200' : ''}
        `}
      >
        {piece && (
          <div
            className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
            ${piece.player === 'playerA' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
          `}
          >
            {piece.type === 'knight' ? 'K' : 'P'}
          </div>
        )}
      </div>
    );
  };

  const rows = Array.from({ length: 14 }, (_, i) => i);
  const cols = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-semibold">
        {game.status === 'waiting' && 'Waiting for opponent...'}
        {game.status === 'playing' &&
          (isMyTurn ? 'Your turn' : `${game.currentPlayer}'s turn`)}
        {game.status === 'completed' && `Winner: ${game.winner}`}
      </div>

      <div className="grid grid-cols-8 gap-0">
        {rows.map((row) => cols.map((col) => renderSpace(row, col)))}
      </div>

      <div className="flex space-x-8 text-sm">
        <div>
          <strong>Player A (Red):</strong>
          <div>Knights captured: {game.capturedPieces.playerB.knight}</div>
          <div>Pawns captured: {game.capturedPieces.playerB.pawn}</div>
        </div>
        <div>
          <strong>Player B (Blue):</strong>
          <div>Knights captured: {game.capturedPieces.playerA.knight}</div>
          <div>Pawns captured: {game.capturedPieces.playerA.pawn}</div>
        </div>
      </div>
    </div>
  );
}
