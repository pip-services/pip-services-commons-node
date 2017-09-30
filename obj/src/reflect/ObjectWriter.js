"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var PropertyReflector_1 = require("./PropertyReflector");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var ObjectWriter = /** @class */ (function () {
    function ObjectWriter() {
    }
    ObjectWriter.setProperty = function (obj, name, value) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        if (_.isObject(obj) && !_.isDate(obj)) {
            PropertyReflector_1.PropertyReflector.setProperty(obj, name, value);
        }
        else if (_.isArray(obj)) {
            var index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            if (index >= 0) {
                while (index < obj.length - 1)
                    obj.push(null);
                obj[index] = value;
            }
        }
    };
    ObjectWriter.setProperties = function (obj, values) {
        if (values == null)
            return;
        for (var key in values) {
            var value = values[key];
            ObjectWriter.setProperty(obj, key, value);
        }
    };
    return ObjectWriter;
}());
exports.ObjectWriter = ObjectWriter;
//# sourceMappingURL=ObjectWriter.js.map