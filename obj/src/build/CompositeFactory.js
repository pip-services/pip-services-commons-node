"use strict";
var _ = require('lodash');
var CreateException_1 = require("./CreateException");
var CompositeFactory = (function () {
    function CompositeFactory() {
        var factories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            factories[_i] = arguments[_i];
        }
        this._factories = [];
        if (factories != null)
            this._factories = this._factories.concat(factories);
    }
    CompositeFactory.prototype.add = function (factory) {
        if (factory == null)
            throw new Error("Factory cannot be null");
        this._factories.push(factory);
    };
    CompositeFactory.prototype.remove = function (factory) {
        this._factories = _.remove(this._factories, function (f) { return f == factory; });
    };
    CompositeFactory.prototype.canCreate = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        // Iterate from the latest factories
        for (var index = this._factories.length - 1; index >= 0; index--) {
            if (this._factories[index].canCreate(locator))
                return true;
        }
        return false;
    };
    CompositeFactory.prototype.create = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        // Iterate from the latest factories
        for (var index = this._factories.length - 1; index >= 0; index--) {
            var factory = this._factories[index];
            if (factory.canCreate(locator))
                return factory.create(locator);
        }
        throw new CreateException_1.CreateException(null, locator);
    };
    return CompositeFactory;
}());
exports.CompositeFactory = CompositeFactory;
//# sourceMappingURL=CompositeFactory.js.map