"use strict";
var NullLogger_1 = require("./NullLogger");
//import { ConsoleLogger } from './ConsoleLogger';
var CompositeLogger_1 = require("./CompositeLogger");
var CreateException_1 = require("../build/CreateException");
var Descriptor_1 = require("../refer/Descriptor");
var DefaultLoggerFactory = (function () {
    function DefaultLoggerFactory() {
    }
    DefaultLoggerFactory.prototype.getDescriptor = function () {
        return DefaultLoggerFactory.descriptor;
    };
    DefaultLoggerFactory.prototype.canCreate = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return false;
        if (descriptor.match(NullLogger_1.NullLogger.descriptor))
            return true;
        // if (descriptor.match(ConsoleLogger.descriptor))
        //     return true;
        if (descriptor.match(CompositeLogger_1.CompositeLogger.descriptor))
            return true;
        return false;
    };
    DefaultLoggerFactory.prototype.create = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return null;
        if (descriptor.match(NullLogger_1.NullLogger.descriptor))
            return new NullLogger_1.NullLogger();
        // if (descriptor.match(ConsoleLogger.descriptor))
        //     return new ConsoleLogger();
        if (descriptor.match(CompositeLogger_1.CompositeLogger.descriptor))
            return new CompositeLogger_1.CompositeLogger();
        throw new CreateException_1.CreateException(null, locator);
    };
    return DefaultLoggerFactory;
}());
DefaultLoggerFactory.descriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "logger", "default", "1.0");
exports.DefaultLoggerFactory = DefaultLoggerFactory;
//# sourceMappingURL=DefaultLoggerFactory.js.map