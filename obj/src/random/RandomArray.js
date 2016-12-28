"use strict";
var RandomInteger_1 = require("./RandomInteger");
var RandomArray = (function () {
    function RandomArray() {
    }
    RandomArray.pick = function (values) {
        if (values == null || values.length == 0)
            return null;
        return values[RandomInteger_1.RandomInteger.nextInteger(values.length)];
    };
    return RandomArray;
}());
exports.RandomArray = RandomArray;
//# sourceMappingURL=RandomArray.js.map