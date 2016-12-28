"use strict";
var assert = require('chai').assert;
var RandomArray_1 = require("../../src/random/RandomArray");
suite('RandomArray', function () {
    test('Pick', function () {
        var listEmpty = [];
        var value = RandomArray_1.RandomArray.pick(listEmpty);
        assert.isTrue(value == null);
        var array = [1, 2];
        value = RandomArray_1.RandomArray.pick(array);
        assert.isTrue(value == 1 || value == 2);
        var list = [];
        assert.isNull(RandomArray_1.RandomArray.pick(list));
        list = [1, 2];
        value = RandomArray_1.RandomArray.pick(array);
        assert.isTrue(value == 1 || value == 2);
    });
});
//# sourceMappingURL=RandomArray.test.js.map