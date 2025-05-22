'use strict';

const createEmptyGame = require('../../lib/init/create-empty-game'),
  _ = require('lodash'),
  updateBoardSpace = require('../../lib/update/update-board-space'),
  constants = require('../../lib/get-constants')(),
  getAllBoardSpaces = require('../../lib/query/get-all-board-spaces'),
  getGameWinner = require('../../lib/query/get-game-winner');

describe('get-game-winner', function () {
  it('should not say that anyone has won initially', function () {
    expect(getGameWinner(createEmptyGame())).toBe(null);
  });

  function withoutColorPieces(gameState, player) {
    return _.reduce(
      getAllBoardSpaces(gameState),
      function (gameStateAcc, boardSpace) {
        if (boardSpace.piece && boardSpace.piece.player === player) {
          return updateBoardSpace(
            gameStateAcc,
            boardSpace.row,
            boardSpace.col,
            { piece: null }
          );
        }
        return gameStateAcc;
      },
      gameState
    );
  }

  function addPiece(gameState, row, col, piece, player) {
    return updateBoardSpace(gameState, row, col, { piece, player });
  }

  it('identifies playerB as the winner when playerA has fewer than two pieces', function () {
    const withoutWhitePieces = withoutColorPieces(
      createEmptyGame(),
      constants.PLAYER_A
    );

    expect(getGameWinner(withoutWhitePieces)).toBe(constants.PLAYER_B);
  });

  it('identifies playerA as the winner when playerB has fewer than two pieces', function () {
    const withoutWhitePieces = withoutColorPieces(
      createEmptyGame(),
      constants.PLAYER_B
    );

    expect(getGameWinner(withoutWhitePieces)).toBe(constants.PLAYER_A);
  });

  it('does not identify playerB as a winner when playerA has one piece in the goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(
        game,
        0,
        5,
        constants.PAWN,
        constants.PLAYER_B
      );

    expect(getGameWinner(gameWithOneInGoal)).toBe(null);
  });

  it('does not identify playerA as a winner when playerB has one piece in the goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(
        game,
        15,
        5,
        constants.KNIGHT,
        constants.PLAYER_A
      );

    expect(getGameWinner(gameWithOneInGoal)).toBe(null);
  });

  it('identifies playerB as the winner when it has entered the playerA goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(
        game,
        0,
        5,
        constants.PAWN,
        constants.PLAYER_B
      ),
      gameWithTwoInGoal = addPiece(
        gameWithOneInGoal,
        0,
        6,
        constants.PAWN,
        constants.PLAYER_B
      );

    expect(getGameWinner(gameWithTwoInGoal)).toBe(constants.PLAYER_B);
  });

  it('identifies playerA as the winner when it has entered the playerB goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(
        game,
        16,
        5,
        constants.PAWN,
        constants.PLAYER_A
      ),
      gameWithTwoInGoal = addPiece(
        gameWithOneInGoal,
        16,
        6,
        constants.PAWN,
        constants.PLAYER_A
      );

    expect(getGameWinner(gameWithTwoInGoal)).toBe(constants.PLAYER_A);
  });
});
