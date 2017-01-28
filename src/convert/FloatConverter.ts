let _ = require('lodash');

import { DoubleConverter } from './DoubleConverter';

export class FloatConverter {

    public static toNullableFloat(value: any): number {
        return DoubleConverter.toNullableDouble(value);
    }

    public static toFloat(value: any): number {
        return DoubleConverter.toDouble(value);
    }

    public static toFloatWithDefault(value: any, defaultValue: number): number {
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

}