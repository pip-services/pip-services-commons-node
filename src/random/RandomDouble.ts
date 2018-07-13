/**
 * Class 'RandomDouble' is used for generating random doubles, as well as updating existing doubles 
 * by generating a value in the range of 'original value' ±'delta/range'
 */
export class RandomDouble {

    /**
     * Generates a double in the range ['min', 'max']. If 'max' is not given, range is set to [0, 'min'].
     * 
     * @param min   minimum value of double that will be generated (set to 'max', if 'max' is not given).
     * @param max   (optional) maximum value of double that will be generated.
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
     * Generates a new double that will differ from 'value' by a maximum of ±'range'. If range is not given, 
     * generated value will differ from 'value' by a maximum of ±10%. 
     * 
     * @param value     double to update.
     * @param range     (optional) defines the maximum amount by which the new double can differ from 'value'. 
     *                  Default: 10% of 'value'.
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
