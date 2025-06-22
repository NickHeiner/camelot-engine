'use client';
import { useMove } from './hooks/useMove';
import type { GameState } from '@/lib/engine/types';
import getBoardSpace from '@/lib/engine/query/get-board-space';
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/lib/engine/constants';

interface EngineBoardProps {
  initialGame: GameState;
}

export function EngineBoard({ initialGame }: EngineBoardProps) {
  const {
    game,
    path,
    legalDests,
    captureAvailable,
    selectSquare,
    cancel,
    confirm,
    currentPlayer,
    state,
  } = useMove(initialGame);

  const squareSize = 32;

  const pointFor = (row: number, col: number) => {
    return {
      x: col * squareSize + squareSize / 2,
      y: row * squareSize + squareSize / 2,
    };
  };

  return (
    <div className="space-y-2">
      <div>Current player: {currentPlayer}</div>
      <div
        className="relative"
        style={{
          width: BOARD_WIDTH * squareSize,
          height: BOARD_HEIGHT * squareSize,
        }}
      >
        {/* path line */}
        {path.length > 1 && (
          <svg className="absolute inset-0 pointer-events-none">
            <polyline
              points={path
                .map((p) => {
                  const pt = pointFor(p.row, p.col);
                  return `${pt.x},${pt.y}`;
                })
                .join(' ')}
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.3"
            />
          </svg>
        )}
        {Array.from({ length: BOARD_HEIGHT }).map((_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: BOARD_WIDTH }).map((_, col) => {
              const space = getBoardSpace(game, { row, col });
              const inLegal = legalDests.some(
                (d) => d.row === row && d.col === col
              );
              const piece = space?.piece;
              const movingOrigin = path.length && path[0];
              const isMovingPiece =
                movingOrigin &&
                path[path.length - 1].row === row &&
                path[path.length - 1].col === col;
              const isDark = (row + col) % 2 === 1;
              return (
                <div
                  key={col}
                  data-testid={`square-${row}-${col}`}
                  onClick={() => selectSquare(row, col)}
                  className={`relative w-8 h-8 border text-center ${isDark ? 'bg-amber-700' : 'bg-amber-100'}`}
                >
                  {inLegal && (
                    <div className="absolute inset-0 bg-green-500 opacity-50 pointer-events-none" />
                  )}
                  {piece && (
                    <div
                      className={`w-full h-full flex items-center justify-center ${isMovingPiece ? 'ring-2 ring-red-500' : ''}`}
                    >
                      {piece.type === 'knight' ? 'K' : 'P'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {state === 'selecting' && (
        <div className="space-x-2">
          <button
            data-testid="cancel"
            onClick={cancel}
            className="px-2 py-1 bg-gray-300"
          >
            Cancel
          </button>
          {!captureAvailable && path.length > 1 && (
            <button
              data-testid="confirm"
              onClick={confirm}
              className="px-2 py-1 bg-blue-500 text-white"
            >
              Confirm Move
            </button>
          )}
        </div>
      )}
    </div>
  );
}
