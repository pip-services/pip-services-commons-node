import { TypeCode } from './TypeCode';
import { TypeConverter } from './TypeConverter';
import { MapConverter } from './MapConverter';

/**
 * Provides methods for conversion between various data types and Javascript's object notation.
 */
export class JsonConverter {

	/**
	 * Static method for converting JSON strings to nullable objects of type T.
	 * 
	 * @param type 		the TypeCode for the data type into which 'value' is to be converted.
	 * @param value 	the JSON string to convert.
	 * @returns			'value' as an object of type T. If 'value' was null - null will be returned .
	 */
	public static fromJson<T>(type: TypeCode, value: string): T {
		if (value == null) return null;
		let temp = JSON.parse(value)
		return TypeConverter.toType<T>(type, temp);
	}

	/**
	 * Static method for converting objects in to JSON strings.
	 * 
	 * @param value 	the value to convert.
	 * @returns			the string generated using JSON.stringify().
	 * 
	 * @see https://www.w3schools.com/js/js_json_stringify.asp
	 */
	public static toJson(value: any): string {
		if (value == null) return null;
		return JSON.stringify(value);
	}

	public static fromToObject(value: any): any {
		return value;
	}

	/**
	 * Static method for converting JSON strings to nullable maps. Uses 
	 * {@link https://www.w3schools.com/js/js_json_parse.asp JSON.parse()}
	 * and {@link MapConverter#toNullableMap}.
	 * 
	 * @param value 	the JSON string to convert.
	 * @returns			the map created. If 'value' is null or the conversion
	 * 					fails - null will be returned.
	 * 
	 * @see https://www.w3schools.com/js/js_json_parse.asp JSON.parse()
	 * @see MapConverter#toNullableMap
	 */
	public static toNullableMap(value: string): any {
		if (value == null) return null;

		try {
			let map = JSON.parse(value)
			return MapConverter.toNullableMap(map);
		} catch (Exception) {
			return null;
		}
	}

	/**
	 * Static method for converting JSON strings to maps using {@link #toNullableMap}.
	 * An empty map will be used as the default value for the conversion.
	 * 
	 * @param value 	the JSON string to convert.
	 * 
	 * @see #toNullableMap
	 */
	public static toMap(value: string): any {
		let result = JsonConverter.toNullableMap(value);
		return result != null ? result : {};
	}

	/**
     * Static method for converting JSON strings to maps using {@link #toNullableMap}. 
     * If null is returned by the conversion, then this method will return the default 
     * value passed.
     * 
     * @param value         the JSON string to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     * 
     * @see #toNullableMap
     */
	public static toMapWithDefault(value: string, defaultValue: any): any {
		let result = JsonConverter.toNullableMap(value);
		return result != null ? result : defaultValue;
	}

}
