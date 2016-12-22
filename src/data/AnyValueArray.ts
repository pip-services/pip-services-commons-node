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
import { AnyValue } from './AnyValue';
import { AnyValueMap } from './AnyValueMap';

export class AnyValueArray extends Array<any> {

    public constructor(values: any[] = null) {
        super();

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = AnyValueArray.prototype;

        this.append(values);
    }
        
    public append(elements: any[]): void {
    	if (elements != null) {
            for (let index = 0; index < elements.length; index++)            	
            	this.push(elements[index]);
    	}
    }

    public clear(): void {
        this.splice(0, this.length);
    }

    public getAsObject(index: number = null): any {
        if (index == null) {
            let result: any[] = [];
            for (index = 0; index < this.length; index++)
                result.push(this[index]);
            return result;
        } else {
            return this[index];
        }
    }

    public setAsObject(index: any, value: any): void {
        if (value == null) {
            this.clear();
            let elements = ArrayConverter.toArray(value);
            this.append(elements);
        } else {
            this[index] = value;
        }
    }
    
    public getAsNullableString(index: number): string {
        let value = this[index];
        return StringConverter.toNullableString(value);
    }

    public getAsString(index: number): string {
        return this.getAsStringWithDefault(index, null);
    }

    public getAsStringWithDefault(index: number, defaultValue: string): string {
        let value = this[index];
        return StringConverter.toStringWithDefault(value, defaultValue);
    }

    public getAsNullableBoolean(index: number): boolean {
        let value = this[index];
        return BooleanConverter.toNullableBoolean(value);
    }

    public getAsBoolean(index: number): boolean {
        return this.getAsBooleanWithDefault(index, false);
    }

    public getAsBooleanWithDefault(index: number, defaultValue: boolean): boolean {
        let value = this[index];
        return BooleanConverter.toBooleanWithDefault(value, defaultValue);
    }

    public getAsNullableInteger(index: number): number {
        let value = this[index];
        return IntegerConverter.toNullableInteger(value);
    }

    public getAsInteger(index: number): number {
        return this.getAsIntegerWithDefault(index, 0);
    }

    public getAsIntegerWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }

    public getAsNullableLong(index: number): number {
        let value = this[index];
        return LongConverter.toNullableLong(value);
    }

    public getAsLong(index: number): number {
        return this.getAsLongWithDefault(index, 0);
    }

    public getAsLongWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

    public getAsNullableFloat(index: number): number {
        let value = this[index];
        return FloatConverter.toNullableFloat(value);
    }

    public getAsFloat(index: number): number {
        return this.getAsFloatWithDefault(index, 0);
    }

    public getAsFloatWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return FloatConverter.toFloatWithDefault(value, defaultValue);
    }

    public getAsNullableDouble(index: number): number {
        let value = this[index];
        return DoubleConverter.toNullableDouble(value);
    }

    public getAsDouble(index: number) {
        return this.getAsDoubleWithDefault(index, 0);
    }

    public getAsDoubleWithDefault(index: number, defaultValue: number): number {
        let value = this[index];
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

    public getAsNullableDateTime(index: number): Date {
        let value = this[index];
        return DateTimeConverter.toNullableDateTime(value);
    }

    public getAsDateTime(index: number): Date {
        return this.getAsDateTimeWithDefault(index, null);
    }

    public getAsDateTimeWithDefault(index: number, defaultValue: Date): Date {
        let value = this[index];
        return DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    }

    public getAsNullableType<T>(type: TypeCode, index: number): T {
        let value = this[index];
        return TypeConverter.toNullableType<T>(type, value);
    }

    public getAsType<T>(type: TypeCode, index: number): T {
        return this.getAsTypeWithDefault(type, index, null);
    }

    public getAsTypeWithDefault<T>(type: TypeCode, index: number, defaultValue: T): T {
        let value = this[index];
        return TypeConverter.toTypeWithDefault(type, value, defaultValue);
    }

    public getAsValue(index: number): AnyValue {
        let value = this[index];
    	return new AnyValue(value);
    }

    public getAsNullableArray(index: number): AnyValueArray {
        let value = this[index];
    	return value != null ? AnyValueArray.fromValue(value) : null;
    }

    public getAsArray(index: number): AnyValueArray {
        let value = this[index];
    	return AnyValueArray.fromValue(value);
    }
    
    public getAsArrayWithDefault(index: number, defaultValue: AnyValueArray): AnyValueArray {
    	let result = this.getAsNullableArray(index);
    	return result != null ? result : defaultValue;
    }

    public getAsNullableMap(index: number): AnyValueMap {
        let value = this[index];
    	return value != null ? AnyValueMap.fromValue(value) : null;
    }

    public getAsMap(index: number): AnyValueMap {
        let value = this[index];
    	return AnyValueMap.fromValue(value);
    }

    public getAsMapWithDefault(index: number, defaultValue: AnyValueMap): AnyValueMap {
        let result = this.getAsNullableMap(index);
    	return result != null ? AnyValueMap.fromValue(result): defaultValue;
    }

    public contains(value: any): boolean {
        let strValue = StringConverter.toNullableString(value);

        for (let index = 0; index < this.length; index++) {
            let strElement = StringConverter.toNullableString(this[index]);
            
            if (strValue == null && strElement == null)
            	return true;
            if (strValue == null || strElement == null)
            	continue;
            if (strValue == strElement)
                return true;
        }

        return false;
    }

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

    public clone(): any {
    	return new AnyValueArray(this);
    }
    
    public toString(): string {
        let builder = '';
        for (let index = 0; index < this.length; index++) {
            if (index > 0)
                builder += ',';
            builder += this.getAsStringWithDefault(index, "");
        }
        return builder;
    }
    
    public static fromValues(...values: any[]): AnyValueArray {
    	return new AnyValueArray(values);
    }
    
    public static fromValue(value: any): AnyValueArray {
    	let values = ArrayConverter.toNullableArray(value);
    	return new AnyValueArray(values);
    }
    
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