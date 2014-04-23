'use strict';

var expect = require('chai').expect,
    mori = require('mori'),
    createBoardSpaces = require('./create-board-spaces');

describe('create-board-spaces.test.js', function() {

    it('should create 160 board spaces', function() {
        expect(mori.count(createBoardSpaces())).to.equal(160);
    });

});
