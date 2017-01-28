let _ = require('lodash');

import { DoubleConverter } from './DoubleConverter';

export class DecimalConverter {

    public static toNullableDecimal(value: any): number {
        return DoubleConverter.toNullableDouble(value);
    }

    public static toDecimal(value: any): number {
        return DoubleConverter.toDouble(value);
    }

    public static toDecimalWithDefault(value: any, defaultValue: number = 0): number {
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

}