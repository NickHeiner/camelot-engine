import _ from 'lodash';
import { createEmptyGame, getBoardSpace } from '../../camelot-engine.js';
import { KNIGHT, PAWN } from '../../constants.js';

describe('with-starting-pieces', function () {
  it('creates a board with the right number of knights', function () {
    const gameState = createEmptyGame();
    expect(
      _.filter(gameState.boardSpaces, function (boardSpace) {
        return boardSpace.piece && boardSpace.piece.type === KNIGHT;
      }).length
    ).toBe(8);
  });

  it('creates a board with the right number of pawns', function () {
    const gameState = createEmptyGame();
    expect(
      _.filter(gameState.boardSpaces, function (boardSpace) {
        return boardSpace.piece && boardSpace.piece.type === PAWN;
      }).length
    ).toBe(20);
  });

  it('should not have a piece at (5, 1)', function () {
    const gameState = createEmptyGame();
    const boardSpace = getBoardSpace(gameState, 5, 1);
    expect(boardSpace?.piece).toBeUndefined();
  });

  it('should not have a piece at (5, 2)', function () {
    const gameState = createEmptyGame();
    const boardSpace = getBoardSpace(gameState, 5, 2);
    expect(boardSpace?.piece).toEqual({
      type: 'knight',
      player: 'playerA',
    });
  });

  it('should have a piece at (5, 3)', function () {
    const gameState = createEmptyGame();
    const boardSpace = getBoardSpace(gameState, 5, 3);
    expect(boardSpace?.piece).toEqual({
      type: 'pawn',
      player: 'playerA',
    });
  });
});
