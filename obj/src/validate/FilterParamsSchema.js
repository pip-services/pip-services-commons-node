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
var MapSchema_1 = require("./MapSchema");
var FilterParamsSchema = /** @class */ (function (_super) {
    __extends(FilterParamsSchema, _super);
    function FilterParamsSchema() {
        return _super.call(this, null, null, TypeCode_1.TypeCode.String, null) || this;
    }
    return FilterParamsSchema;
}(MapSchema_1.MapSchema));
exports.FilterParamsSchema = FilterParamsSchema;
//# sourceMappingURL=FilterParamsSchema.js.map