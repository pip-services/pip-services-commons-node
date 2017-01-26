"use strict";
var CacheEntry = (function () {
    function CacheEntry(key, value, timeout) {
        this._key = key;
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }
    Object.defineProperty(CacheEntry.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CacheEntry.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CacheEntry.prototype, "expiration", {
        get: function () {
            return this._expiration;
        },
        enumerable: true,
        configurable: true
    });
    CacheEntry.prototype.setValue = function (value, timeout) {
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    };
    CacheEntry.prototype.isExpired = function () {
        return this._expiration < new Date().getTime();
    };
    return CacheEntry;
}());
exports.CacheEntry = CacheEntry;
//# sourceMappingURL=CacheEntry.js.map