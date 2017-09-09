"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var PropertyReflector_1 = require("./PropertyReflector");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var ObjectReader = /** @class */ (function () {
    function ObjectReader() {
    }
    ObjectReader.getValue = function (obj) {
        // Todo: just a blank implementation for compatibility
        return obj;
    };
    ObjectReader.hasProperty = function (obj, name) {
        if (obj == null || name == null) {
            return false;
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector_1.PropertyReflector.hasProperty(obj, name);
        }
        else if (_.isArray(obj)) {
            var index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length;
        }
        else {
            return false;
        }
    };
    ObjectReader.getProperty = function (obj, name) {
        if (obj == null || name == null) {
            return null;
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector_1.PropertyReflector.getProperty(obj, name);
        }
        else if (_.isArray(obj)) {
            var index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length ? obj[index] : null;
        }
        else {
            return null;
        }
    };
    ObjectReader.getPropertyNames = function (obj) {
        var properties = [];
        if (obj == null) {
            // Do nothing
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            properties = PropertyReflector_1.PropertyReflector.getPropertyNames(obj);
        }
        else if (_.isArray(obj)) {
            var length_1 = obj.length;
            for (var index = 0; index < length_1; index++)
                properties.push(index.toString());
        }
        else {
            // Do nothing
        }
        return properties;
    };
    ObjectReader.getProperties = function (obj) {
        var map = {};
        if (obj == null) {
            // Do nothing
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            map = PropertyReflector_1.PropertyReflector.getProperties(obj);
        }
        else if (_.isArray(obj)) {
            var length_2 = obj.length;
            for (var index = 0; index < length_2; index++)
                map[index.toString()] = obj[index];
        }
        else {
            // Do nothing
        }
        return map;
    };
    return ObjectReader;
}());
exports.ObjectReader = ObjectReader;
//# sourceMappingURL=ObjectReader.js.map