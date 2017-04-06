import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { IReferenceable } from './IReferenceable';
import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
export declare class DependencyResolver implements IReferenceable, IReconfigurable {
    private _dependencies;
    private _references;
    constructor(config?: ConfigParams, references?: IReferences);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    put(name: string, locator: any): void;
    private locate(name);
    /**
     * Gets a list of component references that match provided locator
     * @param name a dependency name
     * @return a list with found component references
     */
    getOptional<T>(name: string): T[];
    /**
     * Gets a list of component references that match provided locator.
     * If no references found an exception is thrown
     * @param name a dependency name
     * @return a list with found component references
     * @throws ReferenceException when no single component reference is found
     */
    getRequired<T>(name: string): T[];
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param name a dependency name
     * @return a found component reference or <code>null</code> if nothing was found
     */
    getOneOptional<T>(name: string): T;
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param name a dependency name
     * @return a found component reference
     * @throws ReferenceException when requested component wasn't found
     */
    getOneRequired<T>(name: string): T;
    /**
     * Find all references by specified query criteria
     * @param query a query criteria
     * @param required force to raise exception is no reference is found
     * @return list of found references
     * @throws ReferenceException when requested component wasn't found
     */
    find<T>(query: ReferenceQuery, required: boolean): T[];
    static fromTuples(...tuples: any[]): DependencyResolver;
}
