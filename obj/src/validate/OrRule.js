"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrRule = /** @class */ (function () {
    function OrRule() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        this._rules = rules;
    }
    OrRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rules || this._rules.length == 0)
            return;
        var localResults = [];
        for (var i = 0; i < this._rules.length; i++) {
            var resultCount = localResults.length;
            this._rules[i].validate(path, schema, value, localResults);
            if (resultCount == localResults.length)
                return;
        }
        results.push.apply(results, localResults);
    };
    return OrRule;
}());
exports.OrRule = OrRule;
//# sourceMappingURL=OrRule.js.map