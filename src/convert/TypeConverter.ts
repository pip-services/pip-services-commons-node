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

export class TypeConverter {

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

	public static toTypeWithDefault<T>(type: TypeCode, value: any, defaultValue: T): T {
		let result: T = TypeConverter.toNullableType<T>(type, value);
		return result != null ? result : defaultValue;
	}

}
