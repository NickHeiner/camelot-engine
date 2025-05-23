import updateBoardSpace from '../update/update-board-space.js';
import getConstants from '../get-constants.js';
import repeat from '../util/repeat.js';
import _ from 'lodash';

const constants = getConstants();

function makePieceRow(gameState, countPawns, row, colStart, player) {
  const pieces = [
      constants.KNIGHT,
      ...repeat(constants.PAWN, countPawns),
      constants.KNIGHT,
    ],
    colOffsets = _.range(countPawns + 2);

  return colOffsets.reduce(
    (gameStateAcc, colOffset) =>
      updateBoardSpace(gameStateAcc, row, colOffset + colStart, {
        piece: {
          type: pieces[colOffset],
          player,
        },
      }),
    gameState
  );
}

const withStartingPieces = (gameState) =>
  constants.STARTING_POSITIONS.reduce(
    (gameStateAcc, startingPosition) =>
      makePieceRow(
        gameStateAcc,
        startingPosition.COUNT_PAWNS,
        startingPosition.ROW,
        startingPosition.COL_START,
        startingPosition.COLOR
      ),
    gameState
  );

export default withStartingPieces;
