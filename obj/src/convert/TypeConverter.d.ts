import { TypeCode } from './TypeCode';
export declare class TypeConverter {
    static toTypeCode(value: any): TypeCode;
    static toNullableType<T>(type: TypeCode, value: any): T;
    static toType<T>(type: TypeCode, value: any): T;
    static toTypeWithDefault<T>(type: TypeCode, value: any, defaultValue: T): T;
}
