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
	 * @param correlationId a unique transaction id to trace calls across components
     * @param callback a function to call back when open is complete
	 * If callback is not defined, then open shall run synchronously
	 * and throw exceptions
	 */
	open(correlationId: string, callback?: (err: any) => void): void;
}
