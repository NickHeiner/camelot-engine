
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import applyMove from '../update/apply-move';
import getBoardSpace from './get-board-space';
import constants from '../get-constants';
import getCoordsBetween from './get-coords-between';
import _ from 'lodash';

export default function isValidMove(gameState: GameState, moveParts: MovePart[], movingPlayer: Player): boolean {
  function isValidMoveRec(
    gameState: GameState,
    moveParts: MovePart[],
    jumpedPlayer: Player | null,
    nonJumpHasOccurred: boolean,
    firstRecursiveStep: boolean
  ): boolean {
    let srcBoardSpace: Space | null;
    let destBoardSpace: Space | null;
    let moveDelta: { row: Row; col: Col };
    let spaceBetween: { row: Row; col: Col } | null;
    let boardSpaceBetween: Space | null;
    let gameAfterFirstMove: GameState;

    if (!gameState) {
      throw new Error(
        `gameState must be a game state object, but was: \`${gameState}\``
      );
    }

    if (!moveParts.length) {
      return true;
    }

    srcBoardSpace = getBoardSpace(gameState, moveParts[0]);

    if (srcBoardSpace === null) {
      return false;
    }

    if (firstRecursiveStep) {
      if (!srcBoardSpace.piece) {
        return false;
      }

      if (movingPlayer && srcBoardSpace.piece.player !== movingPlayer) {
        return false;
      }
    }

    if (moveParts.length <= 1) {
      return true;
    }

    if (nonJumpHasOccurred) {
      return false;
    }

    destBoardSpace = getBoardSpace(gameState, moveParts[1]);

    if (
      destBoardSpace === null ||
      !srcBoardSpace.piece ||
      destBoardSpace.piece
    ) {
      return false;
    }

    if (
      srcBoardSpace.piece.player === constants.PLAYER_A &&
      destBoardSpace.row === constants.PLAYER_A_GOAL_ROW
    ) {
      return false;
    }
    if (
      srcBoardSpace.piece.player === constants.PLAYER_B &&
      destBoardSpace.row === constants.PLAYER_B_GOAL_ROW
    ) {
      return false;
    }

    moveDelta = {
      row: Math.abs(moveParts[1].row - moveParts[0].row),
      col: Math.abs(moveParts[1].col - moveParts[0].col)
    };

    if (
      moveDelta.row > 2 ||
      moveDelta.col > 2 ||
      (moveDelta.row === 1 && moveDelta.col === 2) ||
      (moveDelta.col === 1 && moveDelta.row === 2)
    ) {
      return false;
    }

    spaceBetween = getCoordsBetween(moveParts[0], moveParts[1]);

    if (spaceBetween !== null) {
      boardSpaceBetween = getBoardSpace(gameState, spaceBetween);
      if (!getBoardSpace(gameState, spaceBetween).piece) {
        return false;
      }
      if (
        jumpedPlayer !== null &&
        boardSpaceBetween.piece.player !== jumpedPlayer &&
        srcBoardSpace.piece.type !== constants.KNIGHT
      ) {
        return false;
      }
      jumpedPlayer = boardSpaceBetween.piece.player;
    } else {
      if (jumpedPlayer !== null) {
        return false;
      }
      nonJumpHasOccurred = true;
    }

    gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
    return isValidMoveRec(
      gameAfterFirstMove,
      _.rest(moveParts),
      jumpedPlayer,
      nonJumpHasOccurred,
      false
    );
  }

  return isValidMoveRec(gameState, moveParts, null, false, true);
}