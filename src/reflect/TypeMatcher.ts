let _ = require('lodash');

import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

export class TypeMatcher {
	
    public static matchValue(expectedType: any, actualValue: any): boolean {
        if (expectedType == null)
            return true;
        if (actualValue == null)
        	throw new Error("Actual value cannot be null");

        return TypeMatcher.matchType(expectedType, TypeConverter.toTypeCode(actualValue));
    }

    public static matchType(expectedType: any, actualType: TypeCode): boolean {
        if (expectedType == null)
            return true;
        if (actualType == null)
        	throw new Error("Actual type cannot be null");

        if (_.isInteger(expectedType)) {
            if (expectedType == TypeCode.Integer 
                && (actualType == TypeCode.Long || actualType == TypeCode.Float || actualType == TypeCode.Double))
                return true;
            if (expectedType == TypeCode.Long 
                && (actualType == TypeCode.Integer || actualType == TypeCode.Float || actualType == TypeCode.Double))
                return true;
            if (expectedType == TypeCode.Float 
                && (actualType == TypeCode.Integer || actualType == TypeCode.Long || actualType == TypeCode.Double))
                return true;
            if (expectedType == TypeCode.Double
                && (actualType == TypeCode.Integer || actualType == TypeCode.Long || actualType == TypeCode.Float))
                return true;
            return expectedType == actualType;
        }
        
        if (_.isString(expectedType))
            return TypeMatcher.matchTypeByName(expectedType, actualType);

        return false;
    }

    public static matchValueByName(expectedType: string, actualValue: any): boolean {
        if (expectedType == null) 
        	return true;
        if (actualValue == null)
        	throw new Error("Actual value cannot be null");

        return TypeMatcher.matchTypeByName(expectedType, TypeConverter.toTypeCode(actualValue));
    }

    public static matchTypeByName(expectedType: string, actualType: TypeCode): boolean {
        if (expectedType == null)
        	return true;
        if (actualType == null)
        	throw new Error("Actual type cannot be null");
        
        expectedType = expectedType.toLowerCase();

        if (expectedType == "object")
            return true;
        else if (expectedType == "int" || expectedType == "integer") {
            return actualType == TypeCode.Integer
                || actualType == TypeCode.Long;
        } else if (expectedType == "long") {
            return actualType == TypeCode.Long;
        } else if (expectedType == "float") {
            return actualType == TypeCode.Float
                || actualType == TypeCode.Double;
        } else if (expectedType == "double") {
            return actualType == TypeCode.Double;
        } else if (expectedType == "string") {
            return actualType == TypeCode.String;
        } else if (expectedType == "bool" || expectedType == "boolean") {
            return actualType == TypeCode.Boolean;
        } else if (expectedType == "date" || expectedType == "datetime") {
            return actualType == TypeCode.DateTime;
        } else if (expectedType == "timespan" || expectedType == "duration") {
            return actualType == TypeCode.Integer
                || actualType == TypeCode.Long
                || actualType == TypeCode.Float
                || actualType == TypeCode.Double;
        } else if (expectedType == "enum") {
            return actualType == TypeCode.Integer 
                || actualType == TypeCode.String;
        } else if (expectedType == "map" || expectedType == "dict" || expectedType == "dictionary") {
            return actualType == TypeCode.Map;
        } else if (expectedType == "array" || expectedType == "list") {
            return actualType == TypeCode.Array;
        } else if (_.endsWith(expectedType, "[]")) {
        	// Todo: Check subtype
            return actualType == TypeCode.Array;
        } else
            return false;
    }
}
