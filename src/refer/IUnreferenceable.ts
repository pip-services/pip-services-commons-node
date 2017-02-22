/**
 * Interface for components that require clear of references to other components
 */
export interface IUnreferenceable {
	/**
	 * Unsets previously set references to other components. 
	 */
	unsetReferences(): void;
}
