export class RandomInteger {
    public static nextInteger(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

    	if (max - min <= 0)
    		return min;
    	
        return Math.floor(min + Math.random() * (max - min));
    }

	public static updateInteger(value: number, range: number = null): number {		
        if (range == null) range = 0;
        range = range == 0 ? Math.floor(0.1 * value) : range;
        let minValue = value - range;
        let maxValue = value + range;
        return RandomInteger.nextInteger(minValue, maxValue);
    }

    public static sequence(min: number, max: number = null): number[] {
        max = max != null ? max : min;
        let count = RandomInteger.nextInteger(min, max);

        let result: number[] = [];
        for (let i = 0; i < count; i++) 
            result.push(i);
        
        return result;
    }
}
