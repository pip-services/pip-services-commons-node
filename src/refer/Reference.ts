import { ILocateable } from './ILocateable';
import { IDescriptable } from './IDescriptable';
import { Descriptor } from './Descriptor';

/**
 * Placeholder to store component references.
 */
export class Reference implements ILocateable {
	private _locator: any;
	private _reference: any;
	private _locateableReference: ILocateable;

	/**
	 * Create a new reference for an object
	 * @param locator a component locator for the reference
	 * @param reference a component reference
	 */
	public constructor(reference: any, locator: any = null) {
		if (locator == null)
			throw new Error("Locator cannot be null");
		if (reference == null)
			throw new Error("Object reference cannot be null");
		
        if (locator != null) {
            this._locator = locator;
            this._reference = reference;
        } else if (reference.locate != null) {
			this._locateableReference = <ILocateable>reference;
			this._reference = reference;
		} else if (reference.getDescriptor != null) {
			let descriptable = <IDescriptable>reference; 
			this._locator = descriptable.getDescriptor();
			this._reference = reference;
		} else
			throw new Error("Reference must implement ILocateable or IDescriptable interface");		
	}
	
	/**
	 * Checks if locator matches the current component
	 * @param locator a location object. It can be standard Descriptor or something else
	 * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
	 */
	public locate(locator: any): boolean {
		// Locate by direct reference matching
		if (this._reference == locator)
			return true;
		// Locate locateable objects
		else if (this._locateableReference != null)
			return this._locateableReference.locate(locator);
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
		return this._reference; 
	}
}
