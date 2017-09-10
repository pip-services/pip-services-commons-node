"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var CreateException_1 = require("./CreateException");
var CompositeFactory = /** @class */ (function () {
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
            var thisLocator = this._factories[index].canCreate(locator);
            if (thisLocator != null)
                return thisLocator;
        }
        return null;
    };
    CompositeFactory.prototype.create = function (locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        // Iterate from the latest factories
        for (var index = this._factories.length - 1; index >= 0; index--) {
            var factory = this._factories[index];
            if (factory.canCreate(locator) != null)
                return factory.create(locator);
        }
        throw new CreateException_1.CreateException(null, locator);
    };
    return CompositeFactory;
}());
exports.CompositeFactory = CompositeFactory;
//# sourceMappingURL=CompositeFactory.js.map