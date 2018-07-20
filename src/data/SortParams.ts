import { SortField } from './SortField';

/**
 * Class that includes standard design patterns for data sorting.
 * Sorting parameters contain information about how to sort the
 * data from a data source, using the fields available. 
 * 
 * @see SortField
 */
export class SortParams extends Array<SortField> {

	/**
     * @param fields    the SortFields to use when sorting data using these SortParams.
	 * 
	 * @see SortField
     */
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
