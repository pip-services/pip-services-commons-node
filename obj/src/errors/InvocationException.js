"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Errors returned by remote services or network during call attempts
 */
var InvocationException = (function (_super) {
    __extends(InvocationException, _super);
    function InvocationException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.FailedInvocation, correlation_id, code, message) || this;
        _this.status = 500;
        return _this;
    }
    return InvocationException;
}(ApplicationException_1.ApplicationException));
exports.InvocationException = InvocationException;
//# sourceMappingURL=InvocationException.js.map