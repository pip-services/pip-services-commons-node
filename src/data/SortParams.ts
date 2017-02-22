import { SortField } from './SortField';

export class SortParams extends Array<SortField> {

	public constructor(fields: SortField[] = null) {
        super();

		if (fields != null) {
			for (let index = 0; index < fields.length; index++)
				this.push(fields[index]);
		}
	}
    
}
