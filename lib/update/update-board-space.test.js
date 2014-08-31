'use strict';

var expect = require('chai').expect,
    updateBoardSpace = require('./update-board-space'),
    camelotEngine = require('../..')(),
    createEmptyGame = camelotEngine.createEmptyGame,
    getBoardSpace = camelotEngine.query().getBoardSpace;

describe('updateBoardSpace', function() {

    it('updates a board space', function() {
        var game = createEmptyGame(),
            piece = {type: 'pawn', player: 'playerB'},
            withPiece = updateBoardSpace(game, 11, 4, {piece: piece});

        expect(getBoardSpace(withPiece, 11, 4).piece).to.deep.equal(piece); 
    });

});
