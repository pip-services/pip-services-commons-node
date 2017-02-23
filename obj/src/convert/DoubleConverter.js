"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var DoubleConverter = (function () {
    function DoubleConverter() {
    }
    DoubleConverter.toNullableDouble = function (value) {
        if (value == null)
            return null;
        if (_.isNumber(value))
            return value;
        if (_.isDate(value))
            return value.getTime();
        if (_.isBoolean(value))
            return value ? 1 : 0;
        var result = parseFloat(value);
        return isNaN(result) ? null : result;
    };
    DoubleConverter.toDouble = function (value) {
        return DoubleConverter.toDoubleWithDefault(value, 0);
    };
    DoubleConverter.toDoubleWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        var result = DoubleConverter.toNullableDouble(value);
        return result != null ? result : defaultValue;
    };
    return DoubleConverter;
}());
exports.DoubleConverter = DoubleConverter;
//# sourceMappingURL=DoubleConverter.js.map