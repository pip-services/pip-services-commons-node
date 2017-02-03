import { TypeCode } from '../convert/TypeCode';
export declare class TypeMatcher {
    static matchValue(expectedType: any, actualValue: any): boolean;
    static matchType(expectedType: any, actualType: TypeCode): boolean;
    static matchValueByName(expectedType: string, actualValue: any): boolean;
    static matchTypeByName(expectedType: string, actualType: TypeCode): boolean;
}
