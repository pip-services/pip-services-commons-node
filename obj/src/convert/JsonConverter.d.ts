import { TypeCode } from './TypeCode';
export declare class JsonConverter {
    static fromJson<T>(type: TypeCode, value: string): T;
    static toJson(value: any): string;
    static fromToObject(value: any): any;
    static toNullableMap(value: string): any;
    static toMap(value: string): any;
    static toMapWithDefault(value: string, defaultValue: any): any;
}
