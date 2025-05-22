'use strict';

const updateBoardSpace = require('./update-board-space'),
  camelotEngine = require('../..')(),
  createEmptyGame = camelotEngine.createEmptyGame,
  getBoardSpace = camelotEngine.query().getBoardSpace;

describe('updateBoardSpace', function() {

  it('updates a board space', function() {
    const game = createEmptyGame(),
      piece = {type: 'pawn', player: 'playerB'},
      withPiece = updateBoardSpace(game, 11, 4, {piece});

    expect(getBoardSpace(withPiece, 11, 4).piece).toEqual(piece); 
  });

});
