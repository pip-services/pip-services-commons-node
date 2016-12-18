"use strict";
var assert = require('chai').assert;
var DateTimeConverter_1 = require("../../src/convert/DateTimeConverter");
suite('DateTimeConverter', function () {
    test('To DateTime', function () {
        assert.equal(null, DateTimeConverter_1.DateTimeConverter.toNullableDateTime(null));
        assert.equal(new Date(1975, 3, 8).toString(), DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(null, new Date(1975, 3, 8)).toString());
        assert.equal(new Date(1975, 3, 8).toString(), DateTimeConverter_1.DateTimeConverter.toDateTime(new Date(1975, 3, 8)).toString());
        assert.equal(new Date(123456).toString(), DateTimeConverter_1.DateTimeConverter.toDateTime(123456).toString());
        assert.equal(new Date(1975, 3, 8).toString(), DateTimeConverter_1.DateTimeConverter.toDateTime('1975/04/08').toString());
        assert.equal(null, DateTimeConverter_1.DateTimeConverter.toNullableDateTime('XYZ'));
    });
});
//# sourceMappingURL=DateTimeConverter.test.js.map