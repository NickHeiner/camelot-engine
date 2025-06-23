import skipTurn from '../../update/skip-turn.js';
import createEmptyGame from '../../init/create-empty-game.js';

it('increments the turn count', () => {
  const game = createEmptyGame();
  expect(game.turnCount).toBe(0);

  const afterSkip = skipTurn(game);
  expect(afterSkip.turnCount).toBe(1);
});

it('does not modify the original game state', () => {
  const game = createEmptyGame();
  const originalTurnCount = game.turnCount;

  skipTurn(game);
  expect(game.turnCount).toBe(originalTurnCount);
});

it('preserves all other game state', () => {
  const game = createEmptyGame();
  const afterSkip = skipTurn(game);

  expect(afterSkip.boardSpaces).toEqual(game.boardSpaces);
  expect(afterSkip.capturedPieces).toEqual(game.capturedPieces);
});
