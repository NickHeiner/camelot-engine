
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import createBoardSpaces from './create-board-spaces';
import withStartingPieces from './with-starting-pieces';
import constants from '../get-constants';
import _ from 'lodash';
import newObj from '../util/new-obj';

function createEmptyGame(): GameState {
  const capturedPieces = _([constants.PLAYER_A, constants.PLAYER_B])
    .map((playerName: Player) => [
      playerName,
      _.merge(
        newObj(constants.PAWN, 0),
        newObj(constants.KNIGHT, 0)
      )
    ])
    .zipObject()
    .valueOf();

  return withStartingPieces({
    turnCount: 0,
    capturedPieces,
    boardSpaces: createBoardSpaces()
  });
}

export default createEmptyGame;