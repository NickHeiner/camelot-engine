'use strict';

var expect = require('chai').expect,
    createBoardSpaces = require('./create-board-spaces');

describe('get-board-spaces.test.js', function() {

    it('should create 160 board spaces', function() {
        expect(createBoardSpaces()).to.have.length(160);
    });

});
