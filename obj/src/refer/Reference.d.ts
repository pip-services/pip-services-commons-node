/**
 * Placeholder to store component references.
 */
export declare class Reference {
    private _locator;
    private _component;
    /**
     * Create a new reference for an object
     * @param locator a component locator for the reference
     * @param reference a component reference
     */
    constructor(locator: any, component: any);
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    match(locator: any): boolean;
    /**
     * Gets component reference
     * @return a component itself
     */
    getComponent(): any;
    /**
     * Gets component locator
     * @return a component locator
     */
    getLocator(): any;
}
