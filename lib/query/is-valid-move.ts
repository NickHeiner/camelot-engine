import applyMove from '../update/apply-move.js';
import getBoardSpace from './get-board-space.js';
import { PLAYER_A, PLAYER_B, PLAYER_A_GOAL_ROW, PLAYER_B_GOAL_ROW, KNIGHT } from '../constants.js';
import getCoordsBetween from './get-coords-between.js';
import type { GameState, Player, Coordinates } from '../types.js';

function isValidMove(
  gameState: GameState,
  moveParts: Coordinates[],
  movingPlayer?: Player | null
): boolean {
  function isValidMoveRec(
    gameState: GameState,
    moveParts: Coordinates[],
    jumpedPlayer: Player | null,
    nonJumpHasOccurred: boolean,
    firstRecursiveStep: boolean
  ): boolean {
    const srcBoardSpace = getBoardSpace(gameState, moveParts[0]);
    const destBoardSpace =
      moveParts.length > 1 ? getBoardSpace(gameState, moveParts[1]) : null;

    if (!gameState) {
      throw new Error(
        `gameState must be a game state object, but was: \`${gameState}\``
      );
    }

    if (!moveParts.length) {
      return true;
    }

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

    if (
      destBoardSpace === null ||
      !srcBoardSpace.piece ||
      destBoardSpace.piece
    ) {
      return false;
    }

    if (
      srcBoardSpace.piece.player === PLAYER_A &&
      destBoardSpace.row === PLAYER_A_GOAL_ROW
    ) {
      return false;
    }
    if (
      srcBoardSpace.piece.player === PLAYER_B &&
      destBoardSpace.row === PLAYER_B_GOAL_ROW
    ) {
      return false;
    }

    const moveDelta = {
      row: Math.abs(moveParts[1].row - moveParts[0].row),
      col: Math.abs(moveParts[1].col - moveParts[0].col),
    };

    if (
      moveDelta.row > 2 ||
      moveDelta.col > 2 ||
      (moveDelta.row === 1 && moveDelta.col === 2) ||
      (moveDelta.col === 1 && moveDelta.row === 2)
    ) {
      return false;
    }

    const spaceBetween = getCoordsBetween(moveParts[0], moveParts[1]);
    let nextJumpedPlayer = jumpedPlayer;
    let nextNonJumpHasOccurred: boolean = nonJumpHasOccurred;

    if (spaceBetween !== null) {
      const boardSpaceBetween = getBoardSpace(gameState, spaceBetween);
      if (!boardSpaceBetween || !boardSpaceBetween.piece) {
        return false;
      }
      if (
        jumpedPlayer !== null &&
        boardSpaceBetween.piece.player !== jumpedPlayer &&
        srcBoardSpace.piece.type !== KNIGHT
      ) {
        return false;
      }
      nextJumpedPlayer = boardSpaceBetween.piece.player;
    } else {
      if (jumpedPlayer !== null) {
        return false;
      }
      nextNonJumpHasOccurred = true;
    }

    const gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
    return isValidMoveRec(
      gameAfterFirstMove,
      moveParts.slice(1),
      nextJumpedPlayer,
      nextNonJumpHasOccurred,
      false
    );
  }

  return isValidMoveRec(gameState, moveParts, null, false, true);
}

export default isValidMove;
