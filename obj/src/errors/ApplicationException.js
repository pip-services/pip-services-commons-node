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
var _ = require('lodash');
var ErrorCategory_1 = require("./ErrorCategory");
var StringValueMap_1 = require("../data/StringValueMap");
var ApplicationException = (function (_super) {
    __extends(ApplicationException, _super);
    function ApplicationException(category, correlation_id, code, message) {
        if (category === void 0) { category = null; }
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.status = 500;
        _this.code = 'UNKNOWN';
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = ApplicationException.prototype;
        _this.category = category || ErrorCategory_1.ErrorCategory.Unknown;
        _this.correlation_id = correlation_id;
        _this.code = code || 'UNKNOWN';
        if (!_this.message)
            _this.message = message || 'Unknown error';
        _this.name = _this.code;
        return _this;
    }
    ApplicationException.prototype.getCauseString = function () {
        return this.cause != null ? this.cause.toString() : null;
    };
    ApplicationException.prototype.setCauseString = function (value) {
        this.cause = value;
    };
    ApplicationException.prototype.getStackTraceString = function () {
        return this.stack_trace || _super.prototype.stack;
    };
    ApplicationException.prototype.setStackTraceString = function (value) {
        this.stack_trace = value;
    };
    ApplicationException.prototype.withCode = function (code) {
        this.code = code || 'UNKNOWN';
        this.name = this.code;
        return this;
    };
    ApplicationException.prototype.withCause = function (cause) {
        if (cause)
            this.cause = cause.message;
        return this;
    };
    ApplicationException.prototype.withStatus = function (status) {
        this.status = status || 500;
        return this;
    };
    ApplicationException.prototype.withDetails = function (key, value) {
        this.details = this.details || new StringValueMap_1.StringValueMap();
        this.details.setAsObject(key, value);
        return this;
    };
    ApplicationException.prototype.withCorrelationId = function (correlation_id) {
        this.correlation_id = correlation_id;
        return this;
    };
    ApplicationException.prototype.withStackTrace = function (stackTrace) {
        this.stack_trace = stackTrace;
        return this;
    };
    ApplicationException.prototype.wrap = function (cause) {
        cause = ApplicationException.unwrapError(cause);
        if (cause instanceof ApplicationException)
            return cause;
        this.withCause(cause);
        return this;
    };
    ApplicationException.wrapError = function (error, cause) {
        cause = ApplicationException.unwrapError(cause);
        if (cause instanceof ApplicationException)
            return cause;
        error.withCause(cause);
        return error;
    };
    ApplicationException.unwrapError = function (error) {
        if (error == null)
            return null;
        // Unwrapping Seneca exceptions
        if (error.code == 'act_execute' && error.orig) {
            error = error.orig;
            if (error.orig)
                error = error.orig;
        }
        // Unwrapping restify exceptions 
        if (error.body && !_.isEmpty(error.body))
            error = error.body;
        return error;
    };
    return ApplicationException;
}(Error));
exports.ApplicationException = ApplicationException;
//# sourceMappingURL=ApplicationException.js.map