"use strict";
var assert = require('chai').assert;
var RandomFloat_1 = require("../../src/random/RandomFloat");
suite('RandomFloat', function () {
    test('Next Float', function () {
        var value = RandomFloat_1.RandomFloat.nextFloat(5);
        assert.isTrue(value <= 5);
        value = RandomFloat_1.RandomFloat.nextFloat(2, 5);
        assert.isTrue(value <= 5 && value >= 2);
    });
    test('Update Float', function () {
        var value = RandomFloat_1.RandomFloat.updateFloat(0, 5);
        assert.isTrue(value <= 5 && value >= -5);
        value = RandomFloat_1.RandomFloat.updateFloat(5, 0);
        value = RandomFloat_1.RandomFloat.updateFloat(0);
        assert.isTrue(value == 0);
    });
});
//# sourceMappingURL=RandomFloat.test.js.map