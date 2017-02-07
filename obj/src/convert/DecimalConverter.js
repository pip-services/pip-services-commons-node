"use strict";
var _ = require('lodash');
var DoubleConverter_1 = require("./DoubleConverter");
var DecimalConverter = (function () {
    function DecimalConverter() {
    }
    DecimalConverter.toNullableDecimal = function (value) {
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    DecimalConverter.toDecimal = function (value) {
        return DoubleConverter_1.DoubleConverter.toDouble(value);
    };
    DecimalConverter.toDecimalWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    return DecimalConverter;
}());
exports.DecimalConverter = DecimalConverter;
//# sourceMappingURL=DecimalConverter.js.map