"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
/**
 * Helper class that triggers notification for components
 */
var Notifier = (function () {
    function Notifier() {
    }
    /**
     * Triggers notification for component that implement INotifiable interface.
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be notified
     * @param args a set of parameters to pass to notified components
     */
    Notifier.notifyOne = function (correlationId, component, args) {
        if (_.isFunction(component.notify))
            component.notify(correlationId, args);
    };
    /**
     * Triggers notification for components that implement INotifiable interface.
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be notified
     * @param args a set of parameters to pass to notified components
     */
    Notifier.notify = function (correlationId, components, args) {
        if (components == null)
            return;
        for (var index = 0; index < components.length; index++)
            Notifier.notifyOne(correlationId, components[index], args);
    };
    return Notifier;
}());
exports.Notifier = Notifier;
//# sourceMappingURL=Notifier.js.map