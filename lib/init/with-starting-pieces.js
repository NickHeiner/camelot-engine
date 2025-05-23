import updateBoardSpace from '../update/update-board-space.js';
import getConstants from '../get-constants.js';
import repeat from '../util/repeat.js';
import _ from 'lodash';

const constants = getConstants();

function makePieceRow(gameState, countPawns, row, colStart, player) {
  const pieces = [constants.KNIGHT]
      .concat(repeat(constants.PAWN, countPawns))
      .concat([constants.KNIGHT]),
    colOffsets = _.range(countPawns + 2);

  return _.reduce(
    colOffsets,
    function (gameStateAcc, colOffset) {
      return updateBoardSpace(gameStateAcc, row, colOffset + colStart, {
        piece: {
          type: pieces[colOffset],
          player,
        },
      });
    },
    gameState
  );
}

export default function withStartingPieces(gameState) {
  return _.reduce(
    constants.STARTING_POSITIONS,
    function (gameStateAcc, startingPosition) {
      return makePieceRow(
        gameStateAcc,
        startingPosition.COUNT_PAWNS,
        startingPosition.ROW,
        startingPosition.COL_START,
        startingPosition.COLOR
      );
    },
    gameState
  );
}
