"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var StringConverter = (function () {
    function StringConverter() {
    }
    StringConverter.toNullableString = function (value) {
        if (value == null)
            return null;
        if (_.isString(value))
            return value;
        if (_.isDate(value))
            value.toISOString();
        return value.toString();
    };
    StringConverter.toString = function (value) {
        return StringConverter.toStringWithDefault(value, "");
    };
    StringConverter.toStringWithDefault = function (value, defaultValue) {
        return StringConverter.toNullableString(value) || defaultValue;
    };
    return StringConverter;
}());
exports.StringConverter = StringConverter;
//# sourceMappingURL=StringConverter.js.map