"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var IntegerConverter_1 = require("../convert/IntegerConverter");
var ObjectReader_1 = require("./ObjectReader");
var ObjectWriter_1 = require("./ObjectWriter");
var RecursiveObjectReader_1 = require("./RecursiveObjectReader");
var RecursiveObjectWriter = /** @class */ (function () {
    function RecursiveObjectWriter() {
    }
    RecursiveObjectWriter.createProperty = function (obj, names, nameIndex) {
        // If next field is index then create an array
        var subField = names.length > nameIndex + 1 ? names[nameIndex + 1] : null;
        var subFieldIndex = IntegerConverter_1.IntegerConverter.toNullableInteger(subField);
        if (subFieldIndex != null)
            return [];
        // Else create a dictionary
        return {};
    };
    RecursiveObjectWriter.performSetProperty = function (obj, names, nameIndex, value) {
        if (nameIndex < names.length - 1) {
            var subObj = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (subObj != null)
                RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
            else {
                subObj = RecursiveObjectWriter.createProperty(obj, names, nameIndex);
                if (subObj != null) {
                    RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
                    ObjectWriter_1.ObjectWriter.setProperty(obj, names[nameIndex], subObj);
                }
            }
        }
        else
            ObjectWriter_1.ObjectWriter.setProperty(obj, names[nameIndex], value);
    };
    RecursiveObjectWriter.setProperty = function (obj, name, value) {
        if (obj == null || name == null)
            return;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return;
        RecursiveObjectWriter.performSetProperty(obj, names, 0, value);
    };
    RecursiveObjectWriter.setProperties = function (obj, values) {
        if (values == null)
            return;
        for (var key in values) {
            var value = values[key];
            RecursiveObjectWriter.setProperty(obj, key, value);
        }
    };
    RecursiveObjectWriter.copyProperties = function (dest, src) {
        if (dest == null || src == null)
            return;
        var values = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(src);
        RecursiveObjectWriter.setProperties(dest, values);
    };
    return RecursiveObjectWriter;
}());
exports.RecursiveObjectWriter = RecursiveObjectWriter;
//# sourceMappingURL=RecursiveObjectWriter.js.map