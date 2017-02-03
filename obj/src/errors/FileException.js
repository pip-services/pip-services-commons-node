"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Errors in read/write file operations
 */
var FileException = (function (_super) {
    __extends(FileException, _super);
    function FileException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.FileError, correlation_id, code, message) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = FileException.prototype;
        _this.status = 500;
        return _this;
    }
    return FileException;
}(ApplicationException_1.ApplicationException));
exports.FileException = FileException;
//# sourceMappingURL=FileException.js.map