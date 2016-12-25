import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
export declare class ReferencesDecorator implements IReferences {
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    baseReferences: IReferences;
    parentReferences: IReferences;
    put(component: any, locator?: any): any;
    putAll(...components: any[]): void;
    remove(locator: any): any;
    removeAll(locator: any): any[];
    getAll(): any[];
    getOneOptional<T>(locator: any): T;
    getOneRequired<T>(locator: any): T;
    getOptional<T>(locator: any): T[];
    getRequired<T>(locator: any): T[];
    find<T>(query: ReferenceQuery, required: boolean): T[];
}
