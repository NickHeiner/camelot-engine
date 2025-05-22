'use strict';

var camelotEngine = require('../..'),
    isGoal = require('./is-goal');

describe('isGoal', function() {

    function getGame() {
        return camelotEngine().createEmptyGame();
    }

    it('throws an error for invalid input', function() {
        expect(function() {
            isGoal('not game state', 3, 2);
        }).toThrow(/gameState must be an object representing the game state, but was/);
    });

    describe('false', function() {
        it('returns false when the board space does not exist', function() {
            expect(isGoal(getGame(), -2, 4)).toBe(false);
        });

        it('returns false when the board space is in the middle of the board', function() {
            expect(isGoal(getGame(), 14, 10)).toBe(false);
        });    

        it('returns false when the board space is next to the goal', function() {
            expect(isGoal(getGame(), 0, 4)).toBe(false);
        }); 
    });

    describe('true', function() {
        it('returns true when the board space is the goal in row = 0', function() {
            expect(isGoal(getGame(), 0, 5)).toBe(true);
        });

        it('returns true when the board space is the goal in row = MAX', function() {
            expect(isGoal(getGame(), 16, 5)).toBe(true);
        });
    });
});
