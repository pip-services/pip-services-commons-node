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
var _ = require('lodash');
var ReferenceException_1 = require("./ReferenceException");
var ReferencesDecorator_1 = require("./ReferencesDecorator");
var BuildReferencesDecorator = (function (_super) {
    __extends(BuildReferencesDecorator, _super);
    function BuildReferencesDecorator(baseReferences, parentReferences) {
        var _this = _super.call(this, baseReferences, parentReferences) || this;
        _this.buildEnabled = true;
        return _this;
    }
    BuildReferencesDecorator.prototype.findFactory = function (locator) {
        var components = this.getAll();
        for (var index = 0; index < components.length; index++) {
            var component = components[index];
            if (_.isFunction(component.canCreate) && _.isFunction(component.create)) {
                if (component.canCreate(locator))
                    return component;
            }
        }
        return null;
    };
    BuildReferencesDecorator.prototype.create = function (locator) {
        // Find factory
        var factory = this.findFactory(locator);
        if (factory == null)
            return null;
        try {
            // Create component
            return factory.create(locator);
        }
        catch (ex) {
            return null;
        }
    };
    BuildReferencesDecorator.prototype.find = function (query, required) {
        var components = _super.prototype.find.call(this, query, false);
        // Try to create component
        if (components.length == 0 && this.buildEnabled) {
            var component = this.create(query.locator);
            if (component != null) {
                var locator = query.locator;
                // Replace locator
                if (_.isFunction(component.getDescritor))
                    locator = component.getDescriptor();
                try {
                    this.parentReferences.put(component, locator);
                    components.push(component);
                }
                catch (ex) {
                    // Ignore exception
                }
            }
        }
        // Throw exception is no required components found
        if (required && components.length == 0)
            throw new ReferenceException_1.ReferenceException(null, query.locator);
        return components;
    };
    return BuildReferencesDecorator;
}(ReferencesDecorator_1.ReferencesDecorator));
exports.BuildReferencesDecorator = BuildReferencesDecorator;
//# sourceMappingURL=BuildReferencesDecorator.js.map