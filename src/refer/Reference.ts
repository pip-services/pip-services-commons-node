import { Descriptor } from './Descriptor';

/**
 * Placeholder to store component references.
 */
export class Reference {
	private _locator: any;
	private _component: any;

	/**
	 * Create a new reference for an object
	 * @param locator a component locator for the reference
	 * @param reference a component reference
	 */
	public constructor(locator: any, component: any) {
		if (component == null)
			throw new Error("Component cannot be null");
		
		this._locator = locator;
		this._component = component;
	}
	
	/**
	 * Checks if locator matches the current component
	 * @param locator a location object. It can be standard Descriptor or something else
	 * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
	 */
	public match(locator: any): boolean {
		// Locate by direct reference matching
		if (this._component == locator)
			return true;
		// Locate by direct locator matching
		else if (this._locator instanceof Descriptor)
            return (<Descriptor>this._locator).equals(locator);
		// Locate by direct locator matching
		else if (this._locator != null)
			return this._locator == locator;
		else
			return false;
	}
	
	/**
	 * Gets component reference
	 * @return a component itself
	 */
	public getComponent(): any { 
		return this._component; 
	}

	/**
	 * Gets component locator
	 * @return a component locator
	 */
	public getLocator(): any {
		return this._locator;
	}
}
