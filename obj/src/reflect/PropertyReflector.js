"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var PropertyReflector = /** @class */ (function () {
    function PropertyReflector() {
    }
    PropertyReflector.matchField = function (fieldName, fieldValue, expectedName) {
        if (_.isFunction(fieldValue))
            return false;
        if (_.startsWith(fieldName, '_'))
            return false;
        if (expectedName == null)
            return true;
        return fieldName.toLowerCase() == expectedName;
    };
    PropertyReflector.hasProperty = function (obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        name = name.toLowerCase();
        for (var field in obj) {
            var fieldValue = obj[field];
            if (PropertyReflector.matchField(field, fieldValue, name))
                return true;
        }
        return false;
    };
    PropertyReflector.getProperty = function (obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        name = name.toLowerCase();
        for (var field in obj) {
            var fieldValue = obj[field];
            try {
                if (PropertyReflector.matchField(field, fieldValue, name))
                    return fieldValue;
            }
            catch (ex) {
                // Ignore exceptions
            }
        }
        return null;
    };
    PropertyReflector.getPropertyNames = function (obj) {
        var properties = [];
        for (var field in obj) {
            var fieldValue = obj[field];
            if (PropertyReflector.matchField(field, fieldValue, null))
                properties.push(field);
        }
        return properties;
    };
    PropertyReflector.getProperties = function (obj) {
        var map = {};
        for (var field in obj) {
            var fieldValue = obj[field];
            try {
                if (PropertyReflector.matchField(field, fieldValue, null))
                    map[field] = fieldValue;
            }
            catch (ex) {
                // Ignore exception
            }
        }
        return map;
    };
    PropertyReflector.setProperty = function (obj, name, value) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        var expectedName = name.toLowerCase();
        for (var field in obj) {
            var fieldValue = obj[field];
            try {
                if (PropertyReflector.matchField(field, fieldValue, expectedName)) {
                    obj[field] = value;
                    return;
                }
            }
            catch (ex) {
                // Ignore exception
            }
        }
        // If no existing properties found set it directly
        obj[name] = value;
    };
    PropertyReflector.setProperties = function (obj, values) {
        if (values == null)
            return;
        for (var field in values) {
            var fieldValue = values[field];
            PropertyReflector.setProperty(obj, field, fieldValue);
        }
    };
    return PropertyReflector;
}());
exports.PropertyReflector = PropertyReflector;
//# sourceMappingURL=PropertyReflector.js.map