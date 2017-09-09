"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AndRule = /** @class */ (function () {
    function AndRule() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        this._rules = rules;
    }
    AndRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rules)
            return;
        for (var i = 0; i < this._rules.length; i++) {
            var rule = this._rules[i];
            rule.validate(path, schema, value, results);
        }
    };
    return AndRule;
}());
exports.AndRule = AndRule;
//# sourceMappingURL=AndRule.js.map