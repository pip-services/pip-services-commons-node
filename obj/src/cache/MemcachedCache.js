"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionResolver_1 = require("../connect/ConnectionResolver");
var InvalidStateException_1 = require("../errors/InvalidStateException");
var ConfigException_1 = require("../errors/ConfigException");
var MemcachedCache = /** @class */ (function () {
    function MemcachedCache() {
        this._connectionResolver = new ConnectionResolver_1.ConnectionResolver();
        this._maxKeySize = 250;
        this._maxExpiration = 2592000;
        this._maxValue = 1048576;
        this._poolSize = 5;
        this._reconnect = 10000;
        this._timeout = 5000;
        this._retries = 5;
        this._failures = 5;
        this._retry = 30000;
        this._remove = false;
        this._idle = 5000;
        this._client = null;
    }
    MemcachedCache.prototype.configure = function (config) {
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
    MemcachedCache.prototype.setReferences = function (references) {
        this._connectionResolver.setReferences(references);
    };
    MemcachedCache.prototype.isOpened = function () {
        return this._client;
    };
    MemcachedCache.prototype.open = function (correlationId, callback) {
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
                maxExpiration: _this._maxExpiration,
                maxValue: _this._maxValue,
                poolSize: _this._poolSize,
                reconnect: _this._reconnect,
                timeout: _this._timeout,
                retries: _this._retries,
                failures: _this._failures,
                retry: _this._retry,
                remove: _this._remove,
                idle: _this._idle
            };
            var Memcached = require('memcached');
            _this._client = new Memcached(servers, options);
            if (callback)
                callback(null);
        });
    };
    MemcachedCache.prototype.close = function (correlationId, callback) {
        this._client = null;
        if (callback)
            callback(null);
    };
    MemcachedCache.prototype.checkOpened = function (correlationId, callback) {
        if (!this.isOpened()) {
            var err = new InvalidStateException_1.InvalidStateException(correlationId, 'NOT_OPENED', 'Connection is not opened');
            callback(err, null);
            return false;
        }
        return true;
    };
    MemcachedCache.prototype.retrieve = function (correlationId, key, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        this._client.get(key, callback);
    };
    MemcachedCache.prototype.store = function (correlationId, key, value, timeout, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        var timeoutInSec = timeout / 1000;
        this._client.set(key, value, timeoutInSec, callback);
    };
    MemcachedCache.prototype.remove = function (correlationId, key, callback) {
        if (!this.checkOpened(correlationId, callback))
            return;
        this._client.del(key, callback);
    };
    return MemcachedCache;
}());
exports.MemcachedCache = MemcachedCache;
//# sourceMappingURL=MemcachedCache.js.map