"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var async = require('async');
/**
 * Helper class that opens a collection of components
 */
var Opener = (function () {
    function Opener() {
    }
    /**
     * Checks if component that implement IOpenable interface is opened
     * @param component a component to be checked
     */
    Opener.isOpenedOne = function (component) {
        if (_.isFunction(component.isOpened))
            return component.isOpened();
        else
            return true;
    };
    /**
     * Checks if components that implement IOpenable interface are opened
     * @param components a list of components to be checked
     */
    Opener.isOpened = function (components) {
        if (components == null)
            return true;
        var result = true;
        for (var index = 0; index < components.length; index++)
            result = result && Opener.isOpenedOne(components[index]);
        return result;
    };
    /**
     * Opens a component that implement IOpenable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a component to be opened
     * @param callback a function to call back when open is complete
     */
    Opener.openOne = function (correlationId, component, callback) {
        if (_.isFunction(component.open)) {
            try {
                component.open(correlationId, callback);
            }
            catch (err) {
                if (callback)
                    callback(err);
                else if (err)
                    throw err;
            }
        }
        else if (callback)
            callback(null);
    };
    /**
     * Opens component that implement IOpenable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be opened
     * @param callback a function to call back when open is complete
     */
    Opener.open = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Opener.openOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Opener;
}());
exports.Opener = Opener;
//# sourceMappingURL=Opener.js.map