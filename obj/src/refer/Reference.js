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
    function Reference(reference, locator) {
        if (locator === void 0) { locator = null; }
        if (locator == null)
            throw new Error("Locator cannot be null");
        if (reference == null)
            throw new Error("Object reference cannot be null");
        if (locator != null) {
            this._locator = locator;
            this._reference = reference;
        }
        else if (reference.locate != null) {
            this._locateableReference = reference;
            this._reference = reference;
        }
        else if (reference.getDescriptor != null) {
            var descriptable = reference;
            this._locator = descriptable.getDescriptor();
            this._reference = reference;
        }
        else
            throw new Error("Reference must implement ILocateable or IDescriptable interface");
    }
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    Reference.prototype.locate = function (locator) {
        // Locate by direct reference matching
        if (this._reference == locator)
            return true;
        else if (this._locateableReference != null)
            return this._locateableReference.locate(locator);
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
        return this._reference;
    };
    return Reference;
}());
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map