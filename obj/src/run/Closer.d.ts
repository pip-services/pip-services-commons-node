/**
 * Helper class that closes components
 */
export declare class Closer {
    /**
     * Closes a component that implement ICloseable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a components to be closed
     * @param callback a function to call back when close is complete
     */
    static closeOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Closes components that implement ICloseable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be closed
     * @param callback a function to call back when cleaning is complete
     */
    static close(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
