import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import type { BoardSpace } from '@/lib/shared-types';

interface Coordinates {
  row: number;
  col: number;
}

interface UseMoveSelectionProps {
  gameId: Id<'games'>;
  boardSpaces: BoardSpace[];
  currentPlayer: 'playerA' | 'playerB';
}

export function useMoveSelection({
  gameId,
  boardSpaces,
  currentPlayer,
}: UseMoveSelectionProps) {
  const [path, setPath] = useState<Coordinates[]>([]);
  const [moveComplete, setMoveComplete] = useState(false);
  const state =
    path.length === 0 ? 'idle' : moveComplete ? 'complete' : 'selecting';

  // Get legal moves from server
  const legalMovesQuery = useQuery(
    api.moves.getLegalMoves,
    path.length > 0 && !moveComplete
      ? {
          gameId,
          from: path[0],
          path,
        }
      : 'skip'
  );

  const legalDests = moveComplete ? [] : legalMovesQuery?.legalMoves || [];
  const captureAvailable = legalMovesQuery?.captureAvailable || false;
  const mustContinueCapturing = legalMovesQuery?.mustContinueCapturing || false;

  // Auto-complete move if we made a capture but no more captures available
  useEffect(() => {
    if (path.length > 1 && legalMovesQuery && !moveComplete) {
      // Check if last move was a capture
      const lastMoveWasCapture =
        path.length >= 2 &&
        (() => {
          const from = path[path.length - 2];
          const to = path[path.length - 1];
          const distance = Math.abs(to.row - from.row);
          return distance > 1;
        })();

      if (lastMoveWasCapture && !captureAvailable) {
        // Made a capture but no more captures available - move is complete
        setMoveComplete(true);
      }
    }
  }, [path, legalMovesQuery, captureAvailable, moveComplete]);

  const selectSquare = (row: number, col: number) => {
    if (state === 'idle') {
      const space = boardSpaces.find((s) => s.row === row && s.col === col);
      if (space?.piece?.player === currentPlayer) {
        setPath([{ row, col }]);
        setMoveComplete(false);
      }
      return;
    }

    if (state === 'complete') {
      // Move is already complete, don't allow more selections
      return;
    }

    const dest = { row, col };
    if (legalDests.some((d) => d.row === row && d.col === col)) {
      // Check if this was a capture move
      const from = path[path.length - 1];
      const midRow = Math.floor((from.row + dest.row) / 2);
      const midCol = Math.floor((from.col + dest.col) / 2);
      const distance = Math.abs(dest.row - from.row);

      // It's a capture if we're jumping over a piece (distance > 1)
      const isCapture =
        distance > 1 &&
        boardSpaces.some(
          (s) => s.row === midRow && s.col === midCol && s.piece
        );

      const newPath = [...path, dest];
      setPath(newPath);

      if (!isCapture) {
        // Non-capturing move completes the turn
        setMoveComplete(true);
      }
      // For captures, let the server determine if more captures are available
    }
  };

  const cancel = () => {
    setPath([]);
    setMoveComplete(false);
  };

  const getCompletePath = () => {
    return path;
  };

  const reset = () => {
    setPath([]);
    setMoveComplete(false);
  };

  const getBoardSpace = (row: number, col: number) => {
    return boardSpaces.find((s) => s.row === row && s.col === col);
  };

  return {
    boardPreview: boardSpaces, // No client-side preview - actual state from server
    path,
    state,
    legalDests,
    captureAvailable,
    mustContinueCapturing,
    selectSquare,
    cancel,
    getCompletePath,
    reset,
    getBoardSpace,
  };
}
