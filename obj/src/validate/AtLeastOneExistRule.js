"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
var AtLeastOneExistRule = /** @class */ (function () {
    function AtLeastOneExistRule() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        this._properties = properties;
    }
    AtLeastOneExistRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        var found = [];
        for (var i = 0; i < this._properties.length; i++) {
            var propertyValue = ObjectReader_1.ObjectReader.getProperty(value, this._properties[i]);
            if (propertyValue != null)
                found.push(this._properties[i]);
        }
        if (found.length === 0) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NULL", name + " must have at least one property from " + this._properties, this._properties, null));
        }
    };
    return AtLeastOneExistRule;
}());
exports.AtLeastOneExistRule = AtLeastOneExistRule;
//# sourceMappingURL=AtLeastOneExistRule.js.map