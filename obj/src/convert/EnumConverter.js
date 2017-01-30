"use strict";
var _ = require('lodash');
var EnumConverter = (function () {
    function EnumConverter() {
    }
    EnumConverter.toNullableEnum = function (value) {
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
    EnumConverter.toEnum = function (value) {
        return EnumConverter.toEnumWithDefault(value, 0);
    };
    EnumConverter.toEnumWithDefault = function (value, defaultValue) {
        var result = EnumConverter.toNullableEnum(value);
        return result == null ? defaultValue : result;
    };
    return EnumConverter;
}());
exports.EnumConverter = EnumConverter;
//# sourceMappingURL=EnumConverter.js.map