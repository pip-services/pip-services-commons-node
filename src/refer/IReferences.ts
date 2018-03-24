import { TypeCode } from '../convert/TypeCode';

/**
 * Set of component references with abilities to add new references, find reference using locators 
 * or remove reference from the set
 */
export interface IReferences {
	/**
	 * Puts a new component reference to the set with explicit locator
	 * @param locator a locator to find the reference
	 * @param component a component reference to be added
	 * @param callback callback function with execution error
	 */
	put(locator: any, component: any);

	/**
	 * Removes component reference from the set. 
	 * The method removes only the last reference.
	 * @param locator a locator to find the reference to remove
	 * @return a removed reference
	 * @param callback callback function with execution error
	 */
	remove(locator: any): any;	

	/**
	 * Removes all component references from the set. 
	 * @param locator a locator to find the reference to remove
	 * @return a list with removed references
	 * @param callback callback function with execution error
	 */
	removeAll(locator: any): any[];	
	
	/**
	 * Gets all stored component locators
	 * @return a list with component locators
	 * @param callback callback function with execution error
	 */
	getAllLocators(): any[];	

	/**
	 * Gets all stored component references
	 * @return a list with component references
	 * @param callback callback function with execution error
	 */
	getAll(): any[];	
		
	/**
	 * Gets a list of component references that match provided locator
	 * and matching to the specified type.
	 * @param locator a locator to find references
	 * @param callback callback function with execution error
	 * @return a list with found component references
	 */
	getOptional<T>(locator: any): T[];

	/**
	 * Gets a list of component references that match provided locator.
	 * and matching to the specified type.
	 * If no references found an exception is thrown
	 * @param locator a locator to find references
	 * @param callback callback function with execution error
	 * @return a list with found component references
	 * @throws ReferenceException when no single component reference is found 
	 */
	getRequired<T>(locator: any): T[];

	/**
	 * Gets a component references that matches provided locator
	 * and matching to the specified type.
	 * The search is performed from latest added references.
	 * @param locator a locator to find a reference
	 * @param callback callback function with execution error
	 * @return a found component reference or <code>null</code> if nothing was found
	 */
	getOneOptional<T>(locator: any): T;
	
	/**
	 * Gets a component references that matches provided locator
	 * and matching to the specified type.
	 * The search is performed from latest added references.
	 * @param locator a locator to find a reference
	 * @param callback callback function with execution error
	 * @return a found component reference
	 * @throws ReferenceException when requested component wasn't found
	 */
	getOneRequired<T>(locator: any): T;

	/**
	 * Find all references by specified query criteria
	 * and matching to the specified type.
	 * @param locator a locator to find a reference
	 * @param required force to raise exception is no reference is found
	 * @return list of found references
	 * @throws ReferenceException when requested component wasn't found
	 */
	find<T>(locator: any, required: boolean): T[];
}
