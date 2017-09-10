"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var DateTimeConverter = /** @class */ (function () {
    function DateTimeConverter() {
    }
    DateTimeConverter.toNullableDateTime = function (value) {
        if (value == null)
            return null;
        if (_.isDate(value))
            return value;
        if (_.isNumber(value))
            return new Date(value);
        var result = Date.parse(value);
        return isNaN(result) ? null : new Date(result);
    };
    DateTimeConverter.toDateTime = function (value) {
        return DateTimeConverter.toDateTimeWithDefault(value, new Date());
    };
    DateTimeConverter.toDateTimeWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var result = DateTimeConverter.toNullableDateTime(value);
        return result != null ? result : defaultValue;
    };
    return DateTimeConverter;
}());
exports.DateTimeConverter = DateTimeConverter;
//# sourceMappingURL=DateTimeConverter.js.map