import { IReferences } from './IReferences';
/**
 * Helper class that assigns references to components
 */
export declare class Referencer {
    /**
     * Assigns references to component that implement IReferenceable interface
     * @param references references to be assigned
     * @param component a components to assign references
     * @param callback callback function with execution error
     */
    static setReferencesForOne(references: IReferences, component: any): void;
    /**
     * Assigns references to components that implement IReferenceable interface
     * @param references references to be assigned
     * @param components a list of components to assign references
     */
    static setReferences(references: IReferences, components: any[]): void;
    /**
     * Clears references for component that implement IUnreferenceable interface
     * @param component a components to clear references
     */
    static unsetReferencesForOne(component: any): void;
    /**
     * Clears references for components that implement IUnreferenceable interface
     * @param components a list of components to clear references
     */
    static unsetReferences(components: any[]): void;
}
