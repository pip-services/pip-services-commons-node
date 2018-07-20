let _ = require('lodash');

/**
 * Provides methods for converting various values to the long data type.
 */
export class LongConverter {

    /**
     * Static method for converting values to nullable longs.
     * 
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is a number - the smallest integer greater than or equal to its numeric value will be returned;
     * - if 'value' is a date - the number of milliseconds passed since Jan 1, 1970, 00:00:00.000 GMT will be returned;
     * - if 'value' is a boolean - true returns 1 and false returns 0; 
     * - if 'value' is a string - parseFloat(value) will be called, and if the result is a number, then the smallest integer 
     * greater than or equal to its numeric value will be returned; 
     * - otherwise - null will be returned.
     * 
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null 
     *                  will be returned.
     */
    public static toNullableLong(value: any): number {
        if (value == null) return null;
        if (_.isNumber(value)) return Math.ceil(value);
        if (_.isDate(value)) return value.getTime();
        if (_.isBoolean(value)) return value ? 1 : 0;

        let result = parseFloat(value);
        return isNaN(result) ? null : Math.ceil(result);
    }

    /**
     * Static method for converting values to longs using {@link #toLongWithDefault}. 
     * 0 will be used as the default value for the conversion.
     * 
     * @param value     the value to convert.
     * 
     * @see #toLongWithDefault
     */
    public static toLong(value: any): number {
        return LongConverter.toLongWithDefault(value, 0);
    }

    /**
     * Static method for converting values to longs using {@link #toNullableLong}. 
     * If null is returned by the conversion, then this method will return the default 
     * value passed.
     * 
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     * 
     * @see #toNullableLong
     */
    public static toLongWithDefault(value: any, defaultValue: number): number {
        var result = LongConverter.toNullableLong(value);
        return result != null ? result : defaultValue;
    }

}