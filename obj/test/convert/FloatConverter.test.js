"use strict";
var assert = require('chai').assert;
var FloatConverter_1 = require("../../src/convert/FloatConverter");
suite('FloatConverter', function () {
    test('To Float', function () {
        assert.equal(123, FloatConverter_1.FloatConverter.toFloat(123));
        assert.equal(123.456, FloatConverter_1.FloatConverter.toFloat(123.456));
        assert.equal(123.456, FloatConverter_1.FloatConverter.toFloat('123.456'));
        assert.equal(123, FloatConverter_1.FloatConverter.toFloat(new Date(123)));
        assert.equal(123, FloatConverter_1.FloatConverter.toFloatWithDefault(null, 123));
        assert.equal(0, FloatConverter_1.FloatConverter.toFloatWithDefault(false, 123));
        assert.equal(123, FloatConverter_1.FloatConverter.toFloatWithDefault('ABC', 123));
    });
});
//# sourceMappingURL=FloatConverter.test.js.map