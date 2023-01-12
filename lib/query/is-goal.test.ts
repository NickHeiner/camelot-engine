
import { expect } from 'chai';
import camelotEngine from '../..';
import isGoal from './is-goal';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('isGoal', () => {

    function getGame(): GameState {
        return camelotEngine().createEmptyGame();
    }

    it('throws an error for invalid input', () => {
        expect(() => {
            isGoal('not game state' as unknown as GameState, 3, 2);
        }).to.throw(/gameState must be an object representing the game state, but was/);
    });

    describe('false', () => {
        it('returns false when the board space does not exist', () => {
            expect(isGoal(getGame(), -2, 4)).to.equal(false);  
        });

        it('returns false when the board space is in the middle of the board', () => {
            expect(isGoal(getGame(), 14, 10)).to.equal(false);  
        });    

        it('returns false when the board space is next to the goal', () => {
            expect(isGoal(getGame(), 0, 4)).to.equal(false);  
        }); 
    });

    describe('true', () => {
        it('returns true when the board space is the goal in row = 0', () => {
            expect(isGoal(getGame(), 0, 5)).to.equal(true);  
        });

        it('returns true when the board space is the goal in row = MAX', () => {
            expect(isGoal(getGame(), 16, 5)).to.equal(true);  
        });
    });
});