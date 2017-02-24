"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Descriptor_1 = require("../refer/Descriptor");
var NullCache_1 = require("./NullCache");
var MemoryCache_1 = require("./MemoryCache");
var DefaultCacheFactory = (function () {
    function DefaultCacheFactory() {
    }
    DefaultCacheFactory.prototype.getDescriptor = function () {
        return DefaultCacheFactory.Descriptor;
    };
    DefaultCacheFactory.prototype.canCreate = function (locator) {
        if (locator instanceof Descriptor_1.Descriptor) {
            var descriptor = locator;
            if (descriptor.match(NullCache_1.NullCache.Descriptor))
                return true;
            if (descriptor.match(MemoryCache_1.MemoryCache.Descriptor))
                return true;
        }
        return false;
    };
    DefaultCacheFactory.prototype.create = function (locator) {
        if (locator instanceof Descriptor_1.Descriptor) {
            var descriptor = locator;
            if (descriptor.match(NullCache_1.NullCache.Descriptor))
                return new NullCache_1.NullCache();
            if (descriptor.match(MemoryCache_1.MemoryCache.Descriptor))
                return new MemoryCache_1.MemoryCache();
        }
        return null;
    };
    return DefaultCacheFactory;
}());
/**
 * Unique descriptor for the Memory Cache component
 */
DefaultCacheFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "cache", "memory", "default", "1.0");
exports.DefaultCacheFactory = DefaultCacheFactory;
//# sourceMappingURL=DefaultCacheFactory.js.map