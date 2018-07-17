import { IClosable } from './IClosable'

/**
 * Interface for components that require explicit opening
 */
export interface IOpenable extends IClosable {
	/**
	 * Checks if component is opened
	 * @returns <code>true</code> if component is opened and <false> otherwise.
	 */
	isOpened(): boolean;

	/**
	 * Opens component, establishes connections to services
	 * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			function to call when open is complete. If omitted, then open 
	 * 							will run synchronously and throw exceptions.
	 */
	open(correlationId: string, callback?: (err: any) => void): void;
}
