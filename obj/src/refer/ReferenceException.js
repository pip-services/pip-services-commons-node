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
 * Exception thrown when required component is not found in references
 */
var ReferenceException = /** @class */ (function (_super) {
    __extends(ReferenceException, _super);
    function ReferenceException(correlationId, locator) {
        var _this = _super.call(this, correlationId, "REF_ERROR", "Failed to obtain reference to " + locator) || this;
        _this.withDetails("locator", locator);
        return _this;
    }
    return ReferenceException;
}(InternalException_1.InternalException));
exports.ReferenceException = ReferenceException;
//# sourceMappingURL=ReferenceException.js.map