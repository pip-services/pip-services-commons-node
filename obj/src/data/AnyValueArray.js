"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var ArrayConverter_1 = require("../convert/ArrayConverter");
var AnyValue_1 = require("./AnyValue");
var AnyValueMap_1 = require("./AnyValueMap");
var AnyValueArray = (function (_super) {
    __extends(AnyValueArray, _super);
    function AnyValueArray(values) {
        if (values === void 0) { values = null; }
        var _this = _super.call(this) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = AnyValueArray.prototype;
        _this.append(values);
        return _this;
    }
    AnyValueArray.prototype.get = function (index) {
        return this[index];
    };
    AnyValueArray.prototype.put = function (index, value) {
        this[index] = value;
    };
    AnyValueArray.prototype.remove = function (index) {
        this.splice(index, 1);
    };
    AnyValueArray.prototype.append = function (elements) {
        if (elements != null) {
            for (var index = 0; index < elements.length; index++)
                this.push(elements[index]);
        }
    };
    AnyValueArray.prototype.clear = function () {
        this.splice(0, this.length);
    };
    AnyValueArray.prototype.getAsObject = function (index) {
        if (index === void 0) { index = null; }
        if (index == null) {
            var result = [];
            for (index = 0; index < this.length; index++)
                result.push(this[index]);
            return result;
        }
        else {
            return this[index];
        }
    };
    AnyValueArray.prototype.setAsObject = function (index, value) {
        if (value == null) {
            this.clear();
            var elements = ArrayConverter_1.ArrayConverter.toArray(value);
            this.append(elements);
        }
        else {
            this[index] = value;
        }
    };
    AnyValueArray.prototype.getAsNullableString = function (index) {
        var value = this[index];
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    AnyValueArray.prototype.getAsString = function (index) {
        return this.getAsStringWithDefault(index, null);
    };
    AnyValueArray.prototype.getAsStringWithDefault = function (index, defaultValue) {
        var value = this[index];
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableBoolean = function (index) {
        var value = this[index];
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    AnyValueArray.prototype.getAsBoolean = function (index) {
        return this.getAsBooleanWithDefault(index, false);
    };
    AnyValueArray.prototype.getAsBooleanWithDefault = function (index, defaultValue) {
        var value = this[index];
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableInteger = function (index) {
        var value = this[index];
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    AnyValueArray.prototype.getAsInteger = function (index) {
        return this.getAsIntegerWithDefault(index, 0);
    };
    AnyValueArray.prototype.getAsIntegerWithDefault = function (index, defaultValue) {
        var value = this[index];
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableLong = function (index) {
        var value = this[index];
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    AnyValueArray.prototype.getAsLong = function (index) {
        return this.getAsLongWithDefault(index, 0);
    };
    AnyValueArray.prototype.getAsLongWithDefault = function (index, defaultValue) {
        var value = this[index];
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableFloat = function (index) {
        var value = this[index];
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    AnyValueArray.prototype.getAsFloat = function (index) {
        return this.getAsFloatWithDefault(index, 0);
    };
    AnyValueArray.prototype.getAsFloatWithDefault = function (index, defaultValue) {
        var value = this[index];
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableDouble = function (index) {
        var value = this[index];
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    AnyValueArray.prototype.getAsDouble = function (index) {
        return this.getAsDoubleWithDefault(index, 0);
    };
    AnyValueArray.prototype.getAsDoubleWithDefault = function (index, defaultValue) {
        var value = this[index];
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableDateTime = function (index) {
        var value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    AnyValueArray.prototype.getAsDateTime = function (index) {
        return this.getAsDateTimeWithDefault(index, null);
    };
    AnyValueArray.prototype.getAsDateTimeWithDefault = function (index, defaultValue) {
        var value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    AnyValueArray.prototype.getAsNullableType = function (type, index) {
        var value = this[index];
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    AnyValueArray.prototype.getAsType = function (type, index) {
        return this.getAsTypeWithDefault(type, index, null);
    };
    AnyValueArray.prototype.getAsTypeWithDefault = function (type, index, defaultValue) {
        var value = this[index];
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    AnyValueArray.prototype.getAsValue = function (index) {
        var value = this[index];
        return new AnyValue_1.AnyValue(value);
    };
    AnyValueArray.prototype.getAsNullableArray = function (index) {
        var value = this[index];
        return value != null ? AnyValueArray.fromValue(value) : null;
    };
    AnyValueArray.prototype.getAsArray = function (index) {
        var value = this[index];
        return AnyValueArray.fromValue(value);
    };
    AnyValueArray.prototype.getAsArrayWithDefault = function (index, defaultValue) {
        var result = this.getAsNullableArray(index);
        return result != null ? result : defaultValue;
    };
    AnyValueArray.prototype.getAsNullableMap = function (index) {
        var value = this[index];
        return value != null ? AnyValueMap_1.AnyValueMap.fromValue(value) : null;
    };
    AnyValueArray.prototype.getAsMap = function (index) {
        var value = this[index];
        return AnyValueMap_1.AnyValueMap.fromValue(value);
    };
    AnyValueArray.prototype.getAsMapWithDefault = function (index, defaultValue) {
        var result = this.getAsNullableMap(index);
        return result != null ? AnyValueMap_1.AnyValueMap.fromValue(result) : defaultValue;
    };
    AnyValueArray.prototype.contains = function (value) {
        for (var index = 0; index < this.length; index++) {
            var element = this[index];
            if (value == null && element == null)
                return true;
            if (value == null || element == null)
                continue;
            if (value == element)
                return true;
        }
        return false;
    };
    AnyValueArray.prototype.containsAsType = function (type, value) {
        var typedValue = TypeConverter_1.TypeConverter.toType(type, value);
        for (var index = 0; index < this.length; index++) {
            var thisTypedValue = TypeConverter_1.TypeConverter.toNullableType(type, this[index]);
            if (typedValue == null && thisTypedValue == null)
                return true;
            if (typedValue == null || thisTypedValue == null)
                continue;
            if (typedValue == thisTypedValue)
                return true;
        }
        return false;
    };
    AnyValueArray.prototype.clone = function () {
        return new AnyValueArray(this);
    };
    AnyValueArray.prototype.toString = function () {
        var builder = '';
        for (var index = 0; index < this.length; index++) {
            if (index > 0)
                builder += ',';
            builder += this.getAsStringWithDefault(index, "");
        }
        return builder;
    };
    AnyValueArray.fromValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new AnyValueArray(values);
    };
    AnyValueArray.fromValue = function (value) {
        var values = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        return new AnyValueArray(values);
    };
    AnyValueArray.fromString = function (values, separator, removeDuplicates) {
        if (removeDuplicates === void 0) { removeDuplicates = false; }
        var result = new AnyValueArray();
        if (values == null || values.length == 0)
            return result;
        var items = values.split(separator, -1);
        for (var index = 0; index < items.length; index++) {
            var item = items[index];
            if ((item != null && item.length > 0) || removeDuplicates == false)
                result.push(item != null ? new AnyValue_1.AnyValue(item) : null);
        }
        return result;
    };
    return AnyValueArray;
}(Array));
exports.AnyValueArray = AnyValueArray;
//# sourceMappingURL=AnyValueArray.js.map