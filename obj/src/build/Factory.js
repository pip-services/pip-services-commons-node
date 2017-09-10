"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateException_1 = require("./CreateException");
var Registration = /** @class */ (function () {
    function Registration() {
    }
    return Registration;
}());
var Factory = /** @class */ (function () {
    function Factory() {
        this._registrations = [];
    }
    Factory.prototype.register = function (locator, factory) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        if (factory == null)
            throw new Error("Factory cannot be null");
        this._registrations.push({
            locator: locator,
            factory: factory
        });
    };
    Factory.prototype.registerAsType = function (locator, objectFactory) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        if (objectFactory == null)
            throw new Error("Factory cannot be null");
        this._registrations.push({
            locator: locator,
            factory: function (locator) { return new objectFactory(); }
        });
    };
    Factory.prototype.canCreate = function (locator) {
        for (var index = 0; index < this._registrations.length; index++) {
            var registration = this._registrations[index];
            var thisLocator = registration.locator;
            if (thisLocator == locator || (thisLocator.equals && thisLocator.equals(locator)))
                return thisLocator;
        }
        return null;
    };
    Factory.prototype.create = function (locator) {
        for (var index = 0; index < this._registrations.length; index++) {
            var registration = this._registrations[index];
            var thisLocator = registration.locator;
            if (thisLocator == locator || (thisLocator.equals && thisLocator.equals(locator)))
                try {
                    return registration.factory(locator);
                }
                catch (ex) {
                    if (ex instanceof CreateException_1.CreateException)
                        throw ex;
                    throw new CreateException_1.CreateException(null, "Failed to create object for " + locator).withCause(ex);
                }
        }
        return null;
    };
    return Factory;
}());
exports.Factory = Factory;
//# sourceMappingURL=Factory.js.map