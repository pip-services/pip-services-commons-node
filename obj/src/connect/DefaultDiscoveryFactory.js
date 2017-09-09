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
var MemoryDiscovery_1 = require("./MemoryDiscovery");
var DefaultDiscoveryFactory = /** @class */ (function (_super) {
    __extends(DefaultDiscoveryFactory, _super);
    function DefaultDiscoveryFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery_1.MemoryDiscovery);
        return _this;
    }
    DefaultDiscoveryFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "discovery", "default", "1.0");
    DefaultDiscoveryFactory.MemoryDiscoveryDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "discovery", "memory", "*", "1.0");
    return DefaultDiscoveryFactory;
}(Factory_1.Factory));
exports.DefaultDiscoveryFactory = DefaultDiscoveryFactory;
//# sourceMappingURL=DefaultDiscoveryFactory.js.map