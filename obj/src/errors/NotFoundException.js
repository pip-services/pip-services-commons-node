"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Error caused by attempt to access missing object
 */
var NotFoundException = (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.NotFound, correlation_id, code, message) || this;
        _this.status = 404;
        return _this;
    }
    return NotFoundException;
}(ApplicationException_1.ApplicationException));
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map