import { TypeCode } from '../convert/TypeCode';
import { ICloneable } from './ICloneable';
import { AnyValue } from './AnyValue';
import { AnyValueArray } from './AnyValueArray';
export declare class AnyValueMap implements ICloneable {
    constructor(values?: any);
    get(name: string): any;
    put(key: string, value: any): any;
    remove(key: string): void;
    append(map: any): void;
    clear(): any;
    length(): number;
    getAsObject(key?: string): any;
    setAsObject(key: any, value?: any): void;
    getAsNullableString(key: string): string;
    getAsString(key: string): string;
    getAsStringWithDefault(key: string, defaultValue: string): string;
    getAsNullableBoolean(key: string): boolean;
    getAsBoolean(key: string): boolean;
    getAsBooleanWithDefault(key: string, defaultValue: boolean): boolean;
    getAsNullableInteger(key: string): number;
    getAsInteger(key: string): number;
    getAsIntegerWithDefault(key: string, defaultValue: number): number;
    getAsNullableLong(key: string): number;
    getAsLong(key: string): number;
    getAsLongWithDefault(key: string, defaultValue: number): number;
    getAsNullableFloat(key: string): number;
    getAsFloat(key: string): number;
    getAsFloatWithDefault(key: string, defaultValue: number): number;
    getAsNullableDouble(key: string): number;
    getAsDouble(key: string): number;
    getAsDoubleWithDefault(key: string, defaultValue: number): number;
    getAsNullableDateTime(key: string): Date;
    getAsDateTime(key: string): Date;
    getAsDateTimeWithDefault(key: string, defaultValue: Date): Date;
    getAsNullableType<T>(type: TypeCode, key: string): T;
    getAsType<T>(type: TypeCode, key: string): T;
    getAsTypeWithDefault<T>(type: TypeCode, key: string, defaultValue: T): T;
    getAsValue(key: string): AnyValue;
    getAsNullableArray(key: string): AnyValueArray;
    getAsArray(key: string): AnyValueArray;
    getAsArrayWithDefault(key: string, defaultValue: AnyValueArray): AnyValueArray;
    getAsNullableMap(key: string): AnyValueMap;
    getAsMap(key: string): AnyValueMap;
    getAsMapWithDefault(key: string, defaultValue: AnyValueMap): AnyValueMap;
    toString(): string;
    clone(): any;
    static fromValue(value: any): AnyValueMap;
    static fromTuples(...tuples: any[]): AnyValueMap;
    static fromTuplesArray(tuples: any[]): AnyValueMap;
    static fromMaps(...maps: any[]): AnyValueMap;
}
