'use strict';

var expect = require('chai').expect,
    getBoardSpaces = require('./get-board-spaces');

describe('get-board-spaces.test.js', function() {

    it('should create 160 board spaces', function() {
        expect(getBoardSpaces()).to.have.length(160);
    });

});
