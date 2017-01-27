"use strict";
var RandomInteger_1 = require("./RandomInteger");
var RandomBoolean_1 = require("./RandomBoolean");
var RandomString = (function () {
    function RandomString() {
    }
    RandomString.pickChar = function (values) {
        if (values == null || values.length == 0)
            return '';
        var index = RandomInteger_1.RandomInteger.nextInteger(values.length);
        return values.charAt(index);
    };
    RandomString.pick = function (values) {
        if (values == null || values.length == 0)
            return '';
        var index = RandomInteger_1.RandomInteger.nextInteger(values.length);
        return values[index];
    };
    RandomString.distort = function (value) {
        value = value.toLowerCase();
        if (RandomBoolean_1.RandomBoolean.chance(1, 5))
            value = value.substring(0, 1).toUpperCase() + value.substring(1);
        if (RandomBoolean_1.RandomBoolean.chance(1, 3))
            value = value + RandomString.pickChar(RandomString._symbols);
        return value;
    };
    RandomString.nextAlphaChar = function () {
        var index = RandomInteger_1.RandomInteger.nextInteger(RandomString._alpha.length);
        return RandomString._alpha.charAt(index);
    };
    RandomString.nextString = function (minLength, maxLength) {
        var result = '';
        var length = RandomInteger_1.RandomInteger.nextInteger(minLength, maxLength);
        for (var i = 0; i < length; i++) {
            var index = RandomInteger_1.RandomInteger.nextInteger(RandomString._chars.length);
            result += RandomString._chars.charAt(index);
        }
        return result;
    };
    return RandomString;
}());
RandomString._digits = "01234956789";
RandomString._symbols = "_,.:-/.[].{},#-!,$=%.+^.&*-() ";
RandomString._alphaLower = "abcdefghijklmnopqrstuvwxyz";
RandomString._alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
RandomString._alpha = RandomString._alphaUpper + RandomString._alphaLower;
RandomString._chars = RandomString._alpha + RandomString._digits + RandomString._symbols;
exports.RandomString = RandomString;
//# sourceMappingURL=RandomString.js.map