import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { StringConverter } from '../convert/StringConverter';
import { BooleanConverter } from '../convert/BooleanConverter';
import { IntegerConverter } from '../convert/IntegerConverter';
import { LongConverter } from '../convert/LongConverter';
import { FloatConverter } from '../convert/FloatConverter';
import { DoubleConverter } from '../convert/DoubleConverter';
import { DateTimeConverter } from '../convert/DateTimeConverter';
import { ICloneable } from './ICloneable';
import { AnyValueArray } from './AnyValueArray';
import { AnyValueMap } from './AnyValueMap';

export class AnyValue implements ICloneable {
	public value: any;

    public constructor(value: any = null) {
    	if (value instanceof AnyValue)
    		this.value = (<AnyValue>value).value;
    	else
			this.value = value;
    }

    public getTypeCode(): TypeCode {
    	return TypeConverter.toTypeCode(this.value);
    }
        
    public getAsObject(): any {
        return this.value;
    }

    public setAsObject(value: any): any {
        this.value = value;
    }

    public getAsNullableString(): string {
        return StringConverter.toNullableString(this.value);
    }

    public getAsString(): string {
        return this.getAsStringWithDefault(null);
    }

    public getAsStringWithDefault(defaultValue: string): string {
        return StringConverter.toStringWithDefault(this.value, defaultValue);
    }

    public getAsNullableBoolean(): boolean {
        return BooleanConverter.toNullableBoolean(this.value);
    }

    public getAsBoolean(): boolean {
        return this.getAsBooleanWithDefault(false);
    }

    public getAsBooleanWithDefault(defaultValue: boolean): boolean {
        return BooleanConverter.toBooleanWithDefault(this.value, defaultValue);
    }

    public getAsNullableInteger(): number {
        return IntegerConverter.toNullableInteger(this.value);
    }

    public getAsInteger(): number {
        return this.getAsIntegerWithDefault(0);
    }

    public getAsIntegerWithDefault(defaultValue: number): number {
        return IntegerConverter.toIntegerWithDefault(this.value, defaultValue);
    }

    public getAsNullableLong(): number {
        return LongConverter.toNullableLong(this.value);
    }

    public getAsLong(): number {
        return this.getAsLongWithDefault(0);
    }

    public getAsLongWithDefault(defaultValue: number): number {
        return LongConverter.toLongWithDefault(this.value, defaultValue);
    }

    public getAsNullableFloat(): number {
        return FloatConverter.toNullableFloat(this.value);
    }

    public getAsFloat(): number {
        return this.getAsFloatWithDefault(0);
    }

    public getAsFloatWithDefault(defaultValue: number): number {
        return FloatConverter.toFloatWithDefault(this.value, defaultValue);
    }

    public getAsNullableDouble(): number {
        return DoubleConverter.toNullableDouble(this.value);
    }

    public getAsDouble(): number {
        return this.getAsDoubleWithDefault(0);
    }

    public getAsDoubleWithDefault(defaultValue: number): number {
        return DoubleConverter.toDoubleWithDefault(this.value, defaultValue);
    }

    public getAsNullableDateTime(): Date {
        return DateTimeConverter.toNullableDateTime(this.value);
    }

    public getAsDateTime(): Date {
        return this.getAsDateTimeWithDefault(null);
    }

    public getAsDateTimeWithDefault(defaultValue: Date): Date {
        return DateTimeConverter.toDateTimeWithDefault(this.value, defaultValue);
    }

    public getAsNullableType<T>(type: TypeCode): T {
        return TypeConverter.toNullableType<T>(type, this.value);
    }

    public getAsType<T>(type: TypeCode): T {
        return this.getAsTypeWithDefault<T>(type, null);
    }

    public getAsTypeWithDefault<T>(type: TypeCode, defaultValue: T): T {
        return TypeConverter.toTypeWithDefault<T>(type, this.value, defaultValue);
    }

    public getAsArray(): AnyValueArray {
    	return AnyValueArray.fromValue(this.value);
    }

    public getAsMap(): AnyValueMap {
    	return AnyValueMap.fromValue(this.value);
    }

    public equals(obj: any): boolean {
        if (obj == null && this.value == null) return true;
        if (obj == null || this.value == null) return false;

        if (obj instanceof AnyValue)
        	obj = (<AnyValue>obj).value;

        let strThisValue = StringConverter.toString(this.value);
        let strValue = StringConverter.toString(obj);
        
        if (strThisValue == null && strValue == null) return true;
        if (strThisValue == null || strValue == null) return false;        
        return strThisValue == strValue;
    }

    public equalsAsType<T>(type: TypeCode, obj: any): boolean {
        if (obj == null && this.value == null) return true;
        if (obj == null || this.value == null) return false;

        if (obj instanceof AnyValue)
        	obj = (<AnyValue>obj).value;

        let typedThisValue = TypeConverter.toType<T>(type, this.value);
        let typedValue = TypeConverter.toType<T>(type, obj);
        
        if (typedThisValue == null && typedValue == null) return true;
        if (typedThisValue == null || typedValue == null) return false;        
        return typedThisValue == typedValue;
    }

    public clone(): any {
    	return new AnyValue(this.value);
    }
    
    public toString(): any {
        return StringConverter.toString(this.value);
    }

    public hashCode(): number {
        return this.value != null ? this.value.hashCode(): 0;
    }
}
