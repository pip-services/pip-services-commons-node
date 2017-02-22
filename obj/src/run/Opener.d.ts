/**
 * Helper class that opens a collection of components
 */
export declare class Opener {
    /**
     * Checks if component that implement IOpenable interface is opened
     * @param component a component to be checked
     */
    static isOpenedOne(component: any): boolean;
    /**
     * Checks if components that implement IOpenable interface are opened
     * @param components a list of components to be checked
     */
    static isOpened(components: any[]): boolean;
    /**
     * Opens a component that implement IOpenable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a component to be opened
     * @param callback a function to call back when open is complete
     */
    static openOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Opens component that implement IOpenable interface
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be opened
     * @param callback a function to call back when open is complete
     */
    static open(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
