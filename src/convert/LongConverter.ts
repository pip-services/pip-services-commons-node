let _ = require('lodash');

export class LongConverter {

    public static toNullableLong(value: any): number {
        if (value == null) return null;
        if (_.isNumber(value)) return Math.ceil(value);
        if (_.isDate(value)) return value.getTime();
        if (_.isBoolean(value)) return value ? 1 : 0;
        
        let result = parseFloat(value);
        return isNaN(result) ? null : Math.ceil(result);
    }

    public static toLong(value: any): number {
       return LongConverter.toLongWithDefault(value, 0);
    }

    public static toLongWithDefault(value: any, defaultValue: number): number {
       var result = LongConverter.toNullableLong(value);
       return result != null ? result : defaultValue;
    }

}