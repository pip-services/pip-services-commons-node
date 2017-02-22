let _ = require('lodash');

import { IReferences } from './IReferences';

/**
 * Helper class that assigns references to components
 */
export class Referencer {
	/**
	 * Assigns references to component that implement IReferenceable interface  
	 * @param references references to be assigned
	 * @param component a components to assign references
	 * @param callback callback function with execution error
	 */
	public static setReferencesForOne(references: IReferences, component: any): void {
        if (_.isFunction(component.setReferences))
			component.setReferences(references);
	}

	/**
	 * Assigns references to components that implement IReferenceable interface  
	 * @param references references to be assigned
	 * @param components a list of components to assign references
	 */
	public static setReferences(references: IReferences, components: any[]): void {
		for (let index = 0; index < components.length; index++)
			Referencer.setReferencesForOne(references, components[index]);
	}

	/**
	 * Clears references for component that implement IUnreferenceable interface 
	 * @param component a components to clear references
	 */
	public static unsetReferencesForOne(component: any): void {
        if (_.isFunction(component.unsetReferences))
			component.unsetReferences();
	}

	/**
	 * Clears references for components that implement IUnreferenceable interface 
	 * @param components a list of components to clear references
	 */
	public static unsetReferences(components: any[]): void {
		for (let index = 0; index < components.length; index++)
			Referencer.unsetReferencesForOne(components[index]);
	}
}
