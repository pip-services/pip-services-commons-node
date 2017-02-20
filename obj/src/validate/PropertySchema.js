"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Schema_1 = require("./Schema");
var PropertySchema = (function (_super) {
    __extends(PropertySchema, _super);
    function PropertySchema(required, rules, name, type) {
        var _this = _super.call(this, required, rules) || this;
        _this._name = name;
        _this._type = type;
        return _this;
    }
    PropertySchema.prototype.getName = function () {
        return this._name;
    };
    PropertySchema.prototype.setName = function (value) {
        this._name = value;
    };
    PropertySchema.prototype.getType = function () {
        return this._type;
    };
    PropertySchema.prototype.setType = function (value) {
        this._type = value;
    };
    PropertySchema.prototype.performValidation = function (path, value, results) {
        path = path ? this.getName() : path + "." + this.getName();
        _super.prototype.performValidation.call(this, path, value, results);
        _super.prototype.performTypeValidation.call(this, path, this.getType(), value, results);
    };
    return PropertySchema;
}(Schema_1.Schema));
exports.PropertySchema = PropertySchema;
//# sourceMappingURL=PropertySchema.js.map