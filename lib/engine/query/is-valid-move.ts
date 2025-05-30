import applyMove from '../update/apply-move.js';
import getBoardSpace from './get-board-space.js';
import {
  PLAYER_A,
  PLAYER_B,
  PLAYER_A_GOAL_ROW,
  PLAYER_B_GOAL_ROW,
  KNIGHT,
} from '../constants.js';
import getCoordsBetween from './get-coords-between.js';
import type { GameState, Player, Coordinates } from '../types.js';

function isValidMove(
  gameState: GameState,
  moveParts: Coordinates[],
  movingPlayer?: Player
): boolean {
  function isValidMoveRec(
    currentGameState: GameState,
    remainingMoveParts: Coordinates[],
    jumpedPlayer: Player | undefined,
    nonJumpHasOccurred: boolean,
    firstRecursiveStep: boolean
  ): boolean {
    if (!remainingMoveParts.length) {
      return true;
    }

    const srcBoardSpace = getBoardSpace(
      currentGameState,
      remainingMoveParts[0]
    );
    const destBoardSpace =
      remainingMoveParts.length > 1
        ? getBoardSpace(currentGameState, remainingMoveParts[1])
        : undefined;

    if (!srcBoardSpace) {
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

    if (remainingMoveParts.length <= 1) {
      return true;
    }

    if (nonJumpHasOccurred) {
      return false;
    }

    if (!destBoardSpace || !srcBoardSpace.piece || destBoardSpace.piece) {
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
      row: Math.abs(remainingMoveParts[1].row - remainingMoveParts[0].row),
      col: Math.abs(remainingMoveParts[1].col - remainingMoveParts[0].col),
    };

    if (
      moveDelta.row > 2 ||
      moveDelta.col > 2 ||
      (moveDelta.row === 1 && moveDelta.col === 2) ||
      (moveDelta.col === 1 && moveDelta.row === 2)
    ) {
      return false;
    }

    const spaceBetween = getCoordsBetween(
      remainingMoveParts[0],
      remainingMoveParts[1]
    );
    let nextJumpedPlayer = jumpedPlayer;
    let nextNonJumpHasOccurred: boolean = nonJumpHasOccurred;

    if (spaceBetween) {
      const boardSpaceBetween = getBoardSpace(currentGameState, spaceBetween);
      if (!boardSpaceBetween || !boardSpaceBetween.piece) {
        return false;
      }
      if (
        jumpedPlayer !== undefined &&
        boardSpaceBetween.piece.player !== jumpedPlayer &&
        srcBoardSpace.piece.type !== KNIGHT
      ) {
        return false;
      }
      nextJumpedPlayer = boardSpaceBetween.piece.player;
    } else {
      if (jumpedPlayer !== undefined) {
        return false;
      }
      nextNonJumpHasOccurred = true;
    }

    const gameAfterFirstMove = applyMove(
      currentGameState,
      remainingMoveParts[0],
      remainingMoveParts[1]
    );
    return isValidMoveRec(
      gameAfterFirstMove,
      remainingMoveParts.slice(1),
      nextJumpedPlayer,
      nextNonJumpHasOccurred,
      false
    );
  }

  return isValidMoveRec(gameState, moveParts, undefined, false, true);
}

export default isValidMove;
