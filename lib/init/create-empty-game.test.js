'use strict';

var expect = require('chai').expect,
    getBoardSpace = require('../query/get-board-space'),
    createEmptyGame = require('./create-empty-game');

describe('create-empty-game', function() {

    it('should have a board space at 10, 3', function() {
        expect(getBoardSpace(createEmptyGame(), 10, 3)).to.deep.equal({
            row: 10,
            col: 3,
            piece: {
                type: 'pawn',
                player: 'playerB'
            }
        });
    });

    it('should not have a board space at 0, 0', function() {
        expect(getBoardSpace(createEmptyGame(), 0, 0)).to.equal(null);
    });

    it('should start with turnCount = 0', function() {
        expect(createEmptyGame()).to.have.property('turnCount', 0);
    });

    it('should include a captured pieces record', function() {
        expect(createEmptyGame()).to.have.property('capturedPieces').that.deep.equals({
            playerA: {
                pawn: 0,
                knight: 0
            },
            playerB: {
                pawn: 0,
                knight: 0
            }
        });
    });

});
