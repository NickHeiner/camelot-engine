'use strict';

var expect = require('chai').expect,
    isValidMove = require('./is-valid-move'),
    createEmptyGame = require('../init/create-empty-game');

describe('is-valid-move', function() {

    it('empty moves are valid', function() {
        expect(isValidMove(createEmptyGame(), [])).to.equal(true);
    });

    it('does not allow moves that do not start on a valid space', function() {
        expect(isValidMove(createEmptyGame(), [{
            row: 9933,
            col: 232
        }, {
            row: 234,
            col: 49
        }])).to.equal(false);
    });

    it('does not allow moves that do not start on a space containing a piece', function() {
        expect(isValidMove(createEmptyGame(), [{
            row: 6,
            col: 1
        },
        {
            row: 6,
            col: 2
        }])).to.equal(false);
    });

    it('allows a piece to move into an empty space', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 6,
                col: 4
            },
            {
                row: 7,
                col: 4
            }
        ])).to.equal(true);
    });

    it('allows a piece to jump over its own pieces', function() {
        var game = createEmptyGame();
        expect(isValidMove(game, [
            {
                row: 5,
                col: 6
            },
            {
                row: 7,
                col: 6
            }
        ])).to.equal(true);
    });

});
