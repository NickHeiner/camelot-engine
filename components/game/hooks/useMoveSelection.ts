import { useState } from 'react';
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
  const state = path.length ? 'selecting' : 'idle';

  // Get legal moves from server
  const legalMovesQuery = useQuery(
    api.moves.getLegalMoves,
    path.length > 0
      ? {
          gameId,
          from: path[0],
          path,
        }
      : 'skip'
  );

  const legalDests = legalMovesQuery?.legalMoves || [];
  const captureAvailable = legalMovesQuery?.captureAvailable || false;

  const selectSquare = (row: number, col: number) => {
    if (state === 'idle') {
      const space = boardSpaces.find((s) => s.row === row && s.col === col);
      if (space?.piece?.player === currentPlayer) {
        setPath([{ row, col }]);
      }
      return;
    }
    const dest = { row, col };
    if (legalDests.some((d) => d.row === row && d.col === col)) {
      setPath([...path, dest]);
    }
  };

  const cancel = () => {
    setPath([]);
  };

  const getCompletePath = () => {
    return path;
  };

  const reset = () => {
    setPath([]);
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
    selectSquare,
    cancel,
    getCompletePath,
    reset,
    getBoardSpace,
  };
}
