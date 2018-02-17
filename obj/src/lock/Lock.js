"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConflictException_1 = require("../errors/ConflictException");
var Lock = /** @class */ (function () {
    function Lock() {
        this._retryTimeout = 100;
    }
    Lock.prototype.configure = function (config) {
        this._retryTimeout = config.getAsIntegerWithDefault("options.retry_timeout", this._retryTimeout);
    };
    Lock.prototype.acquireLock = function (correlationId, key, ttl, timeout, callback) {
        var _this = this;
        var retryTime = new Date().getTime() + timeout;
        // Try to get lock first
        this.tryAcquireLock(correlationId, key, ttl, function (err, result) {
            if (err || result) {
                callback(err);
                return;
            }
            // Start retrying
            var interval = setInterval(function () {
                // When timeout expires return false
                var now = new Date().getTime();
                if (now > retryTime) {
                    clearInterval(interval);
                    var err_1 = new ConflictException_1.ConflictException(correlationId, "LOCK_TIMEOUT", "Acquiring lock " + key + " failed on timeout").withDetails("key", key);
                    callback(err_1);
                    return;
                }
                _this.tryAcquireLock(correlationId, key, ttl, function (err, result) {
                    if (err || result) {
                        clearInterval(interval);
                        callback(err);
                    }
                });
            }, _this._retryTimeout);
        });
    };
    return Lock;
}());
exports.Lock = Lock;
//# sourceMappingURL=Lock.js.map