import createBoardSpaces from './create-board-spaces.js';
import withStartingPieces from './with-starting-pieces.js';
import getConstants from '../get-constants.js';
import type { CapturedPieces } from '../types.js';

const constants = getConstants();

function createEmptyGame() {
  const capturedPieces = [constants.PLAYER_A, constants.PLAYER_B].reduce(
    (acc, playerName) => ({
      ...acc,
      [playerName]: { [constants.PAWN]: 0, [constants.KNIGHT]: 0 },
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
