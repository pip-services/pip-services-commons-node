import { Reference } from './Reference';
import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
/**
 * Basic implementation of IReferences that stores component as a flat list
 */
export declare class References implements IReferences {
    protected _references: Reference[];
    constructor(components?: any[]);
    put(component: any, locator?: any): void;
    putAll(...components: any[]): void;
    remove(locator: any): any;
    removeAll(locator: any): any[];
    getAll(): any[];
    getOneOptional<T>(locator: any): T;
    getOneRequired<T>(locator: any): T;
    getOptional<T>(locator: any): T[];
    getRequired<T>(locator: any): T[];
    find<T>(query: ReferenceQuery, required: boolean): T[];
    static fromList(...components: any[]): References;
}
