"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var TypeMatcher = /** @class */ (function () {
    function TypeMatcher() {
    }
    TypeMatcher.matchValue = function (expectedType, actualValue) {
        if (expectedType == null)
            return true;
        if (actualValue == null)
            throw new Error("Actual value cannot be null");
        return TypeMatcher.matchType(expectedType, TypeConverter_1.TypeConverter.toTypeCode(actualValue));
    };
    TypeMatcher.matchType = function (expectedType, actualType) {
        if (expectedType == null)
            return true;
        if (actualType == null)
            throw new Error("Actual type cannot be null");
        if (_.isInteger(expectedType)) {
            if (expectedType == TypeCode_1.TypeCode.Integer
                && (actualType == TypeCode_1.TypeCode.Long || actualType == TypeCode_1.TypeCode.Float || actualType == TypeCode_1.TypeCode.Double))
                return true;
            if (expectedType == TypeCode_1.TypeCode.Long
                && (actualType == TypeCode_1.TypeCode.Integer || actualType == TypeCode_1.TypeCode.Float || actualType == TypeCode_1.TypeCode.Double))
                return true;
            if (expectedType == TypeCode_1.TypeCode.Float
                && (actualType == TypeCode_1.TypeCode.Integer || actualType == TypeCode_1.TypeCode.Long || actualType == TypeCode_1.TypeCode.Double))
                return true;
            if (expectedType == TypeCode_1.TypeCode.Double
                && (actualType == TypeCode_1.TypeCode.Integer || actualType == TypeCode_1.TypeCode.Long || actualType == TypeCode_1.TypeCode.Float))
                return true;
            return expectedType == actualType;
        }
        if (_.isString(expectedType))
            return TypeMatcher.matchTypeByName(expectedType, actualType);
        return false;
    };
    TypeMatcher.matchValueByName = function (expectedType, actualValue) {
        if (expectedType == null)
            return true;
        if (actualValue == null)
            throw new Error("Actual value cannot be null");
        return TypeMatcher.matchTypeByName(expectedType, TypeConverter_1.TypeConverter.toTypeCode(actualValue));
    };
    TypeMatcher.matchTypeByName = function (expectedType, actualType) {
        if (expectedType == null)
            return true;
        if (actualType == null)
            throw new Error("Actual type cannot be null");
        expectedType = expectedType.toLowerCase();
        if (expectedType == "object")
            return true;
        else if (expectedType == "int" || expectedType == "integer") {
            return actualType == TypeCode_1.TypeCode.Integer
                || actualType == TypeCode_1.TypeCode.Long;
        }
        else if (expectedType == "long") {
            return actualType == TypeCode_1.TypeCode.Long;
        }
        else if (expectedType == "float") {
            return actualType == TypeCode_1.TypeCode.Float
                || actualType == TypeCode_1.TypeCode.Double;
        }
        else if (expectedType == "double") {
            return actualType == TypeCode_1.TypeCode.Double;
        }
        else if (expectedType == "string") {
            return actualType == TypeCode_1.TypeCode.String;
        }
        else if (expectedType == "bool" || expectedType == "boolean") {
            return actualType == TypeCode_1.TypeCode.Boolean;
        }
        else if (expectedType == "date" || expectedType == "datetime") {
            return actualType == TypeCode_1.TypeCode.DateTime;
        }
        else if (expectedType == "timespan" || expectedType == "duration") {
            return actualType == TypeCode_1.TypeCode.Integer
                || actualType == TypeCode_1.TypeCode.Long
                || actualType == TypeCode_1.TypeCode.Float
                || actualType == TypeCode_1.TypeCode.Double;
        }
        else if (expectedType == "enum") {
            return actualType == TypeCode_1.TypeCode.Integer
                || actualType == TypeCode_1.TypeCode.String;
        }
        else if (expectedType == "map" || expectedType == "dict" || expectedType == "dictionary") {
            return actualType == TypeCode_1.TypeCode.Map;
        }
        else if (expectedType == "array" || expectedType == "list") {
            return actualType == TypeCode_1.TypeCode.Array;
        }
        else if (_.endsWith(expectedType, "[]")) {
            // Todo: Check subtype
            return actualType == TypeCode_1.TypeCode.Array;
        }
        else
            return false;
    };
    return TypeMatcher;
}());
exports.TypeMatcher = TypeMatcher;
//# sourceMappingURL=TypeMatcher.js.map