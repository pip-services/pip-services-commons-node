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
var NullLock_1 = require("./NullLock");
var MemoryLock_1 = require("./MemoryLock");
var MemcachedLock_1 = require("./MemcachedLock");
var Factory_1 = require("../build/Factory");
var Descriptor_1 = require("../refer/Descriptor");
var DefaultLockFactory = /** @class */ (function (_super) {
    __extends(DefaultLockFactory, _super);
    function DefaultLockFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultLockFactory.NullLockDescriptor, NullLock_1.NullLock);
        _this.registerAsType(DefaultLockFactory.MemoryLockDescriptor, MemoryLock_1.MemoryLock);
        _this.registerAsType(DefaultLockFactory.MemcachedLockDescriptor, MemcachedLock_1.MemcachedLock);
        return _this;
    }
    DefaultLockFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "lock", "default", "1.0");
    DefaultLockFactory.NullLockDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "lock", "null", "*", "1.0");
    DefaultLockFactory.MemoryLockDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "lock", "memory", "*", "1.0");
    DefaultLockFactory.MemcachedLockDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "lock", "memcached", "*", "1.0");
    return DefaultLockFactory;
}(Factory_1.Factory));
exports.DefaultLockFactory = DefaultLockFactory;
//# sourceMappingURL=DefaultLockFactory.js.map