let _ = require('lodash');

import { LongConverter } from './LongConverter';

export class IntegerConverter {

    public static toNullableInteger(value: any): number {
        return LongConverter.toNullableLong(value);
    }

    public static toInteger(value: any): number {
        return LongConverter.toLong(value);
    }

    public static toIntegerWithDefault(value: any, defaultValue: number): number {
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

}