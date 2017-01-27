"use strict";
var _ = require('lodash');
var async = require('async');
/**
 * Helper class that cleans components
 */
var Cleaner = (function () {
    function Cleaner() {
    }
    /**
     * Cleans component that implement ICleanable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a components to be cleaned
     * @param callback a function to call back when cleaning is complete
     */
    Cleaner.clearOne = function (correlationId, component, callback) {
        if (_.isFunction(component.clear)) {
            try {
                component.clear(correlationId);
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
     * Cleans components that implement ICleanable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be cleaned
     * @param callback a function to call back when cleaning is complete
     */
    Cleaner.clear = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Cleaner.clearOne(correlationId, component, callback);
        }, function (err) {
            if (callback != null)
                callback(err);
            else if (err != null)
                throw err;
        });
    };
    return Cleaner;
}());
exports.Cleaner = Cleaner;
//# sourceMappingURL=Cleaner.js.map