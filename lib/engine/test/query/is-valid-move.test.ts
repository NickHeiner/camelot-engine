import isValidMove from '../../lib/query/is-valid-move.js';
import { PAWN } from '../../lib/constants.js';
import updateBoardSpace from '../../lib/update/update-board-space.js';
import createEmptyGame from '../../lib/init/create-empty-game.js';

describe('is-valid-move', function () {
  it('empty moves are valid', function () {
    expect(isValidMove(createEmptyGame(), [], null)).toBe(true);
  });

  it('does not allow moves that do not start on a valid space', function () {
    expect(
      isValidMove(createEmptyGame(), [
        {
          row: 9933,
          col: 232,
        },
      ])
    ).toBe(false);
  });

  it('does not allow moves that do not start on space with a piece', function () {
    expect(
      isValidMove(createEmptyGame(), [
        {
          row: 5,
          col: 1,
        },
      ])
    ).toBe(false);
  });

  describe('movingPlayer is specified', function () {
    it("allows starting with one of that player's pieces", function () {
      expect(
        isValidMove(
          createEmptyGame(),
          [
            {
              row: 5,
              col: 4,
            },
          ],
          'playerA'
        )
      ).toBe(true);
    });

    it("prohibits starting with one of the opponent's pieces", function () {
      expect(
        isValidMove(
          createEmptyGame(),
          [
            {
              row: 9,
              col: 4,
            },
          ],
          'playerA'
        )
      ).toBe(false);
    });
  });

  it('does not allow moves that do not start on a valid space and continue on to another invalid space', function () {
    expect(
      isValidMove(createEmptyGame(), [
        {
          row: 9933,
          col: 232,
        },
        {
          row: 234,
          col: 49,
        },
      ])
    ).toBe(false);
  });

  it('does not allow moves that do not start on a space containing a piece', function () {
    expect(
      isValidMove(createEmptyGame(), [
        {
          row: 6,
          col: 1,
        },
        {
          row: 6,
          col: 2,
        },
      ])
    ).toBe(false);
  });

  it('allows a piece to move into an empty space', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 6,
          col: 4,
        },
        {
          row: 7,
          col: 4,
        },
      ])
    ).toBe(true);
  });

  it('allows a piece to jump over its own pieces', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 6,
        },
        {
          row: 7,
          col: 6,
        },
      ])
    ).toBe(true);
  });

  it('does not allow a piece to jump over an empty space', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 2,
        },
        {
          row: 3,
          col: 2,
        },
      ])
    ).toBe(false);
  });

  it('does not allow movement outside of the board', function () {
    const game = createEmptyGame(),
      outOfBoundsCol = 12;

    expect(
      isValidMove(game, [
        {
          row: 10,
          col: 11,
        },
        {
          row: 10,
          col: outOfBoundsCol,
        },
      ])
    ).toBe(false);
  });

  it('does not allow movement into another piece', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 3,
        },
        {
          row: 5,
          col: 4,
        },
      ])
    ).toBe(false);
  });

  it('does not allow a jump of greater than one space', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 3,
        },
        {
          row: 12,
          col: 3,
        },
      ])
    ).toBe(false);
  });

  it('does not allow a jump of greater than one space in the same row', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 8,
        },
        {
          row: 5,
          col: 0,
        },
      ])
    ).toBe(false);
  });

  it('does not allow pawns to jump over both friendly and enemy pieces in the same jump', function () {
    const game = createEmptyGame(),
      withPawnInJumpRange = updateBoardSpace(game, 8, 5, {
        piece: { type: PAWN, player: 'playerA' },
      });

    expect(
      isValidMove(withPawnInJumpRange, [
        {
          row: 10,
          col: 4,
        },
        {
          row: 8,
          col: 4,
        },
        {
          row: 8,
          col: 6,
        },
      ])
    ).toBe(false);
  });

  it('does allow knights to jump over both friendly and enemy pieces in the same jump', function () {
    const game = createEmptyGame(),
      withPawnInJumpRange = updateBoardSpace(game, 4, 9, {
        piece: { type: PAWN, player: 'playerB' },
      });

    expect(
      isValidMove(withPawnInJumpRange, [
        {
          row: 6,
          col: 8,
        },
        {
          row: 4,
          col: 8,
        },
        {
          row: 4,
          col: 10,
        },
      ])
    ).toBe(true);
  });

  it('does not allow a jump followed by a non-jump', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 6,
        },
        {
          row: 7,
          col: 6,
        },
        {
          row: 7,
          col: 7,
        },
      ])
    ).toBe(false);
  });

  it('does not allow a non-jump followed by a jump', function () {
    const game = createEmptyGame(),
      withPieceToJump = updateBoardSpace(game, 3, 6, {
        piece: { type: PAWN, player: 'playerB' },
      });

    expect(
      isValidMove(withPieceToJump, [
        {
          row: 5,
          col: 6,
        },
        {
          row: 4,
          col: 6,
        },
        {
          row: 2,
          col: 6,
        },
      ])
    ).toBe(false);
  });

  it('does not allow more than one non-jump', function () {
    const game = createEmptyGame();
    expect(
      isValidMove(game, [
        {
          row: 5,
          col: 6,
        },
        {
          row: 4,
          col: 6,
        },
        {
          row: 3,
          col: 6,
        },
      ])
    ).toBe(false);
  });

  it('does not allow playerA to move into its own goal', function () {
    const game = createEmptyGame(),
      withPawnNearGoal = updateBoardSpace(game, 1, 5, {
        piece: { type: PAWN, player: 'playerA' },
      });

    expect(
      isValidMove(withPawnNearGoal, [
        {
          row: 1,
          col: 5,
        },
        {
          row: 0,
          col: 5,
        },
      ])
    ).toBe(false);
  });

  it("does allow playerB to move into playerA's goal", function () {
    const game = createEmptyGame(),
      withPawnNearGoal = updateBoardSpace(game, 1, 5, {
        piece: { type: PAWN, player: 'playerB' },
      });

    expect(
      isValidMove(withPawnNearGoal, [
        {
          row: 1,
          col: 5,
        },
        {
          row: 0,
          col: 5,
        },
      ])
    ).toBe(true);
  });

  it("does allow playerA to move into playerB's goal", function () {
    const game = createEmptyGame(),
      withPawnNearGoal = updateBoardSpace(game, 15, 5, {
        piece: { type: PAWN, player: 'playerA' },
      });

    expect(
      isValidMove(withPawnNearGoal, [
        {
          row: 15,
          col: 5,
        },
        {
          row: 16,
          col: 5,
        },
      ])
    ).toBe(true);
  });

  it('does not allow playerB to move into its own goal', function () {
    const game = createEmptyGame(),
      withPawnNearGoal = updateBoardSpace(game, 15, 5, {
        piece: { type: PAWN, player: 'playerB' },
      });

    expect(
      isValidMove(withPawnNearGoal, [
        {
          row: 15,
          col: 5,
        },
        {
          row: 16,
          col: 5,
        },
      ])
    ).toBe(false);
  });

  // Trying to avoid: https://cloud.githubusercontent.com/assets/829827/4100675/5b8df33a-30aa-11e4-8b06-b59e9b7b9433.PNG
  it('does not allow uneven diagonal movement along a col', function () {
    const game = createEmptyGame();

    expect(
      isValidMove(game, [
        {
          row: 6,
          col: 5,
        },
        {
          row: 7,
          col: 7,
        },
      ])
    ).toBe(false);
  });

  it('does not allow uneven diagonal movement along a row', function () {
    const game = createEmptyGame();

    expect(
      isValidMove(game, [
        {
          row: 6,
          col: 5,
        },
        {
          row: 4,
          col: 4,
        },
      ])
    ).toBe(false);
  });
});
