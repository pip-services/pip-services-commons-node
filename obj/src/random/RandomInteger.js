"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RandomInteger = /** @class */ (function () {
    function RandomInteger() {
    }
    RandomInteger.nextInteger = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = 0;
        }
        if (max - min <= 0)
            return min;
        return Math.floor(min + Math.random() * (max - min));
    };
    RandomInteger.updateInteger = function (value, range) {
        if (range === void 0) { range = null; }
        if (range == null)
            range = 0;
        range = range == 0 ? Math.floor(0.1 * value) : range;
        var minValue = value - range;
        var maxValue = value + range;
        return RandomInteger.nextInteger(minValue, maxValue);
    };
    RandomInteger.sequence = function (min, max) {
        if (max === void 0) { max = null; }
        max = max != null ? max : min;
        var count = RandomInteger.nextInteger(min, max);
        var result = [];
        for (var i = 0; i < count; i++)
            result.push(i);
        return result;
    };
    return RandomInteger;
}());
exports.RandomInteger = RandomInteger;
//# sourceMappingURL=RandomInteger.js.map