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
var StringValueMap_1 = require("./StringValueMap");
var FilterParams = /** @class */ (function (_super) {
    __extends(FilterParams, _super);
    function FilterParams(map) {
        if (map === void 0) { map = null; }
        return _super.call(this, map) || this;
    }
    FilterParams.fromValue = function (value) {
        return new FilterParams(value);
    };
    FilterParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new FilterParams(map);
    };
    FilterParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new FilterParams(map);
    };
    return FilterParams;
}(StringValueMap_1.StringValueMap));
exports.FilterParams = FilterParams;
//# sourceMappingURL=FilterParams.js.map