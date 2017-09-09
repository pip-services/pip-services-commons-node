"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult = /** @class */ (function () {
    function ValidationResult(path, type, code, message, expected, actual) {
        if (path === void 0) { path = null; }
        if (type === void 0) { type = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        if (expected === void 0) { expected = null; }
        if (actual === void 0) { actual = null; }
        this._path = path;
        this._type = type;
        this._code = code;
        this._message = message;
        this._expected = expected;
        this._actual = actual;
    }
    ValidationResult.prototype.getPath = function () {
        return this._path;
    };
    ValidationResult.prototype.getType = function () {
        return this._type;
    };
    ValidationResult.prototype.getCode = function () {
        return this._code;
    };
    ValidationResult.prototype.getMessage = function () {
        return this._message;
    };
    ValidationResult.prototype.getExpected = function () {
        return this._expected;
    };
    ValidationResult.prototype.getActual = function () {
        return this._actual;
    };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
//# sourceMappingURL=ValidationResult.js.map