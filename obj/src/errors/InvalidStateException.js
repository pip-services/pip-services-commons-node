"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Errors related to operations called in wrong component state.
 * For instance, business calls when component is not ready
 */
var InvalidStateException = (function (_super) {
    __extends(InvalidStateException, _super);
    function InvalidStateException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.InvalidState, correlation_id, code, message) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = InvalidStateException.prototype;
        _this.status = 500;
        return _this;
    }
    return InvalidStateException;
}(ApplicationException_1.ApplicationException));
exports.InvalidStateException = InvalidStateException;
//# sourceMappingURL=InvalidStateException.js.map