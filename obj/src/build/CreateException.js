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
var InternalException_1 = require("../errors/InternalException");
/**
 * Exception thrown when component cannot be created by a factory
 */
var CreateException = /** @class */ (function (_super) {
    __extends(CreateException, _super);
    function CreateException(correlationId, messageOrLocator) {
        if (correlationId === void 0) { correlationId = null; }
        var _this = _super.call(this, correlationId, "CANNOT_CREATE", typeof (messageOrLocator) == 'string' ? messageOrLocator
            : "Requested component " + messageOrLocator + " cannot be created") || this;
        if (typeof (messageOrLocator) != 'string' && messageOrLocator != null)
            _this.withDetails("locator", messageOrLocator);
        return _this;
    }
    return CreateException;
}(InternalException_1.InternalException));
exports.CreateException = CreateException;
//# sourceMappingURL=CreateException.js.map