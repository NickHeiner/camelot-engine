'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    newObj = require('./new-obj');

describe('newObj', function() {

    it('returns a new object', function() {
        expect(newObj('foo', 3)).to.deep.equal({foo: 3});
    });

});
