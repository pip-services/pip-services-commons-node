let _ = require('lodash');

/**
 * Provides methods for converting various values to the datetime data type.
 */
export class DateTimeConverter {

    /**
     * Static method for converting values to nullable datetimes.
     * 
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is a date - it will be returned as is;
     * - if 'value' is a number - a new Date will be created and returned (using the value's number as the number of milliseconds passed 
     * since Jan 1, 1970, 00:00:00.000 GMT);
     * - if 'value' is a string - Date.parse(value) will be called, and if the result is a number, then a Date object will be created 
     * (using the numeric result) and returned; 
     * - otherwise - null will be returned.
     * 
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null 
     *                  will be returned.
     */
    public static toNullableDateTime(value: any): Date {
        if (value == null) return null;
        if (_.isDate(value)) return value;
        if (_.isNumber(value)) return new Date(value);

        let result = Date.parse(value);
        return isNaN(result) ? null : new Date(result);
    }

    /**
     * Static method for converting values to datetimes using {@link #toDateTimeWithDefault}. 
     * An empty date (new Date()) will be used as the default value for the conversion.
     * 
     * @param value     the value to convert.
     * 
     * @see #toDateTimeWithDefault
     */
    public static toDateTime(value: any): Date {
        return DateTimeConverter.toDateTimeWithDefault(value, new Date());
    }

    /**
     * Static method for converting values to datetimes using {@link #toNullableDateTime}. 
     * If null is returned by the conversion, then this method will return the default 
     * value passed.
     * 
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null. 
     *                      Defaults to null if omitted.
     * 
     * @see #toNullableDateTime
     */
    public static toDateTimeWithDefault(value: any, defaultValue: Date = null): Date {
        var result = DateTimeConverter.toNullableDateTime(value);
        return result != null ? result : defaultValue;
    }

}