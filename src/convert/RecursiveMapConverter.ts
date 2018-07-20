let _ = require('lodash');

import { TypeCode } from './TypeCode';
import { TypeConverter } from './TypeConverter';
import { TypeReflector } from '../reflect/TypeReflector';

/**
 * Provides methods for recursively converting values.
 */
export class RecursiveMapConverter {

    private static objectToMap(value: any): any {
        if (value == null)
            return null;

        var result = {};
        var props = Object.keys(value);

        for (var i = 0; i < props.length; i++) {
            var propValue = value[props[i]];
            propValue = RecursiveMapConverter.valueToMap(propValue);
            result[props[i]] = propValue;
        }

        return result;
    }

    private static valueToMap(value: any): any {
        if (value == null) return null;

        // Skip expected non-primitive values
        if (_.isString(value)) return value;

        var valueType = TypeConverter.toTypeCode(value);
        // Skip primitive values
        if (TypeReflector.isPrimitive(valueType)) return value;

        if (valueType == TypeCode.Map)
            return RecursiveMapConverter.mapToMap(value);

        // Convert arrays
        if (valueType == TypeCode.Array)
            return RecursiveMapConverter.arrayToMap(value);

        return RecursiveMapConverter.objectToMap(value);
    }

    private static mapToMap(value: any): any {
        var result = {};
        var keys = Object.keys(value);

        for (var i = 0; i < keys.length; i++) {
            result[keys[i]] = RecursiveMapConverter.valueToMap(value[keys[i]]);
        }
    }

    private static arrayToMap(value: any[]): any {
        var result: any[] = [];

        for (var i = 0; i < value.length; i++) {
            result[i] = RecursiveMapConverter.valueToMap(value[i]);
        }

        return result;
    }

    public static toNullableMap(value: any): any {
        return RecursiveMapConverter.valueToMap(value);
    }

    public static toMap(value: any): any {
        return RecursiveMapConverter.toNullableMap(value) || {};
    }

    public static toMapWithDefault(value: any, defaultValue: any): any {
        return RecursiveMapConverter.toNullableMap(value) || defaultValue;
    }

}