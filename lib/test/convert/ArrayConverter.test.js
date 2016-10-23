"use strict";
var assert = require('chai').assert;
var ArrayConverter_1 = require('../../src/convert/ArrayConverter');
suite('ArrayConverter', function () {
    test('To Array', function () {
        var value = ArrayConverter_1.ArrayConverter.listToArray(null);
        assert.isArray(value);
        assert.lengthOf(value, 0);
        value = ArrayConverter_1.ArrayConverter.listToArray(123);
        assert.isArray(value);
        assert.lengthOf(value, 1);
        assert.equal(123, value[0]);
        value = ArrayConverter_1.ArrayConverter.listToArray([123]);
        assert.isArray(value);
        assert.lengthOf(value, 1);
        assert.equal(123, value[0]);
        value = ArrayConverter_1.ArrayConverter.listToArray('123');
        assert.isArray(value);
        assert.lengthOf(value, 1);
        assert.equal('123', value[0]);
        value = ArrayConverter_1.ArrayConverter.listToArray('123,456');
        assert.isArray(value);
        assert.lengthOf(value, 2);
        assert.equal('123', value[0]);
        assert.equal('456', value[1]);
    });
});
//# sourceMappingURL=ArrayConverter.test.js.map