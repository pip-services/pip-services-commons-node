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
var SortParams = (function (_super) {
    __extends(SortParams, _super);
    function SortParams(fields) {
        if (fields === void 0) { fields = null; }
        var _this = _super.call(this) || this;
        if (fields != null) {
            for (var index = 0; index < fields.length; index++)
                _this.push(fields[index]);
        }
        return _this;
    }
    return SortParams;
}(Array));
exports.SortParams = SortParams;
//# sourceMappingURL=SortParams.js.map