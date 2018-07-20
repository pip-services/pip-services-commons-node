let _ = require('lodash');

/**
 * Provides methods for converting various values to maps.
 */
export class MapConverter {

    /**
     * Static method for converting values to nullable maps.
     * 
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is an array - it will be converted to a map, whose keys are the array's indexes (as strings) and whose values 
     * correspond to the values at the given indexes;
     * - if 'value' is an object (map) - it will be returned as is; 
     * - otherwise - null will be returned.
     * 
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null 
     *                  will be returned.
     */
    public static toNullableMap(value: any): any {
        if (value == null)
            return null;
        else if (_.isArray(value)) {
            let map: any = {};
            for (let i = 0; i < value.length; i++)
                map[i.toString()] = value[i];
            return map;
        }
        else
            return _.isObject(value) ? value : null;
    }

    /**
     * Static method for converting values to maps using {@link #toNullableMap}. 
     * An empty map will be used as the default value for the conversion.
     * 
     * @param value     the value to convert.
     * 
     * @see #toNullableMap
     */
    public static toMap(value: any): any {
        return MapConverter.toNullableMap(value) || {};
    }

    /**
     * Static method for converting values to maps using {@link #toNullableMap}. 
     * If null is returned by the conversion, then this method will return the default 
     * value passed.
     * 
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     * 
     * @see #toNullableMap
     */
    public static toMapWithDefault(value: any, defaultValue: any): any {
        return MapConverter.toNullableMap(value) || defaultValue;
    }

}