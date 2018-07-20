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

/**
 * Class that allows for usage of abstract, portable data types. Stores a value in its
 * 'value' field, which can be retrieved in various ways with the help of numerous converters.
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
export class AnyValue implements ICloneable {
    /** The value stored by this object. */
	public value: any;

    /**
     * Creates a new instance and sets its 'value' field to the value passed
     * as a parameter. If 'value' is omitted, it can be set later on using 
     * {@link #setAsObject}.
     * 
     * @param value     value to store in this object's 'value' field. If this 
     *                  parameter is an instance of AnyValue, its 'value' field will
     *                  be stored instead.
     */
    public constructor(value: any = null) {
    	if (value instanceof AnyValue)
    		this.value = (<AnyValue>value).value;
    	else
			this.value = value;
    }

    /** 
     * @returns this object's 'value' field as a TypeCode. 
     * 
     * @see TypeConverter#toTypeCode
     */
    public getTypeCode(): TypeCode {
    	return TypeConverter.toTypeCode(this.value);
    }
    
    /** @returns this object's 'value' field without any conversions. */
    public getAsObject(): any {
        return this.value;
    }

    /** 
     * @param value     value to store in this object's 'value' field. If this 
     *                  parameter is an instance of AnyValue, its 'value' field will
     *                  be stored instead.
     */
    public setAsObject(value: any): any {
        if (value instanceof AnyValue)
            this.value = (<AnyValue>value).value;
        else
            this.value = value;
    }

    /** 
     * @returns this object's 'value' field as a nullable string. 
     * 
     * @see StringConverter#toNullableString
     */
    public getAsNullableString(): string {
        return StringConverter.toNullableString(this.value);
    }

    /** 
     * @returns this object's 'value' field as a string (or null as the default). 
     * 
     * @see #getAsStringWithDefault
     */
    public getAsString(): string {
        return this.getAsStringWithDefault(null);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as a string or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see StringConverter#toStringWithDefault
     */
    public getAsStringWithDefault(defaultValue: string): string {
        return StringConverter.toStringWithDefault(this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as a nullable boolean. 
     * 
     * @see BooleanConverter#toNullableBoolean
     */
    public getAsNullableBoolean(): boolean {
        return BooleanConverter.toNullableBoolean(this.value);
    }

    /** 
     * @returns this object's 'value' field as a boolean (or false as the default). 
     * 
     * @see #getAsBooleanWithDefault
     */
    public getAsBoolean(): boolean {
        return this.getAsBooleanWithDefault(false);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as a boolean or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see BooleanConverter#toBooleanWithDefault
     */
    public getAsBooleanWithDefault(defaultValue: boolean): boolean {
        return BooleanConverter.toBooleanWithDefault(this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as a nullable integer. 
     * 
     * @see IntegerConverter#toNullableInteger
     */
    public getAsNullableInteger(): number {
        return IntegerConverter.toNullableInteger(this.value);
    }

    /** 
     * @returns this object's 'value' field as an integer (or 0 as the default). 
     * 
     * @see #getAsIntegerWithDefault
     */
    public getAsInteger(): number {
        return this.getAsIntegerWithDefault(0);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as an integer or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see IntegerConverter#toIntegerWithDefault
     */
    public getAsIntegerWithDefault(defaultValue: number): number {
        return IntegerConverter.toIntegerWithDefault(this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as a nullable long. 
     * 
     * @see LongConverter#toNullableLong
     */
    public getAsNullableLong(): number {
        return LongConverter.toNullableLong(this.value);
    }

    /** 
     * @returns this object's 'value' field as a long (or 0 as the default). 
     * 
     * @see #getAsLongWithDefault
     */
    public getAsLong(): number {
        return this.getAsLongWithDefault(0);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as a long or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see LongConverter#toLongWithDefault
     */
    public getAsLongWithDefault(defaultValue: number): number {
        return LongConverter.toLongWithDefault(this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as a nullable float. 
     * 
     * @see FloatConverter#toNullableFloat
     */
    public getAsNullableFloat(): number {
        return FloatConverter.toNullableFloat(this.value);
    }

    /** 
     * @returns this object's 'value' field as a float (or 0 as the default). 
     * 
     * @see #getAsFloatWithDefault
     */
    public getAsFloat(): number {
        return this.getAsFloatWithDefault(0);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as a float or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see FloatConverter#toFloatWithDefault
     */
    public getAsFloatWithDefault(defaultValue: number): number {
        return FloatConverter.toFloatWithDefault(this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as a nullable double. 
     * 
     * @see DoubleConverter#toNullableDouble
     */
    public getAsNullableDouble(): number {
        return DoubleConverter.toNullableDouble(this.value);
    }

    /** 
     * @returns this object's 'value' field as a double (or 0 as the default). 
     * 
     * @see #getAsDoubleWithDefault
     */
    public getAsDouble(): number {
        return this.getAsDoubleWithDefault(0);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as a double or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see DoubleConverter#toDoubleWithDefault
     */
    public getAsDoubleWithDefault(defaultValue: number): number {
        return DoubleConverter.toDoubleWithDefault(this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as a nullable Datetime. 
     * 
     * @see DateTimeConverter#toNullableDateTime
     */
    public getAsNullableDateTime(): Date {
        return DateTimeConverter.toNullableDateTime(this.value);
    }

    /** 
     * @returns this object's 'value' field as a Datetime (or null as the default). 
     * 
     * @see #getAsDateTimeWithDefault
     */
    public getAsDateTime(): Date {
        return this.getAsDateTimeWithDefault(null);
    }

    /**
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as a Datetime or the
     *                          defaultValue, if conversion is not possible.
     * 
     * @see DateTimeConverter#toDateTimeWithDefault
     */
    public getAsDateTimeWithDefault(defaultValue: Date): Date {
        return DateTimeConverter.toDateTimeWithDefault(this.value, defaultValue);
    }

    /** 
     * Converts this object's 'value' field into a nullable object of type 'type' using
     * {@link TypeConverter#toNullableType<T>} and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @returns this object's 'value' field as a nullable object of type 'type'. 
     * 
     * @see TypeConverter#toNullableType<T>
     */
    public getAsNullableType<T>(type: TypeCode): T {
        return TypeConverter.toNullableType<T>(type, this.value);
    }

    /** 
     * Converts this object's 'value' field into an object of type 'type' using
     * {@link TypeConverter#toTypeWithDefault<T>} and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @returns this object's 'value' field as an object of type 'type' (or null as the default). 
     * 
     * @see #getAsTypeWithDefault
     */
    public getAsType<T>(type: TypeCode): T {
        return this.getAsTypeWithDefault<T>(type, null);
    }

    /**
     * Converts this object's 'value' field into an object of type 'type' using
     * {@link TypeConverter#toTypeWithDefault<T>} and returns it.
     * 
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 this object's 'value' field as an object of type 'type' or the defaultValue, 
     *                          if conversion is not possible.
     * 
     * @see TypeConverter#toTypeWithDefault<T>
     */
    public getAsTypeWithDefault<T>(type: TypeCode, defaultValue: T): T {
        return TypeConverter.toTypeWithDefault<T>(type, this.value, defaultValue);
    }

    /** 
     * @returns this object's 'value' field as an AnyValueArray. 
     * 
     * @see AnyValueArray#fromValue
     */
    public getAsArray(): AnyValueArray {
    	return AnyValueArray.fromValue(this.value);
    }

    /** 
     * @returns this object's 'value' field as an AnyValueMap. 
     * 
     * @see AnyValueMap#fromValue
     */
    public getAsMap(): AnyValueMap {
    	return AnyValueMap.fromValue(this.value);
    }

    /**
     * Checks whether or not the parameter passed as 'obj' is equal to this object's
     * 'value' field.
     * 
     * @param obj   the object to check against this object's 'value' field. If 'obj'
     *              is an instance of AnyValue, its 'value' field will be used.
     * @returns     whether or not this object's 'value' field and 'obj' are equal. 
     *              If both items are null, true will be returned.
     */
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

    /**
     * Checks whether or not the parameter passed as 'obj' is equal to this object's
     * 'value' field after both are converted to the type passed as 'type' using 
     * {@link TypeConverter#toType<T>}.
     * 
     * @param type  the TypeCode to use in TypeConverter.toType<T>(TypeCode, value).
     * @param obj   the object to check against this object's 'value' field after 
     *              conversion. If 'obj' is an instance of AnyValue, then its 'value' 
     *              field will be used.
     * @returns     whether or not this object's 'value' field and 'obj' are equal 
     *              as objects of type 'type'. If both items (or their converted versions) 
     *              are null, true will be returned.
     * 
     * @see TypeConverter#toType<T>
     */
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

    /** @returns a clone of this object. */
    public clone(): any {
    	return new AnyValue(this.value);
    }
    
    /** 
     * @returns this object's 'value' field as a string value using {@link StringConverter#toString}.
     *
     * @see StringConverter#toString
     */
    public toString(): any {
        return StringConverter.toString(this.value);
    }

    /** @returns the hash code of this object's 'value' field. 0 is returned if the 'value' field is null. */
    public hashCode(): number {
        return this.value != null ? this.value.hashCode(): 0;
    }
}
