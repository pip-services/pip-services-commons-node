/**
 * Interface for components to provide check to match location
 */
export interface ILocateable {
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    locate(locator: any): boolean;
}
