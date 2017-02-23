"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var LongConverter_1 = require("./LongConverter");
var IntegerConverter = (function () {
    function IntegerConverter() {
    }
    IntegerConverter.toNullableInteger = function (value) {
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    IntegerConverter.toInteger = function (value) {
        return LongConverter_1.LongConverter.toLong(value);
    };
    IntegerConverter.toIntegerWithDefault = function (value, defaultValue) {
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    return IntegerConverter;
}());
exports.IntegerConverter = IntegerConverter;
//# sourceMappingURL=IntegerConverter.js.map