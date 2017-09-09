"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var TypeCode_1 = require("./TypeCode");
var StringConverter_1 = require("./StringConverter");
var IntegerConverter_1 = require("./IntegerConverter");
var LongConverter_1 = require("./LongConverter");
var FloatConverter_1 = require("./FloatConverter");
var DoubleConverter_1 = require("./DoubleConverter");
var DateTimeConverter_1 = require("./DateTimeConverter");
var ArrayConverter_1 = require("./ArrayConverter");
var MapConverter_1 = require("./MapConverter");
var TypeConverter = /** @class */ (function () {
    function TypeConverter() {
    }
    TypeConverter.toTypeCode = function (value) {
        if (value == null)
            return TypeCode_1.TypeCode.Unknown;
        if (_.isArray(value))
            return TypeCode_1.TypeCode.Array;
        if (_.isBoolean(value))
            return TypeCode_1.TypeCode.Boolean;
        if (_.isDate(value))
            return TypeCode_1.TypeCode.DateTime;
        if (_.isInteger(value))
            return TypeCode_1.TypeCode.Long;
        if (_.isNumber(value))
            return TypeCode_1.TypeCode.Double;
        if (_.isFunction(value))
            return TypeCode_1.TypeCode.Object;
        if (_.isObject(value))
            return TypeCode_1.TypeCode.Map;
        if (_.isString(value)) {
            // if (value == "undefined")
            //     return TypeCode.Unknown;
            // if (value == "object")
            //     return TypeCode.Map;
            // if (value == "boolean")
            //     return TypeCode.Boolean;
            // if (value == "number")
            //     return TypeCode.Double;
            // if (value == "string")
            //     return TypeCode.String;
            // if (value == "function")
            //     return TypeCode.Object;
            return TypeCode_1.TypeCode.String;
        }
        return TypeCode_1.TypeCode.Object;
    };
    TypeConverter.toNullableType = function (type, value) {
        if (value == null)
            return null;
        // Convert to known types
        if (type == TypeCode_1.TypeCode.String)
            value = StringConverter_1.StringConverter.toNullableString(value);
        else if (type == TypeCode_1.TypeCode.Integer)
            value = IntegerConverter_1.IntegerConverter.toNullableInteger(value);
        else if (type == TypeCode_1.TypeCode.Long)
            value = LongConverter_1.LongConverter.toNullableLong(value);
        else if (type == TypeCode_1.TypeCode.Float)
            value = FloatConverter_1.FloatConverter.toNullableFloat(value);
        else if (type == TypeCode_1.TypeCode.Double)
            value = DoubleConverter_1.DoubleConverter.toNullableDouble(value);
        else if (type == TypeCode_1.TypeCode.DateTime)
            value = DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
        else if (type == TypeCode_1.TypeCode.Array)
            value = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        else if (type == TypeCode_1.TypeCode.Map)
            value = MapConverter_1.MapConverter.toNullableMap(value);
        return value;
    };
    TypeConverter.toType = function (type, value) {
        // Convert to the specified type
        var result = TypeConverter.toNullableType(type, value);
        if (result != null)
            return result;
        // Define and return default value based on type
        if (type == TypeCode_1.TypeCode.Integer)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Long)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Float)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Double)
            value = 0;
        return value;
    };
    TypeConverter.toTypeWithDefault = function (type, value, defaultValue) {
        var result = TypeConverter.toNullableType(type, value);
        return result != null ? result : defaultValue;
    };
    TypeConverter.toString = function (type) {
        switch (type) {
            case TypeCode_1.TypeCode.Unknown:
                return "unknown";
            case TypeCode_1.TypeCode.String:
                return "string";
            case TypeCode_1.TypeCode.Boolean:
                return "boolean";
            case TypeCode_1.TypeCode.Integer:
                return "integer";
            case TypeCode_1.TypeCode.Long:
                return "long";
            case TypeCode_1.TypeCode.Float:
                return "float";
            case TypeCode_1.TypeCode.Double:
                return "double";
            case TypeCode_1.TypeCode.DateTime:
                return "datetime";
            case TypeCode_1.TypeCode.Duration:
                return "duration";
            case TypeCode_1.TypeCode.Object:
                return "object";
            case TypeCode_1.TypeCode.Enum:
                return "enum";
            case TypeCode_1.TypeCode.Array:
                return "array";
            case TypeCode_1.TypeCode.Map:
                return "map";
            default:
                return "unknown";
        }
    };
    return TypeConverter;
}());
exports.TypeConverter = TypeConverter;
//# sourceMappingURL=TypeConverter.js.map