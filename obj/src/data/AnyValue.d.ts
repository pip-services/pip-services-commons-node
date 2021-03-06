import { TypeCode } from '../convert/TypeCode';
import { ICloneable } from './ICloneable';
import { AnyValueArray } from './AnyValueArray';
import { AnyValueMap } from './AnyValueMap';
export declare class AnyValue implements ICloneable {
    value: any;
    constructor(value?: any);
    getTypeCode(): TypeCode;
    getAsObject(): any;
    setAsObject(value: any): any;
    getAsNullableString(): string;
    getAsString(): string;
    getAsStringWithDefault(defaultValue: string): string;
    getAsNullableBoolean(): boolean;
    getAsBoolean(): boolean;
    getAsBooleanWithDefault(defaultValue: boolean): boolean;
    getAsNullableInteger(): number;
    getAsInteger(): number;
    getAsIntegerWithDefault(defaultValue: number): number;
    getAsNullableLong(): number;
    getAsLong(): number;
    getAsLongWithDefault(defaultValue: number): number;
    getAsNullableFloat(): number;
    getAsFloat(): number;
    getAsFloatWithDefault(defaultValue: number): number;
    getAsNullableDouble(): number;
    getAsDouble(): number;
    getAsDoubleWithDefault(defaultValue: number): number;
    getAsNullableDateTime(): Date;
    getAsDateTime(): Date;
    getAsDateTimeWithDefault(defaultValue: Date): Date;
    getAsNullableType<T>(type: TypeCode): T;
    getAsType<T>(type: TypeCode): T;
    getAsTypeWithDefault<T>(type: TypeCode, defaultValue: T): T;
    getAsArray(): AnyValueArray;
    getAsMap(): AnyValueMap;
    equals(obj: any): boolean;
    equalsAsType<T>(type: TypeCode, obj: any): boolean;
    clone(): any;
    toString(): any;
    hashCode(): number;
}
