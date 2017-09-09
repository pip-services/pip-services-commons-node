"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ObjectComparator_1 = require("./ObjectComparator");
var ValidationResultType_1 = require("./ValidationResultType");
var ValueComparisonRule = /** @class */ (function () {
    function ValueComparisonRule(operation, value) {
        this._operation = operation;
        this._value = value;
    }
    ValueComparisonRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        if (!ObjectComparator_1.ObjectComparator.compare(value, this._operation, this._value)) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "BAD_VALUE", name + " must " + this._operation + " " + this._value + " but found " + value, this._operation + " " + this._value, value));
        }
    };
    return ValueComparisonRule;
}());
exports.ValueComparisonRule = ValueComparisonRule;
//# sourceMappingURL=ValueComparisonRule.js.map