"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reference_1 = require("./Reference");
var ReferenceQuery_1 = require("./ReferenceQuery");
var ReferenceException_1 = require("./ReferenceException");
/**
 * Basic implementation of IReferences that stores component as a flat list
 */
var References = (function () {
    function References(tuples) {
        if (tuples === void 0) { tuples = null; }
        this._references = [];
        if (tuples != null) {
            for (var index = 0; index < tuples.length; index += 2) {
                if (index + 1 >= tuples.length)
                    break;
                this.putX(tuples[index], tuples[index + 1]);
            }
        }
    }
    References.prototype.putX = function (locator, component) {
        if (component == null)
            throw new Error("Reference cannot be null");
        this._references.push(new Reference_1.Reference(locator, component));
    };
    References.prototype.remove = function (locator) {
        if (locator == null)
            return null;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
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
            if (reference.match(locator)) {
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
                if (reference.match(query.startLocator))
                    break;
                index += query.ascending ? 1 : -1;
            }
        }
        // Search all references
        while (index >= 0 && index < this._references.length) {
            var reference = this._references[index];
            if (reference.match(query.locator)) {
                var component = reference.getComponent();
                components.push(component);
            }
            index += query.ascending ? 1 : -1;
        }
        if (components.length == 0 && required)
            throw new ReferenceException_1.ReferenceException(null, query.locator);
        return components;
    };
    References.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return new References(tuples);
    };
    return References;
}());
exports.References = References;
//# sourceMappingURL=References.js.map