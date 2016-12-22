"use strict";
var _ = require('lodash');
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var MapConverter_1 = require("../convert/MapConverter");
var AnyValue_1 = require("./AnyValue");
var AnyValueArray_1 = require("./AnyValueArray");
var AnyValueMap_1 = require("./AnyValueMap");
var StringValueMap = (function () {
    function StringValueMap(map) {
        if (map === void 0) { map = null; }
        this.append(map);
    }
    StringValueMap.prototype.get = function (name) {
        if (name == null)
            throw new Error("Name cannot be null");
        // Case-insensitive search
        name = name.toLowerCase();
        for (var key in this) {
            var value = this[key];
            if (this.hasOwnProperty(key) && key.toLowerCase() == name)
                return StringConverter_1.StringConverter.toNullableString(value);
        }
        return null;
    };
    StringValueMap.prototype.append = function (map) {
        if (map == null)
            return;
        for (var key in map) {
            var value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = StringConverter_1.StringConverter.toNullableString(value);
        }
    };
    StringValueMap.prototype.clear = function () {
        for (var key in this) {
            var value = this[key];
            if (this.hasOwnProperty(key))
                delete this[key];
        }
    };
    StringValueMap.prototype.getAsObject = function (key) {
        if (key === void 0) { key = null; }
        if (key == null) {
            var result = {};
            for (var key_1 in this) {
                var value = this[key_1];
                if (this.hasOwnProperty(key_1))
                    result[key_1] = value;
            }
            return result;
        }
        else {
            return this.get(key);
        }
    };
    StringValueMap.prototype.setAsObject = function (key, value) {
        if (value === void 0) { value = null; }
        if (value == null) {
            value = key;
            this.clear();
            var values = MapConverter_1.MapConverter.toMap(value);
            this.append(values);
        }
        else {
            this[key] = StringConverter_1.StringConverter.toNullableString(value);
        }
    };
    StringValueMap.prototype.getAsNullableString = function (key) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    StringValueMap.prototype.getAsString = function (key) {
        return this.getAsStringWithDefault(key, null);
    };
    StringValueMap.prototype.getAsStringWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableBoolean = function (key) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    StringValueMap.prototype.getAsBoolean = function (key) {
        return this.getAsBooleanWithDefault(key, false);
    };
    StringValueMap.prototype.getAsBooleanWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableInteger = function (key) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    StringValueMap.prototype.getAsInteger = function (key) {
        return this.getAsIntegerWithDefault(key, 0);
    };
    StringValueMap.prototype.getAsIntegerWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableLong = function (key) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    StringValueMap.prototype.getAsLong = function (key) {
        return this.getAsLongWithDefault(key, 0);
    };
    StringValueMap.prototype.getAsLongWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableFloat = function (key) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    StringValueMap.prototype.getAsFloat = function (key) {
        return this.getAsFloatWithDefault(key, 0);
    };
    StringValueMap.prototype.getAsFloatWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableDouble = function (key) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    StringValueMap.prototype.getAsDouble = function (key) {
        return this.getAsDoubleWithDefault(key, 0);
    };
    StringValueMap.prototype.getAsDoubleWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableDateTime = function (key) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    StringValueMap.prototype.getAsDateTime = function (key) {
        return this.getAsDateTimeWithDefault(key, null);
    };
    StringValueMap.prototype.getAsDateTimeWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    StringValueMap.prototype.getAsNullableType = function (type, key) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    StringValueMap.prototype.getAsType = function (type, key) {
        return this.getAsTypeWithDefault(type, key, null);
    };
    StringValueMap.prototype.getAsTypeWithDefault = function (type, key, defaultValue) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    StringValueMap.prototype.getAsValue = function (key) {
        var value = this.get(key);
        return new AnyValue_1.AnyValue(value);
    };
    StringValueMap.prototype.getAsNullableArray = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueArray_1.AnyValueArray.fromValue(value) : null;
    };
    StringValueMap.prototype.getAsArray = function (key) {
        var value = this.get(key);
        return AnyValueArray_1.AnyValueArray.fromValue(value);
    };
    StringValueMap.prototype.getAsArrayWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableArray(key);
        return result != null ? result : defaultValue;
    };
    StringValueMap.prototype.getAsNullableMap = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueMap_1.AnyValueMap.fromValue(value) : null;
    };
    StringValueMap.prototype.getAsMap = function (key) {
        var value = this.get(key);
        return AnyValueMap_1.AnyValueMap.fromValue(value);
    };
    StringValueMap.prototype.getAsMapWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableMap(key);
        return result != null ? result : defaultValue;
    };
    StringValueMap.prototype.toString = function () {
        var builder = '';
        // Todo: User encoder
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var value = this[key];
                if (builder.length > 0)
                    builder += ';';
                if (value != null)
                    builder += key + '=' + value;
                else
                    builder += key;
            }
        }
        return builder;
    };
    StringValueMap.prototype.clone = function () {
        return new StringValueMap(this);
    };
    StringValueMap.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return StringValueMap.fromTuplesArray(tuples);
    };
    StringValueMap.fromTuplesArray = function (tuples) {
        var result = new StringValueMap();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_1 = StringConverter_1.StringConverter.toString(tuples[index]);
            var value = StringConverter_1.StringConverter.toNullableString(tuples[index + 1]);
            result[name_1] = value;
        }
        return result;
    };
    StringValueMap.fromString = function (line) {
        var result = new StringValueMap();
        if (line == null || line.length == 0)
            return result;
        // Todo: User tokenizer / decoder
        var tokens = line.split(";");
        for (var index = 0; index < tokens.length; index++) {
            var token = tokens[index];
            if (token.length == 0)
                continue;
            var pos = token.indexOf('=');
            var key = pos > 0 ? token.substring(0, pos).trim() : token.trim();
            var value = pos > 0 ? token.substring(pos + 1).trim() : null;
            result[key] = value;
        }
        return result;
    };
    StringValueMap.fromMaps = function () {
        var maps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
        }
        var result = new StringValueMap();
        if (maps != null && maps.length > 0) {
            for (var index = 0; index < maps.length; index++)
                result.append(maps[index]);
        }
        return result;
    };
    return StringValueMap;
}());
exports.StringValueMap = StringValueMap;
//# sourceMappingURL=StringValueMap.js.map