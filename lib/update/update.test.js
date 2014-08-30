'use strict';

var expect = require('chai').expect,
    update = require('./update');

describe('update', function() {

    it('exports applyMoves', function() {
        expect(update().applyMoves).to.be.a('function');
    });

});
