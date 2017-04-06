"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Descriptor_1 = require("./Descriptor");
/**
 * Placeholder to store component references.
 */
var Reference = (function () {
    /**
     * Create a new reference for an object
     * @param locator a component locator for the reference
     * @param reference a component reference
     */
    function Reference(locator, component) {
        if (component == null)
            throw new Error("Component cannot be null");
        this._locator = locator;
        this._component = component;
    }
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    Reference.prototype.match = function (locator) {
        // Locate by direct reference matching
        if (this._component == locator)
            return true;
        else if (this._locator instanceof Descriptor_1.Descriptor)
            return this._locator.equals(locator);
        else if (this._locator != null)
            return this._locator == locator;
        else
            return false;
    };
    /**
     * Gets component reference
     * @return a component itself
     */
    Reference.prototype.getComponent = function () {
        return this._component;
    };
    /**
     * Gets component locator
     * @return a component locator
     */
    Reference.prototype.getLocator = function () {
        return this._locator;
    };
    return Reference;
}());
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map