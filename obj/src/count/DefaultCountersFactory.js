"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NullCounters_1 = require("./NullCounters");
var LogCounters_1 = require("./LogCounters");
var CompositeCounters_1 = require("./CompositeCounters");
var CreateException_1 = require("../build/CreateException");
var Descriptor_1 = require("../refer/Descriptor");
var DefaultCountersFactory = (function () {
    function DefaultCountersFactory() {
    }
    DefaultCountersFactory.prototype.canCreate = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return false;
        if (descriptor.match(DefaultCountersFactory.NullCountersDescriptor))
            return true;
        if (descriptor.match(DefaultCountersFactory.LogCountersDescriptor))
            return true;
        if (descriptor.match(DefaultCountersFactory.CompositeCountersDescriptor))
            return true;
        return false;
    };
    DefaultCountersFactory.prototype.create = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return null;
        if (descriptor.match(DefaultCountersFactory.NullCountersDescriptor))
            return new NullCounters_1.NullCounters();
        if (descriptor.match(DefaultCountersFactory.LogCountersDescriptor))
            return new LogCounters_1.LogCounters();
        if (descriptor.match(DefaultCountersFactory.CompositeCountersDescriptor))
            return new CompositeCounters_1.CompositeCounters();
        throw new CreateException_1.CreateException(null, locator);
    };
    return DefaultCountersFactory;
}());
DefaultCountersFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "counters", "default", "1.0");
DefaultCountersFactory.NullCountersDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "null", "default", "1.0");
DefaultCountersFactory.LogCountersDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "log", "default", "1.0");
DefaultCountersFactory.CompositeCountersDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "composite", "default", "1.0");
exports.DefaultCountersFactory = DefaultCountersFactory;
//# sourceMappingURL=DefaultCountersFactory.js.map