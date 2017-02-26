"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NullLogger_1 = require("./NullLogger");
var ConsoleLogger_1 = require("./ConsoleLogger");
var CompositeLogger_1 = require("./CompositeLogger");
var CreateException_1 = require("../build/CreateException");
var Descriptor_1 = require("../refer/Descriptor");
var DefaultLoggerFactory = (function () {
    function DefaultLoggerFactory() {
    }
    DefaultLoggerFactory.prototype.canCreate = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return false;
        if (descriptor.match(DefaultLoggerFactory.NullLoggerDescriptor))
            return true;
        if (descriptor.match(DefaultLoggerFactory.ConsoleLoggerDescriptor))
            return true;
        if (descriptor.match(DefaultLoggerFactory.CompositeLoggerDescriptor))
            return true;
        return false;
    };
    DefaultLoggerFactory.prototype.create = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var descriptor = locator;
        if (descriptor == null)
            return null;
        if (descriptor.match(DefaultLoggerFactory.NullLoggerDescriptor))
            return new NullLogger_1.NullLogger();
        if (descriptor.match(DefaultLoggerFactory.ConsoleLoggerDescriptor))
            return new ConsoleLogger_1.ConsoleLogger();
        if (descriptor.match(DefaultLoggerFactory.CompositeLoggerDescriptor))
            return new CompositeLogger_1.CompositeLogger();
        throw new CreateException_1.CreateException(null, locator);
    };
    return DefaultLoggerFactory;
}());
DefaultLoggerFactory.Descriptor = new Descriptor_1.Descriptor("pip-services-commons", "factory", "logger", "default", "1.0");
DefaultLoggerFactory.NullLoggerDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "null", "default", "1.0");
DefaultLoggerFactory.ConsoleLoggerDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "console", "default", "1.0");
DefaultLoggerFactory.CompositeLoggerDescriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "composite", "default", "1.0");
exports.DefaultLoggerFactory = DefaultLoggerFactory;
//# sourceMappingURL=DefaultLoggerFactory.js.map