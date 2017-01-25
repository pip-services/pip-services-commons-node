"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ValidationResultType_1 = require("./ValidationResultType");
var BadRequestException_1 = require("../errors/BadRequestException");
var ValidationException = (function (_super) {
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
                if (result.type == ValidationResultType_1.ValidationResultType.Information)
                    continue;
                builder += !first ? ": " : ", ";
                builder += result.message;
                first = false;
            }
        }
        return builder;
    };
    ValidationException.throwExceptionIfNeeded = function (correlationId, results, strict) {
        var hasErrors = false;
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            if (result.type == ValidationResultType_1.ValidationResultType.Error)
                hasErrors = true;
            if (strict && result.type == ValidationResultType_1.ValidationResultType.Warning)
                hasErrors = true;
        }
        if (hasErrors)
            throw new ValidationException(correlationId, null, results);
    };
    return ValidationException;
}(BadRequestException_1.BadRequestException));
ValidationException.SerialVersionUid = -1459801864235223845;
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map