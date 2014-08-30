'use strict';

var expect = require('chai').expect,
    camelotEngine = require('..');

describe('camelot-engine', function() {

    describe('createEmptyGame', function() {

        it('should have turnCount = 0', function() {
            expect(camelotEngine().createEmptyGame()).to.have.property('turnCount', 0);
        });

        it('should have no captured pieces', function() {
            expect(camelotEngine().createEmptyGame().capturedPieces).to.deep.equal({
                playerA: {small: 0, large: 0},
                playerB: {small: 0, large: 0}
            });
        });

        it('should create board spaces', function() {
            expect(camelotEngine().createEmptyGame().boardSpaces).to.have.property('length', 172);
        });

    });

    describe('query', function() {

        it('exports isGoal');
        it('exports getPiece');
        it('exports isValidMove');
        it('exports getBoardSpace');

    });

});
