import { StringValueMap } from './StringValueMap';

/**
 * Class that includes standard design patterns for filtering data.
 * Filter parameters contain the rules and values by which results
 * can be filtered.
 * 
 * @see StringValueMap
 */
export class FilterParams extends StringValueMap {

	/**
	 * Initializes a new FilterParams object using the value 'map'.
	 * 
	 * @param map 	the value to initalized the new FilterParams with.
	 */
    public constructor(map: any = null) {
		super(map);
	}
	
	/**
	 * Static method for creating a new FilterParams object using the 'value' given.
	 * 
	 * @param value 	the value to initialize the new FilterParams with.
	 * @returns			the FilterParams generated.
	 */
	public static fromValue(value: any): FilterParams {
		return new FilterParams(value);
	}
		
	/**
	 * Static method for creating a new FilterParams object using the tuples passed 
	 * as parameters.
	 * 
	 * @param tuples 	the tuples to initialize the new FilterParams with.
	 * @returns			the FilterParams generated.
	 */
	public static fromTuples(...tuples: any[]): FilterParams {
		let map = StringValueMap.fromTuplesArray(tuples);
		return new FilterParams(map);
	}

	/**
	 * Static method for creating a new FilterParams object from a string using 
	 * {@link StringValueMap.fromString}.
	 * 
	 * @param line 	the string containing filter parameters.
	 * @returns		the FilterParams generated.
	 * 
	 * @see StringValueMap.fromString
	 */
	public static fromString(line: string): FilterParams {
		let map = StringValueMap.fromString(line);
		return new FilterParams(map);
	}
}
