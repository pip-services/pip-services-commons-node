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

export class AnyValueMap implements ICloneable {

    private count: number;

    public constructor(values: any = null) { 
    	this.append(values);
    }
    
    public get(name: string): any {
    	if (name == null)
    		throw new Error("Name cannot be null");
    	
    	// Case-insensitive search
        name = name.toLowerCase()
    	for (let key in this) {
            let value = this[key];
    		if (this.hasOwnProperty(key) && key.toLowerCase() == name)
                return value;
    	}
    	
    	return null;
    }

	public put(key: string, value: any): any {
        this[key] = value;
    }

    public remove(key: string): void {
        delete this[key];
    }

    public append(map: any): void {
    	if (map == null) return;
    	
		for (let key in map) {
            let value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = value;
		}
    }

    public clear(): any {
    	for (let key in this) {
            let value = this[key];
            if (this.hasOwnProperty(key))
    		    delete this[key];
    	}
    }

    public getCount(): number {
        let count: number = 0;
    	for (let key in this) {
    		if (this.hasOwnProperty(key) && !_.isFunction(this[key])) {
                count ++;
            }
    	}        
        return count;
    }
        
    public getAsObject(key: string = null): any {
        if (key == null) {
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
    
    public setAsObject(key: any, value: any = null): void {
        if (value == null) {
            value = key
            this.clear();
            let values = MapConverter.toMap(value);
            this.append(values);
        } else {
            this[key] = value;
        }
    }
    
    public getAsNullableString(key: string): string {
        let value = this.get(key);
        return StringConverter.toNullableString(value);
    }

    public getAsString(key: string): string {
        return this.getAsStringWithDefault(key, null);
    }

    public getAsStringWithDefault(key: string, defaultValue: string): string {
        let value = this.get(key);
        return StringConverter.toStringWithDefault(value, defaultValue);
    }

    public getAsNullableBoolean(key: string): boolean {
        let value = this.get(key);
        return BooleanConverter.toNullableBoolean(value);
    }

    public getAsBoolean(key: string): boolean {
        return this.getAsBooleanWithDefault(key, false);
    }

    public getAsBooleanWithDefault(key: string, defaultValue: boolean): boolean {
        let value = this.get(key);
        return BooleanConverter.toBooleanWithDefault(value, defaultValue);
    }

    public getAsNullableInteger(key: string): number {
        let value = this.get(key);
        return IntegerConverter.toNullableInteger(value);
    }

    public getAsInteger(key: string): number {
        return this.getAsIntegerWithDefault(key, 0);
    }

    public getAsIntegerWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }

    public getAsNullableLong(key: string): number {
        let value = this.get(key);
        return LongConverter.toNullableLong(value);
    }

    public getAsLong(key: string): number {
        return this.getAsLongWithDefault(key, 0);
    }

    public getAsLongWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

    public getAsNullableFloat(key: string): number {
        let value = this.get(key);
        return FloatConverter.toNullableFloat(value);
    }

    public getAsFloat(key: string): number {
        return this.getAsFloatWithDefault(key, 0);
    }

    public getAsFloatWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return FloatConverter.toFloatWithDefault(value, defaultValue);
    }

    public getAsNullableDouble(key: string): number {
        let value = this.get(key);
        return DoubleConverter.toNullableDouble(value);
    }

    public getAsDouble(key: string): number {
        return this.getAsDoubleWithDefault(key, 0);
    }

    public getAsDoubleWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

    public getAsNullableDateTime(key: string): Date {
        let value = this.get(key);
        return DateTimeConverter.toNullableDateTime(value);
    }

    public getAsDateTime(key: string): Date {
        return this.getAsDateTimeWithDefault(key, null);
    }

    public getAsDateTimeWithDefault(key: string, defaultValue: Date): Date {
        let value = this.get(key);
        return DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    }
    
    public getAsNullableType<T>(type: TypeCode, key: string): T {
        let value = this.get(key);
        return TypeConverter.toNullableType<T>(type, value);
    }

    public getAsType<T>(type: TypeCode, key: string): T {
        return this.getAsTypeWithDefault<T>(type, key, null);
    }

    public getAsTypeWithDefault<T>(type: TypeCode, key: string, defaultValue: T): T {
        let value = this.get(key);
        return TypeConverter.toTypeWithDefault(type, value, defaultValue);
    }

    public getAsValue(key: string): AnyValue {
        let value = this.get(key);
    	return new AnyValue(value);
    }

    public getAsNullableArray(key: string): AnyValueArray {
        let value = this.get(key);
    	return value != null ? AnyValueArray.fromValue(value) : null;
    }

    public getAsArray(key: string): AnyValueArray {
        let value = this.get(key);
    	return AnyValueArray.fromValue(value);
    }
    
    public getAsArrayWithDefault(key: string, defaultValue: AnyValueArray): AnyValueArray {
    	let result = this.getAsNullableArray(key);
    	return result != null ? result : defaultValue;
    }

    public getAsNullableMap(key: string): AnyValueMap {
        let value = this.get(key);
    	return value != null ? AnyValueMap.fromValue(value) : null;
    }

    public getAsMap(key: string): AnyValueMap {
        let value = this.get(key);
    	return AnyValueMap.fromValue(value);
    }

    public getAsMapWithDefault(key: string, defaultValue: AnyValueMap): AnyValueMap {
        let result = this.getAsNullableMap(key);
    	return result != null ? result: defaultValue;
    }
    
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

    public clone(): any {
    	return new AnyValueMap(this);
    }

    public static fromValue(value: any): AnyValueMap {
    	let result = new AnyValueMap();
		result.setAsObject(value);
		return result;
	}

    public static fromTuples(...tuples: any[]): AnyValueMap {
        return AnyValueMap.fromTuplesArray(tuples);
    }
    
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
