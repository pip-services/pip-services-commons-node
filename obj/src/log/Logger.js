"use strict";
var LogLevel_1 = require("./LogLevel");
var LogLevelConverter_1 = require("./LogLevelConverter");
var Logger = (function () {
    function Logger() {
        this._level = LogLevel_1.LogLevel.Info;
    }
    Logger.prototype.configure = function (config) {
        this._level = LogLevelConverter_1.LogLevelConverter.toLogLevel(config.getAsObject("level"));
    };
    Logger.prototype.getLevel = function () {
        return this._level;
    };
    Logger.prototype.setLevel = function (value) {
        this._level = value;
    };
    Logger.prototype.formatAndWrite = function (level, correlationId, error, message) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            message = message.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        }
        this.write(level, correlationId, error, message);
    };
    Logger.prototype.log = function (level, correlationId, error, message) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        this.formatAndWrite(level, correlationId, error, message, args);
    };
    Logger.prototype.fatal = function (correlationId, error, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.formatAndWrite(LogLevel_1.LogLevel.Fatal, correlationId, error, message, args);
    };
    Logger.prototype.error = function (correlationId, error, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.formatAndWrite(LogLevel_1.LogLevel.Error, correlationId, error, message, args);
    };
    Logger.prototype.warn = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite(LogLevel_1.LogLevel.Warn, correlationId, null, message, args);
    };
    Logger.prototype.info = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite(LogLevel_1.LogLevel.Warn, correlationId, null, message, args);
    };
    Logger.prototype.debug = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite(LogLevel_1.LogLevel.Warn, correlationId, null, message, args);
    };
    Logger.prototype.trace = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite(LogLevel_1.LogLevel.Warn, correlationId, null, message, args);
    };
    Logger.prototype.composeError = function (error) {
        var builder = "";
        if (builder.length > 0)
            builder += " Caused by error: ";
        builder += error.message;
        builder += " StackTrace: ";
        builder += error.stack;
        return builder;
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map