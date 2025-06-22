'use client';

import { useMutation, usePreloadedQuery, Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { DebugPanel } from './debug-panel';
import { useMoveSelection } from './hooks/useMoveSelection';
import { getCurrentPlayer } from '@/lib/game-utils';

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
  const makeMove = useMutation(api.moves.makeMove);
  const { user } = useUser();
  const currentUserId = user?.id;

  // Use the move selection hook for UI logic - must be called before early returns
  const moveSelection = useMoveSelection({
    gameId: gameData?.game?._id || ('' as Id<'games'>),
    boardSpaces: gameData?.boardSpaces || [],
    currentPlayer: getCurrentPlayer(gameData?.game?.turnCount || 0),
  });

  if (!gameData || !gameData.game) {
    return <div className="text-center text-red-500">Game not found</div>;
  }

  const { game } = gameData;

  // Calculate current player from turnCount
  const currentPlayer = getCurrentPlayer(game.turnCount);

  const isMyTurn =
    game.status === 'playing' &&
    ((currentPlayer === 'playerA' && game.playerA === currentUserId) ||
      (currentPlayer === 'playerB' && game.playerB === currentUserId));

  // Destructure the move selection values after we know the game exists
  const {
    path,
    state,
    legalDests,
    captureAvailable,
    selectSquare,
    cancel,
    getCompletePath,
    reset,
    getBoardSpace,
  } = moveSelection;

  // Get player display names
  const playerAName =
    players.playerA?.username || players.playerA?.email || 'Player A';
  const playerBName =
    players.playerB?.username || players.playerB?.email || 'Player B';

  // For turn display, show the appropriate name
  const currentTurnName =
    currentPlayer === 'playerA' ? playerAName : playerBName;

  const winnerName =
    game.winner === 'playerA'
      ? playerAName
      : game.winner === 'playerB'
        ? playerBName
        : null;

  const handleSpaceClick = (row: number, col: number) => {
    if (!isMyTurn) return;
    selectSquare(row, col);
  };

  const handleConfirm = async () => {
    const completePath = getCompletePath();
    if (!currentUserId || completePath.length < 2) return;

    try {
      await makeMove({
        gameId: game._id,
        userId: currentUserId,
        path: completePath,
      });
      reset();
    } catch (error) {
      console.error('Move failed:', error);
      reset();
    }
  };

  const squareSize = 48; // Use w-12 h-12 size

  const pointFor = (row: number, col: number) => {
    return {
      x: col * squareSize + squareSize / 2,
      y: row * squareSize + squareSize / 2,
    };
  };

  const renderSpace = (row: number, col: number) => {
    // Use getBoardSpace from the hook
    const space = getBoardSpace(row, col);
    const isLastInPath =
      path.length > 0 &&
      path[path.length - 1].row === row &&
      path[path.length - 1].col === col;
    const piece = space?.piece;

    // Check if this is a legal destination
    const isLegalDest = legalDests.some((d) => d.row === row && d.col === col);

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
          w-12 h-12 border border-gray-400 dark:border-gray-600 flex items-center justify-center relative
          ${isMyTurn ? 'cursor-pointer' : 'cursor-default'}
          ${isLastInPath ? 'ring-4 ring-yellow-400 ring-inset' : ''}
          ${isDarkSquare ? 'bg-amber-700 dark:bg-amber-800' : 'bg-amber-100 dark:bg-amber-900'}
          ${isMyTurn && state === 'idle' && piece?.player === currentPlayer ? 'hover:brightness-110' : ''}
          ${isMyTurn && isLegalDest ? 'hover:brightness-90' : ''}
          transition-all duration-150
        `}
      >
        {/* Legal move indicator */}
        {isLegalDest && (
          <div className="absolute inset-0 bg-green-500 opacity-30 pointer-events-none" />
        )}

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

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-xl relative">
        {/* Path visualization */}
        {path.length > 1 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ padding: '16px' }}
          >
            <polyline
              points={path
                .map((p) => {
                  const pt = pointFor(p.row, p.col);
                  return `${pt.x},${pt.y}`;
                })
                .join(' ')}
              stroke="black"
              strokeWidth="3"
              fill="none"
              strokeOpacity="0.5"
              strokeDasharray="5,5"
            />
          </svg>
        )}

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

      {/* Move controls */}
      {state === 'selecting' && isMyTurn && (
        <div className="flex gap-2">
          <button
            onClick={cancel}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Cancel
          </button>
          {!captureAvailable && path.length > 1 && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
            >
              Confirm Move
            </button>
          )}
          {captureAvailable && (
            <div className="px-4 py-2 text-orange-600 font-semibold">
              Must continue capturing
            </div>
          )}
        </div>
      )}

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
          currentPlayer={currentPlayer}
          playerAName={playerAName}
          playerBName={playerBName}
        />
      )}
    </div>
  );
}
