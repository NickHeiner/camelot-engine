import getBoardSpace from '../query/get-board-space.js';
import getCoordsBetween from '../query/get-coords-between.js';
import updateBoardSpace from './update-board-space.js';
import type { GameState, Coordinates } from '../types.js';

function applyMove(
  gameState: GameState,
  moveStart: Coordinates,
  moveEnd: Coordinates
): GameState {
  const startSpace = getBoardSpace(gameState, moveStart);
  if (!startSpace) {
    throw new Error(
      `applyMove: invalid moveStart coordinates. moveStart is: ${JSON.stringify(moveStart)}`
    );
  }
  const movingPiece = startSpace.piece;
  const withMovingPieceNotAtSrc = updateBoardSpace(
    gameState,
    moveStart.row,
    moveStart.col,
    { piece: undefined }
  );
  const withMovingPieceAtDest = updateBoardSpace(
    withMovingPieceNotAtSrc,
    moveEnd.row,
    moveEnd.col,
    { piece: movingPiece }
  );
  const coordsBetween = getCoordsBetween(moveStart, moveEnd);

  if (!movingPiece) {
    throw new Error(
      `applyMove: there must be a piece to move at moveStart. moveStart is: ${JSON.stringify(moveStart)}`
    );
  }

  if (!coordsBetween) {
    return withMovingPieceAtDest;
  }

  const spaceBetween = getBoardSpace(gameState, coordsBetween);

  if (!spaceBetween || !spaceBetween.piece) {
    throw new Error(
      'applyMove: if the move is a jump there must be a piece in the space between ' +
        `the start and end. That space between is: ${JSON.stringify(spaceBetween)}`
    );
  }

  if (spaceBetween.piece.player !== movingPiece.player) {
    const nextGameState = {
      ...withMovingPieceAtDest,
      capturedPieces: {
        ...withMovingPieceAtDest.capturedPieces,
        [spaceBetween.piece.player]: {
          ...withMovingPieceAtDest.capturedPieces[spaceBetween.piece.player],
          [spaceBetween.piece.type]:
            withMovingPieceAtDest.capturedPieces[spaceBetween.piece.player][
              spaceBetween.piece.type
            ] + 1,
        },
      },
    };
    return updateBoardSpace(nextGameState, spaceBetween.row, spaceBetween.col, {
      piece: undefined,
    });
  }

  return withMovingPieceAtDest;
}

export default applyMove;
