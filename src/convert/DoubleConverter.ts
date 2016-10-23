let _ = require('lodash');

import { FloatConverter } from './FloatConverter';

export class DoubleConverter {

    public static toNullableLong(value: any): number {
        return FloatConverter.toNullableFloat(value);
    }

    public static toLong(value: any): number {
       return FloatConverter.toFloat(value);
    }

    public static toLongWithDefault(value: any, defaultValue: number = 0): number {
       return FloatConverter.toFloatWithDefault(value, defaultValue);
    }

}