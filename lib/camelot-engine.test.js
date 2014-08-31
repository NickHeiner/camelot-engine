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

        it('exports isGoal', function() {
            expect(camelotEngine().query().isGoal).to.be.a('function');
        });
        
        it('exports isValidMove', function() {
            expect(camelotEngine().query().isValidMove).to.be.a('function');
        });

        it('exports getGameWinner', function() {
            expect(camelotEngine().query().getGameWinner).to.be.a('function');
        });

        it('exports getBoardSpace', function() {
            expect(camelotEngine().query().getBoardSpace).to.be.a('function');
        });

        it('exports getAllBoardSpaces', function() {
            expect(camelotEngine().query().getAllBoardSpaces).to.be.a('function');
        });

        it('exports getCoordsBetween', function() {
            expect(camelotEngine().query().getCoordsBetween).to.be.a('function');
        });

    });

    describe('update', function() {
        it('exports applyMoves', function() {
            expect(camelotEngine().update().applyMoves).to.be.a('function');
        });
    });

    describe('constants', function() {
        it('exports KNIGHT', function() {
            expect(camelotEngine().constants().KNIGHT).to.be.a('string');
        });

        it('exports PAWN', function() {
            expect(camelotEngine().constants().PAWN).to.be.a('string');
        });
    });

});
