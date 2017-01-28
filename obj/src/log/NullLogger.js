"use strict";
var LogLevel_1 = require("./LogLevel");
var Descriptor_1 = require("../refer/Descriptor");
var NullLogger = (function () {
    function NullLogger() {
        this._descriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "null", "default", "1.0");
    }
    NullLogger.prototype.getDescriptor = function () {
        return this._descriptor;
    };
    NullLogger.prototype.getLevel = function () { return LogLevel_1.LogLevel.None; };
    NullLogger.prototype.setLevel = function (value) { };
    NullLogger.prototype.log = function (level, correlationId, error, message) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
    };
    NullLogger.prototype.fatal = function (correlationId, error, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
    };
    NullLogger.prototype.error = function (correlationId, error, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
    };
    NullLogger.prototype.warn = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
    };
    NullLogger.prototype.info = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
    };
    NullLogger.prototype.debug = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
    };
    NullLogger.prototype.trace = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
    };
    return NullLogger;
}());
exports.NullLogger = NullLogger;
//# sourceMappingURL=NullLogger.js.map