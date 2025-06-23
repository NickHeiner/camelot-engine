import type { GameState } from '../types.js';

/**
 * Skip the current player's turn, advancing to the next player
 */
function skipTurn(gameState: GameState): GameState {
  return {
    ...gameState,
    turnCount: gameState.turnCount + 1,
  };
}

export default skipTurn;
