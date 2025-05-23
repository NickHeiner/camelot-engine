import updateBoardSpace from '../update/update-board-space.js';
import getConstants from '../get-constants.js';
import repeat from '../util/repeat.js';
import _ from 'lodash';
import type { GameState, Player, PieceType } from '../types.js';

const constants = getConstants();

function makePieceRow(
  gameState: GameState,
  countPawns: number,
  row: number,
  colStart: number,
  player: Player
): GameState {
  const pieces: PieceType[] = [
      constants.KNIGHT,
      ...repeat(constants.PAWN, countPawns),
      constants.KNIGHT,
    ],
    colOffsets = _.range(countPawns + 2);

  return colOffsets.reduce(
    (gameStateAcc: GameState, colOffset: number) =>
      updateBoardSpace(gameStateAcc, row, colOffset + colStart, {
        piece: {
          type: pieces[colOffset],
          player,
        },
      }),
    gameState
  );
}

const withStartingPieces = (gameState: GameState): GameState =>
  constants.STARTING_POSITIONS.reduce(
    (gameStateAcc: GameState, startingPosition) =>
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
