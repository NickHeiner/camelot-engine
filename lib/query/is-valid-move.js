import applyMove from '../update/apply-move.js';
import getBoardSpace from './get-board-space.js';
import getConstants from '../get-constants.js';
import getCoordsBetween from './get-coords-between.js';
import _ from 'lodash';

const constants = getConstants();

export default function isValidMove(gameState, moveParts, movingPlayer) {
  function isValidMoveRec(
    gameState,
    moveParts,
    jumpedPlayer,
    nonJumpHasOccurred,
    firstRecursiveStep
  ) {
    let jumpedPlayerParam = jumpedPlayer;
    let nonJumpHasOccurredParam = nonJumpHasOccurred;

    if (!gameState) {
      throw new Error(
        `gameState must be a game state object, but was: \`${gameState}\``
      );
    }

    if (!moveParts.length) {
      return true;
    }

    const srcBoardSpace = getBoardSpace(gameState, moveParts[0]);

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

    if (nonJumpHasOccurredParam) {
      return false;
    }

    const destBoardSpace = getBoardSpace(gameState, moveParts[1]);

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

    const moveDelta = {
      row: Math.abs(moveParts[1].row - moveParts[0].row),
      col: Math.abs(moveParts[1].col - moveParts[0].col),
    };

    if (
      moveDelta.row > constants.JUMP_DISTANCE ||
      moveDelta.col > constants.JUMP_DISTANCE ||
      (moveDelta.row === 1 && moveDelta.col === constants.JUMP_DISTANCE) ||
      (moveDelta.col === 1 && moveDelta.row === constants.JUMP_DISTANCE)
    ) {
      return false;
    }

    const spaceBetween = getCoordsBetween(moveParts[0], moveParts[1]);

    if (spaceBetween !== null) {
      const boardSpaceBetween = getBoardSpace(gameState, spaceBetween);
      if (!getBoardSpace(gameState, spaceBetween).piece) {
        return false;
      }
      if (
        jumpedPlayerParam !== null &&
        boardSpaceBetween.piece.player !== jumpedPlayerParam &&
        srcBoardSpace.piece.type !== constants.KNIGHT
      ) {
        return false;
      }
      jumpedPlayerParam = boardSpaceBetween.piece.player;
    } else {
      if (jumpedPlayerParam !== null) {
        return false;
      }
      nonJumpHasOccurredParam = true;
    }

    const gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
    return isValidMoveRec(
      gameAfterFirstMove,
      _.rest(moveParts),
      jumpedPlayerParam,
      nonJumpHasOccurredParam,
      false
    );
  }

  return isValidMoveRec(gameState, moveParts, null, false, true);
}
