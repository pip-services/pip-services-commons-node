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
var TypeCode_1 = require("../convert/TypeCode");
var ObjectSchema_1 = require("./ObjectSchema");
var PagingParamsSchema = /** @class */ (function (_super) {
    __extends(PagingParamsSchema, _super);
    function PagingParamsSchema() {
        var _this = _super.call(this) || this;
        _this.withOptionalProperty("skip", TypeCode_1.TypeCode.Long);
        _this.withOptionalProperty("take", TypeCode_1.TypeCode.Long);
        _this.withOptionalProperty("total", TypeCode_1.TypeCode.Boolean);
        return _this;
    }
    return PagingParamsSchema;
}(ObjectSchema_1.ObjectSchema));
exports.PagingParamsSchema = PagingParamsSchema;
//# sourceMappingURL=PagingParamsSchema.js.map