"use strict";
var assert = require('chai').assert;
var RandomDateTime_1 = require("../../src/random/RandomDateTime");
suite('RandomDateTime', function () {
    test('Next Date', function () {
        var date = RandomDateTime_1.RandomDateTime.nextDate(2015, 2016);
        assert.isTrue(date.getFullYear() == 2015 || date.getFullYear() == 2016);
        date = RandomDateTime_1.RandomDateTime.nextDate(0, 0);
        assert.isTrue(date.getFullYear() >= new Date().getFullYear() - 10
            && date.getFullYear() <= new Date().getFullYear());
        date = RandomDateTime_1.RandomDateTime.nextDate();
        assert.isTrue(date.getFullYear() >= new Date().getFullYear() - 10
            && date.getFullYear() <= new Date().getFullYear());
    });
    test('Update Date Time', function () {
        var oldDate = new Date(2016, 10, 10, 0, 0, 0, 0);
        var date = RandomDateTime_1.RandomDateTime.updateDateTime(oldDate);
        assert.isTrue(date.getTime() >= oldDate.getTime() - 10 * 24 * 3600000
            || date.getTime() >= oldDate.getTime() + 10 * 24 * 3600000);
        date = RandomDateTime_1.RandomDateTime.updateDateTime(oldDate, 3);
        assert.isTrue(date.getTime() >= oldDate.getTime() - 3 * 24 * 3600000
            || date.getTime() >= oldDate.getTime() + 3 * 24 * 3600000);
        date = RandomDateTime_1.RandomDateTime.updateDateTime(oldDate, -3);
        assert.isTrue(date.getTime() == oldDate.getTime());
    });
});
//# sourceMappingURL=RandomDateTime.test.js.map