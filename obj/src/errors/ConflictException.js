"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Errors raised by conflict in object versions posted by user and stored on server.
 */
var ConflictException = (function (_super) {
    __extends(ConflictException, _super);
    function ConflictException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.Conflict, correlation_id, code, message) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = ConflictException.prototype;
        _this.status = 409;
        return _this;
    }
    return ConflictException;
}(ApplicationException_1.ApplicationException));
exports.ConflictException = ConflictException;
//# sourceMappingURL=ConflictException.js.map