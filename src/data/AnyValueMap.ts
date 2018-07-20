let _ = require('lodash');

import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { StringConverter } from '../convert/StringConverter';
import { BooleanConverter } from '../convert/BooleanConverter';
import { IntegerConverter } from '../convert/IntegerConverter';
import { LongConverter } from '../convert/LongConverter';
import { FloatConverter } from '../convert/FloatConverter';
import { DoubleConverter } from '../convert/DoubleConverter';
import { DateTimeConverter } from '../convert/DateTimeConverter';
import { MapConverter } from '../convert/MapConverter';
import { ICloneable } from './ICloneable';
import { AnyValue } from './AnyValue';
import { AnyValueArray } from './AnyValueArray';

/**
 * Class that allows for usage of abstract, portable maps. Stores a set of key-value pairs, which can be retrieved 
 * in various ways with the help of numerous converters.
 * 
 * @see StringConverter
 * @see TypeConverter
 * @see BooleanConverter
 * @see IntegerConverter
 * @see LongConverter
 * @see DoubleConverter
 * @see FloatConverter
 * @see DateTimeConverter
 * @see ICloneable
 */
export class AnyValueMap implements ICloneable {

    /**
     * Creates a new instance and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using 
     * {@link #setAsObject} or {@link #append}.
     * 
     * @param values    the values to store in this AnyValueMap.
     */
    public constructor(values: any = null) { 
    	this.append(values);
    }
    
    /**
     * @param key       key of the item to retrieve from this AnyValueMap.
     * @returns         the item stored by the given key.
     */
    public get(key: string): any {
    	return this[key] || null;
    }

    /** @returns all of the keys that are contained in this AnyValueMap as a list of strings. */
	public getKeys(): string[] {
        let keys: string[] = [];
		
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        return keys;
    }            
    
    /**
     * @param key       the key by which to insert the given value.
     * @param value     the value to insert into this AnyValueMap by the given key.
     */
	public put(key: string, value: any): any {
        this[key] = value;
    }

    /**
     * @param key       key of the item to remove.
     */
    public remove(key: string): void {
        delete this[key];
    }

    /**
     * @param map   map of items to append to this AnyValueMap.
     */
    public append(map: any): void {
    	if (map == null) return;
    	
		for (let key in map) {
            let value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = value;
		}
    }

    /** Removes all values from this AnyValueMap. */
    public clear(): any {
    	for (let key in this) {
            let value = this[key];
            if (this.hasOwnProperty(key))
    		    delete this[key];
    	}
    }

    /** @returns the number of key-value pairs stored in this AnyValueMap. */
    public length(): number {
        let count: number = 0;
    	for (let key in this) {
    		if (this.hasOwnProperty(key) && !_.isFunction(this[key])) {
                count ++;
            }
    	}        
        return count;
    }

    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key without any conversions or
     *                  all items, if 'key' is undefined or omitted.
     */     
    public getAsObject(key: string = undefined): any {
        if (key === undefined) {
            let result: any = {};
            for (let key in this) {
                let value = this[key];
                if (this.hasOwnProperty(key))
                    result[key] = value;
            }
            return result;
        } else {
            return this.get(key);
        }
    }
  
    /**
     * @param key       the key by which to set the 'value' passed.
     * @param value     the value to set in this AnyValueMap with the given 'key'. 
     *                  If 'key' is omitted, then this AnyValueMap will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to 
     *                  a map using "MapConverter.toMap(value)" and set to this AnyValueMap.
     * 
     * @see MapConverter#toMap
     */
    public setAsObject(key: any, value: any = undefined): void {
        if (value === undefined) {
            value = key
            this.clear();
            let values = MapConverter.toMap(value);
            this.append(values);
        } else {
            this.put(key, value);
        }
    }
    
    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable string. 
     * 
     * @see StringConverter#toNullableString
     */
    public getAsNullableString(key: string): string {
        let value = this.get(key);
        return StringConverter.toNullableString(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a string (or null as the default). 
     * 
     * @see #getAsStringWithDefault
     */
    public getAsString(key: string): string {
        return this.getAsStringWithDefault(key, null);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as a string or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see StringConverter#toStringWithDefault
     */
    public getAsStringWithDefault(key: string, defaultValue: string): string {
        let value = this.get(key);
        return StringConverter.toStringWithDefault(value, defaultValue);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable boolean. 
     * 
     * @see BooleanConverter#toNullableBoolean
     */
    public getAsNullableBoolean(key: string): boolean {
        let value = this.get(key);
        return BooleanConverter.toNullableBoolean(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a boolean (or false as the default). 
     * 
     * @see #getAsBooleanWithDefault
     */
    public getAsBoolean(key: string): boolean {
        return this.getAsBooleanWithDefault(key, false);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as a boolean or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see BooleanConverter#toBooleanWithDefault
     */
    public getAsBooleanWithDefault(key: string, defaultValue: boolean): boolean {
        let value = this.get(key);
        return BooleanConverter.toBooleanWithDefault(value, defaultValue);
    }
    
    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable integer. 
     * 
     * @see IntegerConverter#toNullableInteger
     */
    public getAsNullableInteger(key: string): number {
        let value = this.get(key);
        return IntegerConverter.toNullableInteger(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as an integer (or 0 as the default). 
     * 
     * @see #getAsIntegerWithDefault
     */
    public getAsInteger(key: string): number {
        return this.getAsIntegerWithDefault(key, 0);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as an integer or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see IntegerConverter#toIntegerWithDefault
     */
    public getAsIntegerWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable long. 
     * 
     * @see LongConverter#toNullableLong
     */
    public getAsNullableLong(key: string): number {
        let value = this.get(key);
        return LongConverter.toNullableLong(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a long (or 0 as the default). 
     * 
     * @see #getAsLongWithDefault
     */
    public getAsLong(key: string): number {
        return this.getAsLongWithDefault(key, 0);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as a long or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see LongConverter#toLongWithDefault
     */
    public getAsLongWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable float. 
     * 
     * @see FloatConverter#toNullableFloat
     */
    public getAsNullableFloat(key: string): number {
        let value = this.get(key);
        return FloatConverter.toNullableFloat(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a float (or 0 as the default). 
     * 
     * @see #getAsFloatWithDefault
     */
    public getAsFloat(key: string): number {
        return this.getAsFloatWithDefault(key, 0);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as a float or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see FloatConverter#toFloatWithDefault
     */
    public getAsFloatWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return FloatConverter.toFloatWithDefault(value, defaultValue);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable double. 
     * 
     * @see DoubleConverter#toNullableDouble
     */
    public getAsNullableDouble(key: string): number {
        let value = this.get(key);
        return DoubleConverter.toNullableDouble(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a double (or 0 as the default). 
     * 
     * @see #getAsDoubleWithDefault
     */
    public getAsDouble(key: string): number {
        return this.getAsDoubleWithDefault(key, 0);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as a double or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see DoubleConverter#toDoubleWithDefault
     */
    public getAsDoubleWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable Datetime. 
     * 
     * @see DateTimeConverter#toNullableDateTime
     */
    public getAsNullableDateTime(key: string): Date {
        let value = this.get(key);
        return DateTimeConverter.toNullableDateTime(value);
    }

    /** 
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a Datetime (or null as the default). 
     * 
     * @see #getAsDateTimeWithDefault
     */
    public getAsDateTime(key: string): Date {
        return this.getAsDateTimeWithDefault(key, null);
    }

    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as a Datetime or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see DateTimeConverter#toDateTimeWithDefault
     */
    public getAsDateTimeWithDefault(key: string, defaultValue: Date): Date {
        let value = this.get(key);
        return DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    }
    
    /** 
     * Converts the item with the given key into a nullable object of type 'type' using
     * {@link TypeConverter#toNullableType<T>} and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as a nullable object of type 'type'.
     * 
     * @see TypeConverter#toNullableType<T>
     */
    public getAsNullableType<T>(type: TypeCode, key: string): T {
        let value = this.get(key);
        return TypeConverter.toNullableType<T>(type, value);
    }

    /** 
     * Converts the item with the given key into an object of type 'type' using
     * {@link TypeConverter#toTypeWithDefault<T>} and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an object of type 'type' (or null as the default). 
     * 
     * @see #getAsTypeWithDefault
     */
    public getAsType<T>(type: TypeCode, key: string): T {
        return this.getAsTypeWithDefault<T>(type, key, null);
    }

    /**
     * Converts the item with the given key into an object of type 'type' using
     * {@link TypeConverter#toTypeWithDefault<T>} and returns it.
     * 
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item with the given key as an object of type 'type' or the defaultValue, 
     *                          if conversion is not possible.
     * 
     * @see TypeConverter#toTypeWithDefault<T>
     */
    public getAsTypeWithDefault<T>(type: TypeCode, key: string, defaultValue: T): T {
        let value = this.get(key);
        return TypeConverter.toTypeWithDefault(type, value, defaultValue);
    }

    /** 
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValue object. 
     * 
     * @see AnyValue
     * @see AnyValue#AnyValue
     */
    public getAsValue(key: string): AnyValue {
        let value = this.get(key);
    	return new AnyValue(value);
    }

    /** 
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValueArray object. Returns
     *                  null if the item with the given key is null (hence - nullable).
     * 
     * @see AnyValueArray
     * @see AnyValueArray#fromValue
     */
    public getAsNullableArray(key: string): AnyValueArray {
        let value = this.get(key);
    	return value != null ? AnyValueArray.fromValue(value) : null;
    }
    
    /** 
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValueArray object. 
     * 
     * @see AnyValueArray
     * @see AnyValueArray#fromValue
     */
    public getAsArray(key: string): AnyValueArray {
        let value = this.get(key);
    	return AnyValueArray.fromValue(value);
    }
    
    /** 
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item with the given key cannot be converted 
     *                      into an AnyValueArray.
     * @returns             the item with the given key as an AnyValueArray object or 'defaultValue',
     *                      if conversion is not possible. 
     * 
     * @see AnyValueArray
     * @see #getAsNullableArray
     */
    public getAsArrayWithDefault(key: string, defaultValue: AnyValueArray): AnyValueArray {
    	let result = this.getAsNullableArray(key);
    	return result != null ? result : defaultValue;
    }

    /** 
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValueMap object. Returns
     *                  null if the item with the given key is null (hence - nullable).
     * 
     * @see #fromValue
     */
    public getAsNullableMap(key: string): AnyValueMap {
        let value = this.get(key);
    	return value != null ? AnyValueMap.fromValue(value) : null;
    }

    /** 
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValueMap object. 
     * 
     * @see #fromValue
     */
    public getAsMap(key: string): AnyValueMap {
        let value = this.get(key);
    	return AnyValueMap.fromValue(value);
    }
    
    /** 
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item with the given key cannot be converted 
     *                      into an AnyValueMap.
     * @returns             the item with the given key as an AnyValueMap object or 'defaultValue',
     *                      if conversion is not possible. 
     * 
     * @see #getAsNullableMap
     */
    public getAsMapWithDefault(key: string, defaultValue: AnyValueMap): AnyValueMap {
        let result = this.getAsNullableMap(key);
    	return result != null ? result: defaultValue;
    }
    
    /** 
     * @returns this AnyValueMap as a semicolon-separated values string.
     * 
     * Example: "key1=value1;key2;key3=value3".
     */
	public toString(): string {
		let builder = '';

		// Todo: User encoder
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let value = this[key];

                if (builder.length > 0)
                    builder += ';';
                
                if (value != null)
                    builder += key + '=' + value;
                else
                    builder += key;
            }
		}
		
		return builder;
    }
    
    /** @returns a clone of this object. */
    public clone(): any {
    	return new AnyValueMap(this);
    }

    /**
     * Static method for creating an AnyValueMap from a value using {@link #setAsObject}.
     * 
     * @param value     the value to set in the new AnyValueMap.
     * @returns         the AnyValueMap that was created and set to 'value'.
     * 
     * @see #setAsObject
     */
    public static fromValue(value: any): AnyValueMap {
    	let result = new AnyValueMap();
		result.setAsObject(value);
		return result;
	}

    /**
     * Static method for creating an AnyValueMap from the tuples that are passed as parameters.
     * 
     * @param tuples    the key-value tuple parameters to initialize the new AnyValueMap with.
     * @returns         the AnyValueMap created and filled by the tuples provided.
     * 
     * @see #fromTuplesArray
     */
    public static fromTuples(...tuples: any[]): AnyValueMap {
        return AnyValueMap.fromTuplesArray(tuples);
    }
    
    /**
     * Static method for creating an AnyValueMap from an array of tuples.
     * 
     * @param tuples    the key-value tuples array to initialize the new AnyValueMap with.
     * @returns         the AnyValueMap created and filled by the 'tuples' array provided.
     */
    public static fromTuplesArray(tuples: any[]): AnyValueMap {
    	let result = new AnyValueMap();
    	if (tuples == null || tuples.length == 0)
    		return result;
    	
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length) break;

            let name = StringConverter.toString(tuples[index]);
            let value = tuples[index + 1];

            result.setAsObject(name, value);
        }
        
    	return result;
    }
    
    /**
     * Static method for creating an AnyValueMap using the maps passed as parameters.
     * 
     * @param maps  the maps passed to this method to create an AnyValueMap with.
     * @returns     the AnyValueMap created.
     */
    public static fromMaps(...maps: any[]): AnyValueMap
    {
    	let result = new AnyValueMap();
    	if (maps != null && maps.length > 0) {
	    	for (let index = 0; index < maps.length; index++)
	    		result.append(maps[index]);
    	}
    	return result;
    }
}
