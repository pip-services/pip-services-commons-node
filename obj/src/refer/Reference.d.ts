import { ILocateable } from './ILocateable';
/**
 * Placeholder to store component references.
 */
export declare class Reference implements ILocateable {
    private _locator;
    private _reference;
    private _locateableReference;
    /**
     * Create a new reference for an object
     * @param locator a component locator for the reference
     * @param reference a component reference
     */
    constructor(reference: any, locator?: any);
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    locate(locator: any): boolean;
    /**
     * Gets component reference
     * @return a component itself
     */
    getComponent(): any;
}
