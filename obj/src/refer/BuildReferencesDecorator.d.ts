import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
import { ReferencesDecorator } from './ReferencesDecorator';
export declare class BuildReferencesDecorator extends ReferencesDecorator {
    constructor(baseReferences: IReferences, parentReferences: IReferences);
    buildEnabled: boolean;
    private findFactory(locator);
    create(locator: any): any;
    find<T>(query: ReferenceQuery, required: boolean): T[];
}
