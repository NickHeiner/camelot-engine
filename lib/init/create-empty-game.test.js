'use strict';

var expect = require('chai').expect,
    getBoardSpace = require('../query/get-board-space'),
    createEmptyGame = require('./create-empty-game');

describe('create-empty-game.test', function() {

    it('should have a board space at 10, 3', function() {
        expect(getBoardSpace(createEmptyGame(), 10, 3)).to.be.ok;
    });

    it('should not have a board space at 0, 0', function() {
        expect(getBoardSpace(createEmptyGame(), 0, 0)).to.be.undefined;
    });

});