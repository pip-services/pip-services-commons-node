"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NullCache = /** @class */ (function () {
    function NullCache() {
    }
    NullCache.prototype.retrieve = function (correlationId, key, callback) {
        callback(null, null);
    };
    NullCache.prototype.store = function (correlationId, key, value, timeout, callback) {
        callback(null, value);
    };
    NullCache.prototype.remove = function (correlationId, key, callback) {
        callback(null);
    };
    return NullCache;
}());
exports.NullCache = NullCache;
//# sourceMappingURL=NullCache.js.map