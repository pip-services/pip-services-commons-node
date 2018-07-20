let _ = require('lodash');

import { LongConverter } from './LongConverter';

/**
 * Provides methods for converting various values to the integer data type.
 */
export class IntegerConverter {

    /**
     * Static method for converting values to nullable integers.
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
     * 
     * @see LongConverter#toNullableLong
     */
    public static toNullableInteger(value: any): number {
        return LongConverter.toNullableLong(value);
    }
    
    /**
     * Static method for converting values to integers using {@link LongConverter#toLong} (which uses
     * {@link LongConverter#toLongWithDefault}). 0 will be used as the default value for the conversion.
     * 
     * @param value     the value to convert.
     * 
     * @see LongConverter#toLong
     * @see LongConverter#toLongWithDefault
     */
    public static toInteger(value: any): number {
        return LongConverter.toLong(value);
    }

    /**
     * Static method for converting values to integers using {@link LongConverter#toLongWithDefault} 
     * (which uses {@link LongConverter#toNullableLong}). If null is returned by the conversion, 
     * then this method will return the default value passed.
     * 
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null. 
     * 
     * @see LongConverter#toLongWithDefault
     * @see LongConverter#toNullableLong
     */
    public static toIntegerWithDefault(value: any, defaultValue: number): number {
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

}