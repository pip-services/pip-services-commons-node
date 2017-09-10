"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
var OnlyOneExistRule = /** @class */ (function () {
    function OnlyOneExistRule() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        this._properties = properties;
    }
    OnlyOneExistRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        var found = [];
        for (var i = 0; i < this._properties.length; i++) {
            var property = this._properties[i];
            var propertyValue = ObjectReader_1.ObjectReader.getProperty(value, property);
            if (propertyValue)
                found.push(property);
        }
        if (found.length == 0) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NULL", name + " must have at least one property from " + this._properties, this._properties, null));
        }
        else if (found.length > 1) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ONLY_ONE", name + "must have only one property from " + this._properties, this._properties, null));
        }
    };
    return OnlyOneExistRule;
}());
exports.OnlyOneExistRule = OnlyOneExistRule;
//# sourceMappingURL=OnlyOneExistRule.js.map