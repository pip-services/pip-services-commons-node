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
var InvalidStateException_1 = require("../errors/InvalidStateException");
var ConfigException_1 = require("../errors/ConfigException");
var Lock_1 = require("./Lock");
var MemcachedLock = /** @class */ (function (_super) {
    __extends(MemcachedLock, _super);
    function MemcachedLock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._connectionResolver = new ConnectionResolver_1.ConnectionResolver();
        _this._maxKeySize = 250;
        _this._maxExpiration = 2592000;
        _this._maxValue = 1048576;
        _this._poolSize = 5;
        _this._reconnect = 10000;
        _this._timeout = 5000;
        _this._retries = 5;
        _this._failures = 5;
        _this._retry = 30000;
        _this._remove = false;
        _this._idle = 5000;
        _this._client = null;
        return _this;
    }
    MemcachedLock.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        this._connectionResolver.configure(config);
        this._maxKeySize = config.getAsIntegerWithDefault('options.max_key_size', this._maxKeySize);
        this._maxExpiration = config.getAsLongWithDefault('options.max_expiration', this._maxExpiration);
        this._maxValue = config.getAsLongWithDefault('options.max_value', this._maxValue);
        this._poolSize = config.getAsIntegerWithDefault('options.pool_size', this._poolSize);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
        this._retries = config.getAsIntegerWithDefault('options.retries', this._retries);
        this._failures = config.getAsIntegerWithDefault('options.failures', this._failures);
        this._retry = config.getAsIntegerWithDefault('options.retry', this._retry);
        this._remove = config.getAsBooleanWithDefault('options.remove', this._remove);
        this._idle = config.getAsIntegerWithDefault('options.idle', this._idle);
    };
    MemcachedLock.prototype.setReferences = function (references) {
        this._connectionResolver.setReferences(references);
    };
    MemcachedLock.prototype.isOpened = function () {
        return this._client;
    };
    MemcachedLock.prototype.open = function (correlationId, callback) {
        var _this = this;
        this._connectionResolver.resolveAll(correlationId, function (err, connections) {
            if (err == null && connections.length == 0)
                err = new ConfigException_1.ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');
            if (err != null) {
                callback(err);
                return;
            }
            var servers = [];
            for (var _i = 0, connections_1 = connections; _i < connections_1.length; _i++) {
                var connection = connections_1[_i];
                var host = connection.getHost();
                var port = connection.getPort() || 11211;
                servers.push(host + ':' + port);
            }
            var options = {
                maxKeySize: _this._maxKeySize,
                _maxExpiration: _this._maxExpiration,
                _maxValue: _this._maxValue,
                _poolSize: _this._poolSize,
                _reconnect: _this._reconnect,
                _timeout: _this._timeout,
                _retries: _this._retries,
                _failures: _this._failures,
                _retry: _this._retry,
                _remove: _this._remove,
                _idle: _this._idle
            };
            var Memcached = require('memcached');
            _this._client = new Memcached(servers, options);
            if (callback)
                callback(null);
        });
    };
    MemcachedLock.prototype.close = function (correlationId, callback) {
        this._client = null;
        if (callback)
            callback(null);
    };
    MemcachedLock.prototype.checkOpened = function (correlationId, callback) {
        if (!this.isOpened()) {
            var err = new InvalidStateException_1.InvalidStateException(correlationId, 'NOT_OPENED', 'Connection is not opened');
            callback(err, null);
            return false;
        }
        return true;
    };
    MemcachedLock.prototype.tryAcquireLock = function (correlationId, key, ttl, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        var lifetimeInSec = ttl / 1000;
        this._client.add(key, 'lock', lifetimeInSec, function (err) {
            if (err && err.message && err.message.indexOf('not stored') >= 0)
                callback(null, false);
            else
                callback(err, err == null);
        });
    };
    MemcachedLock.prototype.releaseLock = function (correlationId, key, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        this._client.del(key, callback);
    };
    return MemcachedLock;
}(Lock_1.Lock));
exports.MemcachedLock = MemcachedLock;
//# sourceMappingURL=MemcachedLock.js.map