'use strict';

var expect = require('chai').expect,
    getBoardSpace = require('./get-board-space'),
    createEmptyGame = require('../init/create-empty-game');

describe('get-board-space', function() {

    it('returns null for an invalid board space', function() {
        expect(getBoardSpace(createEmptyGame(), 10000, 20034)).to.equal(null);
    });

    it('allows a lookup by row and column', function() {
        expect(getBoardSpace(createEmptyGame(), 10, 4)).to.deep.equal({
            row: 10,
            col: 4,
            piece: 'pawn'
        });
    });

    it('allows a lookup by board space object', function() {
        expect(getBoardSpace(createEmptyGame(), {
            row: 9,
            col: 5
        })).to.deep.equal({
            row: 9,
            col: 5,
            piece: 'pawn'
        });
    });

});
