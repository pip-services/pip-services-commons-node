"use strict";
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var NotRule = (function () {
    function NotRule(rule) {
        this._rule = rule;
    }
    NotRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rule)
            return;
        var localResults = [];
        this._rule.validate(path, schema, value, localResults);
        if (localResults.length > 0)
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "NOT_FAILED", "Negative check failed", null, null));
    };
    return NotRule;
}());
exports.NotRule = NotRule;
//# sourceMappingURL=NotRule.js.map