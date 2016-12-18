"use strict";
var assert = require('chai').assert;
var IntegerConverter_1 = require("../../src/convert/IntegerConverter");
suite('IntegerConverter', function () {
    test('To Integer', function () {
        assert.equal(123, IntegerConverter_1.IntegerConverter.toInteger(123));
        assert.equal(124, IntegerConverter_1.IntegerConverter.toInteger(123.456));
        assert.equal(123, IntegerConverter_1.IntegerConverter.toInteger('123'));
        assert.equal(123, IntegerConverter_1.IntegerConverter.toInteger(new Date(123)));
        assert.equal(123, IntegerConverter_1.IntegerConverter.toIntegerWithDefault(null, 123));
        assert.equal(0, IntegerConverter_1.IntegerConverter.toIntegerWithDefault(false, 123));
        assert.equal(123, IntegerConverter_1.IntegerConverter.toIntegerWithDefault('ABC', 123));
    });
});
//# sourceMappingURL=IntegerConverter.test.js.map