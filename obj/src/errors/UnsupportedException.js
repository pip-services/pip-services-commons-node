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
var ErrorCategory_1 = require("./ErrorCategory");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Errors caused by calls to unsupported or not yet implemented functionality
 */
var UnsupportedException = /** @class */ (function (_super) {
    __extends(UnsupportedException, _super);
    function UnsupportedException(correlation_id, code, message) {
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, ErrorCategory_1.ErrorCategory.Unsupported, correlation_id, code, message) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = UnsupportedException.prototype;
        _this.status = 500;
        return _this;
    }
    return UnsupportedException;
}(ApplicationException_1.ApplicationException));
exports.UnsupportedException = UnsupportedException;
//# sourceMappingURL=UnsupportedException.js.map