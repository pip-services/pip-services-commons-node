import { IntegerConverter } from '../convert/IntegerConverter';
import { BooleanConverter } from '../convert/BooleanConverter';
import { AnyValueMap } from './AnyValueMap';

/**
 * Class that includes standard design patterns for data paging.
 * Paging parameters contain information about how to retrieve
 * data pages from a data source. 
 */
export class PagingParams {	
	/** the number of result to skip. */
	public skip: number;
	/** the number of result to take.  */
	public take: number;
	/** limits the result's length. */
	public total: boolean;

	/**
	 * @param skip 		the number of result to skip.
	 * @param take 		the number of result to take. 
	 * @param total 	limits the result's length to 'total' results.
	 */
    public constructor(skip: any = null, take: any = null, total: any = null) {
        this.skip = IntegerConverter.toNullableInteger(skip);
        this.take = IntegerConverter.toNullableInteger(take);
        this.total = BooleanConverter.toBooleanWithDefault(total, false);
    }
	
	/**
	 * @param minSkip 	the minimum value to return.
	 * @returns 		the number of result to skip or 'minSkip', 
	 * 					if the 'skip' field is less than 'minSkip'.
	 */
    public getSkip(minSkip: number): number {
    	if (this.skip == null) return minSkip;
    	if (this.skip < minSkip) return minSkip;
    	return this.skip; 
	}

	/**
	 * @param maxTake 	the maximum value to return.
	 * @returns 		the number of result to take or 'maxTake', 
	 * 					if the 'take' field is more than 'maxTake'.
	 */
    public getTake(maxTake: number): number {
    	if (this.take == null) return maxTake;
    	if (this.take < 0) return 0;
    	if (this.take > maxTake) return maxTake;
    	return this.take; 
	}
	
	/**
	 * Static method for converting a value into a PagingParams object. If
	 * 'value' is an instance of PagingParams then it will be returned. Otherwise,
	 * {@link AnyValueMap#fromValue} will be used to create a map, which the PagingParams
	 * can be initialized with (using {@link #fromMap}).
	 * 
	 * @param value		the value to convert into a PagingParams object.
	 * @returns			the PagingParams created.
	 * 
	 * @see AnyValueMap#fromValue
	 * @see #fromMap
	 */
	public static fromValue(value: any): PagingParams {
		if (value instanceof PagingParams)
			return value;

		let map = AnyValueMap.fromValue(value);
		return PagingParams.fromMap(map);
	}
	
	/**
	 * Static method for converting the tuples passed as parameters into a PagingParams object.
	 * {@link AnyValueMap#fromTuplesArray} will be used to create a map, which the PagingParams
	 * can be initialized with (using {@link #fromMap}).
	 * 
	 * @param tuples	the tuples to convert into a PagingParams object.
	 * @returns			the PagingParams created.
	 * 
	 * @see AnyValueMap#fromTuplesArray
	 * @see #fromMap
	 */
	public static fromTuples(...tuples: any[]): PagingParams {
		let map = AnyValueMap.fromTuplesArray(tuples);
		return PagingParams.fromMap(map);
	}

	/**
	 * Static method for converting a map into a PagingParams object.
	 * 
	 * @param map 	a map that contains the keys "skip", "take", "total", whose 
	 * 				values will be used to initialize the new PagingParams object.
	 * @returns		the PagingParams created.
	 */
	public static fromMap(map: any): PagingParams {
        let skip = map.getAsNullableInteger("skip");
        let take = map.getAsNullableInteger("take");
        let total = map.getAsBooleanWithDefault("total", true);
		return new PagingParams(skip, take, total);
	}

}
