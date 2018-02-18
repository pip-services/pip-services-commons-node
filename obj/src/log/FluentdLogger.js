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
var ConnectionResolver_1 = require("../connect/ConnectionResolver");
var ConfigException_1 = require("../errors/ConfigException");
var CachedLogger_1 = require("./CachedLogger");
var LogLevelConverter_1 = require("./LogLevelConverter");
var FluentdLogger = /** @class */ (function (_super) {
    __extends(FluentdLogger, _super);
    function FluentdLogger() {
        var _this = _super.call(this) || this;
        _this._connectionResolver = new ConnectionResolver_1.ConnectionResolver();
        _this._reconnect = 10000;
        _this._timeout = 3000;
        _this._client = null;
        return _this;
    }
    FluentdLogger.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        this._connectionResolver.configure(config);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
    };
    FluentdLogger.prototype.setReferences = function (references) {
        this._connectionResolver.setReferences(references);
    };
    FluentdLogger.prototype.isOpened = function () {
        return this._client;
    };
    FluentdLogger.prototype.open = function (correlationId, callback) {
        var _this = this;
        this._connectionResolver.resolve(correlationId, function (err, connection) {
            if (connection == null)
                err = new ConfigException_1.ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');
            if (err != null) {
                callback(err);
                return;
            }
            var host = connection.getHost();
            var port = connection.getPort() || 24224;
            var options = {
                host: host,
                port: port,
                timeout: _this._timeout / 1000,
                reconnectInterval: _this._reconnect
            };
            _this._client = require('fluent-logger');
            _this._client.configure(null, options);
            if (callback)
                callback(null);
        });
    };
    FluentdLogger.prototype.close = function (correlationId, callback) {
        this._client = null;
        if (callback)
            callback(null);
    };
    FluentdLogger.prototype.save = function (messages) {
        if (!this.isOpened())
            return;
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var level = LogLevelConverter_1.LogLevelConverter.toString(message.level).toLowerCase();
            var record = {
                level: message.level,
                source: message.source,
                correlation_id: message.correlation_id,
                error: message.error,
                message: message.message
            };
            this._client.emit(level, record);
        }
    };
    return FluentdLogger;
}(CachedLogger_1.CachedLogger));
exports.FluentdLogger = FluentdLogger;
//# sourceMappingURL=FluentdLogger.js.map