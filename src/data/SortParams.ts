import { SortField } from './SortField';

export class SortParams extends Array<SortField> {

	public constructor(fields: SortField[] = null) {
        super();

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = SortParams.prototype;

		if (fields != null) {
			for (let index = 0; index < fields.length; index++)
				this.push(fields[index]);
		}
	}
    
}
