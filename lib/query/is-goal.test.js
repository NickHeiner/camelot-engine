'use strict';

var expect = require('chai').expect,
    isGoal = require('./is-goal');

describe('isGoal', function() {

    it('returns false when the board space does not exist', function() {
        expect(isGoal(-2, 4)).to.equal(false);  
    });

    it('returns false when the board space is in the middle of the board', function() {
        expect(isGoal(14, 10)).to.equal(false);  
    });

});
