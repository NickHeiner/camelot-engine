
import { expect } from 'chai';
import _ from 'lodash';
import camelotEngine from '../..';

const { constants, query, createEmptyGame } = camelotEngine();

describe('with-starting-pieces', () => {

    it('creates a board with the right number of knights', () => {
        const gameState = createEmptyGame();
        expect(_.filter(gameState.boardSpaces, (boardSpace) => {
            return boardSpace.piece && boardSpace.piece.type === constants.KNIGHT;
        }).length).to.equal(8);
    });

    it('creates a board with the right number of pawns', () => {
        const gameState = createEmptyGame();
        expect(_.filter(gameState.boardSpaces, (boardSpace) => {
            return boardSpace.piece && boardSpace.piece.type === constants.PAWN;
        }).length).to.equal(20);
    });

    it('should not have a piece at (5, 1)', () => {
        const gameState = createEmptyGame();
        expect(query.getBoardSpace(gameState, 5, 1).piece).to.not.be.an('object');
    });

    it('should not have a piece at (5, 2)', () => {
        const gameState = createEmptyGame();
        expect(query.getBoardSpace(gameState, 5, 2).piece).to.deep.equal({
            type: 'knight',
            player: 'playerA'
        });
    });

    it('should have a piece at (5, 3)', () => {
        const gameState = createEmptyGame();
        expect(query.getBoardSpace(gameState, 5, 3).piece).to.deep.equal({
            type: 'pawn',
            player: 'playerA'
        });
    });

});