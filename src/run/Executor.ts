let _ = require('lodash');
let async = require('async');

import { Parameters } from './Parameters';

/**
 * Helper class that triggers execution for components
 */
export class Executor {
	/**
	 * Triggers execution for component that implement IExecutable and IParamExecutable interfaces
	 * and passes to IParamExecutable them set of parameters. 
	 * @param correlationId     unique business transaction id to trace calls across components.
	 * @param component         component to be executed.
	 * @param args              set of parameters to pass to executed components.
     * @param callback          function to call with results when execution is complete.
	 */
	public static executeOne(
		correlationId: string, component: any, args: Parameters, callback: (err: any, result: any) => void) {

        if (_.isFunction(component.execute)) {
            try {
			    return component.execute(correlationId, args, callback);
			} catch (err) {
                callback(err, null);
			}
        } else callback(null, null);
	}

	/**
	 * Triggers execution for components that implement IExecutable and IParamExecutable interfaces
	 * and passes to IParamExecutable them set of parameters. 
	 * @param correlationId     unique business transaction id to trace calls across components.
	 * @param components        list of components to be executed.
	 * @param args              set of parameters to pass to executed components.
     * @param callback          function to call back with results when execution is complete.
	 */
    public static execute(correlationId: string, components: any[], args: Parameters, callback: (err: any, results: any[]) => void) {
        let results: any[] = [];				

        async.eachSeries(
            components,
            (component, callback) => {
                Executor.executeOne(
                    correlationId, component, args,
                    (err, result) => {
                        results.push(result);
                        callback(err);
                    }
                );
            }, 
            (err) => {
                callback(err, results);
            }
        );
	}
}