import { ILocateable } from './ILocateable';
import { IDescriptable } from './IDescriptable';
import { Descriptor } from './Descriptor';

/**
 * Placeholder to store component references.
 */
export class Reference implements ILocateable {
	private _locator: any;
	private _component: any;
	private _locateable: ILocateable;

	/**
	 * Create a new reference for an object
	 * @param locator a component locator for the reference
	 * @param reference a component reference
	 */
	public constructor(component: any, locator: any = null, reference: any = null) {
		if (component == null && reference == null)
			throw new Error("Component cannot be null");
		if (locator == null && reference == null)
			throw new Error("Locator cannot be null");
		
		if (component != null && locator != null) {
            this._locator = locator;
            this._component = component;
		} else {
            let locatable: ILocateable = reference as ILocateable;
            let descriptable: IDescriptable = reference as IDescriptable;
			
			if (locatable == null && descriptable == null)
				throw new Error("Reference must implement ILocateable or IDescriptable interface");

			this._locateable = locatable;
			this._component = reference;

			if (descriptable != null)
				this._locator = descriptable.getDescriptor();
		}
	}
	
	/**
	 * Checks if locator matches the current component
	 * @param locator a location object. It can be standard Descriptor or something else
	 * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
	 */
	public locate(locator: any): boolean {
		// Locate by direct reference matching
		if (this._component == locator)
			return true;
		// Locate locateable objects
		else if (this._locateable != null)
			return this._locateable.locate(locator);
		// Locate by direct locator matching
		else if (this._locator instanceof Descriptor)
            return (<Descriptor>this._locator).equals(locator);
		// Locate by direct locator matching
		else
			return this._locator == locator;
	}
	
	/**
	 * Gets component reference
	 * @return a component itself
	 */
	public getComponent(): any { 
		return this._component; 
	}
}
