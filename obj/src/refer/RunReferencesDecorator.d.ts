import { IReferences } from './IReferences';
import { ReferencesDecorator } from './ReferencesDecorator';
export declare class RunReferencesDecorator extends ReferencesDecorator {
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    openEnabled: boolean;
    closeEnabled: boolean;
    put(component: any, locator: any): void;
    remove(locator: any): any;
    removeAll(locator: any): any[];
}
