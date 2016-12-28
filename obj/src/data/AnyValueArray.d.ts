import { TypeCode } from '../convert/TypeCode';
import { AnyValue } from './AnyValue';
import { AnyValueMap } from './AnyValueMap';
export declare class AnyValueArray extends Array<any> {
    constructor(values?: any[]);
    get(index: number): any;
    put(index: number, value: any): void;
    remove(index: number): void;
    append(elements: any[]): void;
    clear(): void;
    getAsObject(index?: number): any;
    setAsObject(index: any, value: any): void;
    getAsNullableString(index: number): string;
    getAsString(index: number): string;
    getAsStringWithDefault(index: number, defaultValue: string): string;
    getAsNullableBoolean(index: number): boolean;
    getAsBoolean(index: number): boolean;
    getAsBooleanWithDefault(index: number, defaultValue: boolean): boolean;
    getAsNullableInteger(index: number): number;
    getAsInteger(index: number): number;
    getAsIntegerWithDefault(index: number, defaultValue: number): number;
    getAsNullableLong(index: number): number;
    getAsLong(index: number): number;
    getAsLongWithDefault(index: number, defaultValue: number): number;
    getAsNullableFloat(index: number): number;
    getAsFloat(index: number): number;
    getAsFloatWithDefault(index: number, defaultValue: number): number;
    getAsNullableDouble(index: number): number;
    getAsDouble(index: number): number;
    getAsDoubleWithDefault(index: number, defaultValue: number): number;
    getAsNullableDateTime(index: number): Date;
    getAsDateTime(index: number): Date;
    getAsDateTimeWithDefault(index: number, defaultValue: Date): Date;
    getAsNullableType<T>(type: TypeCode, index: number): T;
    getAsType<T>(type: TypeCode, index: number): T;
    getAsTypeWithDefault<T>(type: TypeCode, index: number, defaultValue: T): T;
    getAsValue(index: number): AnyValue;
    getAsNullableArray(index: number): AnyValueArray;
    getAsArray(index: number): AnyValueArray;
    getAsArrayWithDefault(index: number, defaultValue: AnyValueArray): AnyValueArray;
    getAsNullableMap(index: number): AnyValueMap;
    getAsMap(index: number): AnyValueMap;
    getAsMapWithDefault(index: number, defaultValue: AnyValueMap): AnyValueMap;
    contains(value: any): boolean;
    containsAsType<T>(type: TypeCode, value: any): boolean;
    clone(): any;
    toString(): string;
    static fromValues(...values: any[]): AnyValueArray;
    static fromValue(value: any): AnyValueArray;
    static fromString(values: string, separator: string, removeDuplicates?: boolean): AnyValueArray;
}