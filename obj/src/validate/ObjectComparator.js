"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var DoubleConverter_1 = require("../convert/DoubleConverter");
var StringConverter_1 = require("../convert/StringConverter");
var ObjectComparator = /** @class */ (function () {
    function ObjectComparator() {
    }
    ObjectComparator.compare = function (value1, operation, value2) {
        operation = operation.toUpperCase();
        if (operation == "=" || operation == "==" || operation == "EQ")
            return ObjectComparator.areEqual(value1, value2);
        if (operation == "!=" || operation == "<>" || operation == "NE")
            return ObjectComparator.areNotEqual(value1, value2);
        if (operation == "<" || operation == "LT")
            return ObjectComparator.less(value1, value2);
        if (operation == "<=" || operation == "LE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.less(value1, value2);
        if (operation == ">" || operation == "GT")
            return ObjectComparator.more(value1, value2);
        if (operation == ">=" || operation == "GE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.more(value1, value2);
        if (operation == "LIKE")
            return ObjectComparator.match(value1, value2);
        return true;
    };
    ObjectComparator.areEqual = function (value1, value2) {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        return _.isEqual(value1, value2);
    };
    ObjectComparator.areNotEqual = function (value1, value2) {
        return !ObjectComparator.areEqual(value1, value2);
    };
    ObjectComparator.less = function (value1, value2) {
        var number1 = DoubleConverter_1.DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter_1.DoubleConverter.toNullableDouble(value2);
        if (number1 == null || number2 == null)
            return false;
        return number1 < number2;
    };
    ObjectComparator.more = function (value1, value2) {
        var number1 = DoubleConverter_1.DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter_1.DoubleConverter.toNullableDouble(value2);
        if (number1 == null || number2 == null)
            return false;
        return number1 > number2;
    };
    ObjectComparator.match = function (value1, value2) {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        var str1 = StringConverter_1.StringConverter.toString(value1);
        var str2 = StringConverter_1.StringConverter.toString(value2);
        return !!str1.match(str2);
    };
    return ObjectComparator;
}());
exports.ObjectComparator = ObjectComparator;
//# sourceMappingURL=ObjectComparator.js.map