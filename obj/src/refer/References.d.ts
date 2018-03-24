import { Reference } from './Reference';
import { IReferences } from './IReferences';
/**
 * Basic implementation of IReferences that stores component as a flat list
 */
export declare class References implements IReferences {
    protected _references: Reference[];
    constructor(tuples?: any[]);
    put(locator: any, component: any): void;
    remove(locator: any): any;
    removeAll(locator: any): any[];
    getAllLocators(): any[];
    getAll(): any[];
    getOneOptional<T>(locator: any): T;
    getOneRequired<T>(locator: any): T;
    getOptional<T>(locator: any): T[];
    getRequired<T>(locator: any): T[];
    find<T>(locator: any, required: boolean): T[];
    static fromTuples(...tuples: any[]): References;
}
