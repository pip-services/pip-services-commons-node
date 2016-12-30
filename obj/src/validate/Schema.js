"use strict";
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ValidationException_1 = require("./ValidationException");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeMatcher_1 = require("../reflect/TypeMatcher");
var TypeConverter_1 = require("../convert/TypeConverter");
var Schema = (function () {
    function Schema(required, rules) {
        this._isRequired = required;
        this._rules = rules;
    }
    Object.defineProperty(Schema.prototype, "isRequired", {
        get: function () {
            return this._isRequired;
        },
        set: function (value) {
            this._isRequired = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "rules", {
        get: function () {
            return this._rules;
        },
        set: function (value) {
            this._rules = value;
        },
        enumerable: true,
        configurable: true
    });
    Schema.prototype.makeRequired = function () {
        this._isRequired = true;
        return this;
    };
    Schema.prototype.makeOptional = function () {
        this._isRequired = false;
        return this;
    };
    Schema.prototype.withRule = function (rule) {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    };
    Schema.prototype.performValidation = function (path, value, results) {
        if (!value) {
            if (this.isRequired) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_IS_NULL", "value cannot be null", "NOT NULL", null));
            }
        }
        else {
            value = ObjectReader_1.ObjectReader.getValue(value);
            // Check validation rules
            if (this.rules != null) {
                for (var i = 0; i < this.rules.length; i++) {
                    var rule = this.rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    };
    Schema.prototype.performTypeValidation = function (path, type, value, results) {
        // If type it not defined then skip
        if (!type)
            return;
        // Perform validation against schema
        var schema = type;
        if (schema) {
            schema.performValidation(path, value, results);
            return;
        }
        // If value is null then skip
        value = ObjectReader_1.ObjectReader.getValue(value);
        if (!value)
            return;
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Match types
        if (TypeMatcher_1.TypeMatcher.matchType(type, valueType))
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "TYPE_MISMATCH", "Expected type " + type + " but found " + valueType.toString(), type, valueType.toString()));
    };
    Schema.prototype.validate = function (value) {
        var results = [];
        this.performValidation("", value, results);
        return results;
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