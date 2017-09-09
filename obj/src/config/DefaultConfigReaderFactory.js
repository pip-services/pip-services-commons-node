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
var MemoryConfigReader_1 = require("./MemoryConfigReader");
var JsonConfigReader_1 = require("./JsonConfigReader");
var YamlConfigReader_1 = require("./YamlConfigReader");
var DefaultConfigReaderFactory = /** @class */ (function (_super) {
    __extends(DefaultConfigReaderFactory, _super);
    function DefaultConfigReaderFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultConfigReaderFactory.MemoryConfigReaderDescriptor, MemoryConfigReader_1.MemoryConfigReader);
        _this.registerAsType(DefaultConfigReaderFactory.JsonConfigReaderDescriptor, JsonConfigReader_1.JsonConfigReader);
        _this.registerAsType(DefaultConfigReaderFactory.YamlConfigReaderDescriptor, YamlConfigReader_1.YamlConfigReader);
        return _this;
    }
    DefaultConfigReaderFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "config-reader", "default", "1.0");
    DefaultConfigReaderFactory.MemoryConfigReaderDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "config-reader", "memory", "*", "1.0");
    DefaultConfigReaderFactory.JsonConfigReaderDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "config-reader", "json", "*", "1.0");
    DefaultConfigReaderFactory.YamlConfigReaderDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "config-reader", "yaml", "*", "1.0");
    return DefaultConfigReaderFactory;
}(Factory_1.Factory));
exports.DefaultConfigReaderFactory = DefaultConfigReaderFactory;
//# sourceMappingURL=DefaultConfigReaderFactory.js.map