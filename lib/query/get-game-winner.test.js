'use strict';

var expect = require('chai').expect,
    createEmptyGame = require('../init/create-empty-game'),
    getGameWinner = require('./get-game-winner');

describe('get-game-winner', function() {

    it('should not say that anyone has won initially', function() {
        expect(getGameWinner(createEmptyGame())).to.equal(null);
    });

    it('identifies black as the winner when white has fewer than two pieces');
    it('identifies white as the winner when black has fewer than two pieces');
    it('identifies black as the winner when it has entered the white goal');
    it('identifies white as the winner when it has entered the black goal');

});
