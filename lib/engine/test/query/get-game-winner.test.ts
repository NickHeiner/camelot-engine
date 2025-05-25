import createEmptyGame from '../../init/create-empty-game.js';
import _ from 'lodash';
import updateBoardSpace from '../../update/update-board-space.js';
import { PLAYER_A, PLAYER_B, PAWN, KNIGHT } from '../../constants.js';
import getAllBoardSpaces from '../../query/get-all-board-spaces.js';
import getGameWinner from '../../query/get-game-winner.js';
import type { GameState, Player, PieceType } from '../../types.js';

describe('get-game-winner', function () {
  it('should not say that anyone has won initially', function () {
    expect(getGameWinner(createEmptyGame())).toBe(undefined);
  });

  function withoutColorPieces(gameState: GameState, player: Player): GameState {
    return _.reduce(
      getAllBoardSpaces(gameState),
      function (gameStateAcc, boardSpace) {
        if (boardSpace.piece && boardSpace.piece.player === player) {
          return updateBoardSpace(
            gameStateAcc,
            boardSpace.row,
            boardSpace.col,
            { piece: undefined }
          );
        }
        return gameStateAcc;
      },
      gameState
    );
  }

  function addPiece(
    gameState: GameState,
    row: number,
    col: number,
    pieceType: PieceType,
    player: Player
  ): GameState {
    return updateBoardSpace(gameState, row, col, {
      piece: { type: pieceType, player },
    });
  }

  it('identifies playerB as the winner when playerA has fewer than two pieces', function () {
    const withoutWhitePieces = withoutColorPieces(createEmptyGame(), PLAYER_A);

    expect(getGameWinner(withoutWhitePieces)).toBe(PLAYER_B);
  });

  it('identifies playerA as the winner when playerB has fewer than two pieces', function () {
    const withoutWhitePieces = withoutColorPieces(createEmptyGame(), PLAYER_B);

    expect(getGameWinner(withoutWhitePieces)).toBe(PLAYER_A);
  });

  it('does not identify playerB as a winner when playerA has one piece in the goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(game, 0, 5, PAWN, PLAYER_B);

    expect(getGameWinner(gameWithOneInGoal)).toBe(undefined);
  });

  it('does not identify playerA as a winner when playerB has one piece in the goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(game, 15, 5, KNIGHT, PLAYER_A);

    expect(getGameWinner(gameWithOneInGoal)).toBe(undefined);
  });

  it('identifies playerB as the winner when it has entered the playerA goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(game, 0, 5, PAWN, PLAYER_B),
      gameWithTwoInGoal = addPiece(gameWithOneInGoal, 0, 6, PAWN, PLAYER_B);

    expect(getGameWinner(gameWithTwoInGoal)).toBe(PLAYER_B);
  });

  it('identifies playerA as the winner when it has entered the playerB goal', function () {
    const game = createEmptyGame(),
      gameWithOneInGoal = addPiece(game, 16, 5, PAWN, PLAYER_A),
      gameWithTwoInGoal = addPiece(gameWithOneInGoal, 16, 6, PAWN, PLAYER_A);

    expect(getGameWinner(gameWithTwoInGoal)).toBe(PLAYER_A);
  });
});
