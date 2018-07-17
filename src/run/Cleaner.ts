let _ = require('lodash');
let async = require('async');

/**
 * Helper class that cleans components
 */
export class Cleaner {
	/**
	 * Cleans component that implement ICleanable interface
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param component 		component to be cleaned.
     * @param callback 			function to call when cleaning is complete.
	 */
	public static clearOne(correlationId: string, component: any, callback?: (err: any) => void): void {
        if (_.isFunction(component.clear)) {
			try {
				component.clear(correlationId);
			} catch (err) {
				if (callback) callback(err);
				else throw err;
			}
		} else if (callback)
			callback(null);
	}

	/**
	 * Cleans components that implement ICleanable interface
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param components 		list of components to be cleaned
     * @param callback 			function to call when cleaning is complete
	 */
	public static clear(correlationId: string, components: any[], callback?: (err: any) => void) {		
        async.eachSeries(
            components, 
            (component, callback) => {
				Cleaner.clearOne(correlationId, component, callback);
            },
            (err) => {
				if (callback) callback(err);
				else if (err) throw err;
			}
        );            
	}
}
