"use strict";
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
    function Reference(component, locator, reference) {
        if (locator === void 0) { locator = null; }
        if (reference === void 0) { reference = null; }
        if (component == null && reference == null)
            throw new Error("Component cannot be null");
        if (locator == null && reference == null)
            throw new Error("Locator cannot be null");
        if (component != null && locator != null) {
            this._locator = locator;
            this._component = component;
        }
        else {
            var locatable = null;
            var descriptable = null;
            if (reference.locate)
                locatable = reference;
            if (reference.getDescriptor)
                descriptable = reference;
            if (locatable == null && descriptable == null)
                throw new Error("Reference must implement ILocateable or IDescriptable interface");
            this._locateable = locatable;
            this._component = reference;
            if (descriptable != null)
                this._locator = descriptable.getDescriptor();
        }
    }
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    Reference.prototype.locate = function (locator) {
        // Locate by direct reference matching
        if (this._component == locator)
            return true;
        else if (this._locateable != null)
            return this._locateable.locate(locator);
        else if (this._locator instanceof Descriptor_1.Descriptor)
            return this._locator.equals(locator);
        else
            return this._locator == locator;
    };
    /**
     * Gets component reference
     * @return a component itself
     */
    Reference.prototype.getComponent = function () {
        return this._component;
    };
    return Reference;
}());
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map