"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
/**
 * Helper class that assigns references to components
 */
var Referencer = /** @class */ (function () {
    function Referencer() {
    }
    /**
     * Assigns references to component that implement IReferenceable interface
     * @param references references to be assigned
     * @param component a components to assign references
     * @param callback callback function with execution error
     */
    Referencer.setReferencesForOne = function (references, component) {
        if (_.isFunction(component.setReferences))
            component.setReferences(references);
    };
    /**
     * Assigns references to components that implement IReferenceable interface
     * @param references references to be assigned
     * @param components a list of components to assign references
     */
    Referencer.setReferences = function (references, components) {
        for (var index = 0; index < components.length; index++)
            Referencer.setReferencesForOne(references, components[index]);
    };
    /**
     * Clears references for component that implement IUnreferenceable interface
     * @param component a components to clear references
     */
    Referencer.unsetReferencesForOne = function (component) {
        if (_.isFunction(component.unsetReferences))
            component.unsetReferences();
    };
    /**
     * Clears references for components that implement IUnreferenceable interface
     * @param components a list of components to clear references
     */
    Referencer.unsetReferences = function (components) {
        for (var index = 0; index < components.length; index++)
            Referencer.unsetReferencesForOne(components[index]);
    };
    return Referencer;
}());
exports.Referencer = Referencer;
//# sourceMappingURL=Referencer.js.map