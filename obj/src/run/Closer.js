"use strict";
var _ = require('lodash');
var async = require('async');
/**
 * Helper class that closes components
 */
var Closer = (function () {
    function Closer() {
    }
    /**
     * Closes a component that implement ICloseable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a components to be closed
     * @param callback a function to call back when close is complete
     */
    Closer.closeOne = function (correlationId, component, callback) {
        if (_.isFunction(component.close)) {
            try {
                component.close(correlationId, callback);
            }
            catch (err) {
                if (callback != null)
                    callback(err);
                else
                    throw err;
            }
        }
        else if (callback != null)
            callback(null);
    };
    /**
     * Closes components that implement ICloseable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be closed
     * @param callback a function to call back when cleaning is complete
     */
    Closer.close = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Closer.closeOne(correlationId, component, callback);
        }, function (err) {
            if (callback != null)
                callback(err);
            else if (err != null)
                throw err;
        });
    };
    return Closer;
}());
exports.Closer = Closer;
//# sourceMappingURL=Closer.js.map