
import { expect } from 'chai';
import camelotEngine from '..';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('camelot-engine', () => {

    describe('createEmptyGame', () => {

        it('should have turnCount = 0', () => {
            expect(camelotEngine().createEmptyGame()).to.have.property('turnCount', 0);
        });

        it('should have no captured pieces', () => {
            expect(camelotEngine().createEmptyGame().capturedPieces).to.deep.equal({
                playerA: {pawn: 0, knight: 0},
                playerB: {pawn: 0, knight: 0}
            });
        });

        it('should create board spaces', () => {
            expect(camelotEngine().createEmptyGame().boardSpaces).to.have.property('length', 172);
        });

    });

    describe('query', () => {

        it('exports isGoal', () => {
            expect(camelotEngine().query().isGoal).to.be.a('function');
        });
        
        it('exports isValidMove', () => {
            expect(camelotEngine().query().isValidMove).to.be.a('function');
        });

        it('exports getGameWinner', () => {
            expect(camelotEngine().query().getGameWinner).to.be.a('function');
        });

        it('exports getBoardSpace', () => {
            expect(camelotEngine().query().getBoardSpace).to.be.a('function');
        });

        it('exports getAllBoardSpaces', () => {
            expect(camelotEngine().query().getAllBoardSpaces).to.be.a('function');
        });

        it('exports getCoordsBetween', () => {
            expect(camelotEngine().query().getCoordsBetween).to.be.a('function');
        });

    });

    describe('update', () => {
        it('exports applyMoves', () => {
            expect(camelotEngine().update().applyMoves).to.be.a('function');
        });
    });

    describe('constants', () => {
        it('exports KNIGHT', () => {
            expect(camelotEngine().constants().KNIGHT).to.be.a('string');
        });

        it('exports PAWN', () => {
            expect(camelotEngine().constants().PAWN).to.be.a('string');
        });
    });

});