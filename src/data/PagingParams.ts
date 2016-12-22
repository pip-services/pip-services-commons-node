import { IntegerConverter } from '../convert/IntegerConverter';
import { BooleanConverter } from '../convert/BooleanConverter';
import { AnyValueMap } from './AnyValueMap';

export class PagingParams {	

    public constructor(skip: any = null, take: any = null, total: any = null) {
        this.skip = IntegerConverter.toNullableInteger(skip);
        this.take = IntegerConverter.toNullableInteger(take);
        this.total = BooleanConverter.toBooleanWithDefault(total, false);
    }

	public skip: number;
	public take: number;
	public total: boolean;
    
    public getSkip(minSkip: number): number {
    	if (this.skip == null) return minSkip;
    	if (this.skip < minSkip) return minSkip;
    	return this.skip; 
	}

    public getTake(maxTake: number): number {
    	if (this.take == null) return maxTake;
    	if (this.take < 0) return 0;
    	if (this.take > maxTake) return maxTake;
    	return this.take; 
	}
    
	public static fromValue(value: any): PagingParams {
		if (value instanceof PagingParams)
			return value;

		let map = AnyValueMap.fromValue(value);
		return PagingParams.fromMap(map);
	}
	
	public static fromTuples(...tuples: any[]): PagingParams {
		let map = AnyValueMap.fromTuples(tuples);
		return PagingParams.fromMap(map);
	}

	public static fromMap(map: any): PagingParams {
        let skip = map.getAsNullableInteger("skip");
        let take = map.getAsNullableInteger("take");
        let total = map.getAsBooleanWithDefault("total", true);
		return new PagingParams(skip, take, total);
	}

}
