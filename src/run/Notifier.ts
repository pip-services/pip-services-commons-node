let _ = require('lodash');

import { Parameters } from './Parameters';

/**
 * Helper class that triggers notification for components
 */
export class Notifier {
	/**
	 * Triggers notification for component that implement INotifiable interface. 
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param components 		list of components to be notified.
	 * @param args 				set of parameters to pass to notified components.
	 */
	public static notifyOne(correlationId: string, component: any, args: Parameters): void {
        if (_.isFunction(component.notify))
			component.notify(correlationId, args);
	}

	/**
	 * Triggers notification for components that implement INotifiable interface. 
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param components 		list of components to be notified.
	 * @param args 				set of parameters to pass to notified components.
	 */
    public static notify(correlationId: string, components: any[], args: Parameters): void {
		if (components == null) return;
		
		for (let index = 0; index < components.length; index++) 
            Notifier.notifyOne(correlationId, components[index], args);
	}
}
