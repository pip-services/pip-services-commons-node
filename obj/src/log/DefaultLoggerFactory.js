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
var NullLogger_1 = require("./NullLogger");
var ConsoleLogger_1 = require("./ConsoleLogger");
var CompositeLogger_1 = require("./CompositeLogger");
var Factory_1 = require("../build/Factory");
var Descriptor_1 = require("../refer/Descriptor");
var DefaultLoggerFactory = (function (_super) {
    __extends(DefaultLoggerFactory, _super);
    function DefaultLoggerFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor, NullLogger_1.NullLogger);
        _this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor, ConsoleLogger_1.ConsoleLogger);
        _this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor, CompositeLogger_1.CompositeLogger);
        return _this;
    }
    DefaultLoggerFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "logger", "default", "1.0");
    DefaultLoggerFactory.NullLoggerDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "null", "*", "1.0");
    DefaultLoggerFactory.ConsoleLoggerDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "console", "*", "1.0");
    DefaultLoggerFactory.CompositeLoggerDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "composite", "*", "1.0");
    return DefaultLoggerFactory;
}(Factory_1.Factory));
exports.DefaultLoggerFactory = DefaultLoggerFactory;
//# sourceMappingURL=DefaultLoggerFactory.js.map