"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ValidationException_1 = require("./ValidationException");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeMatcher_1 = require("../reflect/TypeMatcher");
var TypeConverter_1 = require("../convert/TypeConverter");
var Schema = /** @class */ (function () {
    function Schema(required, rules) {
        this._required = required;
        this._rules = rules;
    }
    Schema.prototype.isRequired = function () {
        return this._required;
    };
    Schema.prototype.setRequired = function (value) {
        this._required = value;
    };
    Schema.prototype.getRules = function () {
        return this._rules;
    };
    Schema.prototype.setRules = function (value) {
        this._rules = value;
    };
    Schema.prototype.makeRequired = function () {
        this._required = true;
        return this;
    };
    Schema.prototype.makeOptional = function () {
        this._required = false;
        return this;
    };
    Schema.prototype.withRule = function (rule) {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    };
    Schema.prototype.performValidation = function (path, value, results) {
        var name = path || "value";
        if (value == null) {
            if (this.isRequired()) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_IS_NULL", name + " must not be null", "NOT NULL", null));
            }
        }
        else {
            value = ObjectReader_1.ObjectReader.getValue(value);
            // Check validation rules
            if (this._rules != null) {
                for (var i = 0; i < this._rules.length; i++) {
                    var rule = this._rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    };
    Schema.prototype.typeToString = function (type) {
        if (type == null)
            return "unknown";
        if (_.isNumber(type))
            return TypeConverter_1.TypeConverter.toString(type);
        return type.toString();
    };
    Schema.prototype.performTypeValidation = function (path, type, value, results) {
        // If type it not defined then skip
        if (type == null)
            return;
        // Perform validation against schema
        if (type instanceof Schema) {
            var schema = type;
            schema.performValidation(path, value, results);
            return;
        }
        // If value is null then skip
        value = ObjectReader_1.ObjectReader.getValue(value);
        if (value == null)
            return;
        var name = path || "value";
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Match types
        if (TypeMatcher_1.TypeMatcher.matchType(type, valueType))
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "TYPE_MISMATCH", name + " type must be " + this.typeToString(type) + " but found " + this.typeToString(valueType), type, valueType.toString()));
    };
    Schema.prototype.validate = function (value) {
        var results = [];
        this.performValidation("", value, results);
        return results;
    };
    Schema.prototype.validateAndReturnException = function (correlationId, value, strict) {
        if (strict === void 0) { strict = false; }
        var results = this.validate(value);
        return ValidationException_1.ValidationException.fromResults(correlationId, results, strict);
    };
    Schema.prototype.validateAndThrowException = function (correlationId, value, strict) {
        if (strict === void 0) { strict = false; }
        var results = this.validate(value);
        ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map