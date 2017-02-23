"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var LongConverter = (function () {
    function LongConverter() {
    }
    LongConverter.toNullableLong = function (value) {
        if (value == null)
            return null;
        if (_.isNumber(value))
            return Math.ceil(value);
        if (_.isDate(value))
            return value.getTime();
        if (_.isBoolean(value))
            return value ? 1 : 0;
        var result = parseFloat(value);
        return isNaN(result) ? null : Math.ceil(result);
    };
    LongConverter.toLong = function (value) {
        return LongConverter.toLongWithDefault(value, 0);
    };
    LongConverter.toLongWithDefault = function (value, defaultValue) {
        var result = LongConverter.toNullableLong(value);
        return result != null ? result : defaultValue;
    };
    return LongConverter;
}());
exports.LongConverter = LongConverter;
//# sourceMappingURL=LongConverter.js.map