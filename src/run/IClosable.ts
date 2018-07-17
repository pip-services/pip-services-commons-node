/**
 * Interface for components that require explicit closure
 */
export interface IClosable {
	/**
	 * Closes component, disconnects it from services, disposes resources
	 * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			function to call when close is complete. If omitted, then the 
	 * 							function will run synchronously and throw exceptions.
	 */
	close(correlationId: string, callback?: (err: any) => void): void;
}
