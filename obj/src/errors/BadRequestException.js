"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Errors due to improper user requests, like missing or wrong parameters
 */
var BadRequestException = (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.BadRequest, correlation_id, code, message) || this;
        _this.status = 400;
        return _this;
    }
    return BadRequestException;
}(ApplicationException_1.ApplicationException));
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map