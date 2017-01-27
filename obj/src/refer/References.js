"use strict";
var Reference_1 = require("./Reference");
var ReferenceQuery_1 = require("./ReferenceQuery");
var ReferenceException_1 = require("./ReferenceException");
/**
 * Basic implementation of IReferences that stores component as a flat list
 */
var References = (function () {
    function References(components) {
        if (components === void 0) { components = null; }
        this._references = [];
        if (components != null) {
            for (var index = 0; index < components.length; index++)
                this.put(components[index]);
        }
    }
    References.prototype.put = function (component, locator) {
        if (locator === void 0) { locator = null; }
        if (component == null)
            throw new Error("Reference cannot be null");
        if (locator != null)
            this._references.push(new Reference_1.Reference(component, locator));
        else if (component instanceof Reference_1.Reference)
            this._references.push(component);
        else
            this._references.push(new Reference_1.Reference(component));
    };
    References.prototype.putAll = function () {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        for (var index = 0; index < components.length; index++)
            this.put(components[index]);
    };
    References.prototype.remove = function (locator) {
        if (locator == null)
            return null;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.locate(locator)) {
                this._references.splice(index, 1);
                return reference.getComponent();
            }
        }
        return null;
    };
    References.prototype.removeAll = function (locator) {
        var components = [];
        if (locator == null)
            return components;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.locate(locator)) {
                this._references.splice(index, 1);
                components.push(reference.getComponent());
            }
        }
        return components;
    };
    References.prototype.getAll = function () {
        var components = [];
        for (var index = 0; index < this._references.length; index++) {
            var reference = this._references[index];
            components.push(reference.getComponent());
        }
        return components;
    };
    References.prototype.getOneOptional = function (locator) {
        try {
            var components = this.find(new ReferenceQuery_1.ReferenceQuery(locator), false);
            return components.length > 0 ? components[0] : null;
        }
        catch (ex) {
            return null;
        }
    };
    References.prototype.getOneRequired = function (locator) {
        var components = this.find(new ReferenceQuery_1.ReferenceQuery(locator), true);
        return components.length > 0 ? components[0] : null;
    };
    References.prototype.getOptional = function (locator) {
        try {
            return this.find(new ReferenceQuery_1.ReferenceQuery(locator), false);
        }
        catch (ex) {
            return [];
        }
    };
    References.prototype.getRequired = function (locator) {
        return this.find(new ReferenceQuery_1.ReferenceQuery(locator), true);
    };
    References.prototype.find = function (query, required) {
        if (query == null)
            throw new Error("Query cannot be null");
        var components = [];
        var index = query.ascending ? 0 : this._references.length - 1;
        // Locate the start
        if (query.startLocator != null) {
            while (index >= 0 && index < this._references.length) {
                var reference = this._references[index];
                if (reference.locate(query.startLocator))
                    break;
                index += query.ascending ? 1 : -1;
            }
        }
        // Search all references
        while (index >= 0 && index < this._references.length) {
            var reference = this._references[index];
            if (reference.locate(query.locator)) {
                var component = reference.getComponent();
                components.push(component);
            }
            index += query.ascending ? 1 : -1;
        }
        if (components.length == 0 && required)
            throw new ReferenceException_1.ReferenceException(null, query.locator);
        return components;
    };
    References.fromList = function () {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        var result = new References();
        for (var index = 0; index < components.length; index++)
            result.put(components[index]);
        return result;
    };
    return References;
}());
exports.References = References;
//# sourceMappingURL=References.js.map