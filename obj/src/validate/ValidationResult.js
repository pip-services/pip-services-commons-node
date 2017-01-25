"use strict";
var ValidationResult = (function () {
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
    Object.defineProperty(ValidationResult.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "expected", {
        get: function () {
            return this._expected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "actual", {
        get: function () {
            return this._actual;
        },
        enumerable: true,
        configurable: true
    });
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
//# sourceMappingURL=ValidationResult.js.map