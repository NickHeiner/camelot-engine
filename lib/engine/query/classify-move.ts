import type {
  GameState,
  Coordinates,
  MoveStep,
  Move,
  MoveType,
} from '../types.js';
import getBoardSpace from './get-board-space.js';
import getCoordsBetween from './get-coords-between.js';
import isValidMove from './is-valid-move.js';

function getMoveType(from: Coordinates, to: Coordinates): MoveType | null {
  const deltaRow = Math.abs(to.row - from.row);
  const deltaCol = Math.abs(to.col - from.col);

  // Simple move: one space in any direction
  if (deltaRow <= 1 && deltaCol <= 1) {
    return 'simple';
  }

  // Jump: two spaces orthogonally or diagonally
  if (
    (deltaRow === 2 && deltaCol === 0) ||
    (deltaRow === 0 && deltaCol === 2) ||
    (deltaRow === 2 && deltaCol === 2)
  ) {
    return 'jump';
  }

  // Invalid move
  return null;
}

function classifyMove(
  gameState: GameState,
  moveParts: Coordinates[]
): Move | null {
  if (moveParts.length < 2) {
    return null;
  }

  // Check if move is valid first
  if (!isValidMove(gameState, moveParts)) {
    return null;
  }

  const firstSpace = getBoardSpace(gameState, moveParts[0]);
  if (!firstSpace || !firstSpace.piece) {
    return null;
  }

  const steps: MoveStep[] = [];
  let currentGameState = gameState;

  // Process each step of the move
  for (let i = 0; i < moveParts.length - 1; i++) {
    const from = moveParts[i];
    const to = moveParts[i + 1];
    const moveType = getMoveType(from, to);

    if (!moveType) {
      return null;
    }

    const step: MoveStep = {
      from,
      to,
      type: moveType,
    };

    // Check for captured piece in jumps
    if (moveType === 'jump') {
      const coordsBetween = getCoordsBetween(from, to);
      if (coordsBetween) {
        const spaceBetween = getBoardSpace(currentGameState, coordsBetween);
        const movingPiece = getBoardSpace(currentGameState, from)?.piece;
        if (spaceBetween && spaceBetween.piece && movingPiece) {
          // Knights can canter over any piece without capturing
          if (movingPiece.type === 'knight') {
            step.type = 'canter';
          } else if (spaceBetween.piece.player !== movingPiece.player) {
            // Regular pieces capture enemy pieces
            step.capturedPiece = coordsBetween;
          } else {
            // Regular pieces cantering over friendly pieces
            step.type = 'canter';
          }
        }
      }
    }

    steps.push(step);

    // Update game state for next iteration
    // We need to simulate the move to check subsequent steps correctly
    const fromSpace = getBoardSpace(currentGameState, from);
    const toSpace = getBoardSpace(currentGameState, to);

    if (!fromSpace || !toSpace) {
      return null;
    }

    // Create a new game state with the piece moved
    const newBoardSpaces = currentGameState.boardSpaces.map((space) => {
      if (space.row === from.row && space.col === from.col) {
        return { ...space, piece: null };
      }
      if (space.row === to.row && space.col === to.col) {
        return { ...space, piece: fromSpace.piece };
      }
      if (
        step.capturedPiece &&
        space.row === step.capturedPiece.row &&
        space.col === step.capturedPiece.col
      ) {
        return { ...space, piece: null };
      }
      return space;
    });

    currentGameState = {
      ...currentGameState,
      boardSpaces: newBoardSpaces,
    };
  }

  return {
    steps,
    player: firstSpace.piece.player,
    piece: firstSpace.piece.type,
  };
}

export default classifyMove;
