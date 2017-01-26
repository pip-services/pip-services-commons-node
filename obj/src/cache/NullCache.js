"use strict";
var Descriptor_1 = require("../refer/Descriptor");
var NullCache = (function () {
    function NullCache() {
    }
    NullCache.prototype.getDescriptor = function () {
        return NullCache.Descriptor;
    };
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
NullCache.Descriptor = new Descriptor_1.Descriptor("pip-services-common", "cache", "null", "default", "1.0");
exports.NullCache = NullCache;
//# sourceMappingURL=NullCache.js.map