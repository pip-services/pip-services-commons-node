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
var MemoryCredentialStore_1 = require("./MemoryCredentialStore");
var DefaultCredentialStoreFactory = (function (_super) {
    __extends(DefaultCredentialStoreFactory, _super);
    function DefaultCredentialStoreFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor, MemoryCredentialStore_1.MemoryCredentialStore);
        return _this;
    }
    DefaultCredentialStoreFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "credential-store", "default", "1.0");
    DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "credential-store", "memory", "*", "1.0");
    return DefaultCredentialStoreFactory;
}(Factory_1.Factory));
exports.DefaultCredentialStoreFactory = DefaultCredentialStoreFactory;
//# sourceMappingURL=DefaultCredentialStoreFactory.js.map