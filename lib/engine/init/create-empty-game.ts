import createBoardSpaces from './create-board-spaces.js';
import withStartingPieces from './with-starting-pieces.js';
import { PLAYER_A, PLAYER_B, PAWN, KNIGHT } from '../constants.js';
import type { CapturedPieces, GameState } from '../types.js';

function createEmptyGame(): GameState {
  const capturedPieces: CapturedPieces = {
    [PLAYER_A]: { [PAWN]: 0, [KNIGHT]: 0 },
    [PLAYER_B]: { [PAWN]: 0, [KNIGHT]: 0 },
  };

  return withStartingPieces({
    turnCount: 0,
    capturedPieces,
    boardSpaces: createBoardSpaces(),
  });
}

export default createEmptyGame;
