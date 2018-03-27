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
var ContextInfo_1 = require("./ContextInfo");
var DefaultInfoFactory = /** @class */ (function (_super) {
    __extends(DefaultInfoFactory, _super);
    function DefaultInfoFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultInfoFactory.ContextInfoDescriptor, ContextInfo_1.ContextInfo);
        _this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor, ContextInfo_1.ContextInfo);
        _this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor2, ContextInfo_1.ContextInfo);
        return _this;
    }
    DefaultInfoFactory.Descriptor = new Descriptor_1.Descriptor("pip-services", "factory", "info", "default", "1.0");
    DefaultInfoFactory.ContextInfoDescriptor = new Descriptor_1.Descriptor("pip-services", "context-info", "default", "*", "1.0");
    DefaultInfoFactory.ContainerInfoDescriptor = new Descriptor_1.Descriptor("pip-services", "container-info", "default", "*", "1.0");
    DefaultInfoFactory.ContainerInfoDescriptor2 = new Descriptor_1.Descriptor("pip-services-container", "container-info", "default", "*", "1.0");
    return DefaultInfoFactory;
}(Factory_1.Factory));
exports.DefaultInfoFactory = DefaultInfoFactory;
//# sourceMappingURL=DefaultInfoFactory.js.map