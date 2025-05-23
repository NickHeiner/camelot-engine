import createBoardSpaces from './create-board-spaces.js';
import withStartingPieces from './with-starting-pieces.js';
import getConstants from '../get-constants.js';
import _ from 'lodash';

const constants = getConstants();

export default function createEmptyGame() {
  const capturedPieces = _([constants.PLAYER_A, constants.PLAYER_B])
    .map(function (playerName) {
      return [playerName, { [constants.PAWN]: 0, [constants.KNIGHT]: 0 }];
    })
    .zipObject()
    .valueOf();

  return withStartingPieces({
    turnCount: 0,
    capturedPieces,
    boardSpaces: createBoardSpaces(),
  });
}
