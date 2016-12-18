let _ = require('lodash');

export class DoubleConverter {

    public static toNullableDouble(value: any): number {
        if (value == null) return null;
        if (_.isNumber(value)) return value;
        if (_.isDate(value)) return value.getTime();
        if (_.isBoolean(value)) return value ? 1 : 0;

        let result = parseFloat(value);
        return isNaN(result) ? null : result;
    }

    public static toDouble(value: any): number {
       return DoubleConverter.toDoubleWithDefault(value, 0);
    }

    public static toDoubleWithDefault(value: any, defaultValue: number = 0): number {
       var result = DoubleConverter.toNullableDouble(value);
       return result != null ? result : defaultValue;
    }

}