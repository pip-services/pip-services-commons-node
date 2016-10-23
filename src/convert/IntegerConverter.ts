let _ = require('lodash');

export class IntegerConverter {

    public static toNullableInteger(value: any): number {
        if (value == null) return null;
        if (_.isNumber(value)) return Math.ceil(value);
        if (_.isDate(value)) return value.getTime();
        if (_.isBoolean(value)) return value ? 1 : 0;
        
        let result = parseInt(value);
        return isNaN(result) ? null : result;
    }

    public static toInteger(value: any): number {
       return IntegerConverter.toIntegerWithDefault(value, 0);
    }

    public static toIntegerWithDefault(value: any, defaultValue: number = 0): number {
       var result = IntegerConverter.toNullableInteger(value);
       return result != null ? result : defaultValue;
    }

}