"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NullLock = /** @class */ (function () {
    function NullLock() {
    }
    NullLock.prototype.tryAcquireLock = function (correlationId, key, ttl, callback) {
        callback(null, true);
    };
    NullLock.prototype.acquireLock = function (correlationId, key, ttl, timeout, callback) {
        callback(null);
    };
    NullLock.prototype.releaseLock = function (correlationId, key, callback) {
        if (callback)
            callback(null);
    };
    return NullLock;
}());
exports.NullLock = NullLock;
//# sourceMappingURL=NullLock.js.map