'use client';

import { useState } from 'react';
import { useMutation, usePreloadedQuery, Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import type { Coordinates } from '@/lib/engine/types';
import { findBoardSpace } from '@/lib/game-utils';
import { DebugPanel } from './debug-panel';

interface GameBoardPreloadedProps {
  preloadedGame: Preloaded<typeof api.games.getGame>;
  players: Record<string, { username: string | null; email: string }>;
}

export function GameBoardPreloaded({
  preloadedGame,
  players,
}: GameBoardPreloadedProps) {
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

  // Get player display names
  const playerAName =
    players.playerA?.username || players.playerA?.email || 'Player A';
  const playerBName =
    players.playerB?.username || players.playerB?.email || 'Player B';

  // For turn display, show the appropriate name
  const currentTurnName =
    game.currentPlayer === 'playerA' ? playerAName : playerBName;

  const winnerName =
    game.winner === 'playerA'
      ? playerAName
      : game.winner === 'playerB'
        ? playerBName
        : null;

  const handleSpaceClick = async (row: number, col: number) => {
    if (!isMyTurn) return;

    const clickedSpace = findBoardSpace(boardSpaces, row, col);

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
    const space = findBoardSpace(boardSpaces, row, col);
    const isSelected = selectedSpace?.row === row && selectedSpace?.col === col;
    const piece = space?.piece;

    // Checkerboard pattern: alternate colors based on row + col
    const isDarkSquare = (row + col) % 2 === 0;

    // Determine if this space exists on the Camelot board
    const isValidSpace = space !== null;

    if (!isValidSpace) {
      // Render empty space for non-playable areas
      return <div key={`${row}-${col}`} className="w-12 h-12" />;
    }

    return (
      <div
        key={`${row}-${col}`}
        onClick={() => handleSpaceClick(row, col)}
        className={`
          w-12 h-12 border border-gray-400 dark:border-gray-600 flex items-center justify-center
          ${isMyTurn && piece?.player === game.currentPlayer ? 'cursor-pointer' : 'cursor-default'}
          ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
          ${isDarkSquare ? 'bg-amber-700 dark:bg-amber-800' : 'bg-amber-100 dark:bg-amber-900'}
          ${isMyTurn && !selectedSpace && piece?.player === game.currentPlayer ? 'hover:brightness-110' : ''}
          ${isMyTurn && selectedSpace && !piece ? 'hover:brightness-90' : ''}
          transition-all duration-150
        `}
      >
        {piece && (
          <div
            className={`
            w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
            ${piece.player === 'playerA' ? 'bg-red-600 text-white shadow-md' : 'bg-blue-600 text-white shadow-md'}
            ${piece.type === 'knight' ? 'border-2 border-yellow-300' : ''}
          `}
          >
            {piece.type === 'knight' ? 'K' : 'P'}
          </div>
        )}
      </div>
    );
  };

  // Camelot board is 12 columns x 16 rows
  const BOARD_ROWS = 16;
  const BOARD_COLS = 12;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-semibold">
        {game.status === 'waiting' && 'Waiting for opponent...'}
        {game.status === 'playing' &&
          (isMyTurn ? 'Your turn' : `${currentTurnName}'s turn`)}
        {game.status === 'completed' && `Winner: ${winnerName}`}
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-xl">
        <div className="flex flex-col">
          {Array.from({ length: BOARD_ROWS }, (_, row) => (
            <div key={row} className="flex">
              {Array.from({ length: BOARD_COLS }, (_, col) =>
                renderSpace(row, col)
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-8 text-sm">
        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <strong className="text-red-700 dark:text-red-400">
            {playerAName}:
          </strong>
          <div className="mt-2 text-gray-700 dark:text-gray-300">
            Knights captured: {game.capturedPieces.playerB.knight}
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            Pawns captured: {game.capturedPieces.playerB.pawn}
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <strong className="text-blue-700 dark:text-blue-400">
            {playerBName}:
          </strong>
          <div className="mt-2 text-gray-700 dark:text-gray-300">
            Knights captured: {game.capturedPieces.playerA.knight}
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            Pawns captured: {game.capturedPieces.playerA.pawn}
          </div>
        </div>
      </div>

      {/* Debug Panel - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel
          gameId={game._id}
          currentPlayer={game.currentPlayer}
          playerAName={playerAName}
          playerBName={playerBName}
        />
      )}
    </div>
  );
}
