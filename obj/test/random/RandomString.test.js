"use strict";
var assert = require('chai').assert;
var RandomString_1 = require("../../src/random/RandomString");
suite('RandomString', function () {
    var symbols = "_,.:-/.[].{},#-!,$=%.+^.&*-() ";
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digits = "01234956789";
    test('Pick', function () {
        assert.isTrue(RandomString_1.RandomString.pickChar("") == '');
        var charVariable = RandomString_1.RandomString.pickChar(chars);
        assert.isTrue(chars.indexOf(charVariable) != -1);
        var valuesEmpty = [];
        assert.isTrue(RandomString_1.RandomString.pick(valuesEmpty) == "");
        var values = ["ab", "cd"];
        var result = RandomString_1.RandomString.pick(values);
        assert.isTrue(result == "ab" || result == "cd");
    });
    test('Distort', function () {
        var value = RandomString_1.RandomString.distort("abc");
        assert.isTrue(value.length == 3 || value.length == 4);
        assert.isTrue(value.substring(0, 3) == "Abc"
            || value.substring(0, 3) == "abc");
        if (value.length == 4)
            assert.isTrue(symbols.indexOf(value.substring(3)) != -1);
    });
    test('Next Alpha Char', function () {
        assert.isTrue(chars.indexOf(RandomString_1.RandomString.nextAlphaChar()) != -1);
    });
    test('Next String', function () {
        var value = RandomString_1.RandomString.nextString(3, 5);
        assert.isTrue(value.length <= 5 && value.length >= 3);
        for (var i = 0; i < value.length; i++) {
            assert.isTrue(chars.indexOf(value.charAt(i)) != -1
                || symbols.indexOf(value.charAt(i)) != -1
                || digits.indexOf(value.charAt(i)) != -1);
        }
    });
});
//# sourceMappingURL=RandomString.test.js.map