/**
 * Provides functions that can be used for generating random integers, as well as updating existing integers 
 * by generating values in the range of 'original value' ±'delta/range'. The 'sequence' function allows 
 * for variable length integer array generation.
 */
export class RandomInteger {
    
    /**
     * Generates an integer in the range ['min', 'max']. If 'max' is not given, range is set to [0, 'min'].
     * 
     * @param min   minimum value of integer that will be generated (set to 'max', if 'max' is not given).
     * @param max   (optional) maximum value of integer that will be generated.
     * @returns     generated random integer value.
     */
    public static nextInteger(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

        if (max - min <= 0)
            return min;

        return Math.floor(min + Math.random() * (max - min));
    }

    /**
     * Generates a new integer that will differ from 'value' by a maximum of ±'range'. If range is not given, 
     * generated value will differ from 'value' by a maximum of ±10%. 
     * 
     * @param value     integer to update.
     * @param range     (optional) defines the maximum amount by which the new integer can differ from 'value'. 
     *                  Default: 10% of 'value' (floored).
     * @returns         updated integer value.
     */
    public static updateInteger(value: number, range: number = null): number {
        if (range == null) range = 0;
        range = range == 0 ? Math.floor(0.1 * value) : range;
        let minValue = value - range;
        let maxValue = value + range;
        return RandomInteger.nextInteger(minValue, maxValue);
    }

    /**
     * Generates an array of integers, whose values are identical to their indexes. The size of the array is randomly chosen from the range ['min', 'max'].
     * If 'max' is not given, the array's length will always be 'min'.
     * 
     * @param min   minimum length of the array that will be generated. If 'max' is not given, the size of the generated array will always be 'min'.
     * @param max   maximum length of the array that will be generated.
     * @returns     generated array of integers.
     */
    public static sequence(min: number, max: number = null): number[] {
        max = max != null ? max : min;
        let count = RandomInteger.nextInteger(min, max);

        let result: number[] = [];
        for (let i = 0; i < count; i++)
            result.push(i);

        return result;
    }
}
