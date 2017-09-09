"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var AnyValueArray_1 = require("./AnyValueArray");
var AnyValueMap_1 = require("./AnyValueMap");
var AnyValue = /** @class */ (function () {
    function AnyValue(value) {
        if (value === void 0) { value = null; }
        if (value instanceof AnyValue)
            this.value = value.value;
        else
            this.value = value;
    }
    AnyValue.prototype.getTypeCode = function () {
        return TypeConverter_1.TypeConverter.toTypeCode(this.value);
    };
    AnyValue.prototype.getAsObject = function () {
        return this.value;
    };
    AnyValue.prototype.setAsObject = function (value) {
        this.value = value;
    };
    AnyValue.prototype.getAsNullableString = function () {
        return StringConverter_1.StringConverter.toNullableString(this.value);
    };
    AnyValue.prototype.getAsString = function () {
        return this.getAsStringWithDefault(null);
    };
    AnyValue.prototype.getAsStringWithDefault = function (defaultValue) {
        return StringConverter_1.StringConverter.toStringWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableBoolean = function () {
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(this.value);
    };
    AnyValue.prototype.getAsBoolean = function () {
        return this.getAsBooleanWithDefault(false);
    };
    AnyValue.prototype.getAsBooleanWithDefault = function (defaultValue) {
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableInteger = function () {
        return IntegerConverter_1.IntegerConverter.toNullableInteger(this.value);
    };
    AnyValue.prototype.getAsInteger = function () {
        return this.getAsIntegerWithDefault(0);
    };
    AnyValue.prototype.getAsIntegerWithDefault = function (defaultValue) {
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableLong = function () {
        return LongConverter_1.LongConverter.toNullableLong(this.value);
    };
    AnyValue.prototype.getAsLong = function () {
        return this.getAsLongWithDefault(0);
    };
    AnyValue.prototype.getAsLongWithDefault = function (defaultValue) {
        return LongConverter_1.LongConverter.toLongWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableFloat = function () {
        return FloatConverter_1.FloatConverter.toNullableFloat(this.value);
    };
    AnyValue.prototype.getAsFloat = function () {
        return this.getAsFloatWithDefault(0);
    };
    AnyValue.prototype.getAsFloatWithDefault = function (defaultValue) {
        return FloatConverter_1.FloatConverter.toFloatWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableDouble = function () {
        return DoubleConverter_1.DoubleConverter.toNullableDouble(this.value);
    };
    AnyValue.prototype.getAsDouble = function () {
        return this.getAsDoubleWithDefault(0);
    };
    AnyValue.prototype.getAsDoubleWithDefault = function (defaultValue) {
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableDateTime = function () {
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(this.value);
    };
    AnyValue.prototype.getAsDateTime = function () {
        return this.getAsDateTimeWithDefault(null);
    };
    AnyValue.prototype.getAsDateTimeWithDefault = function (defaultValue) {
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(this.value, defaultValue);
    };
    AnyValue.prototype.getAsNullableType = function (type) {
        return TypeConverter_1.TypeConverter.toNullableType(type, this.value);
    };
    AnyValue.prototype.getAsType = function (type) {
        return this.getAsTypeWithDefault(type, null);
    };
    AnyValue.prototype.getAsTypeWithDefault = function (type, defaultValue) {
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, this.value, defaultValue);
    };
    AnyValue.prototype.getAsArray = function () {
        return AnyValueArray_1.AnyValueArray.fromValue(this.value);
    };
    AnyValue.prototype.getAsMap = function () {
        return AnyValueMap_1.AnyValueMap.fromValue(this.value);
    };
    AnyValue.prototype.equals = function (obj) {
        if (obj == null && this.value == null)
            return true;
        if (obj == null || this.value == null)
            return false;
        if (obj instanceof AnyValue)
            obj = obj.value;
        var strThisValue = StringConverter_1.StringConverter.toString(this.value);
        var strValue = StringConverter_1.StringConverter.toString(obj);
        if (strThisValue == null && strValue == null)
            return true;
        if (strThisValue == null || strValue == null)
            return false;
        return strThisValue == strValue;
    };
    AnyValue.prototype.equalsAsType = function (type, obj) {
        if (obj == null && this.value == null)
            return true;
        if (obj == null || this.value == null)
            return false;
        if (obj instanceof AnyValue)
            obj = obj.value;
        var typedThisValue = TypeConverter_1.TypeConverter.toType(type, this.value);
        var typedValue = TypeConverter_1.TypeConverter.toType(type, obj);
        if (typedThisValue == null && typedValue == null)
            return true;
        if (typedThisValue == null || typedValue == null)
            return false;
        return typedThisValue == typedValue;
    };
    AnyValue.prototype.clone = function () {
        return new AnyValue(this.value);
    };
    AnyValue.prototype.toString = function () {
        return StringConverter_1.StringConverter.toString(this.value);
    };
    AnyValue.prototype.hashCode = function () {
        return this.value != null ? this.value.hashCode() : 0;
    };
    return AnyValue;
}());
exports.AnyValue = AnyValue;
//# sourceMappingURL=AnyValue.js.map