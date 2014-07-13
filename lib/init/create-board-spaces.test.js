'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    createBoardSpaces = require('./create-board-spaces');

describe('get-board-spaces', function() {

    it('should create 172 board spaces', function() {
        // TODO Is this the right number?
        expect(createBoardSpaces()).to.have.length(172);
    });

    it('should have 16 rows', function() {
        expect(_(createBoardSpaces()).pluck('row').unique().sortBy(_.identity).valueOf()).to.deep.equal(_.range(17));
    });

});
