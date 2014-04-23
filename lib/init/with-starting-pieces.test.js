'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    mori = require('mori'),
    constants = require('../constants'),
    createEmptyGame = require('./create-empty-game');

describe('with-starting-pieces.test', function() {

    it('creates a board with the right number of knights', function() {
        var gameState = createEmptyGame();
        expect(mori.pipeline(
            mori.filter(function(boardSpace) {
                return boardSpace.piece === mori.get(constants, 'KNIGHT');
            }, gameState),
            mori.count
        )).to.equal(8);
    });

    it('creates a board with the right number of pawns', function() {
        var gameState = createEmptyGame();
        expect(mori.pipeline(
            mori.filter(function(boardSpace) {
                return boardSpace.piece === mori.get(constants, 'PAWN');
            }, gameState),
            mori.count
        )).to.equal(20);
    });

});
