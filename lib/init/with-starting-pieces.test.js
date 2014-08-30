'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    constants = require('../get-constants')(),
    createEmptyGame = require('./create-empty-game');

describe('with-starting-pieces', function() {

    it('creates a board with the right number of knights', function() {
        var gameState = createEmptyGame();
        expect(_.filter(gameState.boardSpaces, function(boardSpace) {
            return boardSpace.piece && boardSpace.piece.type === constants.KNIGHT;
        }).length).to.equal(8);
    });

    it('creates a board with the right number of pawns', function() {
        var gameState = createEmptyGame();
        expect(_.filter(gameState.boardSpaces, function(boardSpace) {
            return boardSpace.piece && boardSpace.piece.type === constants.PAWN;
        }).length).to.equal(20);
    });

});
