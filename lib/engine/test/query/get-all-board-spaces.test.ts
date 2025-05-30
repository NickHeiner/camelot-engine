import getAllBoardSpaces from '../../query/get-all-board-spaces.js';
import createEmptyGame from '../../init/create-empty-game.js';

describe('get-all-board-spaces', function () {
  it('returns the board spaces array from the game state', function () {
    const game = createEmptyGame();
    expect(getAllBoardSpaces(game)).toBe(game.boardSpaces);
  });
});
