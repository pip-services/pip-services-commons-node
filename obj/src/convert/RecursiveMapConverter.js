"use strict";
var _ = require('lodash');
var TypeCode_1 = require("./TypeCode");
var TypeConverter_1 = require("./TypeConverter");
var TypeReflector_1 = require("../reflect/TypeReflector");
var RecursiveMapConverter = (function () {
    function RecursiveMapConverter() {
    }
    RecursiveMapConverter.objectToMap = function (value) {
        if (value == null)
            return null;
        var result = {};
        var props = Object.keys(value);
        for (var i = 0; i < props.length; i++) {
            var propValue = value[props[i]];
            propValue = RecursiveMapConverter.valueToMap(propValue);
            result[props[i]] = propValue;
        }
        return result;
    };
    RecursiveMapConverter.valueToMap = function (value) {
        if (value == null)
            return null;
        // Skip expected non-primitive values
        if (_.isString(value))
            return value;
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Skip primitive values
        if (TypeReflector_1.TypeReflector.isPrimitive(valueType))
            return value;
        if (valueType == TypeCode_1.TypeCode.Map)
            return RecursiveMapConverter.mapToMap(value);
        // Convert arrays
        if (valueType == TypeCode_1.TypeCode.Array)
            return RecursiveMapConverter.arrayToMap(value);
        return RecursiveMapConverter.objectToMap(value);
    };
    RecursiveMapConverter.mapToMap = function (value) {
        var result = {};
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
            result[keys[i]] = RecursiveMapConverter.valueToMap(value[keys[i]]);
        }
    };
    RecursiveMapConverter.arrayToMap = function (value) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
            result[i] = RecursiveMapConverter.valueToMap(value[i]);
        }
        return result;
    };
    RecursiveMapConverter.toNullableMap = function (value) {
        return RecursiveMapConverter.valueToMap(value);
    };
    RecursiveMapConverter.toMap = function (value) {
        return RecursiveMapConverter.toNullableMap(value) || {};
    };
    RecursiveMapConverter.toMapWithDefault = function (value, defaultValue) {
        return RecursiveMapConverter.toNullableMap(value) || defaultValue;
    };
    return RecursiveMapConverter;
}());
exports.RecursiveMapConverter = RecursiveMapConverter;
//# sourceMappingURL=RecursiveMapConverter.js.map