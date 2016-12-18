/**
 * Set of component references with abilities to add new references, find reference using locators
 * or remove reference from the set
 */
export interface IReferences {
    /**
     * Puts a new component reference to the set
     * @param reference a component reference to be added that implements ILocateable interface
     */
    put(reference: any): void;
    /**
     * Puts a new component reference to the set with explicit locator
     * @param locator a locator to find the reference
     * @param reference a component reference to be added
     */
    put(reference: any, locator: any): void;
    /**
     * Removes component reference from the set.
     * The method removes only the last reference.
     * @param locator a locator to find the reference to remove
     * @return a removed reference
     */
    remove(locator: any): any;
    /**
     * Gets all stored component references
     * @return a list with component references
     */
    getAll(): any[];
    /**
     * Gets a list of component references that match provided locator
     * @param locator a locator to find references
     * @return a list with found component references
     */
    getOptional(locator: any): any[];
    /**
     * Gets a list of component references that match provided locator.
     * If no references found an exception is thrown
     * @param locator a locator to find references
     * @return a list with found component references
     * @throws ReferenceException when no single component reference is found
     */
    getRequired(locator: any): any[];
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param locator a locator to find a reference
     * @return a found component reference or <code>null</code> if nothing was found
     */
    getOneOptional(locator: any): any;
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param locator a locator to find a reference
     * @return a found component reference
     * @throws ReferenceException when requested component wasn't found
     */
    getOneRequired(locator: any): any;
    /**
     * Gets a component references that matches provided locator.
     * @param reference a component reference to start the search and continue form latest to oldest
     * @param locator a locator to find a reference
     * @return a found component reference
     * @throws ReferenceException when requested component wasn't found
     */
    getOneBefore(reference: any, locator: any): any;
}
