let _ = require('lodash');
let async = require('async');

/**
 * Helper class that opens a collection of components 
 */
export class Opener {
	/**
	 * Checks if component that implement IOpenable interface is opened
	 * @param component a component to be checked
	 */
	public static isOpenedOne(component: any): boolean {
		if (_.isFunction(component.isOpened))
			return component.isOpened();
		else
			return true;
	}	

	/**
	 * Checks if components that implement IOpenable interface are opened
	 * @param components a list of components to be checked
	 */
	public static isOpened(components: any[]): boolean {
		if (components == null) return true;
		
		let result: boolean = true;
		for (let index = 0; index < components.length; index++)
			result = result && Opener.isOpenedOne(components[index]);
		
		return result;
	}

	/**
	 * Opens a component that implement IOpenable interface
	 * @param correlationId a unique transaction id to trace calls across components
	 * @param component a component to be opened
     * @param callback a function to call back when open is complete
	 */
	public static openOne(correlationId: string, component: any, callback?: (err: any) => void): void {
        if (_.isFunction(component.open)) {
			try {
				component.open(correlationId, callback);
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
	 * Opens component that implement IOpenable interface
	 * @param correlationId a unique transaction id to trace calls across components
	 * @param components a list of components to be opened
     * @param callback a function to call back when open is complete
	 */
	public static open(correlationId: string, components: any[], callback?: (err: any) => void): void {
        async.eachSeries(
            components,
            (component, callback) => {
                Opener.openOne(correlationId, component, callback);
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
