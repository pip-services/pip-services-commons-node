"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var async = require('async');
/**
 * Helper class that triggers execution for components
 */
var Executor = (function () {
    function Executor() {
    }
    /**
     * Triggers execution for component that implement IExecutable and IParamExecutable interfaces
     * and passes to IParamExecutable them set of parameters.
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a components to be executed
     * @param args a set of parameters to pass to executed components
     * @param callback a function to call back with results when execution is complete
     */
    Executor.executeOne = function (correlationId, component, args, callback) {
        if (_.isFunction(component.execute)) {
            try {
                return component.execute(correlationId, args, callback);
            }
            catch (err) {
                callback(err, null);
            }
        }
        else
            callback(null, null);
    };
    /**
     * Triggers execution for components that implement IExecutable and IParamExecutable interfaces
     * and passes to IParamExecutable them set of parameters.
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be executed
     * @param args a set of parameters to pass to executed components
     * @param callback a function to call back with results when execution is complete
     */
    Executor.execute = function (correlationId, components, args, callback) {
        var results = [];
        async.eachSeries(components, function (component, callback) {
            Executor.executeOne(correlationId, component, args, function (err, result) {
                results.push(result);
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    return Executor;
}());
exports.Executor = Executor;
//# sourceMappingURL=Executor.js.map