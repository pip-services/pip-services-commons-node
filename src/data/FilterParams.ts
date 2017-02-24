import { StringValueMap } from './StringValueMap';

export class FilterParams extends StringValueMap {
    public constructor(map: any = null) {
		super(map);
	}
		
	public static fromTuples(...tuples: any[]): FilterParams {
		let map = StringValueMap.fromTuplesArray(tuples);
		return new FilterParams(map);
	}

	public static fromString(line: string): FilterParams {
		let map = StringValueMap.fromString(line);
		return new FilterParams(map);
	}
}
