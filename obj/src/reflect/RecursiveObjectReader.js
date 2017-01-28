"use strict";
var _ = require('lodash');
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var ObjectReader_1 = require("./ObjectReader");
var RecursiveObjectReader = (function () {
    function RecursiveObjectReader() {
    }
    RecursiveObjectReader.performHasProperty = function (obj, names, nameIndex) {
        if (nameIndex < names.length - 1) {
            var value = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (value != null)
                return RecursiveObjectReader.performHasProperty(value, names, nameIndex + 1);
            else
                return false;
        }
        else
            return ObjectReader_1.ObjectReader.hasProperty(obj, names[nameIndex]);
    };
    RecursiveObjectReader.hasProperty = function (obj, name) {
        if (obj == null || name == null)
            return false;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return false;
        return RecursiveObjectReader.performHasProperty(obj, names, 0);
    };
    RecursiveObjectReader.performGetProperty = function (obj, names, nameIndex) {
        if (nameIndex < names.length - 1) {
            var value = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (value != null)
                return RecursiveObjectReader.performGetProperty(value, names, nameIndex + 1);
            else
                return null;
        }
        else
            return ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
    };
    RecursiveObjectReader.getProperty = function (obj, name) {
        if (obj == null || name == null)
            return null;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return null;
        return RecursiveObjectReader.performGetProperty(obj, names, 0);
    };
    RecursiveObjectReader.isSimpleValue = function (value) {
        var code = TypeConverter_1.TypeConverter.toTypeCode(value);
        return code != TypeCode_1.TypeCode.Array && code != TypeCode_1.TypeCode.Map && code != TypeCode_1.TypeCode.Object;
    };
    RecursiveObjectReader.performGetPropertyNames = function (obj, path, result, cycleDetect) {
        var map = ObjectReader_1.ObjectReader.getProperties(obj);
        if (!_.isEmpty(map) && cycleDetect.length < 100) {
            cycleDetect.push(obj);
            try {
                for (var key in map) {
                    var value = map[key];
                    // Prevent cycles 
                    if (cycleDetect.indexOf(value) >= 0)
                        continue;
                    var newPath = path != null ? path + "." + key : key;
                    // Add simple values directly
                    if (RecursiveObjectReader.isSimpleValue(value))
                        result.push(newPath);
                    else
                        RecursiveObjectReader.performGetPropertyNames(value, newPath, result, cycleDetect);
                }
            }
            finally {
                var index = cycleDetect.indexOf(obj);
                if (index >= 0)
                    cycleDetect.splice(index, 1);
            }
        }
        else {
            if (path != null)
                result.push(path);
        }
    };
    RecursiveObjectReader.getPropertyNames = function (obj) {
        var propertyNames = [];
        if (obj == null) {
            return propertyNames;
        }
        else {
            var cycleDetect = [];
            RecursiveObjectReader.performGetPropertyNames(obj, null, propertyNames, cycleDetect);
            return propertyNames;
        }
    };
    RecursiveObjectReader.performGetProperties = function (obj, path, result, cycleDetect) {
        var map = ObjectReader_1.ObjectReader.getProperties(obj);
        if (!_.isEmpty(map) && cycleDetect.length < 100) {
            cycleDetect.push(obj);
            try {
                for (var key in map) {
                    var value = map[key];
                    // Prevent cycles 
                    if (cycleDetect.indexOf(value) >= 0)
                        continue;
                    var newPath = path != null ? path + "." + key : key;
                    // Add simple values directly
                    if (RecursiveObjectReader.isSimpleValue(value))
                        result[newPath] = value;
                    else
                        RecursiveObjectReader.performGetProperties(value, newPath, result, cycleDetect);
                }
            }
            finally {
                var index = cycleDetect.indexOf(obj);
                if (index >= 0)
                    cycleDetect.splice(index, 1);
            }
        }
        else {
            if (path != null)
                result[path] = obj;
        }
    };
    RecursiveObjectReader.getProperties = function (obj) {
        var properties = {};
        if (obj != null) {
            var cycleDetect = [];
            RecursiveObjectReader.performGetProperties(obj, null, properties, cycleDetect);
        }
        return properties;
    };
    return RecursiveObjectReader;
}());
exports.RecursiveObjectReader = RecursiveObjectReader;
//# sourceMappingURL=RecursiveObjectReader.js.map