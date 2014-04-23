'use strict';

var expect = require('chai').expect,
    mori = require('mori'),
    _ = require('lodash'),
    constants = require('../constants'),
    createEmptyGame = require('./create-empty-game');

describe('with-starting-pieces.test', function() {

    function expectPieceCountToBe(pieceType, expectedCount) {
        var gameState = createEmptyGame(),
            count = mori.pipeline(

                mori.get(gameState, 'boardSpaces'),
                mori.partial(mori.filter, function(boardSpace) {
                    return mori.get(boardSpace, 'piece') === pieceType;
                }),
                mori.count

            );

        // This fails the timeout, even though `count` is correct. wtf?
        expect(count).to.equal(expectedCount);
    }

    it('creates a board with the right number of knights', mori.partial(
        expectPieceCountToBe,
        mori.get(constants, 'KNIGHT'),
        8
    ));

    it('creates a board with the right number of pawns', mori.partial(
        expectPieceCountToBe,
        mori.get(constants, 'PAWN'),
        20
    ));

});
