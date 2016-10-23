"use strict";
var _ = require('lodash');
var IntegerConverter = (function () {
    function IntegerConverter() {
    }
    IntegerConverter.toNullableInteger = function (value) {
        if (value == null)
            return null;
        if (_.isNumber(value))
            return Math.ceil(value);
        if (_.isDate(value))
            return value.getTime();
        if (_.isBoolean(value))
            return value ? 1 : 0;
        var result = parseInt(value);
        return isNaN(result) ? null : result;
    };
    IntegerConverter.toInteger = function (value) {
        return IntegerConverter.toIntegerWithDefault(value, 0);
    };
    IntegerConverter.toIntegerWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        var result = IntegerConverter.toNullableInteger(value);
        return result != null ? result : defaultValue;
    };
    return IntegerConverter;
}());
exports.IntegerConverter = IntegerConverter;
//# sourceMappingURL=IntegerConverter.js.map