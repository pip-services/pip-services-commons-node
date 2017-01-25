"use strict";
var LogMessage = (function () {
    function LogMessage(level, source, correlationId, error, message) {
        this._time = new Date();
        this._level = level;
        this._source = source;
        this._correlationId = correlationId;
        this._error = error;
        this._message = message;
    }
    LogMessage.prototype.getTime = function () { return this._time; };
    LogMessage.prototype.setTime = function (value) { this._time = value; };
    LogMessage.prototype.getSource = function () { return this._source; };
    LogMessage.prototype.setSource = function (value) { this._source = value; };
    LogMessage.prototype.getLevel = function () { return this._level; };
    LogMessage.prototype.setLevel = function (value) { this._level = value; };
    LogMessage.prototype.getCorrelationId = function () { return this._correlationId; };
    LogMessage.prototype.setCorrelationId = function (value) { this._correlationId = value; };
    LogMessage.prototype.getError = function () { return this._error; };
    LogMessage.prototype.setError = function (value) { this._error = value; };
    LogMessage.prototype.getMessage = function () { return this._message; };
    LogMessage.prototype.setMessage = function (value) { this._message = value; };
    return LogMessage;
}());
exports.LogMessage = LogMessage;
//# sourceMappingURL=LogMessage.js.map