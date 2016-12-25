"use strict";
var ReferenceQuery_1 = require("./ReferenceQuery");
var ReferencesDecorator = (function () {
    function ReferencesDecorator(baseReferences, parentReferences) {
        this.baseReferences = baseReferences != null ? baseReferences : parentReferences;
        this.parentReferences = parentReferences != null ? parentReferences : baseReferences;
    }
    ReferencesDecorator.prototype.put = function (component, locator) {
        if (locator === void 0) { locator = null; }
        this.baseReferences.put(component, locator);
    };
    ReferencesDecorator.prototype.putAll = function () {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        for (var index = 0; index < components.length; index++)
            this.put(components[index]);
    };
    ReferencesDecorator.prototype.remove = function (locator) {
        return this.baseReferences.remove(locator);
    };
    ReferencesDecorator.prototype.removeAll = function (locator) {
        return this.baseReferences.removeAll(locator);
    };
    ReferencesDecorator.prototype.getAll = function () {
        return this.baseReferences.getAll();
    };
    ReferencesDecorator.prototype.getOneOptional = function (locator) {
        try {
            var components = this.find(new ReferenceQuery_1.ReferenceQuery(locator), false);
            return components.length > 0 ? components[0] : null;
        }
        catch (ex) {
            return null;
        }
    };
    ReferencesDecorator.prototype.getOneRequired = function (locator) {
        var components = this.find(new ReferenceQuery_1.ReferenceQuery(locator), true);
        return components.length > 0 ? components[0] : null;
    };
    ReferencesDecorator.prototype.getOptional = function (locator) {
        try {
            return this.find(new ReferenceQuery_1.ReferenceQuery(locator), false);
        }
        catch (ex) {
            return [];
        }
    };
    ReferencesDecorator.prototype.getRequired = function (locator) {
        return this.find(new ReferenceQuery_1.ReferenceQuery(locator), true);
    };
    ReferencesDecorator.prototype.find = function (query, required) {
        return this.baseReferences.find(query, required);
    };
    return ReferencesDecorator;
}());
exports.ReferencesDecorator = ReferencesDecorator;
//# sourceMappingURL=ReferencesDecorator.js.map