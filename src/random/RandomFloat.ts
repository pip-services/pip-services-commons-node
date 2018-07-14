/**
 * Provides functions that can be used for generating random floats, as well as updating existing floats 
 * by generating a value in the range of 'original value' ±'delta/range'
 */
export class RandomFloat {
   
    /**
     * Generates a float in the range ['min', 'max']. If 'max' is not given, range is set to [0, 'min'].
     * 
     * @param min   minimum value of float that will be generated (set to 'max', if 'max' is not given).
     * @param max   (optional) maximum value of float that will be generated.
     * @returns     generated random float value.
     */
    public static nextFloat(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

        if (max - min <= 0)
            return min;

        return min + Math.random() * (max - min);
    }

    /**
     * Generates a new float that will differ from 'value' by a maximum of ±'range'. If range is not given, 
     * generated value will differ from 'value' by a maximum of ±10%. 
     * 
     * @param value     float to update.
     * @param range     (optional) defines the maximum amount by which the new float can differ from 'value'. 
     *                  Default: 10% of 'value'.
     * @returns         updated float value.
     */
    public static updateFloat(value: number, range: number = null): number {
        if (range == null) range = 0;
        range = range == 0 ? 0.1 * value : range;
        let minValue = value - range;
        let maxValue = value + range;
        return RandomFloat.nextFloat(minValue, maxValue);
    }
}
