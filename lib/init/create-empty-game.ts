import createBoardSpaces from './create-board-spaces.js';
import withStartingPieces from './with-starting-pieces.js';
import { PLAYER_A, PLAYER_B, PAWN, KNIGHT } from '../constants.js';
import type { CapturedPieces } from '../types.js';

function createEmptyGame() {
  const capturedPieces = [PLAYER_A, PLAYER_B].reduce(
    (acc, playerName) => ({
      ...acc,
      [playerName]: { [PAWN]: 0, [KNIGHT]: 0 },
    }),
    {} as CapturedPieces
  );

  return withStartingPieces({
    turnCount: 0,
    capturedPieces,
    boardSpaces: createBoardSpaces(),
  });
}

export default createEmptyGame;
