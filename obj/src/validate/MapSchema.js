"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var Schema_1 = require("./Schema");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var MapSchema = (function (_super) {
    __extends(MapSchema, _super);
    function MapSchema(required, rules, keyType, valueType) {
        var _this = _super.call(this, required, rules) || this;
        _this._keyType = keyType;
        _this._valueType = valueType;
        return _this;
    }
    Object.defineProperty(MapSchema.prototype, "keyType", {
        get: function () {
            return this._keyType;
        },
        set: function (value) {
            this._keyType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSchema.prototype, "valueType", {
        get: function () {
            return this._valueType;
        },
        set: function (value) {
            this._valueType = value;
        },
        enumerable: true,
        configurable: true
    });
    MapSchema.prototype.performValidation = function (path, value, results) {
        value = ObjectReader_1.ObjectReader.getValue(value);
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        var map = valueType === TypeCode_1.TypeCode.Map ? value : null;
        if (map) {
            for (var key in map) {
                var elementPath = path ? path + "." + key : StringConverter_1.StringConverter.toString(key);
                this.performTypeValidation(elementPath, this.keyType, key, results);
                this.performTypeValidation(elementPath, this.valueType, map[key], results);
            }
        }
        else {
            if (this.isRequired) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_MAP", "Value type is expected to be Dictionary", TypeCode_1.TypeCode.Map, valueType));
            }
        }
    };
    return MapSchema;
}(Schema_1.Schema));
exports.MapSchema = MapSchema;
//# sourceMappingURL=MapSchema.js.map