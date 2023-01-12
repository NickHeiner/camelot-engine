
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import updateBoardSpace from '../update/update-board-space';
import constants from '../get-constants';
import repeat from '../util/repeat';
import _ from 'lodash';

function makePieceRow(gameState: GameState, countPawns: number, row: Row, colStart: Col, player: Player): GameState {
  const pieces: string[] = [constants.KNIGHT].concat(repeat(constants.PAWN, countPawns)).concat([constants.KNIGHT]);
  const collOffsets: number[] = _.range(countPawns + 2);

  return _.reduce(collOffsets, (gameStateAcc: GameState, colOffset: number): GameState => {
    return updateBoardSpace(gameStateAcc, row, colOffset + colStart, {
      piece: {
        type: pieces[colOffset],
        player: player
      }
    });
  }, gameState);
}

function withStartingPieces(gameState: GameState): GameState {
  return _.reduce(constants.STARTING_POSITIONS, (gameStateAcc: GameState, startingPosition: MovePart): GameState => {
    return makePieceRow(
      gameStateAcc,
      startingPosition.COUNT_PAWNS,
      startingPosition.ROW,
      startingPosition.COL_START,
      startingPosition.COLOR
    );
  }, gameState);
}

export default withStartingPieces;