"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("../build/Factory");
var Descriptor_1 = require("../refer/Descriptor");
var NullCache_1 = require("./NullCache");
var MemoryCache_1 = require("./MemoryCache");
var DefaultCacheFactory = /** @class */ (function (_super) {
    __extends(DefaultCacheFactory, _super);
    function DefaultCacheFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultCacheFactory.MemoryCacheDescriptor, MemoryCache_1.MemoryCache);
        _this.registerAsType(DefaultCacheFactory.NullCacheDescriptor, NullCache_1.NullCache);
        return _this;
    }
    DefaultCacheFactory.Descriptor = new Descriptor_1.Descriptor("pip-services", "factory", "cache", "default", "1.0");
    DefaultCacheFactory.NullCacheDescriptor = new Descriptor_1.Descriptor("pip-services", "cache", "null", "*", "1.0");
    DefaultCacheFactory.MemoryCacheDescriptor = new Descriptor_1.Descriptor("pip-services", "cache", "memory", "*", "1.0");
    return DefaultCacheFactory;
}(Factory_1.Factory));
exports.DefaultCacheFactory = DefaultCacheFactory;
//# sourceMappingURL=DefaultCacheFactory.js.map