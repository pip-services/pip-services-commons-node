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
    DefaultCountersFactory.prototype.getDescriptor = function () {
        return DefaultCountersFactory.descriptor;
    };
    DefaultCountersFactory.prototype.canCreate = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return false;
        if (descriptor.match(NullCounters_1.NullCounters.descriptor))
            return true;
        if (descriptor.match(LogCounters_1.LogCounters.descriptor))
            return true;
        if (descriptor.match(CompositeCounters_1.CompositeCounters.descriptor))
            return true;
        return false;
    };
    DefaultCountersFactory.prototype.create = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return null;
        if (descriptor.match(NullCounters_1.NullCounters.descriptor))
            return new NullCounters_1.NullCounters();
        if (descriptor.match(LogCounters_1.LogCounters.descriptor))
            return new LogCounters_1.LogCounters();
        if (descriptor.match(CompositeCounters_1.CompositeCounters.descriptor))
            return new CompositeCounters_1.CompositeCounters();
        throw new CreateException_1.CreateException(null, locator);
    };
    return DefaultCountersFactory;
}());
DefaultCountersFactory.descriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "counters", "default", "1.0");
exports.DefaultCountersFactory = DefaultCountersFactory;
//# sourceMappingURL=DefaultCountersFactory.js.map