/**
 * Helper class that cleans components
 */
export declare class Cleaner {
    /**
     * Cleans component that implement ICleanable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a components to be cleaned
     * @param callback a function to call back when cleaning is complete
     */
    static clearOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Cleans components that implement ICleanable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be cleaned
     * @param callback a function to call back when cleaning is complete
     */
    static clear(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
