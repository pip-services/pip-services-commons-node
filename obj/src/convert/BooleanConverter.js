"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var BooleanConverter = /** @class */ (function () {
    function BooleanConverter() {
    }
    BooleanConverter.toNullableBoolean = function (value) {
        if (value == null)
            return null;
        if (_.isBoolean(value))
            return value;
        if (_.isNumber(value))
            return !!value;
        value = value.toString().toLowerCase();
        if (value == '1' || value == 'true' || value == 't' || value == 'yes' || value == 'y')
            return true;
        if (value == '0' || value == 'false' || value == 'f' || value == 'no' || value == 'n')
            return false;
        return null;
    };
    BooleanConverter.toBoolean = function (value) {
        return BooleanConverter.toBooleanWithDefault(value, false);
    };
    BooleanConverter.toBooleanWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        var result = BooleanConverter.toNullableBoolean(value);
        return result != null ? result : defaultValue;
    };
    return BooleanConverter;
}());
exports.BooleanConverter = BooleanConverter;
//# sourceMappingURL=BooleanConverter.js.map