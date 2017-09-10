"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RandomDouble = /** @class */ (function () {
    function RandomDouble() {
    }
    RandomDouble.nextDouble = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = 0;
        }
        if (max - min <= 0)
            return min;
        return min + Math.random() * (max - min);
    };
    RandomDouble.updateDouble = function (value, range) {
        if (range === void 0) { range = null; }
        if (range == null)
            range = 0;
        range = range == 0 ? 0.1 * value : range;
        var minValue = value - range;
        var maxValue = value + range;
        return RandomDouble.nextDouble(minValue, maxValue);
    };
    return RandomDouble;
}());
exports.RandomDouble = RandomDouble;
//# sourceMappingURL=RandomDouble.js.map