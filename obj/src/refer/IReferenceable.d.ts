import { IReferences } from './IReferences';
/**
 * Interface for components that requires references to other components
 */
export interface IReferenceable {
    /**
     * Sets references to other components.
     * Using locators the component can find required dependencies
     * @param references component references
     */
    setReferences(references: IReferences): void;
}
