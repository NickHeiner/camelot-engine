import type { Player, BoardSpace } from './shared-types';

/**
 * Determines which player's turn it is based on the turn count
 */
export function getCurrentPlayer(turnCount: number): Player {
  return turnCount % 2 === 0 ? 'playerA' : 'playerB';
}

/**
 * Find a board space by coordinates
 */
export function findBoardSpace(
  boardSpaces: BoardSpace[],
  row: number,
  col: number
): BoardSpace | undefined {
  return boardSpaces.find((s) => s.row === row && s.col === col);
}

