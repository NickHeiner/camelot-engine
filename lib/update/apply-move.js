import getBoardSpace from '../query/get-board-space.js';
import util from 'util';
import getCoordsBetween from '../query/get-coords-between.js';
import updateBoardSpace from './update-board-space.js';

const applyMove = (gameState, moveStart, moveEnd) => {
  const movingPiece = getBoardSpace(gameState, moveStart).piece;
  const withMovingPieceNotAtSrc = updateBoardSpace(
    gameState,
    moveStart.row,
    moveStart.col,
    { piece: null }
  );
  const withMovingPieceAtDest = updateBoardSpace(
    withMovingPieceNotAtSrc,
    moveEnd.row,
    moveEnd.col,
    { piece: movingPiece }
  );
  const coordsBetween = getCoordsBetween(moveStart, moveEnd);

  if (movingPiece === null) {
    throw new Error(
      `applyMove: there must be a piece to move at moveStart. moveStart is: \`${util.inspect(moveStart)}\``
    );
  }

  if (coordsBetween === null) {
    return withMovingPieceAtDest;
  }

  const spaceBetween = getBoardSpace(
    gameState,
    coordsBetween.row,
    coordsBetween.col
  );

  if (!spaceBetween.piece) {
    throw new Error(
      'applyMove: if the move is a jump there must be a piece in the space between ' +
        `the start and end. That space between is: \`${util.inspect(spaceBetween)}\``
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
      piece: null,
    });
  }

  return withMovingPieceAtDest;
};

export default applyMove;
