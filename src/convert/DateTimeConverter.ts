let _ = require('lodash');

export class DateTimeConverter {

    public static toNullableDateTime(value: any): Date {
        if (value == null) return null;
        if (_.isDate(value)) return value;
        if (_.isNumber(value)) return new Date(value);

        let result = Date.parse(value);
        return isNaN(result) ? null : new Date(result);
    }

    public static toDateTime(value: any): Date {
       return DateTimeConverter.toDateTimeWithDefault(value, new Date());
    }

    public static toDateTimeWithDefault(value: any, defaultValue: Date = null): Date {
       var result = DateTimeConverter.toNullableDateTime(value);
       return result != null ? result : defaultValue;
    }
    
}