"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheEntry = (function () {
    function CacheEntry(key, value, timeout) {
        this._key = key;
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }
    CacheEntry.prototype.getKey = function () {
        return this._key;
    };
    CacheEntry.prototype.getValue = function () {
        return this._value;
    };
    CacheEntry.prototype.getExpiration = function () {
        return this._expiration;
    };
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