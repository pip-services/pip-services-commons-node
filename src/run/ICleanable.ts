/**
 * Interface for components that can clean it's data and state.
 * Typically it is used during testing
 */
export interface ICleanable {
	clear(correlationId: string, callback?: (err: any) => void): void;
}
