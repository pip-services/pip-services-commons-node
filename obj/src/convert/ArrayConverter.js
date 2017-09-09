"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var ArrayConverter = /** @class */ (function () {
    function ArrayConverter() {
    }
    ArrayConverter.toNullableArray = function (value) {
        // Return null when nothing found
        if (value == null)
            return null;
        // Convert list
        if (_.isArray(value))
            return value;
        else if (_.isObject(value)) {
            var array = [];
            for (var prop in value)
                array.push(value[prop]);
            return array;
        }
        else
            return [value];
    };
    ArrayConverter.toArray = function (value) {
        var result = ArrayConverter.toNullableArray(value);
        return result || [];
    };
    ArrayConverter.toArrayWithDefault = function (value, defaultValue) {
        var result = ArrayConverter.toNullableArray(value);
        return result || defaultValue;
    };
    ArrayConverter.listToArray = function (value) {
        if (value == null)
            return [];
        if (_.isString(value))
            value = value.split(',');
        return ArrayConverter.toArray(value);
    };
    return ArrayConverter;
}());
exports.ArrayConverter = ArrayConverter;
//# sourceMappingURL=ArrayConverter.js.map