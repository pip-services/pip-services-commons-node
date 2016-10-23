"use strict";
var _ = require('lodash');
var FloatConverter = (function () {
    function FloatConverter() {
    }
    FloatConverter.toNullableFloat = function (value) {
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
    FloatConverter.toFloat = function (value) {
        return FloatConverter.toFloatWithDefault(value, 0);
    };
    FloatConverter.toFloatWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        var result = FloatConverter.toNullableFloat(value);
        return result != null ? result : defaultValue;
    };
    return FloatConverter;
}());
exports.FloatConverter = FloatConverter;
//# sourceMappingURL=FloatConverter.js.map