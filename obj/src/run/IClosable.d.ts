/**
 * Interface for components that require explicit closure
 */
export interface IClosable {
    /**
     * Closes component, disconnects it from services, disposes resources
     * @param correlationId a unique transaction id to trace calls across components
     * @param callback a function to call back when close is complete.
     * if callback is not defined, then function shall run as synchronous
     * and throw exceptions
     */
    close(correlationId: string, callback?: (err: any) => void): void;
}
