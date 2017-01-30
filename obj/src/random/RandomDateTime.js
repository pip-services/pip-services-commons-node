"use strict";
var RandomInteger_1 = require("./RandomInteger");
var RandomDateTime = (function () {
    function RandomDateTime() {
    }
    RandomDateTime.nextDate = function (minYear, maxYear) {
        if (minYear === void 0) { minYear = null; }
        if (maxYear === void 0) { maxYear = null; }
        var currentYear = new Date().getFullYear();
        minYear = minYear == 0 || minYear == null ? currentYear - RandomInteger_1.RandomInteger.nextInteger(10) : minYear;
        maxYear = maxYear == 0 || maxYear == null ? currentYear : maxYear;
        var year = RandomInteger_1.RandomInteger.nextInteger(minYear, maxYear);
        var month = RandomInteger_1.RandomInteger.nextInteger(1, 13);
        var day = RandomInteger_1.RandomInteger.nextInteger(1, 32);
        if (month == 2)
            day = Math.min(28, day);
        else if (month == 4 || month == 6 || month == 9 || month == 11)
            day = Math.min(30, day);
        return new Date(year, month, day, 0, 0, 0, 0);
    };
    //    public static nextTime(): number {
    //        let hour = RandomInteger.nextInteger(0, 24);
    //        let min = RandomInteger.nextInteger(0, 60);
    //        let sec = RandomInteger.nextInteger(0, 60);
    //        let millis = RandomInteger.nextInteger(0, 1000);
    //        return ((hour * 60 + min) * 60 + sec) * 1000 + millis;
    //    }
    RandomDateTime.nextDateTime = function (minYear, maxYear) {
        if (minYear === void 0) { minYear = null; }
        if (maxYear === void 0) { maxYear = null; }
        var time = RandomDateTime.nextDate(minYear, maxYear).valueOf()
            + RandomInteger_1.RandomInteger.nextInteger(3600 * 24 * 365);
        return new Date(time);
    };
    RandomDateTime.updateDateTime = function (value, range) {
        if (range === void 0) { range = null; }
        range = range != 0 && range != null ? range : 10;
        if (range < 0)
            return value;
        // Days to milliseconds
        range = range * 24 * 3600000;
        var time = value.valueOf() + RandomInteger_1.RandomInteger.nextInteger(-range, range);
        return new Date(time);
    };
    return RandomDateTime;
}());
exports.RandomDateTime = RandomDateTime;
//# sourceMappingURL=RandomDateTime.js.map