import type { GameState, Coordinates, Piece } from '../types.js';
import getBoardSpace from './get-board-space.js';

export interface MoveDetails {
  from: Coordinates;
  to: Coordinates;
  movingPiece: Piece;
  capturedPiece?: {
    type: Piece['type'];
    at: Coordinates;
  };
}

/**
 * Gets details about a move including what piece was captured (if any)
 */
export default function getMoveDetails(
  gameState: GameState,
  from: Coordinates,
  to: Coordinates
): MoveDetails {
  const fromSpace = getBoardSpace(gameState, from);
  const toSpace = getBoardSpace(gameState, to);

  if (!fromSpace) {
    throw new Error('Invalid source position');
  }

  if (!fromSpace.piece) {
    throw new Error('No piece at source position');
  }

  if (!toSpace) {
    throw new Error('Invalid destination position');
  }

  const moveDetails: MoveDetails = {
    from,
    to,
    movingPiece: fromSpace.piece,
  };

  if (toSpace.piece) {
    moveDetails.capturedPiece = {
      type: toSpace.piece.type,
      at: to,
    };
  }

  return moveDetails;
}

