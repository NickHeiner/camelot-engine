import createEmptyGame from '../init/create-empty-game.ts';
import updateBoardSpace from '../update/update-board-space.ts';
import getBoardSpace from '../query/get-board-space.ts';
import { PAWN } from '../constants.ts';
import applyMoves from '../update/apply-moves.ts';

describe('apply-moves', function () {
  it('adds a piece to the destination', function () {
    const game = createEmptyGame(),
      dest = {
        row: 11,
        col: 4,
      },
      withMove = applyMoves(game, [
        {
          row: 10,
          col: 4,
        },
        dest,
      ]);

    expect(getBoardSpace(withMove, dest)?.piece).toHaveProperty('type', PAWN);
  });

  it('removes a piece from the source', function () {
    const game = createEmptyGame(),
      src = {
        row: 10,
        col: 4,
      },
      withMove = applyMoves(game, [
        src,
        {
          row: 11,
          col: 4,
        },
      ]);

    expect(getBoardSpace(withMove, src)?.piece).toBe(null);
  });

  it('removes a jumped piece', function () {
    const game = createEmptyGame(),
      withPieceToJump = updateBoardSpace(game, 11, 4, {
        piece: { type: PAWN, player: 'playerA' },
      }),
      src = {
        row: 10,
        col: 4,
      },
      withMove = applyMoves(withPieceToJump, [
        src,
        {
          row: 12,
          col: 4,
        },
      ]);

    expect(getBoardSpace(withMove, 11, 4)).toHaveProperty('piece', null);
  });

  it('applies a chain with three moves', function () {
    const game = createEmptyGame(),
      withPieceToJump = updateBoardSpace(game, 4, 5, {
        piece: { type: PAWN, player: 'playerB' },
      }),
      withSecondPieceToJump = updateBoardSpace(withPieceToJump, 3, 6, {
        piece: { type: PAWN, player: 'playerB' },
      }),
      moves = [
        {
          row: 5,
          col: 5,
        },
        {
          row: 3,
          col: 5,
        },
        {
          row: 3,
          col: 7,
        },
      ],
      afterApplyingMove = applyMoves(withSecondPieceToJump, moves);

    expect(getBoardSpace(afterApplyingMove, 3, 7)).toHaveProperty('piece');
    expect(getBoardSpace(afterApplyingMove, 3, 7)?.piece).toEqual({
      type: 'pawn',
      player: 'playerA',
    });
  });

  it('updates the turn count', function () {
    const game = createEmptyGame(),
      dest = {
        row: 11,
        col: 4,
      },
      withMove = applyMoves(game, [
        {
          row: 10,
          col: 4,
        },
        dest,
      ]);

    expect(withMove).toHaveProperty('turnCount', 1);
  });

  it('throws an error when only one coordinate is provided', function () {
    const game = createEmptyGame();

    expect(function () {
      applyMoves(game, [{ row: 5, col: 5 }]);
    }).toThrow(/Cannot apply a single move/);
  });

  describe('captured pieces', function () {
    it('updates the captured pieces record when a pawn is captured', function () {
      const game = createEmptyGame(),
        withPieceToJump = updateBoardSpace(game, 11, 4, {
          piece: { type: 'pawn', player: 'playerA' },
        }),
        src = {
          row: 10,
          col: 4,
        },
        withMove = applyMoves(withPieceToJump, [
          src,
          {
            row: 12,
            col: 4,
          },
        ]);

      expect(withMove.capturedPieces.playerA.pawn).toBe(1);
    });

    it('updates the captured pieces record when a knight is captured', function () {
      const game = createEmptyGame(),
        withPieceToJump = updateBoardSpace(game, 11, 4, {
          piece: { type: 'knight', player: 'playerA' },
        }),
        src = {
          row: 10,
          col: 4,
        },
        withMove = applyMoves(withPieceToJump, [
          src,
          {
            row: 12,
            col: 4,
          },
        ]);

      expect(withMove.capturedPieces.playerA.knight).toBe(1);
    });

    it('updates the record when a knight and then a pawn are captured', function () {
      const game = createEmptyGame(),
        withKnightToJump = updateBoardSpace(game, 11, 4, {
          piece: { type: 'knight', player: 'playerA' },
        }),
        withPawnToJump = updateBoardSpace(withKnightToJump, 13, 4, {
          piece: { type: 'pawn', player: 'playerA' },
        }),
        withMove = applyMoves(withPawnToJump, [
          {
            row: 10,
            col: 4,
          },
          {
            row: 12,
            col: 4,
          },
          {
            row: 14,
            col: 4,
          },
        ]);

      expect(withMove.capturedPieces.playerA.knight).toBe(1);
      expect(withMove.capturedPieces.playerA.pawn).toBe(1);
    });
  });
});
