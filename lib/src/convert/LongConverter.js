"use strict";
var _ = require('lodash');
var IntegerConverter_1 = require('./IntegerConverter');
var LongConverter = (function () {
    function LongConverter() {
    }
    LongConverter.toNullableLong = function (value) {
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    LongConverter.toLong = function (value) {
        return IntegerConverter_1.IntegerConverter.toInteger(value);
    };
    LongConverter.toLongWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    return LongConverter;
}());
exports.LongConverter = LongConverter;
//# sourceMappingURL=LongConverter.js.map