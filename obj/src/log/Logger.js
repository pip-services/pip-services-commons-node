"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
var LogLevel_1 = require("./LogLevel");
var LogLevelConverter_1 = require("./LogLevelConverter");
var Descriptor_1 = require("../refer/Descriptor");
var Logger = /** @class */ (function () {
    function Logger() {
        this._level = LogLevel_1.LogLevel.Info;
        this._source = null;
    }
    Logger.prototype.configure = function (config) {
        this._level = LogLevelConverter_1.LogLevelConverter.toLogLevel(config.getAsObject("level"), this._level);
        this._source = config.getAsStringWithDefault("source", this._source);
    };
    Logger.prototype.setReferences = function (references) {
        var contextInfo = references.getOneOptional(new Descriptor_1.Descriptor("pip-services", "context-info", "*", "*", "1.0"));
        if (contextInfo != null && this._source == null) {
            this._source = contextInfo.name;
        }
    };
    Logger.prototype.getLevel = function () {
        return this._level;
    };
    Logger.prototype.setLevel = function (value) {
        this._level = value;
    };
    Logger.prototype.getSource = function () {
        return this._source;
    };
    Logger.prototype.setSource = function (value) {
        this._source = value;
    };
    Logger.prototype.formatAndWrite = function (level, correlationId, error, message) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            // message = message.replace(/{(\d+)}/g, function (match, number) {
            //     return typeof args[number] != 'undefined' ? args[number] : match;
            // });
            message = util.format.apply(util, [message].concat(args));
        }
        this.write(level, correlationId, error, message);
    };
    Logger.prototype.log = function (level, correlationId, error, message) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [level, correlationId, error, message].concat(args));
    };
    Logger.prototype.fatal = function (correlationId, error, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [LogLevel_1.LogLevel.Fatal, correlationId, error, message].concat(args));
    };
    Logger.prototype.error = function (correlationId, error, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [LogLevel_1.LogLevel.Error, correlationId, error, message].concat(args));
    };
    Logger.prototype.warn = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [LogLevel_1.LogLevel.Warn, correlationId, null, message].concat(args));
    };
    Logger.prototype.info = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [LogLevel_1.LogLevel.Info, correlationId, null, message].concat(args));
    };
    Logger.prototype.debug = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [LogLevel_1.LogLevel.Debug, correlationId, null, message].concat(args));
    };
    Logger.prototype.trace = function (correlationId, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.formatAndWrite.apply(this, [LogLevel_1.LogLevel.Trace, correlationId, null, message].concat(args));
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