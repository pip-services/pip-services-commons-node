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
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var Schema_1 = require("./Schema");
var PropertySchema_1 = require("./PropertySchema");
var ObjectComparator_1 = require("./ObjectComparator");
var ObjectReader_1 = require("../reflect/ObjectReader");
var ObjectSchema = /** @class */ (function (_super) {
    __extends(ObjectSchema, _super);
    function ObjectSchema(allowExcessProperies, required, rules) {
        var _this = _super.call(this, required, rules) || this;
        _this._allowExcess = false;
        _this._allowExcess = allowExcessProperies;
        return _this;
    }
    Object.defineProperty(ObjectSchema.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        set: function (value) {
            this._properties = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectSchema.prototype, "isUndefinedAllowed", {
        get: function () {
            return this._isUndefinedAllowed;
        },
        set: function (value) {
            this._isUndefinedAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    ObjectSchema.prototype.allowUndefined = function (value) {
        this.isUndefinedAllowed = value;
        return this;
    };
    ObjectSchema.prototype.withProperty = function (schema) {
        this.properties = this.properties || [];
        this.properties.push(schema);
        return this;
    };
    ObjectSchema.prototype.withRequiredProperty = function (name, type) {
        var rules = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rules[_i - 2] = arguments[_i];
        }
        this.properties = this.properties || [];
        var schema = new PropertySchema_1.PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeRequired();
        return this.withProperty(schema);
    };
    ObjectSchema.prototype.withOptionalProperty = function (name, type) {
        var rules = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rules[_i - 2] = arguments[_i];
        }
        this.properties = this.properties || [];
        var schema = new PropertySchema_1.PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeOptional();
        return this.withProperty(schema);
    };
    ObjectSchema.prototype.performValidation = function (path, value, results) {
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        var name = path || "value";
        var properties = ObjectReader_1.ObjectReader.getProperties(value);
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var propertySchema = this.properties[i];
                var processedName = null;
                for (var key in properties) {
                    var propertyName = key;
                    var propertyValue = properties[key];
                    if (ObjectComparator_1.ObjectComparator.areEqual(propertySchema.getName(), propertyName)) {
                        propertySchema.performValidation(path, propertyValue, results);
                        processedName = propertyName;
                        break;
                    }
                }
                if (processedName)
                    delete properties[processedName];
                else
                    propertySchema.performValidation(path, null, results);
            }
        }
        if (!this._allowExcess)
            for (var key in properties) {
                var propertyPath = key && path != "" ? path + "." + key : key;
                results.push(new ValidationResult_1.ValidationResult(propertyPath, ValidationResultType_1.ValidationResultType.Warning, "UNEXPECTED_PROPERTY", name + " contains unexpected property " + key, null, key));
            }
    };
    return ObjectSchema;
}(Schema_1.Schema));
exports.ObjectSchema = ObjectSchema;
//# sourceMappingURL=ObjectSchema.js.map