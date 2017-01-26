let _ = require('lodash');

import { DoubleConverter } from '../convert/DoubleConverter';
import { StringConverter } from '../convert/StringConverter';

export class ObjectComparator {
    
    public static compare(value1: any, operation: string, value2: any): boolean {
        operation = operation.toUpperCase();

        if (operation == "=" || operation == "==" || operation == "EQ")
            return ObjectComparator.areEqual(value1, value2);
        if (operation == "!=" || operation == "<>" || operation == "NE")
            return ObjectComparator.areNotEqual(value1, value2);
        if (operation == "<" || operation == "LT")
            return ObjectComparator.less(value1, value2);
        if (operation == "<=" || operation == "LE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.less(value1, value2);
        if (operation == ">" || operation == "GT")
            return ObjectComparator.more(value1, value2);
        if (operation == ">=" || operation == "GE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.more(value1, value2);
        if (operation == "LIKE")
            return ObjectComparator.match(value1, value2);

        return true;
    }

    public static areEqual(value1: any, value2: any): boolean {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        return _.isEqual(value1, value2);
    }

    public static areNotEqual(value1: any, value2: any): boolean {
        return !ObjectComparator.areEqual(value1, value2);
    }

    public static less(value1: any, value2: any): boolean {
        var number1 = DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter.toNullableDouble(value2);

        if (number1 == null || number2 == null)
            return false;

        return number1 < number2;
    }

    public static more(value1: any, value2: any): boolean {
        var number1 = DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter.toNullableDouble(value2);

        if (number1 == null || number2 == null)
            return false;

        return number1 > number2;
    }

    public static match(value1: any, value2: any): boolean {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;

        let str1: string = StringConverter.toString(value1);
        let str2: string = StringConverter.toString(value2);
        
        return !!str1.match(str2);
    }

}