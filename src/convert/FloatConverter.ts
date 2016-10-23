let _ = require('lodash');

export class FloatConverter {

    public static toNullableFloat(value: any): number {
        if (value == null) return null;
        if (_.isNumber(value)) return value;
        if (_.isDate(value)) return value.getTime();
        if (_.isBoolean(value)) return value ? 1 : 0;

        let result = parseFloat(value);
        return isNaN(result) ? null : result;
    }

    public static toFloat(value: any): number {
       return FloatConverter.toFloatWithDefault(value, 0);
    }

    public static toFloatWithDefault(value: any, defaultValue: number = 0): number {
       var result = FloatConverter.toNullableFloat(value);
       return result != null ? result : defaultValue;
    }

}