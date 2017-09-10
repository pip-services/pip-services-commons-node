"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ExcludedRule = /** @class */ (function () {
    function ExcludedRule() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._values = values;
    }
    ExcludedRule.prototype.validate = function (path, schema, value, results) {
        if (!this._values)
            return;
        var name = path || "value";
        var found = false;
        for (var i = 0; i < this._values.length && !found; i++) {
            var thisValue = this._values[i];
            if (thisValue && thisValue == value) {
                found = true;
            }
        }
        if (found) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_INCLUDED", name + " must not be one of " + this._values, this._values, null));
        }
    };
    return ExcludedRule;
}());
exports.ExcludedRule = ExcludedRule;
//# sourceMappingURL=ExcludedRule.js.map