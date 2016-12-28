"use strict";
var RandomBoolean = (function () {
    function RandomBoolean() {
    }
    RandomBoolean.chance = function (chances, maxChances) {
        chances = chances >= 0 ? chances : 0;
        maxChances = maxChances >= 0 ? maxChances : 0;
        if (chances == 0 && maxChances == 0)
            return false;
        maxChances = Math.max(maxChances, chances);
        var start = (maxChances - chances) / 2;
        var end = start + chances;
        var hit = Math.random() * maxChances;
        return hit >= start && hit <= end;
    };
    RandomBoolean.nextBoolean = function () {
        return Math.random() * 100 < 50;
    };
    return RandomBoolean;
}());
exports.RandomBoolean = RandomBoolean;
//# sourceMappingURL=RandomBoolean.js.map