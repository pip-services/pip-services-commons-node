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
import { AnyValue } from './AnyValue';
import { AnyValueArray } from './AnyValueArray';
import { AnyValueMap } from './AnyValueMap';

export class StringValueMap {

    public constructor(map: any = null) {
        if (map != null)
    	    this.append(map);
    }
    
    public get(key: string): string {
        return this[key] || null;
    }

	public getKeys(): string[] {
        let keys: string[] = [];
		
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        return keys;
    }            
    
	public put(key: string, value: any): any {
        this[key] = StringConverter.toNullableString(value);
    }

    public remove(key: string): void {
        delete this[key];
    }
    
    public append(map: any): void {
    	if (map == null) return;
    	
		for (let key in map) {
            let value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = StringConverter.toNullableString(value);
		}
    }

    public clear(): any {
    	for (let key in this) {
            let value = this[key];
            if (this.hasOwnProperty(key))
    		    delete this[key];
    	}
    }
        
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
    	return new StringValueMap(this);
    }

    public length(): number {
        let count: number = 0;
    	for (let key in this) {
    		if (this.hasOwnProperty(key))
                count ++;
    	}        
        return count;
    }    

    public static fromValue(value: any): StringValueMap {
        return new StringValueMap(value);
    }

    public static fromTuples(...tuples: any[]): StringValueMap {
        return StringValueMap.fromTuplesArray(tuples);
    }
    
    public static fromTuplesArray(tuples: any[]): StringValueMap {
    	let result = new StringValueMap();
    	if (tuples == null || tuples.length == 0)
    		return result;
    	
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length) break;

            let name = StringConverter.toString(tuples[index]);
            let value = StringConverter.toNullableString(tuples[index + 1]);

            result[name] = value;
        }
        
    	return result;
    }

    public static fromString(line: string): StringValueMap {
    	let result = new StringValueMap();
		if (line == null || line.length == 0) 
			return result;
		
		// Todo: User tokenizer / decoder
		let tokens = line.split(";");
		
		for (let index = 0; index < tokens.length; index++) {
            let token = tokens[index];
			if (token.length == 0) continue;
			let pos = token.indexOf('=');
			let key = pos > 0 ? token.substring(0, pos).trim() : token.trim();
			let value = pos > 0 ? token.substring(pos + 1).trim() : null;
            result.put(key, value);
		}
		
		return result;
    }

    public static fromMaps(...maps: any[]): StringValueMap {
    	let result = new StringValueMap();
    	if (maps != null && maps.length > 0) {
	    	for (let index = 0; index < maps.length; index++)
	    		result.append(maps[index]);
    	}
    	return result;
    }
}