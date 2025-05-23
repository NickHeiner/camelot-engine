import applyMove from './apply-move.js';
import pairwise from '../util/pairwise.js';

function applyMoves(gameState, moves) {
  // TODO it would be nice to throw an error if the moves aren't valid.

  if (moves.length === 1) {
    throw new Error(
      'Cannot apply a single move: there must be both a source and a destination, and with a single move there is only a source'
    );
  }

  const nextGameState = { ...gameState, turnCount: gameState.turnCount + 1 };

  const movePairs = pairwise(moves);

  return movePairs.reduce(
    (gameStateAcc, movePair) =>
      applyMove(gameStateAcc, movePair[0], movePair[1]),
    nextGameState
  );
}

export default applyMoves;
