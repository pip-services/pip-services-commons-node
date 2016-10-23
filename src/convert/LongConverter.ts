let _ = require('lodash');

import { IntegerConverter } from './IntegerConverter';

export class LongConverter {

    public static toNullableLong(value: any): number {
        return IntegerConverter.toNullableInteger(value);
    }

    public static toLong(value: any): number {
       return IntegerConverter.toInteger(value);
    }

    public static toLongWithDefault(value: any, defaultValue: number = 0): number {
       return IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }

}