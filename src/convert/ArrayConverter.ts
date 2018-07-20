let _ = require('lodash');

/**
 * Provides methods for converting various values to arrays.
 */
export class ArrayConverter {

	/**
     * Static method for converting values to nullable arrays.
     * 
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is a list - it will be cast to an array and returned;
     * - if 'value' is an object (map) - its values will be copied to the array that will be returned; 
     * - otherwise - an array containing 'value' will be returned.
     * 
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null - null 
     *                  will be returned.
     */
	public static toNullableArray(value: any): any[] {
		// Return null when nothing found
		if (value == null) return null;

		// Convert list
		if (_.isArray(value))
			return <any[]>value;
		// Convert map
		else if (_.isObject(value)) {
			let array = [];
			for (let prop in value)
				array.push(value[prop]);
			return array;
		}
		// Convert single values
		else
			return [value];
	}

	/**
     * Static method for converting values to arrays using {@link #toNullableArray}. 
     * An empty array will be used as the default value for the conversion.
     * 
     * @param value     the value to convert.
     * 
     * @see #toNullableArray
     */
	public static toArray(value: any): any[] {
		let result: any[] = ArrayConverter.toNullableArray(value);
		return result || [];
	}

	/**
     * Static method for converting values to arrays using {@link #toNullableArray}. 
     * If null is returned by the conversion, then this method will return the default 
     * value passed.
     * 
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     * 
     * @see #toNullableArray
     */
	public static toArrayWithDefault(value: any, defaultValue: any[]): any[] {
		let result: any[] = ArrayConverter.toNullableArray(value);
		return result || defaultValue;
	}

	/**
	 * Static method for converting lists to arrays using {@link #toArray}.
	 * 
	 * Conversion cases:
	 * - if the list passed as 'value' is null - an empty array will be returned;
	 * - if the list passed as 'value' is a string - it will be parsed as a set of 
	 * comma-separated values, which will be returned as an array;
	 * - otherwise - the result of toArray(value) will be returned.
	 * 
	 * @param value 	the list to convert.
	 * 
	 * @see #toArray
	 */
	public static listToArray(value: any): any[] {
		if (value == null) return [];
		if (_.isString(value)) value = value.split(',');
		return ArrayConverter.toArray(value);
	}

}