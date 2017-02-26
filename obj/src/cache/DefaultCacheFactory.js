"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Descriptor_1 = require("../refer/Descriptor");
var NullCache_1 = require("./NullCache");
var MemoryCache_1 = require("./MemoryCache");
var DefaultCacheFactory = (function () {
    function DefaultCacheFactory() {
    }
    DefaultCacheFactory.prototype.canCreate = function (locator) {
        if (locator instanceof Descriptor_1.Descriptor) {
            var descriptor = locator;
            if (descriptor.match(DefaultCacheFactory.NullCacheDescriptor))
                return true;
            if (descriptor.match(DefaultCacheFactory.MemoryCacheDescriptor))
                return true;
        }
        return false;
    };
    DefaultCacheFactory.prototype.create = function (locator) {
        if (locator instanceof Descriptor_1.Descriptor) {
            var descriptor = locator;
            if (descriptor.match(DefaultCacheFactory.NullCacheDescriptor))
                return new NullCache_1.NullCache();
            if (descriptor.match(DefaultCacheFactory.MemoryCacheDescriptor))
                return new MemoryCache_1.MemoryCache();
        }
        return null;
    };
    return DefaultCacheFactory;
}());
DefaultCacheFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "cache", "default", "1.0");
DefaultCacheFactory.NullCacheDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "cache", "null", "default", "1.0");
DefaultCacheFactory.MemoryCacheDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "cache", "memory", "default", "1.0");
exports.DefaultCacheFactory = DefaultCacheFactory;
//# sourceMappingURL=DefaultCacheFactory.js.map