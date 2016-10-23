"use strict";
var _ = require('lodash');
var FloatConverter_1 = require('./FloatConverter');
var DoubleConverter = (function () {
    function DoubleConverter() {
    }
    DoubleConverter.toNullableLong = function (value) {
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    DoubleConverter.toLong = function (value) {
        return FloatConverter_1.FloatConverter.toFloat(value);
    };
    DoubleConverter.toLongWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    return DoubleConverter;
}());
exports.DoubleConverter = DoubleConverter;
//# sourceMappingURL=DoubleConverter.js.map