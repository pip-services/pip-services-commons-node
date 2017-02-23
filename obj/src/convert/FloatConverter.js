"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var DoubleConverter_1 = require("./DoubleConverter");
var FloatConverter = (function () {
    function FloatConverter() {
    }
    FloatConverter.toNullableFloat = function (value) {
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    FloatConverter.toFloat = function (value) {
        return DoubleConverter_1.DoubleConverter.toDouble(value);
    };
    FloatConverter.toFloatWithDefault = function (value, defaultValue) {
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    return FloatConverter;
}());
exports.FloatConverter = FloatConverter;
//# sourceMappingURL=FloatConverter.js.map