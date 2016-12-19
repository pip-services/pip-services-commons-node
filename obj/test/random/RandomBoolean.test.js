"use strict";
var assert = require('chai').assert;
var RandomBoolean_1 = require("../../src/random/RandomBoolean");
suite('RandomBoolean', function () {
    test('Chance', function () {
        var value = RandomBoolean_1.RandomBoolean.chance(5, 10);
        assert.isTrue(value || !value);
        value = RandomBoolean_1.RandomBoolean.chance(5, 5);
        assert.isTrue(value || !value);
        value = RandomBoolean_1.RandomBoolean.chance(0, 0);
        assert.isTrue(!value);
        value = RandomBoolean_1.RandomBoolean.chance(-1, 0);
        assert.isTrue(!value);
        value = RandomBoolean_1.RandomBoolean.chance(-1, -1);
        assert.isTrue(!value);
    });
});
//# sourceMappingURL=RandomBoolean.test.js.map