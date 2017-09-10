"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResultType_1 = require("./ValidationResultType");
var BadRequestException_1 = require("../errors/BadRequestException");
var ValidationException = /** @class */ (function (_super) {
    __extends(ValidationException, _super);
    function ValidationException(correlationId, message, results) {
        var _this = _super.call(this, correlationId, "INVALID_DATA", message || ValidationException.composeMessage(results)) || this;
        if (results)
            _this.withDetails("results", results);
        return _this;
    }
    ValidationException.composeMessage = function (results) {
        var builder = "Validation failed";
        if (results && results.length > 0) {
            var first = true;
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                if (result.getType() == ValidationResultType_1.ValidationResultType.Information)
                    continue;
                builder += !first ? ": " : ", ";
                builder += result.getMessage();
                first = false;
            }
        }
        return builder;
    };
    ValidationException.fromResults = function (correlationId, results, strict) {
        var hasErrors = false;
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            if (result.getType() == ValidationResultType_1.ValidationResultType.Error)
                hasErrors = true;
            if (strict && result.getType() == ValidationResultType_1.ValidationResultType.Warning)
                hasErrors = true;
        }
        return hasErrors ? new ValidationException(correlationId, null, results) : null;
    };
    ValidationException.throwExceptionIfNeeded = function (correlationId, results, strict) {
        var ex = ValidationException.fromResults(correlationId, results, strict);
        if (ex)
            throw ex;
    };
    ValidationException.SerialVersionUid = -1459801864235223845;
    return ValidationException;
}(BadRequestException_1.BadRequestException));
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map