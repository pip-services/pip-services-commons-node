"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IntegerConverter_1 = require("../convert/IntegerConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var AnyValueMap_1 = require("./AnyValueMap");
var PagingParams = (function () {
    function PagingParams(skip, take, total) {
        if (skip === void 0) { skip = null; }
        if (take === void 0) { take = null; }
        if (total === void 0) { total = null; }
        this.skip = IntegerConverter_1.IntegerConverter.toNullableInteger(skip);
        this.take = IntegerConverter_1.IntegerConverter.toNullableInteger(take);
        this.total = BooleanConverter_1.BooleanConverter.toBooleanWithDefault(total, false);
    }
    PagingParams.prototype.getSkip = function (minSkip) {
        if (this.skip == null)
            return minSkip;
        if (this.skip < minSkip)
            return minSkip;
        return this.skip;
    };
    PagingParams.prototype.getTake = function (maxTake) {
        if (this.take == null)
            return maxTake;
        if (this.take < 0)
            return 0;
        if (this.take > maxTake)
            return maxTake;
        return this.take;
    };
    PagingParams.fromValue = function (value) {
        if (value instanceof PagingParams)
            return value;
        var map = AnyValueMap_1.AnyValueMap.fromValue(value);
        return PagingParams.fromMap(map);
    };
    PagingParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromTuples(tuples);
        return PagingParams.fromMap(map);
    };
    PagingParams.fromMap = function (map) {
        var skip = map.getAsNullableInteger("skip");
        var take = map.getAsNullableInteger("take");
        var total = map.getAsBooleanWithDefault("total", true);
        return new PagingParams(skip, take, total);
    };
    return PagingParams;
}());
exports.PagingParams = PagingParams;
//# sourceMappingURL=PagingParams.js.map