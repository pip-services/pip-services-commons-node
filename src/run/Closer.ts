let _ = require('lodash');
let async = require('async');

/**
 * Helper class that closes components
 */
export class Closer {
	/**
	 * Closes a component that implement ICloseable interface
	 * @param correlationId a unique transaction id to trace calls across components
	 * @param component a components to be closed
     * @param callback a function to call back when close is complete
	 */
	public static closeOne(correlationId: string, component: any, callback?: (err: any) => void): void {
        if (_.isFunction(component.close)) {
			try {
				component.close(correlationId, callback);
			} catch (err) {
				if (callback != null)
					callback(err);
				else
					throw err;
			}
		} else if (callback != null) 
			callback(null);
	}

	/**
	 * Closes components that implement ICloseable interface
	 * @param correlationId a unique transaction id to trace calls across components
	 * @param components a list of components to be closed
     * @param callback a function to call back when cleaning is complete
	 */
	public static close(correlationId: string, components: any[], callback?: (err: any) => void): void {
        async.eachSeries(
            components,
            (component, callback) => {
				Closer.closeOne(correlationId, component, callback);
            }, 
            (err) => {
				if (callback != null) 
					callback(err);
				else if (err != null)
					throw err;
			}
        );
	}
}
