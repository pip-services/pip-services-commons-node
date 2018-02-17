import { TypeCode } from './TypeCode';
import { TypeConverter } from './TypeConverter';
import { MapConverter } from './MapConverter';

export class JsonConverter {

	public static fromJson<T>(type: TypeCode, value: string): T {
		if (value == null) return null;
		let temp = JSON.parse(value)
		return TypeConverter.toType<T>(type, temp);
	}

	public static toJson(value: any): string {
		if (value == null) return null;
		return JSON.stringify(value);
	}

	public static fromToObject(value: any): any {
		return value;
	}

	public static toNullableMap(value: string): any {
		if (value == null) return null;

		try {
			let map = JSON.parse(value)
			return MapConverter.toNullableMap(map);
		} catch (Exception) {
			return null;
		}
	}

	public static toMap(value: string): any {
		let result = JsonConverter.toNullableMap(value);
		return result != null ? result : {};
	}

	public static toMapWithDefault(value: string, defaultValue: any): any {
		let result = JsonConverter.toNullableMap(value);
		return result != null ? result : defaultValue;
	}

}
