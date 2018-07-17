/**
 * Provides methods that can be used for generating random doubles, as well as updating existing doubles 
 * by generating values in the range of 'original value' ±'delta/range'
 */
export class RandomDouble {

    /**
     * Generates a double in the range ['min', 'max']. If 'max' is omitted, then the range will be set to [0, 'min'].
     * 
     * @param min   minimum value of the double that will be generated. 
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 0.
     * @param max   (optional) maximum value of the double that will be generated. Defaults to 'min' if omitted.
     * @returns     generated random double value.
     */
    public static nextDouble(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

    	if (max - min <= 0)
    		return min;
    	
        return min + Math.random() * (max - min);
    }

    /**
     * Generates a new double that will differ from 'value' by a maximum of ±'range'. If range is omitted, 
     * then the generated value will differ from 'value' by a maximum of ±10%. 
     * 
     * @param value     double to update.
     * @param range     (optional) defines the maximum amount by which the new double can differ from 'value'. 
     *                  Defaults to 10% of 'value' if omitted.
     * @returns         updated double value.
     */
	public static updateDouble(value: number, range: number = null): number {		
        if (range == null) range = 0;
        range = range == 0 ? 0.1 * value : range;
        let minValue = value - range;
        let maxValue = value + range;
        return RandomDouble.nextDouble(minValue, maxValue);
    }    
}
