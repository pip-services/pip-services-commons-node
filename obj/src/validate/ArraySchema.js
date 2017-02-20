"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var Schema_1 = require("../validate/Schema");
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var ArraySchema = (function (_super) {
    __extends(ArraySchema, _super);
    function ArraySchema(valueType) {
        var _this = _super.call(this) || this;
        _this._valueType = valueType;
        return _this;
    }
    Object.defineProperty(ArraySchema.prototype, "valueType", {
        get: function () {
            return this._valueType;
        },
        enumerable: true,
        configurable: true
    });
    ArraySchema.prototype.performValidation = function (path, value, results) {
        value = ObjectReader_1.ObjectReader.getValue(value);
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        if (_.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                var elementPath = !path ? i.toString() : path + "." + i;
                this.performTypeValidation(elementPath, this.valueType, value[i], results);
            }
        }
        else {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_ARRAY", "Value type is expected to be List or array", TypeCode_1.TypeCode.Array, TypeConverter_1.TypeConverter.toTypeCode(value)));
        }
    };
    return ArraySchema;
}(Schema_1.Schema));
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=ArraySchema.js.map