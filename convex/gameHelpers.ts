import { Doc } from './_generated/dataModel';
import type { GameState, BoardSpace } from '../lib/engine/types';
import type { Player } from '../lib/shared-types';

export function boardSpacesToGameState(
  boardSpaces: Doc<'games'>['boardSpaces'],
  game: Doc<'games'>
): GameState {
  const boardSpacesArray: BoardSpace[] = boardSpaces.map((space) => ({
    row: space.row,
    col: space.col,
    piece: space.piece || null,
  }));

  return {
    boardSpaces: boardSpacesArray,
    turnCount: game.turnCount,
    capturedPieces: game.capturedPieces,
  };
}

export function getCurrentPlayer(turnCount: number): Player {
  return turnCount % 2 === 0 ? 'playerA' : 'playerB';
}
