let _ = require('lodash');

import { TypeCode } from './TypeCode';
import { StringConverter } from './StringConverter';
import { BooleanConverter } from './BooleanConverter';
import { IntegerConverter } from './IntegerConverter';
import { LongConverter } from './LongConverter';
import { FloatConverter } from './FloatConverter';
import { DoubleConverter } from './DoubleConverter';
import { DateTimeConverter } from './DateTimeConverter';
import { ArrayConverter } from './ArrayConverter';
import { MapConverter } from './MapConverter';

/**
 * Class that contains "soft" data converters. Soft data converters differ from the data conversion algorithms 
 * found in typical programming language, due to the fact that they support rare conversions between various data 
 * types (such as integer to timespan, timespan to string, and so on). 
 * 
 * @see TypeCode
 */
export class TypeConverter {

	/**
	 * Static method that resolves the TypeCode that corresponds to the passed object's type.
	 * 
	 * @param value 	object whose TypeCode is to be resolved.
	 * @returns			the TypeCode that corresponds to the passed object's type.
	 */
	public static toTypeCode(value: any): TypeCode {
		if (value == null)
			return TypeCode.Unknown;

		if (_.isArray(value))
			return TypeCode.Array;
		if (_.isBoolean(value))
			return TypeCode.Boolean;
		if (_.isDate(value))
			return TypeCode.DateTime;
		if (_.isInteger(value))
			return TypeCode.Long;
		if (_.isNumber(value))
			return TypeCode.Double;
		if (_.isFunction(value))
			return TypeCode.Object;
		if (_.isObject(value))
			return TypeCode.Map;

		if (_.isString(value)) {
			// if (value == "undefined")
			//     return TypeCode.Unknown;
			// if (value == "object")
			//     return TypeCode.Map;
			// if (value == "boolean")
			//     return TypeCode.Boolean;
			// if (value == "number")
			//     return TypeCode.Double;
			// if (value == "string")
			//     return TypeCode.String;
			// if (value == "function")
			//     return TypeCode.Object;

			return TypeCode.String;
		}

		return TypeCode.Object;
	}

	/**
	 * Static method that converts the object passed as 'value' to a nullable object of type T.
	 * 
	 * @param type 		the TypeCode for the data type into which 'value' is to be converted.
	 * @param value 	the value to convert.
	 * @returns			'value' as an object of type T. If 'value' is null - null will be returned.
	 * 
	 * @see #toTypeCode
	 */
	public static toNullableType<T>(type: TypeCode, value: any): T {
		if (value == null) return null;

		// Convert to known types
		if (type == TypeCode.String)
			value = StringConverter.toNullableString(value);
		else if (type == TypeCode.Integer)
			value = IntegerConverter.toNullableInteger(value);
		else if (type == TypeCode.Long)
			value = LongConverter.toNullableLong(value);
		else if (type == TypeCode.Float)
			value = FloatConverter.toNullableFloat(value);
		else if (type == TypeCode.Double)
			value = DoubleConverter.toNullableDouble(value);
		else if (type == TypeCode.DateTime)
			value = DateTimeConverter.toNullableDateTime(value);
		else if (type == TypeCode.Array)
			value = ArrayConverter.toNullableArray(value);
		else if (type == TypeCode.Map)
			value = MapConverter.toNullableMap(value);

		return <T>value;
	}

	/**
	 * Static method that converts the object passed as 'value' to an object of type T.
	 * 
	 * @param type 		the TypeCode for the data type into which 'value' is to be converted.
	 * @param value 	the value to convert.
	 * @returns			'value' as an object of type T. If the result of the conversion using
	 * 					TypeConverter.toNullableType<T>(type, value) is null, then a default
	 * 					value for the given type will be returned.
	 * 
	 * @see #toNullableType<T>
	 * @see #toTypeCode
	 */
	public static toType<T>(type: TypeCode, value: any): T {
		// Convert to the specified type
		let result: T = TypeConverter.toNullableType<T>(type, value);
		if (result != null) return result;

		// Define and return default value based on type
		if (type == TypeCode.Integer)
			value = 0;
		else if (type == TypeCode.Long)
			value = 0;
		else if (type == TypeCode.Float)
			value = 0;
		else if (type == TypeCode.Double)
			value = 0;

		return <T>value;
	}

	/**
	 * Static method that converts the object passed as 'value' to an object of type T or returns 
	 * a default value, if the conversion is not possible (when null is returned).
	 * 
	 * @param type 			the TypeCode for the data type into which 'value' is to be converted.
	 * @param value 		the value to convert.
	 * @param defaultValue	the default value to return if conversion fails (returns null).
	 * @returns				'value' as an object of type T or 'defaultValue', if the result of the 
	 * 						conversion using TypeConverter.toNullableType<T>(type, value) is null.
	 * 
	 * @see #toNullableType<T>
	 * @see #toTypeCode
	 */
	public static toTypeWithDefault<T>(type: TypeCode, value: any, defaultValue: T): T {
		let result: T = TypeConverter.toNullableType<T>(type, value);
		return result != null ? result : defaultValue;
	}

	/**
	 * Static method that converts a TypeCode into its string name.
	 * 
	 * @param type 	the TypeCode to convert into a string.
	 * @returns		the name of the TypeCode passed as a string value.
	 */
	public static toString(type: TypeCode): string {
		switch (type) {
			case TypeCode.Unknown:
				return "unknown";
			case TypeCode.String:
				return "string";
			case TypeCode.Boolean:
				return "boolean";
			case TypeCode.Integer:
				return "integer"
			case TypeCode.Long:
				return "long";
			case TypeCode.Float:
				return "float";
			case TypeCode.Double:
				return "double";
			case TypeCode.DateTime:
				return "datetime";
			case TypeCode.Duration:
				return "duration";
			case TypeCode.Object:
				return "object";
			case TypeCode.Enum:
				return "enum";
			case TypeCode.Array:
				return "array";
			case TypeCode.Map:
				return "map";
			default:
				return "unknown";
		}
	}

}
