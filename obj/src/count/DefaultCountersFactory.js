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
var NullCounters_1 = require("./NullCounters");
var LogCounters_1 = require("./LogCounters");
var CompositeCounters_1 = require("./CompositeCounters");
var Factory_1 = require("../build/Factory");
var Descriptor_1 = require("../refer/Descriptor");
var DefaultCountersFactory = (function (_super) {
    __extends(DefaultCountersFactory, _super);
    function DefaultCountersFactory() {
        var _this = _super.call(this) || this;
        _this.registerAsType(DefaultCountersFactory.NullCountersDescriptor, NullCounters_1.NullCounters);
        _this.registerAsType(DefaultCountersFactory.LogCountersDescriptor, LogCounters_1.LogCounters);
        _this.registerAsType(DefaultCountersFactory.CompositeCountersDescriptor, CompositeCounters_1.CompositeCounters);
        return _this;
    }
    DefaultCountersFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "counters", "default", "1.0");
    DefaultCountersFactory.NullCountersDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "null", "*", "1.0");
    DefaultCountersFactory.LogCountersDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "log", "*", "1.0");
    DefaultCountersFactory.CompositeCountersDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "composite", "*", "1.0");
    return DefaultCountersFactory;
}(Factory_1.Factory));
exports.DefaultCountersFactory = DefaultCountersFactory;
//# sourceMappingURL=DefaultCountersFactory.js.map