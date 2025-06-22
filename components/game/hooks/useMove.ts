import { useState, useMemo } from 'react';
import type { GameState, Coordinates } from '@/lib/engine/types';
import applyMoves from '@/lib/engine/update/apply-moves';
import applyMove from '@/lib/engine/update/apply-move';
import getBoardSpace from '@/lib/engine/query/get-board-space';
import getCoordsBetween from '@/lib/engine/query/get-coords-between';
import isValidMove from '@/lib/engine/query/is-valid-move';
import { getCurrentPlayer } from '@/lib/game-utils';

function applyMovesNoTurn(game: GameState, moves: Coordinates[]): GameState {
  if (moves.length < 2) return game;
  const pairs: Array<[Coordinates, Coordinates]> = [];
  for (let i = 0; i < moves.length - 1; i++) {
    pairs.push([moves[i], moves[i + 1]]);
  }
  return pairs.reduce((state, [from, to]) => applyMove(state, from, to), {
    ...game,
  });
}

export function useMove(initial: GameState) {
  const [game, setGame] = useState<GameState>(initial);
  const [path, setPath] = useState<Coordinates[]>([]);
  const state = path.length ? 'selecting' : 'idle';
  const currentPlayer = getCurrentPlayer(game.turnCount);

  const boardPreview = useMemo(
    () => applyMovesNoTurn(game, path),
    [game, path]
  );

  const legalDests = useMemo(() => {
    if (!path.length) return [] as Coordinates[];
    const from = path[path.length - 1];
    const board = boardPreview;
    return board.boardSpaces
      .filter((s) =>
        isValidMove(board, [from, { row: s.row, col: s.col }], currentPlayer)
      )
      .map((s) => ({ row: s.row, col: s.col }));
  }, [path, boardPreview, currentPlayer]);

  const captureAvailable = useMemo(() => {
    if (!path.length) return false;
    const from = path[path.length - 1];
    return legalDests.some((dest) => {
      const between = getCoordsBetween(from, dest);
      if (!between) return false;
      const space = getBoardSpace(boardPreview, between);
      return !!space?.piece && space.piece.player !== currentPlayer;
    });
  }, [legalDests, boardPreview, path, currentPlayer]);

  const selectSquare = (row: number, col: number) => {
    if (state === 'idle') {
      const space = getBoardSpace(game, { row, col });
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

  const confirm = () => {
    if (path.length < 2) return;
    const next = applyMoves(game, path);
    setGame(next);
    setPath([]);
  };

  return {
    game: boardPreview,
    realGame: game,
    path,
    state,
    legalDests,
    captureAvailable,
    selectSquare,
    cancel,
    confirm,
    currentPlayer: getCurrentPlayer(game.turnCount),
  };
}
