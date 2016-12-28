"use strict";
var CacheEntry = (function () {
    function CacheEntry(key, value, timeout) {
        this.key = key;
        this.value = value;
        this.expiration = new Date().getTime() + timeout;
    }
    CacheEntry.prototype.setValue = function (value, timeout) {
        this.value = value;
        this.expiration = new Date().getTime() + timeout;
    };
    CacheEntry.prototype.isExpired = function () {
        return this.expiration < new Date().getTime();
    };
    return CacheEntry;
}());
exports.CacheEntry = CacheEntry;
//# sourceMappingURL=CacheEntry.js.map