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
import { ArrayConverter } from '../convert/ArrayConverter';
import { ICloneable } from './ICloneable';
import { AnyValue } from './AnyValue';
import { AnyValueMap } from './AnyValueMap';

/**
 * Class that allows for usage of abstract, portable arrays. Stores a set of values, which can be retrieved 
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
export class AnyValueArray extends Array<any> implements ICloneable {

    /**
     * Creates a new instance and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using 
     * {@link #setAsObject} or {@link #append}.
     * 
     * @param values    the values to store in this AnyValueArray.
     */
    public constructor(values: any[] = null) {
        super();

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = AnyValueArray.prototype;

        this.append(values);
    }
    
    /**
     * @param index     index of the item to retrieve from this AnyValueArray.
     * @returns         the item that is located at the given index.
     */
    public get(index: number): any {
        return this[index];
    }

    /**
     * @param index     the index at which to insert the given value.
     * @param value     the value to insert into this AnyValueArray at the given index.
     */
    public put(index: number, value: any): void {
        this[index] = value;
    }

    /**
     * @param index     index of the item to remove.
     */
    public remove(index: number): void {
        this.splice(index, 1);
    }

    /**
     * @param elements  items to append to this AnyValueArray.
     */
    public append(elements: any[]): void {
    	if (elements != null) {
            for (let index = 0; index < elements.length; index++)            	
            	this.push(elements[index]);
    	}
    }

    /** Removes all items from this AnyValueArray. */
    public clear(): void {
        this.splice(0, this.length);
    }

    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index without any conversions or
     *                  all items, if 'index' is undefined or omitted.
     */
    public getAsObject(index: number = undefined): any {
        if (index === undefined) {
            let result: any[] = [];
            for (index = 0; index < this.length; index++)
                result.push(this[index]);
            return result;
        } else {
            return this[index];
        }
    }

    /**
     * @param index     the position in this AnyValueArray to set the value at.
     * @param value     the value to set in this AnyValueArray at the given 'index'. 
     *                  If 'index' is omitted, then this AnyValueArray will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to 
     *                  an array using "ArrayConverter.toArray(value)" and set to this AnyValueArray.
     * 
     * @see ArrayConverter#toArray
     */
    public setAsObject(index: any, value: any = undefined): void {
        if (value === undefined) {
            value = index //originally was not present - added by Mark Makarychev.
            this.clear();
            let elements = ArrayConverter.toArray(value);
            this.append(elements);
        } else {
            this[index] = value;
        }
    }
    
    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable string. 
     * 
     * @see StringConverter#toNullableString
     */
    public getAsNullableString(index: number): string {
        let value = this[index];
        return StringConverter.toNullableString(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a string (or null as the default). 
     * 
     * @see #getAsStringWithDefault
     */
    public getAsString(index: number): string {
        return this.getAsStringWithDefault(index, null);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a string or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see StringConverter#toStringWithDefault
     */
    public getAsStringWithDefault(index: number, defaultValue: string): string {
        let value = this[index];
        return StringConverter.toStringWithDefault(value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable boolean. 
     * 
     * @see BooleanConverter#toNullableBoolean
     */
    public getAsNullableBoolean(index: number): boolean {
        let value = this[index];
        return BooleanConverter.toNullableBoolean(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a boolean (or false as the default). 
     * 
     * @see #getAsBooleanWithDefault
     */
    public getAsBoolean(index: number): boolean {
        return this.getAsBooleanWithDefault(index, false);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a boolean or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see BooleanConverter#toBooleanWithDefault
     */
    public getAsBooleanWithDefault(index: number, defaultValue: boolean): boolean {
        let value = this[index];
        return BooleanConverter.toBooleanWithDefault(value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable integer. 
     * 
     * @see IntegerConverter#toNullableInteger
     */
    public getAsNullableInteger(index: number): number {
        let value = this[index];
        return IntegerConverter.toNullableInteger(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an integer (or 0 as the default). 
     * 
     * @see #getAsIntegerWithDefault
     */
    public getAsInteger(index: number): number {
        return this.getAsIntegerWithDefault(index, 0);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as an integer or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see IntegerConverter#toIntegerWithDefault
     */
    public getAsIntegerWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable long. 
     * 
     * @see LongConverter#toNullableLong
     */
    public getAsNullableLong(index: number): number {
        let value = this[index];
        return LongConverter.toNullableLong(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a long (or 0 as the default). 
     * 
     * @see #getAsLongWithDefault
     */
    public getAsLong(index: number): number {
        return this.getAsLongWithDefault(index, 0);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a long or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see LongConverter#toLongWithDefault
     */
    public getAsLongWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable float. 
     * 
     * @see FloatConverter#toNullableFloat
     */
    public getAsNullableFloat(index: number): number {
        let value = this[index];
        return FloatConverter.toNullableFloat(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a float (or 0 as the default). 
     * 
     * @see #getAsFloatWithDefault
     */
    public getAsFloat(index: number): number {
        return this.getAsFloatWithDefault(index, 0);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a float or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see FloatConverter#toFloatWithDefault
     */
    public getAsFloatWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return FloatConverter.toFloatWithDefault(value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable double. 
     * 
     * @see DoubleConverter#toNullableDouble
     */
    public getAsNullableDouble(index: number): number {
        let value = this[index];
        return DoubleConverter.toNullableDouble(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a double (or 0 as the default). 
     * 
     * @see #getAsDoubleWithDefault
     */
    public getAsDouble(index: number) {
        return this.getAsDoubleWithDefault(index, 0);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a double or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see DoubleConverter#toDoubleWithDefault
     */
    public getAsDoubleWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable Datetime. 
     * 
     * @see DateTimeConverter#toNullableDateTime
     */
    public getAsNullableDateTime(index: number): Date {
        let value = this[index];
        return DateTimeConverter.toNullableDateTime(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a Datetime (or null as the default). 
     * 
     * @see #getAsDateTimeWithDefault
     */
    public getAsDateTime(index: number): Date {
        return this.getAsDateTimeWithDefault(index, null);
    }

    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a Datetime or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see DateTimeConverter#toDateTimeWithDefault
     */
    public getAsDateTimeWithDefault(index: number, defaultValue: Date): Date {
        let value = this[index];
        return DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    }

    /** 
     * Converts the item at the given index into a nullable object of type 'type' using
     * {@link TypeConverter#toNullableType<T>} and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable object of type 'type'.
     * 
     * @see TypeConverter#toNullableType<T>
     */
    public getAsNullableType<T>(type: TypeCode, index: number): T {
        let value = this[index];
        return TypeConverter.toNullableType<T>(type, value);
    }

    /** 
     * Converts the item at the given index into an object of type 'type' using
     * {@link TypeConverter#toTypeWithDefault<T>} and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an object of type 'type' (or null as the default). 
     * 
     * @see #getAsTypeWithDefault
     */
    public getAsType<T>(type: TypeCode, index: number): T {
        return this.getAsTypeWithDefault(type, index, null);
    }

    /**
     * Converts the item at the given index into an object of type 'type' using
     * {@link TypeConverter#toTypeWithDefault<T>} and returns it.
     * 
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as an object of type 'type' or the defaultValue, 
     *                          if conversion is not possible.
     * 
     * @see TypeConverter#toTypeWithDefault<T>
     */
    public getAsTypeWithDefault<T>(type: TypeCode, index: number, defaultValue: T): T {
        let value = this[index];
        return TypeConverter.toTypeWithDefault(type, value, defaultValue);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValue object. 
     * 
     * @see AnyValue
     * @see AnyValue#AnyValue
     */
    public getAsValue(index: number): AnyValue {
        let value = this[index];
    	return new AnyValue(value);
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueArray object (returns
     *                  null if the item at the given index is null).
     * 
     * @see #fromValue
     */
    public getAsNullableArray(index: number): AnyValueArray {
        let value = this[index];
    	return value != null ? AnyValueArray.fromValue(value) : null;
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueArray object. 
     * 
     * @see #fromValue
     */
    public getAsArray(index: number): AnyValueArray {
        let value = this[index];
    	return AnyValueArray.fromValue(value);
    }
    
    /** 
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted 
     *                      into an AnyValueArray.
     * @returns             the item at the given index as an AnyValueArray object or 'defaultValue',
     *                      if conversion is not possible. 
     * 
     * @see #getAsNullableArray
     */
    public getAsArrayWithDefault(index: number, defaultValue: AnyValueArray): AnyValueArray {
    	let result = this.getAsNullableArray(index);
    	return result != null ? result : defaultValue;
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueMap object (returns
     *                  null if the item at the given index is null).
     * 
     * @see AnyValueMap
     * @see AnyValueMap#fromValue
     */
    public getAsNullableMap(index: number): AnyValueMap {
        let value = this[index];
    	return value != null ? AnyValueMap.fromValue(value) : null;
    }

    /** 
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueMap object. 
     * 
     * @see AnyValueMap
     * @see AnyValueMap#fromValue
     */
    public getAsMap(index: number): AnyValueMap {
        let value = this[index];
    	return AnyValueMap.fromValue(value);
    }

    /** 
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted 
     *                      into an AnyValueMap.
     * @returns             the item at the given index as an AnyValueMap object or 'defaultValue',
     *                      if conversion is not possible. 
     * 
     * @see #getAsNullableMap
     */
    public getAsMapWithDefault(index: number, defaultValue: AnyValueMap): AnyValueMap {
        let result = this.getAsNullableMap(index);
    	return result != null ? AnyValueMap.fromValue(result): defaultValue;
    }

    /**
     * @param value     value to search for in this AnyValueArray.
     * @returns         whether or not this AnyValueArray contains the given value.
     */
    public contains(value: any): boolean {
        for (let index = 0; index < this.length; index++) {
            let element = this[index];
            
            if (value == null && element == null)
            	return true;
            if (value == null || element == null)
            	continue;
            if (value == element)
                return true;
        }

        return false;
    }

    /**
     * Checks whether or not this AnyValueArray contains a certain value as an object of type 'type'.
     * The value passed will be converted using {@link TypeConverter#toType<T>}, where as this AnyValueArray's 
     * values will be converted using {@link TypeConverter#toNullableType}. After conversion, the value is searched 
     * for amongst the AnyValueArray's converted values.
     * 
     * @param type      the TypeCode to use for converting 'value' into an object of type 'type' using the 
     *                  TypeConverter class.
     * @param value     the value to search for amongst this AnyValueArray's values after conversion.
     * @returns         whether or not this AnyValueArray contains the given value as an object of type 
     *                  'type'. If both converted values are null, true will be returned.
     * 
     * @see TypeConverter#toType<T>
     * @see TypeConverter#toNullableType
     */
    public containsAsType<T>(type: TypeCode, value: any): boolean {
        let typedValue = TypeConverter.toType<T>(type, value);

        for (let index = 0; index < this.length; index++) {
            let thisTypedValue = TypeConverter.toNullableType(type, this[index]);

            if (typedValue == null && thisTypedValue == null)
                return true;
            if (typedValue == null || thisTypedValue == null)
            	continue;
            if (typedValue == thisTypedValue)
            	return true;
        }

        return false;
    }

    /** @returns a clone of this object. */
    public clone(): any {
    	return new AnyValueArray(this);
    }
    
    /** 
     * @returns this AnyValueArray as a comma-separated values string.
     * 
     * Example: "value1,,value3".
     */
    public toString(): string {
        let builder = '';
        for (let index = 0; index < this.length; index++) {
            if (index > 0)
                builder += ',';
            builder += this.getAsStringWithDefault(index, "");
        }
        return builder;
    }
    
    /**
     * Static method for creating an AnyValueArray from the values passed as parameters.
     * 
     * @param values    the values to initialize the AnyValueArray with, which are passed as parameters.
     * @returns         the AnyValueArray created and filled by the values provided.
     */
    public static fromValues(...values: any[]): AnyValueArray {
    	return new AnyValueArray(values);
    }
    
    /**
     * Static method for creating an AnyValueArray from a value using {@link ArrayConverter#toNullableArray}.
     * 
     * @param value     value to convert to a nullable array and initialize the new AnyValueArray with.
     * @returns         the AnyValueArray that was created and filled by 'value'.
     * 
     * @see ArrayConverter#toNullableArray
     */
    public static fromValue(value: any): AnyValueArray {
    	let values = ArrayConverter.toNullableArray(value);
    	return new AnyValueArray(values);
    }
    
    /**
     * Static method for creating an AnyValueArray from a string of 'values', separated using the char passed as 
     * 'separator'.
     * 
     * @param values            string of values, separated by the char passed as 'separator'
     * @param separator         char that is used to separate the values in the string passed as 'values'.
     * @param removeDuplicates  (optional) boolean that defines whether or not duplicate items should be removed.
     * @returns                 the AnyValueArray that was created and filled by 'values'.
     */
    public static fromString(values: string, separator: string, removeDuplicates: boolean = false): AnyValueArray {
    	let result = new AnyValueArray();
        
    	if (values == null || values.length == 0)
        	return result;
        
        let items = values.split(separator, -1);
        for (let index = 0; index < items.length; index++) {
            let item = items[index];
        	if ((item != null && item.length > 0) || removeDuplicates == false)
        		result.push(item != null ? new AnyValue(item) : null);
        }
        
        return result;
    }
}